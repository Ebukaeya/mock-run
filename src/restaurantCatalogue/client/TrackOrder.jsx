import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  Bike,
  CheckCircle2,
  ChefHat,
  Clock3,
  Copy,
  CreditCard,
  MapPin,
  MessageCircle,
  PackageCheck,
  PackageSearch,
  Phone,
  ReceiptText,
  RotateCw,
  Share2,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import Loader from "../../storecatelogue/storelensSpiner/StorelenseSpinner"; // TODO: match your path
import storelenseMark from "../../assessStatic/pictures/storelenseMark.webp"; // TODO: same image as SignIn.jsx
import { storefrontApi } from "./storefrontApi";
import { ORDERS_KEY, clockOf, copyText, mapsLink, moneyIn, paymentLabel, shareLink, store, telLink, whatsappLink } from "./storefrontTools";
import "./trackOrder.css";

/*
|--------------------------------------------------------------------------
| TRACK AN ORDER — storelense.com/track/<trackingCode>
|--------------------------------------------------------------------------
|   <Route path='/track' element={<TrackOrder />} />
|   <Route path='/track/:trackingCode' element={<TrackOrder />} />
|
| Public. The link customers get by SMS and email after ordering. Shows
| where the order is, when it should arrive, the rider, payment (with Pay
| now for an unpaid card order, or the account for a transfer) and the
| items. Checks again every 20 seconds until it's delivered or cancelled.
| Paystack sends customers back here with ?reference=…; the payment is
| confirmed on the first load.
| Without a code it asks for the tracking ID.
*/

const POLL_MS = 20000;
const DONE = ["delivered", "cancelled"];

export default function TrackOrder({ api = storefrontApi, trackPath = "/track" }) {
  const { trackingCode } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [failed, setFailed] = useState(null);
  const [checking, setChecking] = useState(false);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [copied, setCopied] = useState("");
  const reference = useRef(null);

  /* Paystack's ?reference / ?trxref: use once, then tidy the address */
  if (reference.current === null && typeof window !== "undefined") {
    const q = new URLSearchParams(window.location.search);
    reference.current = q.get("reference") || q.get("trxref") || "";
    if (reference.current) window.history.replaceState(null, "", window.location.pathname);
  }

  const load = async (quiet = false) => {
    if (!trackingCode) return;
    if (!quiet) setChecking(true);
    try {
      const res = await api.track(trackingCode, reference.current || undefined);
      reference.current = "";
      setOrder(res.order);
      setFailed(null);
    } catch (e) {
      if (!order || e.status === 404) setFailed(e);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    setOrder(null);
    setFailed(null);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackingCode]);

  /* Keep it fresh while the order is moving, and when the tab comes back */
  useEffect(() => {
    if (!order || DONE.includes(order.status)) return undefined;
    const t = setInterval(() => document.visibilityState === "visible" && load(true), POLL_MS);
    const onShow = () => document.visibilityState === "visible" && load(true);
    document.addEventListener("visibilitychange", onShow);
    return () => {
      clearInterval(t);
      document.removeEventListener("visibilitychange", onShow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?.status, trackingCode]);

  useEffect(() => {
    if (order) document.title = `${order.orderNumber} · ${order.venue?.name || order.venueName}`;
  }, [order]);

  if (!trackingCode) return <FindOrder trackPath={trackPath} navigate={navigate} />;

  if (failed) {
    return (
      <div className='slhTrack slhTrack--state'>
        <div className='slhTrack__state'>
          <span className='slhTrack__stateIcon'>
            <PackageSearch size={30} />
          </span>
          <h1>{failed.status === 404 ? "We couldn't find that order" : "Couldn't load your order"}</h1>
          <p>{failed.status === 404 ? `Check the tracking ID "${trackingCode}". It's in the SMS and email we sent.` : failed.message}</p>
          <div className='slhTrack__stateActions'>
            {failed.status !== 404 && (
              <button type='button' className='slhTrack__primary' onClick={() => load()}>
                Try again
              </button>
            )}
            <a className='slhTrack__ghost' href={trackPath}>
              Enter another ID
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!order)
    return (
      <div
        style={{
          display: "flex",
          height: "90dvh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader size={70} />
      </div>
    );

  const money = moneyIn(order.currency);
  const pickup = order.fulfilment === "pickup";
  const venue = order.venue || { name: order.venueName };
  const late = !DONE.includes(order.status) && order.deliverBy && Date.now() > new Date(order.deliverBy).getTime();
  const ready = order.items.filter((i) => i.ready).length;
  const hero = heroFor(order, { pickup, ready, late });
  const steps = stepsFor(order, pickup);
  const link = order.trackingUrl || `${window.location.origin}${trackPath}/${order.trackingCode}`;

  const copy = async (text, what) => {
    if (await copyText(text)) {
      setCopied(what);
      setTimeout(() => setCopied(""), 1800);
    }
  };

  const share = async () => {
    const r = await shareLink({ title: `Order ${order.orderNumber}`, text: `Track my order from ${venue.name}`, url: link });
    if (r === "copied") {
      setCopied("link");
      setTimeout(() => setCopied(""), 1800);
    }
  };

  const payNow = async () => {
    setPaying(true);
    setPayError("");
    try {
      const { authorizationUrl } = await api.payAgain(order.trackingCode);
      window.location.assign(authorizationUrl);
    } catch (e) {
      setPaying(false);
      setPayError(e.message);
    }
  };

  const Hero = hero.icon;

  return (
    <div className='slhTrack'>
      <header className='slhTrack__bar'>
        <div className='slhTrack__barIn'>
          {venue.url ? (
            <a className='slhTrack__venue' href={new URL(venue.url).pathname}>
              {venue.logo ? <img src={venue.logo} alt='' /> : <span>{String(venue.name || "S").slice(0, 1)}</span>}
              <b>{venue.name}</b>
            </a>
          ) : (
            <span className='slhTrack__venue'>
              <b>{venue.name}</b>
            </span>
          )}
          <button type='button' className='slhTrack__refresh' onClick={() => load()} disabled={checking} aria-label='Check again'>
            <RotateCw size={17} className={checking ? "slhTrack__spinning" : ""} />
          </button>
        </div>
      </header>

      <main className='slhTrack__wrap'>
        {/* ─── Where it is ─── */}
        <section className={`slhTrack__hero slhTrack__hero--${hero.tone}`}>
          <span className='slhTrack__heroIcon'>
            <Hero size={30} strokeWidth={2.1} />
          </span>
          <p className='slhTrack__order'>
            Order {order.orderNumber} · {pickup ? "Pickup" : "Delivery"}
          </p>
          <h1>{hero.title}</h1>
          {hero.sub && <p className='slhTrack__heroSub'>{hero.sub}</p>}
          {!DONE.includes(order.status) && order.deliverBy && (
            <p className={`slhTrack__eta${late ? " slhTrack__eta--late" : ""}`}>
              <Clock3 size={16} />
              {late ? "Running a little late. Thanks for your patience." : `${pickup ? "Ready by" : "Arriving by"} ${clockOf(order.deliverBy)}`}
            </p>
          )}

          <ol className='slhTrack__steps'>
            {steps.map((s, i) => (
              <li key={s.label} className={`slhTrack__step slhTrack__step--${s.state}`}>
                <span className='slhTrack__dot'>{s.state === "done" ? <CheckCircle2 size={16} /> : i + 1}</span>
                <span className='slhTrack__stepText'>
                  <b>{s.label}</b>
                  {s.at && <em>{clockOf(s.at)}</em>}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── Rider ─── */}
        {order.rider && (
          <section className='slhTrack__card slhTrack__rider'>
            <span className='slhTrack__riderIcon'>
              <Bike size={20} />
            </span>
            <div>
              <span>Your rider</span>
              <b>{order.rider.name}</b>
            </div>
            {order.rider.phone && (
              <a className='slhTrack__call' href={telLink(order.rider.phone)}>
                <Phone size={16} /> Call
              </a>
            )}
          </section>
        )}

        <div className='slhTrack__grid'>
          {/* ─── Payment ─── */}
          <section className='slhTrack__card'>
            <h2>
              <CreditCard size={16} /> Payment
            </h2>
            <div className='slhTrack__payRow'>
              <span>{paymentLabel(order.payment.method, order.fulfilment).title}</span>
              <PayBadge status={order.payment.status} cancelled={order.status === "cancelled"} />
            </div>

            {order.payment.canPayByCard && (
              <button type='button' className='slhTrack__primary slhTrack__primary--wide' onClick={payNow} disabled={paying}>
                {paying ? "Opening payment…" : `Pay ${money(order.total)} now`}
              </button>
            )}
            {payError && <p className='slhTrack__error'>{payError}</p>}

            {order.payment.transferAccounts?.length > 0 && (
              <div className='slhTrack__transfer'>
                <p>
                  Transfer <b>{money(order.total)}</b> and use <b>{order.orderNumber}</b> as the narration:
                </p>
                {order.payment.transferAccounts.map((a) => (
                  <div key={a.accountNumber} className='slhTrack__account'>
                    <span>
                      {a.bankName}
                      {a.accountName && <em>{a.accountName}</em>}
                    </span>
                    <button type='button' onClick={() => copy(a.accountNumber, a.accountNumber)}>
                      {copied === a.accountNumber ? "Copied" : a.accountNumber} <Copy size={13} />
                    </button>
                  </div>
                ))}
                <p className='slhTrack__muted'>{venue.name} marks it paid when the money arrives.</p>
              </div>
            )}

            {order.status === "cancelled" && order.payment.status === "paid" && (
              <p className='slhTrack__muted'>You paid for this order. The venue will refund you. Call them if you have questions.</p>
            )}
          </section>

          {/* ─── Tracking link ─── */}
          <section className='slhTrack__card'>
            <h2>
              <PackageSearch size={16} /> Tracking ID
            </h2>
            <button type='button' className='slhTrack__code' onClick={() => copy(order.trackingCode, "code")}>
              {order.trackingCode} <Copy size={15} />
              {copied === "code" && <i>Copied</i>}
            </button>
            <div className='slhTrack__linkRow'>
              <button type='button' className='slhTrack__ghost' onClick={() => copy(link, "link")}>
                <Copy size={15} /> {copied === "link" ? "Link copied" : "Copy link"}
              </button>
              <button type='button' className='slhTrack__ghost' onClick={share}>
                <Share2 size={15} /> Share
              </button>
            </div>
          </section>
        </div>

        {/* ─── Items ─── */}
        <section className='slhTrack__card'>
          <h2>
            <ReceiptText size={16} /> Your order
          </h2>
          <ul className='slhTrack__items'>
            {order.items.map((l, i) => (
              <li key={i}>
                <span className='slhTrack__qty'>{l.qty}×</span>
                <span className='slhTrack__itemText'>
                  <b>
                    {l.name}
                    {l.variant && <em> · {l.variant}</em>}
                  </b>
                  {l.modifiers.length > 0 && <small>{l.modifiers.join(", ")}</small>}
                </span>
                {order.status === "preparing" && l.ready && <span className='slhTrack__ready'>Ready</span>}
                <span className='slhTrack__amount'>{money(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className='slhTrack__totals'>
            <div>
              <dt>Subtotal</dt>
              <dd>{money(order.subtotal)}</dd>
            </div>
            {order.vatAmount > 0 && (
              <div>
                <dt>VAT</dt>
                <dd>{money(order.vatAmount)}</dd>
              </div>
            )}
            {!pickup && (
              <div>
                <dt>Delivery</dt>
                <dd>{order.deliveryFee ? money(order.deliveryFee) : "Free"}</dd>
              </div>
            )}
            {order.serviceFee > 0 && (
              <div>
                <dt>Service fee</dt>
                <dd>{money(order.serviceFee)}</dd>
              </div>
            )}
            <div className='slhTrack__total'>
              <dt>Total</dt>
              <dd>{money(order.total)}</dd>
            </div>
          </dl>
        </section>
        {console.log(order.serviceFee)}

        {/* ─── Where and who ─── */}
        <section className='slhTrack__card slhTrack__where'>
          <div>
            <h2>
              <MapPin size={16} /> {pickup ? "Pick up from" : "Delivering to"}
            </h2>
            <p>{pickup ? venue.address || venue.name : order.delivery?.address}</p>
            {!pickup && order.delivery?.landmark && <p className='slhTrack__muted'>Landmark: {order.delivery.landmark}</p>}
            {pickup && mapsLink(venue) && (
              <a className='slhTrack__ghost' href={mapsLink(venue)} target='_blank' rel='noreferrer'>
                <MapPin size={15} /> Directions
              </a>
            )}
          </div>
          {venue.phone && (
            <div>
              <h2>
                <Phone size={16} /> Questions?
              </h2>
              <p>Contact {venue.name}</p>
              <div className='slhTrack__linkRow'>
                <a className='slhTrack__ghost' href={telLink(venue.phone)}>
                  <Phone size={15} /> Call
                </a>
                <a className='slhTrack__ghost' href={whatsappLink(venue.phone)} target='_blank' rel='noreferrer'>
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </div>
          )}
        </section>

        {DONE.includes(order.status) && venue.url && (
          <a className='slhTrack__primary slhTrack__primary--wide slhTrack__again' href={new URL(venue.url).pathname}>
            Order again from {venue.name} <ArrowRight size={18} />
          </a>
        )}

        <p className='slhTrack__placed'>
          Placed {new Date(order.placedAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true })}
        </p>

        <footer className='slhTrack__footer'>
          <img src={storelenseMark} alt='' />
          <span>
            Online ordering by <b>StoreLense</b> Hospitality
          </span>
        </footer>
      </main>
    </div>
  );
}

function PayBadge({ status, cancelled }) {
  const map = {
    paid: ["Paid", "ok"],
    pending: [cancelled ? "Not paid" : "Not paid yet", "wait"],
    failed: ["Payment failed", "bad"],
    refunded: ["Refunded", "info"],
  };
  const [label, tone] = map[status] || [status, "wait"];
  return <span className={`slhTrack__badge slhTrack__badge--${tone}`}>{label}</span>;
}

function heroFor(order, { pickup, ready }) {
  const venue = order.venue?.name || order.venueName || "The venue";
  switch (order.status) {
    case "pending":
      return {
        icon: Clock3,
        tone: "wait",
        title: `Waiting for ${venue} to accept`,
        sub: "This usually takes a few minutes. Keep this page open; it updates by itself.",
      };
    case "preparing":
      return {
        icon: ChefHat,
        tone: "busy",
        title: "Your order is being prepared",
        sub: ready ? `${ready} of ${order.items.length} ${order.items.length === 1 ? "item" : "items"} ready` : `${venue} has started on it.`,
      };
    case "onTheWay":
      return pickup
        ? { icon: ShoppingBag, tone: "go", title: "Ready for pickup", sub: `Come to ${venue} and give your order number ${order.orderNumber}.` }
        : { icon: Bike, tone: "go", title: "On the way to you", sub: order.rider ? `${order.rider.name} is bringing it.` : "Your rider has left." };
    case "delivered":
      return {
        icon: PackageCheck,
        tone: "done",
        title: pickup ? "Collected. Enjoy!" : "Delivered. Enjoy!",
        sub: order.deliveredAt ? `${pickup ? "Collected" : "Delivered"} at ${clockOf(order.deliveredAt)}` : null,
      };
    case "cancelled":
      return {
        icon: XCircle,
        tone: "bad",
        title: "This order was cancelled",
        sub: order.cancelReason ? `Reason: ${order.cancelReason}` : `Contact ${venue} for details.`,
      };
    default:
      return { icon: Clock3, tone: "wait", title: "Order received", sub: null };
  }
}

function stepsFor(order, pickup) {
  const order4 = ["pending", "preparing", "onTheWay", "delivered"];
  const at = order4.indexOf(order.status);
  const list = [
    { label: "Order placed", at: order.placedAt },
    { label: "Preparing", at: order.acceptedAt },
    { label: pickup ? "Ready for pickup" : "On the way", at: order.dispatchedAt },
    { label: pickup ? "Collected" : "Delivered", at: order.deliveredAt },
  ];
  if (order.status === "cancelled") {
    return [...list.slice(0, 1).map((s) => ({ ...s, state: "done" })), { label: "Cancelled", at: order.cancelledAt, state: "bad" }];
  }
  return list.map((s, i) => ({ ...s, state: i < at || order.status === "delivered" ? "done" : i === at ? "now" : "next" }));
}

/* ─── /track without a code ─── */
function FindOrder({ trackPath, navigate }) {
  const [code, setCode] = useState("");
  const recent = store.get(ORDERS_KEY, []);
  const clean = code.toUpperCase().replace(/[^0-9A-Z]/g, "");

  const go = (e) => {
    e.preventDefault();
    if (clean.length === 8) navigate(`${trackPath}/${clean.slice(0, 4)}-${clean.slice(4)}`);
  };

  return (
    <div className='slhTrack slhTrack--state'>
      <form className='slhTrack__find' onSubmit={go}>
        <span className='slhTrack__stateIcon'>
          <PackageSearch size={30} />
        </span>
        <h1>Track your order</h1>
        <p>Enter the tracking ID from your SMS or email.</p>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder='e.g. K7QM-4XPR'
          maxLength={12}
          autoCapitalize='characters'
          autoFocus
          aria-label='Tracking ID'
        />
        <button type='submit' className='slhTrack__primary slhTrack__primary--wide' disabled={clean.length !== 8}>
          Track order <ArrowRight size={18} />
        </button>
        {recent.length > 0 && (
          <div className='slhTrack__recent'>
            <span>On this device</span>
            {recent.map((o) => (
              <a key={o.trackingCode} href={`${trackPath}/${o.trackingCode}`}>
                <b>{o.orderNumber || o.trackingCode}</b>
                <em>{o.venueName}</em>
                <ArrowRight size={15} />
              </a>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
