import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import StorefrontStars from "./StorefrontStars";
import "./storefrontRateOrder.css";

/*
  On the tracking page once the order is delivered or collected: five stars
  and an optional comment. It shows on the venue's online order page under
  the customer's first name and initial. They can change it until
  order.reviewUntil.

  order: { trackingCode, canReview, review, reviewName, reviewUntil }
  onSaved({ review, canReview, reviewUntil, reviewName })
*/

const LABELS = ["Tap a star to rate", "Poor", "Not great", "Good", "Very good", "Excellent"];
const MAX = 500;

export default function StorefrontRateOrder({ order, venueName, api, onSaved }) {
  const saved = order.review;
  const [editing, setEditing] = useState(!saved);
  const [rating, setRating] = useState(saved?.rating || 0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState(saved?.comment || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [justSaved, setJustSaved] = useState(false);

  if (!order.canReview && !saved) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (!rating || busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await api.rateOrder(order.trackingCode, { rating, comment: comment.trim() });
      onSaved?.(res);
      setEditing(false);
      setJustSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  /* ─── Rated ─── */
  if (saved && !editing) {
    return (
      <section className='slhShopRate slhShopRate--done'>
        <div className='slhShopRate__doneHead'>
          <span className='slhShopRate__doneIcon'>
            <CheckCircle2 size={20} />
          </span>
          <span>
            <b>{justSaved ? "Thanks for rating!" : "Your rating"}</b>
            <em>
              {justSaved ? "It's now on" : "Shown on"} {venueName}'s page as {saved.name || order.reviewName}
            </em>
          </span>
        </div>
        <div className='slhShopRate__mine'>
          <StorefrontStars value={saved.rating} size={20} />
          {saved.comment && <p>“{saved.comment}”</p>}
        </div>
        {order.canReview && (
          <button
            type='button'
            className='slhShopRate__ghost'
            onClick={() => {
              setRating(saved.rating);
              setComment(saved.comment || "");
              setJustSaved(false);
              setEditing(true);
            }}
          >
            Change rating
          </button>
        )}
      </section>
    );
  }

  /* ─── The form ─── */
  const shown = hover || rating;
  return (
    <form className='slhShopRate' onSubmit={submit}>
      <h2>How was your order?</h2>
      <p className='slhShopRate__sub'>Rate {venueName}. It helps them and the next customer.</p>

      <div className='slhShopRate__stars' role='radiogroup' aria-label='Your rating' onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type='button'
            role='radio'
            aria-checked={rating === n}
            aria-label={`${n} ${n === 1 ? "star" : "stars"}, ${LABELS[n]}`}
            className={`slhShopRate__star${n <= shown ? " slhShopRate__star--on" : ""}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => setRating(n)}
          >
            <Star size={34} strokeWidth={1.6} />
          </button>
        ))}
      </div>
      <p className={`slhShopRate__label${shown ? " slhShopRate__label--on" : ""}`} aria-live='polite'>
        {LABELS[shown]}
      </p>

      {rating > 0 && (
        <>
          <label className='slhShopRate__field'>
            <span>{rating >= 4 ? "What did you enjoy?" : "What could be better?"} (optional)</span>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, MAX))}
              rows={3}
              maxLength={MAX}
              placeholder={rating >= 4 ? "The food, the packaging, the rider…" : "Tell them what went wrong so they can fix it"}
            />
            <em>
              {comment.length}/{MAX}
            </em>
          </label>
          <p className='slhShopRate__note'>Your name shows as {order.reviewName || "Customer"}; your phone and email stay private.</p>
        </>
      )}

      {error && <p className='slhShopRate__error'>{error}</p>}

      <div className='slhShopRate__actions'>
        {saved && (
          <button type='button' className='slhShopRate__ghost' onClick={() => setEditing(false)} disabled={busy}>
            Cancel
          </button>
        )}
        <button type='submit' className='slhShopRate__primary' disabled={!rating || busy}>
          {busy ? "Saving…" : saved ? "Save changes" : "Post rating"}
        </button>
      </div>
    </form>
  );
}
