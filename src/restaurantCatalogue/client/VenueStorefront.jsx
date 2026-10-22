import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BadgeCheck,
  Bike,
  ChevronDown,
  ChevronRight,
  Clock3,
  Flame,
  Images,
  Info,
  MapPin,
  MessageCircle,
  Minus,
  Navigation,
  PackageSearch,
  Phone,
  Play,
  Plus,
  Search,
  ShoppingBag,
  Store,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import Loader from "../../storecatelogue/storelensSpiner/StorelenseSpinner"; // TODO: match your path
import storelenseMark from "../../assessStatic/pictures/storelenseMark.webp"; // TODO: same image as SignIn.jsx
import StorefrontItemSheet from "./StorefrontItemSheet";
import StorefrontCheckout from "./StorefrontCheckout";
import StorefrontSheet from "./StorefrontSheet";
import StorefrontMediaViewer from "./StorefrontMediaViewer";
import { storefrontApi } from "./storefrontApi";
import {
  DAYS,
  ORDERS_KEY,
  cartKey,
  lineKey,
  mapsLink,
  mediaOf,
  moneyIn,
  niceTime,
  previewTotals,
  range,
  store,
  telLink,
  todayId,
  unitPriceOf,
  whatsappLink,
} from "./storefrontTools";
import "./venueStorefront.css";

/*
|--------------------------------------------------------------------------
| ONLINE ORDER PAGE — storelense.com/<venueType>/<venueId>
|--------------------------------------------------------------------------
|   <Route path='/restaurant/:venueId' element={<VenueStorefront venueType='restaurant' />} />
|   <Route path='/bar/:venueId'        element={<VenueStorefront venueType='bar' />} />
|   <Route path='/cafe/:venueId'       element={<VenueStorefront venueType='cafe' />} />
|   (or one route: '/:venueType/:venueId' — see SETUP.md)
|
| Public: no sign-in. Shows the venue (opening hours, delivery time,
| location, contact) and the items it sells online. Customers pick sizes
| and extras, fill in delivery and contact, choose how to pay and place
| the order. They get a tracking ID and link, also sent by SMS and email.
|
| The cart is kept on this device per venue, so a refresh doesn't lose it.
| Money uses the venue owner's currency (sent by the server).
*/

const POPULAR = "Popular";

export default function VenueStorefront({ venueType: typeProp, venueId: idProp, api = storefrontApi, trackPath = "/track" }) {
  const params = useParams();
  const venueType = String(typeProp || params.venueType || "").toLowerCase();
  const venueId = idProp || params.venueId || params.venueID;

  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(null);
  const [reload, setReload] = useState(0);

  const [lines, setLines] = useState([]);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(null); // the item in the sheet
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [weekOpen, setWeekOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false); // phones: hours, delivery and location
  const [viewer, setViewer] = useState(null); // { item, index }: photos and videos full screen
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const sectionRefs = useRef({});
  const chipsRef = useRef(null);

  /* ─── Load ─── */
  useEffect(() => {
    if (!venueType || !venueId) return undefined;
    let live = true;
    setFailed(null);
    api
      .load(venueType, venueId)
      .then((res) => {
        if (!live) return;
        setData(res);
        document.title = `${res.venue.name} · Order online`;
      })
      .catch((e) => live && setFailed(e));
    return () => {
      live = false;
    };
  }, [api, venueType, venueId, reload]);

  const venue = data?.venue;
  const menu = data?.menu || [];
  const money = useMemo(() => moneyIn(venue?.currency || "₦"), [venue?.currency]);
  const menuById = useMemo(() => new Map(menu.map((i) => [String(i._id), i])), [menu]);
  const canOrder = Boolean(venue?.ordering?.ok);

  /* ─── The cart, kept on this device; lines the menu can't sell any more drop off ─── */
  useEffect(() => {
    if (!data) return;
    const saved = store.get(cartKey(venueId), []);
    const valid = (Array.isArray(saved) ? saved : []).filter((l) => {
      const item = menuById.get(String(l.itemId));
      if (!item || !item.available) return false;
      if (l.variant && !item.variants.some((v) => v.name === l.variant)) return false;
      if (!l.variant && item.variants.length) return false;
      return l.modifiers.every((m) => item.modifiers.some((x) => x.name === m));
    });
    setLines(valid);
  }, [data, menuById, venueId]);

  const saveLines = useCallback(
    (next) => {
      setLines(next);
      if (next.length) store.set(cartKey(venueId), next);
      else store.remove(cartKey(venueId));
    },
    [venueId],
  );

  const flash = (text) => {
    setToast(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2000);
  };

  const qtyOf = (itemId) => lines.reduce((n, l) => (String(l.itemId) === String(itemId) ? n + l.qty : n), 0);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const totals = previewTotals(lines, menuById, { vatRate: venue?.vatRate || 0, deliveryFee: 0, serviceFee: venue?.serviceFee || 0 });

  const addLine = ({ itemId, variant, modifiers, note, qty }) => {
    const item = menuById.get(String(itemId));
    const key = lineKey(itemId, variant, modifiers, note);
    const room = Math.max(0, (item?.maxQty ?? 50) - qtyOf(itemId));
    const add = Math.min(qty, room);
    if (!add) {
      flash(`No more ${item?.name || "of this"} left`);
      return;
    }
    const found = lines.find((l) => l.key === key);
    saveLines(found ? lines.map((l) => (l === found ? { ...l, qty: l.qty + add } : l)) : [...lines, { key, itemId, variant, modifiers, note, qty: add }]);
    flash(`${add} × ${item?.name || "item"} added`);
  };

  const changeQty = (line, delta) => {
    const item = menuById.get(String(line.itemId));
    if (delta > 0 && qtyOf(line.itemId) >= (item?.maxQty ?? 50)) {
      flash(`No more ${item?.name} left`);
      return;
    }
    const qty = line.qty + delta;
    saveLines(qty <= 0 ? lines.filter((l) => l !== line) : lines.map((l) => (l === line ? { ...l, qty } : l)));
  };

  /* Tap +: straight in when there's nothing to choose, else open the item */
  const quickAdd = (item) => {
    if (!item.available || !canOrder) return setOpen(item);
    if (item.variants.length || item.modifiers.some((m) => !m.isRequired)) return setOpen(item);
    addLine({ itemId: item._id, variant: null, modifiers: item.modifiers.filter((m) => m.isRequired).map((m) => m.name), note: "", qty: 1 });
  };

  /* ─── Menu, by category ─── */
  const term = query.trim().toLowerCase();
  const shown = useMemo(() => (term ? menu.filter((i) => `${i.name} ${i.description || ""} ${i.category}`.toLowerCase().includes(term)) : menu), [menu, term]);
  const sections = useMemo(() => {
    const list = [];
    const popular = shown.filter((i) => i.popular && i.available);
    if (popular.length && !term) list.push({ id: POPULAR, items: popular });
    (data?.categories || []).forEach((c) => {
      const items = shown.filter((i) => i.category === c);
      if (items.length) list.push({ id: c, items });
    });
    return list;
  }, [shown, data, term]);

  /* Highlight the category being read */
  useEffect(() => {
    if (!sections.length || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.dataset.section);
      },
      { rootMargin: "-140px 0px -60% 0px" },
    );
    sections.forEach((s) => sectionRefs.current[s.id] && io.observe(sectionRefs.current[s.id]));
    return () => io.disconnect();
  }, [sections]);

  /* Keep the active chip in view */
  useEffect(() => {
    const chip = chipsRef.current?.querySelector(`[data-chip="${CSS.escape(active || "")}"]`);
    chip?.scrollIntoView?.({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  const jumpTo = (id) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 128, behavior: "smooth" });
    setActive(id);
  };

  const recent = useMemo(() => store.get(ORDERS_KEY, []).find((o) => o.venueId === String(venueId) && Date.now() - o.at < 2 * 86400000), [venueId, checkout]);

  /* ─── States ─── */
  if (failed) {
    const missing = failed.status === 404;
    return (
      <div className='slhShop slhShop--state'>
        <div className='slhShop__state'>
          <span className='slhShop__stateIcon'>{missing ? <PackageSearch size={30} /> : <Store size={30} />}</span>
          <h1>{missing ? "We couldn't find this venue" : "Couldn't load the menu"}</h1>
          <p>{missing ? "The link may be wrong, or the venue has closed." : failed.message}</p>
          {!missing && (
            <button type='button' className='slhShop__primary' onClick={() => setReload((n) => n + 1)}>
              Try again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!data)
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

  const today = venue.openingHours.find((h) => h.day === todayId());
  const directions = mapsLink(venue);
  const offersDelivery = venue.fulfilment.includes("delivery");
  const offersPickup = venue.fulfilment.includes("pickup");

  /* The three cards: inline on laptops and tablets, in a slide-up panel on phones */
  const infoCards = (
    <>
      <div className='slhShop__card'>
        <h2>
          <Clock3 size={17} /> Opening hours
        </h2>
        {venue.openingHours.length ? (
          <>
            <p className='slhShop__big'>{today?.closed ? "Closed today" : `Today ${niceTime(today?.open)} – ${niceTime(today?.close)}`}</p>
            <button type='button' className='slhShop__link' onClick={() => setWeekOpen((v) => !v)} aria-expanded={weekOpen}>
              {weekOpen ? "Hide the week" : "See the week"} <ChevronDown size={15} className={weekOpen ? "slhShop__flip" : ""} />
            </button>
            {weekOpen && (
              <ul className='slhShop__week'>
                {DAYS.map((d) => {
                  const h = venue.openingHours.find((x) => x.day === d.id);
                  return (
                    <li key={d.id} className={d.id === todayId() ? "slhShop__weekToday" : ""}>
                      <span>{d.label}</span>
                      <b>{h?.closed ? "Closed" : `${niceTime(h?.open)} – ${niceTime(h?.close)}`}</b>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : (
          <p className='slhShop__big'>Open daily</p>
        )}
      </div>

      <div className='slhShop__card'>
        <h2>
          <Bike size={17} /> Delivery
        </h2>
        <dl className='slhShop__facts'>
          {offersDelivery && (
            <>
              <div>
                <dt>Delivery time</dt>
                <dd>{range(venue.deliveryMinutes)}</dd>
              </div>
              <div>
                <dt>Delivery fee</dt>
                <dd>{venue.deliveryFee ? money(venue.deliveryFee) : "Free"}</dd>
              </div>
            </>
          )}
          {offersPickup && (
            <div>
              <dt>Pickup</dt>
              <dd>Ready in {range(venue.pickupMinutes)}</dd>
            </div>
          )}
          {venue.minimumOrder > 0 && (
            <div>
              <dt>Smallest order</dt>
              <dd>{money(venue.minimumOrder)}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className='slhShop__card'>
        <h2>
          <MapPin size={17} /> Location & contact
        </h2>
        <p className='slhShop__addr'>{venue.address || "Address not added yet"}</p>
        <div className='slhShop__actions'>
          {directions && (
            <a className='slhShop__ghost' href={directions} target='_blank' rel='noreferrer'>
              <Navigation size={15} /> Directions
            </a>
          )}
          {venue.phone && (
            <a className='slhShop__ghost' href={telLink(venue.phone)}>
              <Phone size={15} /> Call
            </a>
          )}
          {venue.phone && (
            <a className='slhShop__ghost' href={whatsappLink(venue.phone)} target='_blank' rel='noreferrer'>
              <MessageCircle size={15} /> WhatsApp
            </a>
          )}
        </div>
        {venue.phone && <p className='slhShop__phone'>{venue.phone}</p>}
      </div>
    </>
  );

  const cartBody = (
    <CartContents lines={lines} menuById={menuById} money={money} totals={totals} venue={venue} onQty={changeQty} onClear={() => saveLines([])} />
  );

  const checkoutButton = (
    <button
      type='button'
      className='slhShop__primary slhShop__primary--wide'
      disabled={!count || !canOrder}
      onClick={() => {
        setCartOpen(false);
        setCheckout(true);
      }}
    >
      {canOrder ? `Checkout · ${money(totals.total)}` : "Ordering is closed"}
    </button>
  );

  return (
    <div className='slhShop'>
      {/* ─── Top bar ─── */}
      <header className='slhShop__bar'>
        <div className='slhShop__barIn'>
          <span className='slhShop__barVenue'>
            {venue.logo ? <img src={venue.logo} alt='' /> : <span className='slhShop__barLogo'>{venue.name.slice(0, 1)}</span>}
            <b>{venue.name}</b>
          </span>
          <a className='slhShop__barTrack' href={recent ? `${trackPath}/${recent.trackingCode}` : trackPath}>
            <PackageSearch size={16} />
            <span>{recent ? `Track ${recent.orderNumber || "order"}` : "Track an order"}</span>
          </a>
          <button type='button' className='slhShop__barCart' onClick={() => setCartOpen(true)} aria-label={`Your order, ${count} items`}>
            <ShoppingBag size={18} />
            {count > 0 && <span>{count}</span>}
          </button>
        </div>
      </header>

      {/* ─── The venue ─── */}
      <section className={`slhShop__hero${venue.cover ? "" : " slhShop__hero--plain"}`}>
        {venue.cover && <img className='slhShop__cover' src={venue.cover} alt='' />}
        <div className='slhShop__heroShade' />
        <div className='slhShop__heroIn'>
          <span className='slhShop__logo'>{venue.logo ? <img src={venue.logo} alt='' /> : <UtensilsCrossed size={30} />}</span>
          <div className='slhShop__who'>
            <h1>
              {venue.name}
              {venue.verified && <BadgeCheck size={22} className='slhShop__verified' aria-label='Verified venue' />}
            </h1>
            <p className='slhShop__meta'>
              <span>{venue.category || venue.venueType}</span>
              {venue.address && (
                <>
                  <i />
                  <span>{venue.address}</span>
                </>
              )}
            </p>
            {venue.description && <p className='slhShop__desc'>{venue.description}</p>}
            <div className='slhShop__chips'>
              <span className={`slhShop__open slhShop__open--${venue.hours.openNow ? "yes" : "no"}`}>
                <span />
                {venue.hours.openNow
                  ? venue.hours.closesAt
                    ? `Open · closes ${niceTime(venue.hours.closesAt)}`
                    : "Open now"
                  : venue.hours.opensAt
                    ? `Closed · opens ${venue.hours.opensAt.label} ${niceTime(venue.hours.opensAt.time)}`
                    : "Closed"}
              </span>
              {offersDelivery && (
                <span className='slhShop__chip'>
                  <Bike size={15} /> {range(venue.deliveryMinutes)}
                </span>
              )}
              {offersPickup && (
                <span className='slhShop__chip'>
                  <ShoppingBag size={15} /> Pickup {range(venue.pickupMinutes)}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className='slhShop__wrap'>
        {/* ─── Hours, delivery, location and contact. On phones: one button that slides them up ─── */}
        <section className='slhShop__info'>{infoCards}</section>
        <button type='button' className='slhShop__infoBtn' onClick={() => setInfoOpen(true)}>
          <span className='slhShop__infoBtnIcon'>
            <Info size={18} />
          </span>
          <span className='slhShop__infoBtnText'>
            <b>Hours, delivery & location</b>
            <em>
              {venue.openingHours.length ? (today?.closed ? "Closed today" : `Today ${niceTime(today?.open)} – ${niceTime(today?.close)}`) : "Open daily"}
              {offersDelivery ? ` · ${venue.deliveryFee ? money(venue.deliveryFee) : "Free"} delivery` : " · Pickup only"}
            </em>
          </span>
          <ChevronRight size={18} />
        </button>

        {!canOrder && (
          <p className='slhShop__closed' role='status'>
            <Clock3 size={18} /> {venue.ordering.reason} You can still look at the menu.
          </p>
        )}

        {recent && (
          <a className='slhShop__recent' href={`${trackPath}/${recent.trackingCode}`}>
            <PackageSearch size={18} />
            <span>
              Your order <b>{recent.orderNumber}</b> · tracking ID {recent.trackingCode}
            </span>
            <em>Track it</em>
          </a>
        )}

        {/* ─── Search and categories ─── */}
        <div className='slhShop__tools'>
          <label className='slhShop__search'>
            <Search size={17} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${venue.name}'s menu`} aria-label='Search the menu' />
            {query && (
              <button type='button' onClick={() => setQuery("")} aria-label='Clear search'>
                <X size={15} />
              </button>
            )}
          </label>
          <nav className='slhShop__cats' ref={chipsRef} aria-label='Menu categories'>
            {sections.map((s) => (
              <button key={s.id} type='button' data-chip={s.id} className={active === s.id ? "slhShop__catOn" : ""} onClick={() => jumpTo(s.id)}>
                {s.id === POPULAR && <Flame size={14} />}
                {s.id}
              </button>
            ))}
          </nav>
        </div>

        <div className='slhShop__layout'>
          {/* ─── The menu ─── */}
          <main className='slhShop__menu'>
            {!menu.length ? (
              <div className='slhShop__empty'>
                <UtensilsCrossed size={28} />
                <b>No dishes online yet</b>
                <span>{venue.phone ? `Call ${venue.phone} to order.` : "Check back soon."}</span>
              </div>
            ) : !sections.length ? (
              <div className='slhShop__empty'>
                <Search size={26} />
                <b>Nothing matches “{query}”</b>
                <button type='button' className='slhShop__link' onClick={() => setQuery("")}>
                  Clear search
                </button>
              </div>
            ) : (
              sections.map((s) => (
                <section key={s.id} className='slhShop__section' data-section={s.id} ref={(el) => (sectionRefs.current[s.id] = el)}>
                  <h2>
                    {s.id === POPULAR && <Flame size={19} />}
                    {s.id}
                    <span>{s.items.length}</span>
                  </h2>
                  <div className='slhShop__grid'>
                    {s.items.map((item) => (
                      <MenuCard
                        key={`${s.id}-${item._id}`}
                        item={item}
                        money={money}
                        qty={qtyOf(item._id)}
                        canOrder={canOrder}
                        onOpen={() => setOpen(item)}
                        onView={() => setViewer({ item, index: 0 })}
                        onAdd={() => quickAdd(item)}
                      />
                    ))}
                  </div>
                </section>
              ))
            )}
          </main>

          {/* ─── Your order (laptops) ─── */}
          <aside className='slhShop__aside' aria-label='Your order'>
            <div className='slhShop__asideCard'>
              <h2>Your order</h2>
              {cartBody}
              {count > 0 && <div className='slhShop__asideFoot'>{checkoutButton}</div>}
            </div>
          </aside>
        </div>

        <footer className='slhShop__footer'>
          <img src={storelenseMark} alt='' />
          <span>
            Online ordering by <b>StoreLense</b> Hospitality
          </span>
        </footer>
      </div>

      {/* ─── Your order (phones and tablets) ─── */}
      {count > 0 && !cartOpen && !checkout && !open && !infoOpen && !viewer && (
        <button type='button' className='slhShop__cartBar' onClick={() => setCartOpen(true)}>
          <span className='slhShop__cartCount'>{count}</span>
          <span>View your order</span>
          <b>{money(totals.total)}</b>
        </button>
      )}

      {toast && (
        <p className='slhShop__toast' role='status'>
          {toast}
        </p>
      )}

      {open && (
        <StorefrontItemSheet
          item={open}
          money={money}
          inCart={qtyOf(open._id)}
          canOrder={canOrder}
          onView={(index) => setViewer({ item: open, index })}
          onClose={() => setOpen(null)}
          onAdd={(line) => {
            addLine(line);
            setOpen(null);
          }}
        />
      )}

      {infoOpen && (
        <StorefrontSheet title={venue.name} subtitle='Hours, delivery & location' size='sm' onClose={() => setInfoOpen(false)}>
          <div className='slhShop__infoSheet'>{infoCards}</div>
        </StorefrontSheet>
      )}

      {viewer && <StorefrontMediaViewer title={viewer.item.name} media={mediaOf(viewer.item)} start={viewer.index} onClose={() => setViewer(null)} />}

      {cartOpen && (
        <StorefrontSheet title='Your order' subtitle={venue.name} size='sm' onClose={() => setCartOpen(false)} footer={count ? checkoutButton : null}>
          <div className='slhShop__sheetCart'>{cartBody}</div>
        </StorefrontSheet>
      )}

      {checkout && (
        <StorefrontCheckout
          venue={venue}
          venueType={venueType}
          lines={lines}
          menuById={menuById}
          paymentOptions={data.payment?.options || []}
          money={money}
          api={api}
          trackPath={trackPath}
          onPlaced={() => saveLines([])}
          onClose={() => setCheckout(false)}
        />
      )}
    </div>
  );
}

/* ─── One dish ─── */
function MenuCard({ item, money, qty, canOrder, onOpen, onView, onAdd }) {
  const from = item.variants.length ? Math.min(...item.variants.map((v) => v.price)) : item.price;
  const media = mediaOf(item);
  const cover = media.find((m) => m.type === "image");
  const videos = media.filter((m) => m.type === "video").length;
  return (
    <article className={`slhShop__item${item.available ? "" : " slhShop__item--out"}${qty ? " slhShop__item--in" : ""}`}>
      <button type='button' className='slhShop__itemMain' onClick={onOpen}>
        <span className='slhShop__itemText'>
          <b>{item.name}</b>
          {item.description && <span className='slhShop__itemDesc'>{item.description}</span>}
          <span className='slhShop__itemFoot'>
            <span className='slhShop__price'>{item.variants.length ? `From ${money(from)}` : money(from)}</span>
            {!item.available ? (
              <em className='slhShop__tag slhShop__tag--out'>{item.soldOut ? "Sold out" : "Unavailable"}</em>
            ) : item.fewLeft ? (
              <em className='slhShop__tag slhShop__tag--few'>{item.fewLeft} left</em>
            ) : item.variants.length || item.modifiers.length ? (
              <em className='slhShop__tag'>Options</em>
            ) : null}
          </span>
        </span>
      </button>

      {/* The picture opens the photos and videos */}
      {media.length ? (
        <button type='button' className='slhShop__thumb' onClick={onView} aria-label={`See photos${videos ? " and videos" : ""} of ${item.name}`}>
          {cover ? <img src={cover.url} alt='' loading='lazy' /> : <video src={`${media[0].url}#t=0.1`} muted playsInline preload='metadata' />}
          {(media.length > 1 || videos > 0) && (
            <span className='slhShop__thumbBadge'>
              {videos > 0 ? <Play size={11} fill='currentColor' /> : <Images size={11} />}
              {media.length}
            </span>
          )}
        </button>
      ) : (
        <span className='slhShop__thumb slhShop__thumb--empty' onClick={onOpen} aria-hidden='true'>
          <UtensilsCrossed size={24} strokeWidth={1.7} />
        </span>
      )}

      {item.available && canOrder && (
        <button type='button' className='slhShop__add' onClick={onAdd} aria-label={`Add ${item.name}`}>
          {qty ? <span>{qty}</span> : <Plus size={18} strokeWidth={2.6} />}
        </button>
      )}
    </article>
  );
}

/* ─── The cart's lines and totals ─── */
function CartContents({ lines, menuById, money, totals, venue, onQty, onClear }) {
  if (!lines.length) {
    return (
      <div className='slhShop__cartEmpty'>
        <ShoppingBag size={26} />
        <b>Nothing here yet</b>
        <span>Tap a dish to add it.</span>
      </div>
    );
  }
  return (
    <div className='slhShop__cart'>
      <ul>
        {lines.map((l) => {
          const item = menuById.get(String(l.itemId));
          if (!item) return null;
          return (
            <li key={l.key}>
              <div className='slhShop__cartText'>
                <b>
                  {item.name}
                  {l.variant && <em> · {l.variant}</em>}
                </b>
                {l.modifiers.length > 0 && <span>{l.modifiers.join(", ")}</span>}
                {l.note && <span className='slhShop__cartNote'>“{l.note}”</span>}
                <strong>{money(unitPriceOf(item, l.variant, l.modifiers) * l.qty)}</strong>
              </div>
              <div className='slhShop__stepper'>
                <button type='button' onClick={() => onQty(l, -1)} aria-label={l.qty === 1 ? `Remove ${item.name}` : "One less"}>
                  {l.qty === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                </button>
                <span>{l.qty}</span>
                <button type='button' onClick={() => onQty(l, 1)} aria-label='One more'>
                  <Plus size={14} />
                </button>
              </div>
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
        {venue.fulfilment.includes("delivery") && (
          <div className='slhShop__cartSoft'>
            <dt>Delivery</dt>
            <dd>{venue.deliveryFee ? `${money(venue.deliveryFee)} at checkout` : "Free"}</dd>
          </div>
        )}
        {totals.serviceFee > 0 && (
          <div className='slhShop__cartSoft'>
            <dt>Service fee</dt>
            <dd>{money(totals.serviceFee)}</dd>
          </div>
        )}
      </dl>
      <button type='button' className='slhShop__clear' onClick={onClear}>
        Clear order
      </button>
    </div>
  );
}
