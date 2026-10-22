import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Banknote,
  Bike,
  Building2,
  CheckCircle2,
  Copy,
  CreditCard,
  ExternalLink,
  LocateFixed,
  Mail,
  MapPin,
  MessageSquare,
  Share2,
  ShoppingBag,
  Smartphone,
  User,
} from "lucide-react";
import StorefrontSheet from "./StorefrontSheet";
import { CUSTOMER_KEY, copyText, newOrderId, paymentLabel, previewTotals, range, rememberOrder, shareLink, store, unitPriceOf } from "./storefrontTools";
import "./storefrontCheckout.css";

/*
  Checkout: delivery or pickup, where to, who to call, how to pay, the
  total, and Place order. The server prices the order; the totals here
  are a preview.

  After the order is placed the same panel shows the confirmation: the
  order number, the tracking ID and link (also sent by SMS and email),
  and the next step for the payment chosen:
    card      → "Pay ₦X now" opens Paystack, which brings them back to tracking
    transfer  → the venue's account, the amount and the narration
    on delivery / pickup → nothing to do now
*/

const PHONE = /^\+?[0-9][0-9 ()-]{6,19}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PAY_ICONS = { card: CreditCard, transfer: Building2, cashOnDelivery: Banknote, posOnDelivery: Smartphone };

export default function StorefrontCheckout({ venue, venueType, lines, menuById, paymentOptions, money, api, trackPath = "/track", onPlaced, onClose }) {
  const saved = useMemo(() => store.get(CUSTOMER_KEY, {}), []);
  const [fulfilment, setFulfilment] = useState(venue.fulfilment.includes(saved.fulfilment) ? saved.fulfilment : venue.fulfilment[0]);
  const [form, setForm] = useState({
    name: saved.name || "",
    phone: saved.phone || "",
    email: saved.email || "",
    address: saved.address || "",
    landmark: saved.landmark || "",
    instructions: "",
    note: "",
  });
  const [location, setLocation] = useState(null);
  const [locating, setLocating] = useState(false);
  const [method, setMethod] = useState(paymentOptions[0]?.id || null);
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(null);

  /* One id for this checkout: a retry after a dropped connection returns
     the same order instead of placing a second one */
  const clientOrderID = useRef(newOrderId());

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const totals = previewTotals(lines, menuById, {
    vatRate: venue.vatRate,
    deliveryFee: fulfilment === "delivery" ? venue.deliveryFee : 0,
    serviceFee: venue.serviceFee || 0,
  });
  const belowMinimum = venue.minimumOrder > 0 && totals.subtotal < venue.minimumOrder;

  const errors = {
    name: !form.name.trim() ? "Add your name" : "",
    phone: !PHONE.test(form.phone.trim()) ? "Add a phone number we can call, e.g. 0803 123 4567" : "",
    email:
      form.email.trim() && !EMAIL.test(form.email.trim())
        ? "Check the email address"
        : method === "card" && !form.email.trim()
          ? "Add your email to pay by card"
          : "",
    address: fulfilment === "delivery" && !form.address.trim() ? "Add the delivery address" : "",
    method: !method ? "Choose how you'll pay" : "",
  };
  const invalid = Object.values(errors).some(Boolean);

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setLocation({ lat: Math.round(p.coords.latitude * 1e6) / 1e6, lng: Math.round(p.coords.longitude * 1e6) / 1e6 });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const place = async () => {
    setTouched(true);
    setError("");
    if (invalid || belowMinimum || busy) return;
    setBusy(true);

    const body = {
      clientOrderID: clientOrderID.current,
      customer: { name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() || undefined },
      fulfilment,
      delivery:
        fulfilment === "delivery"
          ? {
              address: form.address.trim(),
              landmark: form.landmark.trim() || undefined,
              instructions: form.instructions.trim() || undefined,
              location: location || undefined,
            }
          : undefined,
      items: lines.map((l) => ({ menuItem: l.itemId, qty: l.qty, variant: l.variant || undefined, modifiers: l.modifiers, note: l.note || undefined })),
      note: form.note.trim() || undefined,
      payment: { method },
      source: "web",
    };

    try {
      const result = await api.placeOrder(venueType, venue._id, body);
      store.set(CUSTOMER_KEY, {
        name: body.customer.name,
        phone: body.customer.phone,
        email: form.email.trim(),
        address: form.address.trim(),
        landmark: form.landmark.trim(),
        fulfilment,
      });
      rememberOrder({ trackingCode: result.trackingCode, orderNumber: result.order?.orderNumber, venueId: String(venue._id), venueName: venue.name });
      setPlaced(result);
      onPlaced?.(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  if (placed) {
    return (
      <Confirmation
        result={placed}
        venue={venue}
        fulfilment={fulfilment}
        email={form.email.trim()}
        phone={form.phone.trim()}
        transfer={paymentOptions.find((o) => o.id === "transfer")}
        money={money}
        trackPath={trackPath}
        onClose={onClose}
      />
    );
  }

  const show = (key) => touched && errors[key];

  const footer = (
    <div className='slhShopCo__foot'>
      {error && (
        <p className='slhShopCo__error' role='alert'>
          {error}
        </p>
      )}
      {belowMinimum && (
        <p className='slhShopCo__error'>
          Add {money(venue.minimumOrder - totals.subtotal)} more. The smallest order is {money(venue.minimumOrder)}.
        </p>
      )}
      <button type='button' className='slhShopCo__place' onClick={place} disabled={busy || !venue.ordering.ok || belowMinimum}>
        {busy ? (
          <span className='slhShopCo__spin' aria-label='Placing your order' />
        ) : (
          <>
            {method === "card" ? `Place order & pay ${money(totals.total)}` : `Place order · ${money(totals.total)}`}
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>
  );

  return (
    <StorefrontSheet title='Checkout' subtitle={venue.name} size='lg' onClose={onClose} footer={footer}>
      <div className='slhShopCo'>
        {/* ─── Delivery or pickup ─── */}
        {venue.fulfilment.length > 1 && (
          <div className='slhShopCo__switch' role='tablist' aria-label='Delivery or pickup'>
            {venue.fulfilment.map((f) => (
              <button
                key={f}
                type='button'
                role='tab'
                aria-selected={fulfilment === f}
                className={fulfilment === f ? "slhShopCo__switchOn" : ""}
                onClick={() => setFulfilment(f)}
              >
                {f === "delivery" ? <Bike size={17} /> : <ShoppingBag size={17} />}
                <span>
                  <b>{f === "delivery" ? "Delivery" : "Pickup"}</b>
                  <em>{f === "delivery" ? range(venue.deliveryMinutes) : range(venue.pickupMinutes)}</em>
                </span>
              </button>
            ))}
          </div>
        )}

        {fulfilment === "delivery" ? (
          <section className='slhShopCo__section'>
            <h3>
              <MapPin size={16} /> Delivery address
            </h3>
            <Field label='Address' error={show("address")}>
              <textarea
                rows={2}
                value={form.address}
                onChange={set("address")}
                placeholder='House number, street, area'
                autoComplete='street-address'
                maxLength={300}
              />
            </Field>
            <div className='slhShopCo__row'>
              <Field label='Nearest landmark' optional>
                <input value={form.landmark} onChange={set("landmark")} placeholder='e.g. opposite Shoprite' maxLength={160} />
              </Field>
              <Field label='For the rider' optional>
                <input value={form.instructions} onChange={set("instructions")} placeholder='e.g. call at the gate' maxLength={300} />
              </Field>
            </div>
            <button type='button' className={`slhShopCo__locate${location ? " slhShopCo__locate--on" : ""}`} onClick={useMyLocation} disabled={locating}>
              <LocateFixed size={16} />
              {location ? "Location pinned for the rider" : locating ? "Finding you…" : "Pin my current location (helps the rider)"}
            </button>
          </section>
        ) : (
          <section className='slhShopCo__section'>
            <h3>
              <ShoppingBag size={16} /> Pick up from
            </h3>
            <p className='slhShopCo__pickup'>
              <b>{venue.name}</b>
              {venue.address && <span>{venue.address}</span>}
              <em>Ready in about {range(venue.pickupMinutes)}. We'll text you when it is.</em>
            </p>
          </section>
        )}

        {/* ─── Contact ─── */}
        <section className='slhShopCo__section'>
          <h3>
            <User size={16} /> Your details
          </h3>
          <div className='slhShopCo__row'>
            <Field label='Name' error={show("name")}>
              <input value={form.name} onChange={set("name")} placeholder='Your name' autoComplete='name' maxLength={80} />
            </Field>
            <Field label='Phone number' error={show("phone")}>
              <input type='tel' inputMode='tel' value={form.phone} onChange={set("phone")} placeholder='0803 123 4567' autoComplete='tel' maxLength={24} />
            </Field>
          </div>
          <Field label='Email' optional={method !== "card"} error={show("email")} hint='Your tracking link and receipt go here and to your phone.'>
            <input
              type='email'
              value={form.email}
              onChange={set("email")}
              placeholder='you@example.com'
              autoComplete='email'
              autoCapitalize='none'
              maxLength={120}
            />
          </Field>
          <Field label='Note for the venue' optional>
            <input value={form.note} onChange={set("note")} placeholder='Anything else we should know?' maxLength={500} />
          </Field>
        </section>

        {/* ─── Payment ─── */}
        <section className='slhShopCo__section'>
          <h3>
            <CreditCard size={16} /> How you'll pay
          </h3>
          {paymentOptions.length ? (
            <div className='slhShopCo__pay' role='radiogroup' aria-label='Payment'>
              {paymentOptions.map((o) => {
                const Icon = PAY_ICONS[o.id] || CreditCard;
                const label = paymentLabel(o.id, fulfilment);
                const on = method === o.id;
                return (
                  <button
                    key={o.id}
                    type='button'
                    role='radio'
                    aria-checked={on}
                    className={`slhShopCo__payOpt${on ? " slhShopCo__payOpt--on" : ""}`}
                    onClick={() => setMethod(o.id)}
                  >
                    <span className='slhShopCo__payIcon'>
                      <Icon size={18} />
                    </span>
                    <span className='slhShopCo__payText'>
                      <b>{label.title}</b>
                      <em>{label.sub}</em>
                    </span>
                    <span className='slhShopCo__radio' />
                  </button>
                );
              })}
            </div>
          ) : (
            <p className='slhShopCo__error'>This venue hasn't set up online payment yet. Call them to order.</p>
          )}
          {show("method") && <p className='slhShopCo__fieldError'>{errors.method}</p>}
        </section>

        {/* ─── Summary ─── */}
        <section className='slhShopCo__section slhShopCo__summary'>
          <h3>Your order</h3>
          <ul>
            {lines.map((l) => {
              const item = menuById.get(String(l.itemId));
              if (!item) return null;
              return (
                <li key={l.key}>
                  <span className='slhShopCo__qty'>{l.qty}×</span>
                  <span className='slhShopCo__line'>
                    {item.name}
                    {l.variant && <em> ({l.variant})</em>}
                    {l.modifiers.length > 0 && <small>{l.modifiers.join(", ")}</small>}
                  </span>
                  <span>{money(unitPriceOf(item, l.variant, l.modifiers) * l.qty)}</span>
                </li>
              );
            })}
          </ul>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{money(totals.subtotal)}</dd>
            </div>
            {totals.vat > 0 && (
              <div>
                <dt>VAT ({venue.vatRate}%)</dt>
                <dd>{money(totals.vat)}</dd>
              </div>
            )}
            {fulfilment === "delivery" && (
              <div>
                <dt>Delivery</dt>
                <dd>{venue.deliveryFee ? money(venue.deliveryFee) : "Free"}</dd>
              </div>
            )}
            <div>
              <dt>Service fee</dt>
              <dd>{money(totals.serviceFee)}</dd>
            </div>
            <div className='slhShopCo__total'>
              <dt>Total</dt>
              <dd>{money(totals.total)}</dd>
            </div>
          </dl>
        </section>
      </div>
    </StorefrontSheet>
  );
}

function Field({ label, optional, error, hint, children }) {
  return (
    <label className={`slhShopCo__field${error ? " slhShopCo__field--bad" : ""}`}>
      <span className='slhShopCo__label'>
        {label}
        {optional && <i>Optional</i>}
      </span>
      {children}
      {error ? <em className='slhShopCo__fieldError'>{error}</em> : hint ? <em className='slhShopCo__hint'>{hint}</em> : null}
    </label>
  );
}

/* ─── After Place order ─── */

function Confirmation({ result, venue, fulfilment, email, phone, transfer, money, trackPath, onClose }) {
  const { order, trackingCode, trackingUrl, payment } = result;
  const [copied, setCopied] = useState("");
  const local = `${trackPath}/${trackingCode}`;
  const link = trackingUrl || (typeof window !== "undefined" ? `${window.location.origin}${local}` : local);
  const method = order?.payment?.method;
  const paid = order?.payment?.status === "paid";
  const accounts = order?.payment?.transferAccounts?.length ? order.payment.transferAccounts : transfer?.accounts || [];

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

  const footer =
    method === "card" && !paid && payment?.authorizationUrl ? (
      <button type='button' className='slhShopCo__place' onClick={() => window.location.assign(payment.authorizationUrl)}>
        <CreditCard size={18} /> Pay {money(order.total)} now
      </button>
    ) : (
      <a className='slhShopCo__place' href={local}>
        Track my order <ArrowRight size={18} />
      </a>
    );

  return (
    <StorefrontSheet title='Order placed' subtitle={venue.name} size='md' onClose={onClose} footer={footer}>
      <div className='slhShopCo slhShopCo--done'>
        <div className='slhShopCo__doneHead'>
          <span className='slhShopCo__doneIcon'>
            <CheckCircle2 size={34} strokeWidth={2.2} />
          </span>
          <h3>Thank you{order?.customerName ? `, ${order.customerName}` : ""}!</h3>
          <p>
            {venue.name} has your order <b>{order?.orderNumber}</b>.{" "}
            {fulfilment === "delivery"
              ? `It should reach you in about ${range(venue.deliveryMinutes)}.`
              : `It'll be ready in about ${range(venue.pickupMinutes)}.`}
          </p>
        </div>

        <div className='slhShopCo__track'>
          <div className='slhShopCo__trackTop'>
            <span>Tracking ID</span>
            <button type='button' onClick={() => copy(trackingCode, "code")}>
              <b>{trackingCode}</b>
              <Copy size={14} />
              {copied === "code" && <i>Copied</i>}
            </button>
          </div>
          <div className='slhShopCo__trackLink'>
            <span title={link}>{link.replace(/^https?:\/\//, "")}</span>
            <button type='button' onClick={() => copy(link, "link")} aria-label='Copy tracking link'>
              {copied === "link" ? "Copied" : <Copy size={15} />}
            </button>
            <button type='button' onClick={share} aria-label='Share tracking link'>
              <Share2 size={15} />
            </button>
            <a href={local} aria-label='Open tracking page'>
              <ExternalLink size={15} />
            </a>
          </div>
          <p className='slhShopCo__sent'>
            <MessageSquare size={14} /> Sent by SMS to {phone}
            {email && (
              <>
                <br />
                <Mail size={14} /> and by email to {email}
              </>
            )}
          </p>
        </div>

        {/* What to do about payment */}
        {method === "card" && !paid && (
          <div className={`slhShopCo__payNext${payment?.error ? " slhShopCo__payNext--warn" : ""}`}>
            <b>{payment?.error ? "Payment didn't open" : "One more step: pay by card"}</b>
            <span>{payment?.error || `Tap Pay ${money(order.total)} now. You'll come back to your tracking page when it's done.`}</span>
          </div>
        )}

        {method === "transfer" && !paid && (
          <div className='slhShopCo__payNext slhShopCo__payNext--transfer'>
            <b>Transfer {money(order.total)} to</b>
            {accounts.map((a) => (
              <div key={a.accountNumber} className='slhShopCo__account'>
                <span>
                  {a.bankName}
                  {a.accountName && <em>{a.accountName}</em>}
                </span>
                <button type='button' onClick={() => copy(a.accountNumber, a.accountNumber)}>
                  {a.accountNumber} <Copy size={14} />
                  {copied === a.accountNumber && <i>Copied</i>}
                </button>
              </div>
            ))}
            <span>
              Use <b>{order.orderNumber}</b> as the narration. The venue confirms it when the money arrives.
            </span>
          </div>
        )}

        {(method === "cashOnDelivery" || method === "posOnDelivery") && (
          <div className='slhShopCo__payNext slhShopCo__payNext--calm'>
            <b>{paymentLabel(method, fulfilment).title}</b>
            <span>
              Have {money(order.total)} ready{method === "posOnDelivery" ? " on your card" : ""}.
            </span>
          </div>
        )}

        <dl className='slhShopCo__doneTotal'>
          <div>
            <dt>{order?.items?.reduce((n, l) => n + l.qty, 0)} items</dt>
            <dd>{money(order?.subtotal)}</dd>
          </div>
          {order?.vatAmount > 0 && (
            <div>
              <dt>VAT</dt>
              <dd>{money(order.vatAmount)}</dd>
            </div>
          )}
          {fulfilment === "delivery" && (
            <div>
              <dt>Delivery</dt>
              <dd>{order?.deliveryFee ? money(order.deliveryFee) : "Free"}</dd>
            </div>
          )}
          {order?.serviceFee > 0 && (
            <div>
              <dt>Service fee</dt>
              <dd>{money(order.serviceFee)}</dd>
            </div>
          )}
          <div className='slhShopCo__total'>
            <dt>Total</dt>
            <dd>{money(order?.total)}</dd>
          </div>
        </dl>
      </div>
    </StorefrontSheet>
  );
}
