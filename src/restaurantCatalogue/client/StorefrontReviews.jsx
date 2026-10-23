import { forwardRef, useEffect, useState } from "react";
import { ChevronRight, MessageSquareText, Star, Store } from "lucide-react";
import StorefrontSheet from "./StorefrontSheet";
import StorefrontStars from "./StorefrontStars";
import "./storefrontReviews.css";

/*
  Ratings and reviews on the online order page: the average, how the stars
  spread, the newest comments, and every review in a sheet with a filter by
  stars. Only customers whose order was delivered can rate (from the
  tracking page), so every review comes from a real order.

  data: { summary: { average, count, comments, stars }, latest: [review] }
*/

const FILTERS = [null, 5, 4, 3, 2, 1];

export const ratingsLabel = (n) => `${n} ${n === 1 ? "rating" : "ratings"}`;

/* "just now" · "5 min ago" · "3 h ago" · "Yesterday" · "4 days ago" · "2 weeks ago" · "12 Mar 2026" */
export function agoOf(date) {
  const at = new Date(date).getTime();
  if (!at) return "";
  const s = Math.max(0, (Date.now() - at) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  const days = Math.floor(s / 86400);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 35) return `${Math.floor(days / 7)} ${days < 14 ? "week" : "weeks"} ago`;
  return new Date(at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const StorefrontReviews = forwardRef(function StorefrontReviews({ data, venueName, venueType, venueId, api }, ref) {
  const [allOpen, setAllOpen] = useState(false);
  const summary = data?.summary || { average: 0, count: 0, comments: 0, stars: {} };
  const latest = data?.latest || [];
  const top = Math.max(1, ...FILTERS.slice(1).map((s) => summary.stars?.[s] || 0));

  return (
    <section className='slhShopRev' ref={ref} aria-labelledby='slhShopRevTitle'>
      <header className='slhShopRev__head'>
        <h2 id='slhShopRevTitle'>Ratings & reviews</h2>
      </header>

      {!summary.count ? (
        <div className='slhShopRev__empty'>
          <span className='slhShopRev__emptyIcon'>
            <Star size={22} />
          </span>
          <span>
            <b>No ratings yet</b>
            <em>Customers rate {venueName} after their order arrives. Order and be the first.</em>
          </span>
        </div>
      ) : (
        <>
          <div className='slhShopRev__top'>
            <div className='slhShopRev__score'>
              <strong>{summary.average.toFixed(1)}</strong>
              <StorefrontStars value={summary.average} size={18} />
              <span>{ratingsLabel(summary.count)}</span>
            </div>
            <ul className='slhShopRev__bars' aria-label='How customers rated'>
              {FILTERS.slice(1).map((s) => {
                const n = summary.stars?.[s] || 0;
                return (
                  <li key={s}>
                    <span className='slhShopRev__barStar'>
                      {s} <Star size={11} strokeWidth={0} fill='#F59E0B' aria-hidden='true' />
                    </span>
                    <span className='slhShopRev__bar' aria-hidden='true'>
                      <span style={{ width: `${(n / top) * 100}%` }} />
                    </span>
                    <span className='slhShopRev__barN' aria-label={`${n} with ${s} stars`}>
                      {n}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {latest.length ? (
            <ul className='slhShopRev__list'>
              {latest.map((r) => (
                <ReviewCard key={r._id} review={r} venueName={venueName} />
              ))}
            </ul>
          ) : (
            <p className='slhShopRev__muted'>Star ratings only so far, no comments yet.</p>
          )}

          {summary.comments > latest.length && (
            <button type='button' className='slhShopRev__all' onClick={() => setAllOpen(true)}>
              <MessageSquareText size={16} /> See all {summary.comments} reviews <ChevronRight size={16} />
            </button>
          )}
        </>
      )}

      {allOpen && <AllReviews summary={summary} venueName={venueName} venueType={venueType} venueId={venueId} api={api} onClose={() => setAllOpen(false)} />}
    </section>
  );
});

export default StorefrontReviews;

/* ─── One review ─── */
function ReviewCard({ review, venueName, full = false }) {
  return (
    <li className='slhShopRev__card'>
      <div className='slhShopRev__who'>
        <span className='slhShopRev__avatar' aria-hidden='true'>
          {String(review.name || "C")
            .slice(0, 1)
            .toUpperCase()}
        </span>
        <span className='slhShopRev__whoText'>
          <b>{review.name}</b>
          <span className='slhShopRev__meta'>
            <StorefrontStars value={review.rating} size={13} />
            <em>
              {agoOf(review.createdAt)}
              {review.fulfilment ? ` · ${review.fulfilment === "pickup" ? "Pickup" : "Delivery"}` : ""}
              {review.edited ? " · edited" : ""}
            </em>
          </span>
        </span>
      </div>
      {review.comment && <p className={`slhShopRev__comment${full ? "" : " slhShopRev__comment--clamp"}`}>{review.comment}</p>}
      {review.items?.length > 0 && <p className='slhShopRev__items'>Ordered {review.items.join(", ")}</p>}
      {review.reply && (
        <div className='slhShopRev__reply'>
          <b>
            <Store size={13} /> Reply from {venueName}
          </b>
          <p>{review.reply.text}</p>
        </div>
      )}
    </li>
  );
}

/* ─── Every review, newest first, by stars ─── */
function AllReviews({ summary, venueName, venueType, venueId, api, onClose }) {
  const [rating, setRating] = useState(null);
  const [list, setList] = useState([]);
  const [more, setMore] = useState(false);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  const fetchPage = async (stars, before, add) => {
    setBusy(true);
    setError("");
    try {
      const res = await api.reviews(venueType, venueId, { rating: stars, before });
      setList((cur) => (add ? [...cur, ...res.reviews] : res.reviews));
      setMore(Boolean(res.more));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    setList([]);
    fetchPage(rating, null, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  return (
    <StorefrontSheet title='Reviews' subtitle={`${venueName} · ${summary.average.toFixed(1)} ★ · ${ratingsLabel(summary.count)}`} size='md' onClose={onClose}>
      <div className='slhShopRev__sheet'>
        <div className='slhShopRev__filters' role='group' aria-label='Show reviews with'>
          {FILTERS.map((s) => (
            <button
              key={s ?? "all"}
              type='button'
              className={rating === s ? "slhShopRev__filterOn" : ""}
              aria-pressed={rating === s}
              onClick={() => setRating(s)}
            >
              {s ? (
                <>
                  {s} <Star size={12} strokeWidth={0} fill='currentColor' aria-hidden='true' />
                </>
              ) : (
                "All"
              )}
            </button>
          ))}
        </div>

        {list.length > 0 && (
          <ul className='slhShopRev__list slhShopRev__list--sheet'>
            {list.map((r) => (
              <ReviewCard key={r._id} review={r} venueName={venueName} full />
            ))}
          </ul>
        )}

        {!busy && !error && !list.length && (
          <p className='slhShopRev__muted slhShopRev__muted--center'>
            {rating ? `No ${rating}-star reviews with a comment yet.` : "No reviews with a comment yet."}
          </p>
        )}
        {error && (
          <p className='slhShopRev__error'>
            {error}{" "}
            <button type='button' className='slhShopRev__link' onClick={() => fetchPage(rating, list.at(-1)?.createdAt || null, list.length > 0)}>
              Try again
            </button>
          </p>
        )}
        {busy && <p className='slhShopRev__muted slhShopRev__muted--center'>Loading reviews…</p>}
        {more && !busy && !error && (
          <button type='button' className='slhShopRev__all' onClick={() => fetchPage(rating, list.at(-1)?.createdAt, true)}>
            Show more
          </button>
        )}
      </div>
    </StorefrontSheet>
  );
}
