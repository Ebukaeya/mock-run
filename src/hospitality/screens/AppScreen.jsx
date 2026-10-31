import {
  ArrowRightLeft,
  Armchair,
  BarChart3,
  Beer,
  BedDouble,
  Beef,
  Bell,
  Bike,
  ChefHat,
  Clock,
  Coffee,
  Cookie,
  CookingPot,
  CupSoda,
  Fish,
  LayoutGrid,
  Minus,
  Plus,
  Sandwich,
  Search,
  Settings,
  ShoppingBag,
  Soup,
  Users,
  Warehouse,
  Wifi,
  Wine,
} from "lucide-react";
import { images, screenshots, venueLink } from "../hospitalityConfig";
import Logo from "../Logo";
import { CART, MENU, N } from "./screenData";
import "./AppScreen.css";

/*
 * Every app screen the website shows. If hospitalityConfig.screenshots has an
 * image for a screen, that image is shown instead of the recreation.
 */

const ICONS = {
  rice: CookingPot,
  soup: Soup,
  beef: Beef,
  fish: Fish,
  chops: Cookie,
  wrap: Sandwich,
  glass: Wine,
  cup: CupSoda,
  coffee: Coffee,
  beer: Beer,
};

function FoodTile({ item, size = 26 }) {
  const Icon = ICONS[item.icon] || CookingPot;
  return (
    <span className='slh-scr-tile' style={{ background: item.tone, color: item.ink }}>
      <Icon size={size} strokeWidth={1.8} />
    </span>
  );
}

function Brand({ small }) {
  return <Logo size={small ? "sm" : "md"} />;
}

function Sidebar({ active }) {
  const items = [
    ["sales", ShoppingBag, "Sales Point"],
    ["tables", Armchair, "Tables"],
    ["kitchen", ChefHat, "Kitchen"],
    ["menu", LayoutGrid, "Menu"],
    ["storage", Warehouse, "Storage"],
    ["rooms", BedDouble, "Rooms"],
    ["analytics", BarChart3, "Analytics"],
    ["settings", Settings, "Settings"],
  ];
  return (
    <aside className='slh-scr-side'>
      <Brand />
      <nav className='slh-scr-side__nav'>
        {items.map(([id, Icon, label]) => (
          <span key={id} className={`slh-scr-side__link ${active === id ? "is-active" : ""}`}>
            <Icon size={18} />
            {label}
          </span>
        ))}
      </nav>
      <div className='slh-scr-side__venue'>
        <span className='slh-scr-side__avatar'>MT</span>
        <span>
          Mama Tobi's Kitchen
          <small>Lekki, Lagos</small>
        </span>
      </div>
    </aside>
  );
}

function TopBar({ title, children }) {
  return (
    <header className='slh-scr-top'>
      <h4>{title}</h4>
      <div className='slh-scr-top__right'>
        {children}
        <span className='slh-scr-sync'>
          <Wifi size={13} /> Synced
        </span>
        <span className='slh-scr-top__bell'>
          <Bell size={16} />
        </span>
      </div>
    </header>
  );
}

/* ---------- Sales Point (desktop) ---------- */
function SalesPoint() {
  const sub = CART.reduce((s, i) => s + i.qty * i.price, 0);
  const vat = Math.round(sub * 0.075);
  return (
    <div className='slh-scr slh-scr--app'>
      <Sidebar active='sales' />
      <main className='slh-scr-main'>
        <TopBar title='Sales Point'>
          <span className='slh-scr-seg'>
            <b>Takeaway</b>
            <i>Delivery</i>
          </span>
        </TopBar>
        <div className='slh-scr-sp'>
          <section className='slh-scr-sp__menu'>
            <div className='slh-scr-search'>
              <Search size={16} /> Search menu or scan a barcode
            </div>
            <div className='slh-scr-chips'>
              {["All", "Mains", "Grills", "Soups", "Starters", "Drinks", "Coffee"].map((c, i) => (
                <span key={c} className={i === 0 ? "is-on" : ""}>
                  {c}
                </span>
              ))}
            </div>
            <div className='slh-scr-sp__grid'>
              {MENU.slice(0, 12).map((m) => (
                <div key={m.name} className='slh-scr-card'>
                  <FoodTile item={m} />
                  <b>{m.name}</b>
                  <span>{N(m.price)}</span>
                </div>
              ))}
            </div>
          </section>
          <section className='slh-scr-cart'>
            <div className='slh-scr-cart__head'>
              <b>Order #A-1042</b>
              <span>Takeaway</span>
            </div>
            <div className='slh-scr-cart__lines'>
              {CART.map((c) => (
                <div key={c.name} className='slh-scr-cart__line'>
                  <span className='slh-scr-qty'>
                    <Minus size={12} />
                    {c.qty}
                    <Plus size={12} />
                  </span>
                  <span className='slh-scr-cart__name'>{c.name}</span>
                  <b>{N(c.qty * c.price)}</b>
                </div>
              ))}
            </div>
            <div className='slh-scr-cart__sum'>
              <p>
                <span>Subtotal</span>
                <span>{N(sub)}</span>
              </p>
              <p>
                <span>VAT 7.5%</span>
                <span>{N(vat)}</span>
              </p>
              <p className='slh-scr-cart__total'>
                <span>Total</span>
                <span>{N(sub + vat)}</span>
              </p>
            </div>
            <div className='slh-scr-cart__pay'>
              <span>Cash</span>
              <span className='is-on'>Transfer</span>
              <span>POS</span>
              <span>Split</span>
            </div>
            <button type='button' className='slh-scr-btn'>
              Charge {N(sub + vat)}
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

/* ---------- Sales Point (StoreLense Mini) ---------- */
function SalesPointPos() {
  return (
    <div className='slh-scr slh-scr--pos'>
      <div className='slh-scr-pos__head'>
        <Brand small />
        <span className='slh-scr-sync'>
          <Wifi size={11} /> Synced
        </span>
      </div>
      <div className='slh-scr-search slh-scr-search--sm'>
        <Search size={13} /> Search menu
      </div>
      <div className='slh-scr-chips slh-scr-chips--sm'>
        {["All", "Mains", "Grills", "Drinks"].map((c, i) => (
          <span key={c} className={i === 0 ? "is-on" : ""}>
            {c}
          </span>
        ))}
      </div>
      <div className='slh-scr-pos__list'>
        {MENU.slice(0, 7).map((m, i) => (
          <div key={m.name} className='slh-scr-pos__row'>
            <FoodTile item={m} size={18} />
            <span>
              <b>{m.name}</b>
              <small>{N(m.price)}</small>
            </span>
            {i < 2 ? <em>{i === 0 ? 2 : 1}</em> : <Plus size={16} className='slh-scr-pos__add' />}
          </div>
        ))}
      </div>
      <div className='slh-scr-pos__bar'>
        <span>
          3 items
          <b>{N(15000)}</b>
        </span>
        <button type='button'>Charge</button>
      </div>
    </div>
  );
}

/* ---------- Tables ---------- */
const TABLES = [
  { n: 1, x: 6, y: 10, s: "free", seats: 2 },
  { n: 2, x: 24, y: 10, s: "seated", seats: 4, t: "12m" },
  { n: 3, x: 42, y: 10, s: "ordered", seats: 4, t: "26m" },
  { n: 4, x: 6, y: 42, s: "bill", seats: 6, t: "58m", wide: true },
  { n: 5, x: 30, y: 42, s: "free", seats: 2 },
  { n: 6, x: 44, y: 42, s: "ordered", seats: 2, t: "9m" },
  { n: 7, x: 6, y: 74, s: "ordered", seats: 4, t: "18m", sel: true },
  { n: 8, x: 24, y: 74, s: "seated", seats: 4, t: "3m" },
  { n: 9, x: 42, y: 74, s: "free", seats: 4 },
];

function Tables() {
  return (
    <div className='slh-scr slh-scr--tables'>
      <header className='slh-scr-top slh-scr-top--flat'>
        <Brand small />
        <div className='slh-scr-zones'>
          <span className='is-on'>Main hall</span>
          <span>Terrace</span>
          <span>VIP</span>
        </div>
        <span className='slh-scr-sync'>
          <Wifi size={12} /> Live
        </span>
      </header>
      <div className='slh-scr-tb'>
        <div className='slh-scr-tb__floor'>
          {TABLES.map((t) => (
            <div
              key={t.n}
              className={`slh-scr-desk slh-scr-desk--${t.s} ${t.wide ? "slh-scr-desk--wide" : ""} ${
                t.sel ? "is-sel" : ""
              }`}
              style={{ left: `${t.x * 1.55}%`, top: `${t.y}%` }}
            >
              <b>T{t.n}</b>
              <span>
                <Users size={11} /> {t.seats}
              </span>
              {t.t && (
                <small>
                  <Clock size={10} /> {t.t}
                </small>
              )}
            </div>
          ))}
          <div className='slh-scr-tb__legend'>
            <span className='l-free'>Free</span>
            <span className='l-seated'>Seated</span>
            <span className='l-ordered'>Ordered</span>
            <span className='l-bill'>Bill asked</span>
          </div>
        </div>
        <aside className='slh-scr-tb__panel'>
          <div className='slh-scr-tb__ph'>
            <b>Table 7</b>
            <span>4 guests · Tunde</span>
          </div>
          {[
            ["Pounded Yam & Egusi", 2, "Served"],
            ["Goat Pepper Soup", 1, "Cooking"],
            ["Chapman", 3, "Served"],
            ["Suya Platter", 1, "Cooking"],
          ].map(([n, q, s]) => (
            <div key={n} className='slh-scr-tb__line'>
              <span>
                {q}× {n}
              </span>
              <em className={s === "Cooking" ? "is-cook" : ""}>{s}</em>
            </div>
          ))}
          <div className='slh-scr-tb__tot'>
            <span>Running bill</span>
            <b>{N(28600)}</b>
          </div>
          <div className='slh-scr-tb__acts'>
            <span>Add items</span>
            <span className='is-main'>Print bill</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------- Kitchen display ---------- */
const TICKETS = [
  {
    id: "T4 · #1038",
    w: "Grace",
    age: "14:02",
    st: "late",
    items: [
      ["2", "Jollof Rice & Chicken", "No pepper"],
      ["1", "Suya Platter", ""],
    ],
  },
  {
    id: "T7 · #1041",
    w: "Tunde",
    age: "08:37",
    st: "cook",
    items: [
      ["1", "Goat Pepper Soup", ""],
      ["1", "Suya Platter", "Extra onions"],
    ],
  },
  {
    id: "Takeaway #A-1042",
    w: "Counter",
    age: "02:15",
    st: "new",
    items: [
      ["2", "Jollof Rice & Chicken", ""],
      ["1", "Asun", ""],
    ],
  },
  {
    id: "Online #W-88",
    w: "Bolt rider 4:10",
    age: "01:02",
    st: "new",
    items: [["3", "Chicken Shawarma", "Pack separately"]],
  },
  {
    id: "T2 · #1043",
    w: "Grace",
    age: "00:40",
    st: "new",
    items: [
      ["1", "Grilled Croaker Fish", "Well done"],
      ["2", "Small Chops", ""],
    ],
  },
  { id: "T9 · #1036", w: "Ada", age: "16:20", st: "ready", items: [["2", "Asun", ""]] },
];

function Kitchen() {
  return (
    <div className='slh-scr slh-scr--kds'>
      <header className='slh-scr-kds__top'>
        <span className='slh-scr-kds__title'>
          <ChefHat size={20} /> Grill station
        </span>
        <span className='slh-scr-kds__counts'>
          <i className='c-new'>3 new</i>
          <i className='c-cook'>1 cooking</i>
          <i className='c-late'>1 late</i>
          <i className='c-ready'>1 ready</i>
        </span>
        <span className='slh-scr-kds__clock'>7:42 PM</span>
      </header>
      <div className='slh-scr-kds__grid'>
        {TICKETS.map((t) => (
          <div key={t.id} className={`slh-scr-ticket slh-scr-ticket--${t.st}`}>
            <div className='slh-scr-ticket__head'>
              <b>{t.id}</b>
              <span>{t.age}</span>
            </div>
            <small className='slh-scr-ticket__who'>{t.w}</small>
            {t.items.map(([q, n, note]) => (
              <div key={n} className='slh-scr-ticket__item'>
                <em>{q}</em>
                <span>
                  {n}
                  {note && <small>{note}</small>}
                </span>
              </div>
            ))}
            <button type='button'>{t.st === "ready" ? "Picked up" : t.st === "new" ? "Start" : "Ready"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Waiter app (phone) ---------- */
function Waiter() {
  const added = { "Goat Pepper Soup": 1, Chapman: 3, "Suya Platter": 1 };
  return (
    <div className='slh-scr slh-scr--waiter'>
      <div className='slh-scr-status'>
        <span>9:41</span>
        <span>●●● ▮</span>
      </div>
      <div className='slh-scr-wt__head'>
        <small>Main hall</small>
        <b>Table 7</b>
        <span>
          <Users size={13} /> 4 guests
        </span>
      </div>
      <div className='slh-scr-chips slh-scr-chips--sm slh-scr-chips--pad'>
        {["Popular", "Mains", "Grills", "Soups", "Drinks"].map((c, i) => (
          <span key={c} className={i === 0 ? "is-on" : ""}>
            {c}
          </span>
        ))}
      </div>
      <div className='slh-scr-wt__list'>
        {MENU.slice(0, 8).map((m) => (
          <div key={m.name} className='slh-scr-wt__row'>
            <FoodTile item={m} size={22} />
            <span>
              <b>{m.name}</b>
              <small>
                {N(m.price)} · {m.station}
              </small>
            </span>
            {added[m.name] ? (
              <span className='slh-scr-qty slh-scr-qty--on'>
                <Minus size={12} />
                {added[m.name]}
                <Plus size={12} />
              </span>
            ) : (
              <span className='slh-scr-wt__add'>
                <Plus size={16} />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className='slh-scr-wt__send'>
        <span>
          5 items · <b>{N(19200)}</b>
        </span>
        <button type='button'>Send to kitchen</button>
      </div>
    </div>
  );
}

/* ---------- Menu management ---------- */
function MenuMgmt() {
  return (
    <div className='slh-scr slh-scr--app'>
      <Sidebar active='menu' />
      <main className='slh-scr-main'>
        <TopBar title='Menu'>
          <span className='slh-scr-btn slh-scr-btn--sm'>
            <Plus size={14} /> New item
          </span>
        </TopBar>
        <div className='slh-scr-pad'>
          <div className='slh-scr-chips'>
            {["All 64", "Mains 14", "Grills 9", "Soups 6", "Starters 8", "Drinks 21", "Coffee 6"].map((c, i) => (
              <span key={c} className={i === 0 ? "is-on" : ""}>
                {c}
              </span>
            ))}
          </div>
          <div className='slh-scr-table'>
            <div className='slh-scr-table__row slh-scr-table__row--head'>
              <span>Item</span>
              <span>Category</span>
              <span>Price</span>
              <span>Prepared at</span>
              <span>Available</span>
            </div>
            {MENU.slice(0, 9).map((m, i) => (
              <div key={m.name} className='slh-scr-table__row'>
                <span className='slh-scr-table__item'>
                  <FoodTile item={m} size={18} />
                  {m.name}
                </span>
                <span>{m.cat}</span>
                <b>{N(m.price)}</b>
                <span className='slh-scr-pill'>{m.station}</span>
                <span className={`slh-scr-toggle ${i === 4 ? "" : "is-on"}`} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Storage ---------- */
function Storage() {
  const rows = [
    ["Rice (50 kg bag)", "Ingredient", "14 bags", 70, ""],
    ["Chicken, whole", "Ingredient", "38 pcs", 45, ""],
    ["Goat meat", "Ingredient", "6 kg", 12, "low"],
    ["Palm oil", "Ingredient", "22 L", 60, ""],
    ["Star Lager (crate)", "Menu item", "31 crates", 80, ""],
    ["Malt (crate)", "Menu item", "4 crates", 10, "low"],
    ["Zobo leaves", "Ingredient", "9 kg", 40, ""],
    ["Croaker fish", "Ingredient", "18 pcs", 35, ""],
  ];
  return (
    <div className='slh-scr slh-scr--app'>
      <Sidebar active='storage' />
      <main className='slh-scr-main'>
        <TopBar title='Main store · Ajah'>
          <span className='slh-scr-btn slh-scr-btn--sm'>
            <ArrowRightLeft size={14} /> Move stock
          </span>
        </TopBar>
        <div className='slh-scr-pad slh-scr-st'>
          <div className='slh-scr-st__stats'>
            <span>
              <small>Items</small>
              <b>126</b>
            </span>
            <span>
              <small>Stock value</small>
              <b>{N(4860000)}</b>
            </span>
            <span className='is-warn'>
              <small>Running low</small>
              <b>2</b>
            </span>
            <span>
              <small>Moves today</small>
              <b>7</b>
            </span>
          </div>
          <div className='slh-scr-table'>
            <div className='slh-scr-table__row slh-scr-table__row--head slh-scr-table__row--st'>
              <span>Item</span>
              <span>Kind</span>
              <span>In stock</span>
              <span>Level</span>
            </div>
            {rows.map(([n, k, q, lvl, low]) => (
              <div key={n} className='slh-scr-table__row slh-scr-table__row--st'>
                <b>{n}</b>
                <span className='slh-scr-pill'>{k}</span>
                <span>{q}</span>
                <span className={`slh-scr-bar ${low ? "is-low" : ""}`}>
                  <i style={{ width: `${lvl}%` }} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Online order (customer phone) ---------- */
function Online() {
  return (
    <div className='slh-scr slh-scr--online'>
      <div className='slh-scr-on__cover' style={{ backgroundImage: `url(${images.interior})` }}>
        <div className='slh-scr-status slh-scr-status--light'>
          <span>9:41</span>
          <span>●●● ▮</span>
        </div>
        <span className='slh-scr-on__url'>
          {venueLink.base}
          {venueLink.exampleSlug}
        </span>
      </div>
      <div className='slh-scr-on__venue'>
        <span className='slh-scr-on__logo'>MT</span>
        <b>{venueLink.exampleVenue}</b>
        <span className='slh-scr-on__stars' aria-label='Rated 5 out of 5'>
          ★★★★★ <em>5.0</em>
          <small>· 212 reviews</small>
        </span>
        <small>Lekki Phase 1 · Open till 11pm · 25–35 min</small>
        <div className='slh-scr-seg'>
          <b>Delivery</b>
          <i>Pick up</i>
        </div>
      </div>
      <div className='slh-scr-on__specials'>
        <b>Today's specials</b>
        <div className='slh-scr-on__strip' style={{ backgroundImage: `url(${images.venueAds})` }} />
      </div>
      <div className='slh-scr-on__list'>
        {MENU.slice(0, 4).map((m, i) => (
          <div key={m.name} className='slh-scr-on__item'>
            <FoodTile item={m} size={28} />
            <span>
              <b>{m.name}</b>
              <small>{m.cat}</small>
              <em>{N(m.price)}</em>
            </span>
            <span className={`slh-scr-on__add ${i === 0 ? "is-on" : ""}`}>{i === 0 ? "2" : <Plus size={15} />}</span>
          </div>
        ))}
      </div>
      <div className='slh-scr-on__cta'>
        <Bike size={16} /> Checkout · {N(9100)}
      </div>
    </div>
  );
}

/* ---------- Analytics (compact screen) ---------- */
function Analytics() {
  const bars = [42, 58, 51, 66, 73, 88, 96];
  return (
    <div className='slh-scr slh-scr--app'>
      <Sidebar active='analytics' />
      <main className='slh-scr-main'>
        <TopBar title='Analytics'>
          <span className='slh-scr-seg'>
            <i>Today</i>
            <b>7 days</b>
            <i>Month</i>
          </span>
        </TopBar>
        <div className='slh-scr-pad slh-scr-an'>
          <div className='slh-scr-an__kpis'>
            {[
              ["Revenue", N(8420000), "+12.4%"],
              ["Gross profit", N(3910000), "+9.1%"],
              ["Orders", "1,284", "+6.8%"],
              ["Average bill", N(6558), "+5.2%"],
            ].map(([l, v, d]) => (
              <div key={l}>
                <small>{l}</small>
                <b>{v}</b>
                <em>{d}</em>
              </div>
            ))}
          </div>
          <div className='slh-scr-an__row'>
            <div className='slh-scr-an__chart'>
              <small>Sales by day</small>
              <div className='slh-scr-an__bars'>
                {bars.map((b, i) => (
                  <span key={i} style={{ height: `${b}%` }}>
                    <i>{["M", "T", "W", "T", "F", "S", "S"][i]}</i>
                  </span>
                ))}
              </div>
            </div>
            <div className='slh-scr-an__mix'>
              <small>Payments</small>
              {[
                ["Transfer", 46],
                ["POS card", 31],
                ["Cash", 17],
                ["Online", 6],
              ].map(([l, p]) => (
                <p key={l}>
                  <span>{l}</span>
                  <i>
                    <em style={{ width: `${p}%` }} />
                  </i>
                  <b>{p}%</b>
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Hotel rooms ---------- */
function Rooms() {
  const st = [
    "occ",
    "occ",
    "free",
    "clean",
    "occ",
    "out",
    "free",
    "occ",
    "occ",
    "clean",
    "free",
    "occ",
    "out",
    "occ",
    "free",
    "occ",
  ];
  const label = { occ: "Occupied", free: "Ready", clean: "Cleaning", out: "Checking out" };
  return (
    <div className='slh-scr slh-scr--app'>
      <Sidebar active='rooms' />
      <main className='slh-scr-main'>
        <TopBar title='Rooms'>
          <span className='slh-scr-seg'>
            <b>Floor 1</b>
            <i>Floor 2</i>
          </span>
        </TopBar>
        <div className='slh-scr-pad slh-scr-rm'>
          <div className='slh-scr-rm__grid'>
            {st.map((s, i) => (
              <div key={i} className={`slh-scr-room slh-scr-room--${s}`}>
                <b>{101 + i}</b>
                <small>{i % 3 === 0 ? "Deluxe" : "Standard"}</small>
                <em>{label[s]}</em>
              </div>
            ))}
          </div>
          <div className='slh-scr-rm__folio'>
            <b>Folio · Room 105</b>
            <small>Mr. Okafor · 3 nights</small>
            {[
              ["Room, 3 nights", 135000],
              ["Restaurant · dinner", 18400],
              ["Bar · drinks", 9600],
              ["Laundry", 4500],
            ].map(([l, v]) => (
              <p key={l}>
                <span>{l}</span>
                <span>{N(v)}</span>
              </p>
            ))}
            <p className='slh-scr-rm__tot'>
              <span>Balance</span>
              <span>{N(167500)}</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Bar tabs (phone) ---------- */
function BarTabs() {
  const tabs = [
    ["Chidi & friends", "Counter 3", 6, 46800, "1h 40m"],
    ["Booth 2", "VIP", 4, 132000, "2h 05m"],
    ["Ngozi", "Counter 1", 2, 9400, "35m"],
    ["Patio 5", "Patio", 3, 27500, "58m"],
    ["Emeka", "Counter 6", 1, 4500, "12m"],
  ];
  return (
    <div className='slh-scr slh-scr--waiter'>
      <div className='slh-scr-status'>
        <span>11:28</span>
        <span>●●● ▮</span>
      </div>
      <div className='slh-scr-wt__head'>
        <small>Friday night</small>
        <b>Open tabs</b>
        <span>5 tabs · {N(220200)}</span>
      </div>
      <div className='slh-scr-bt__list'>
        {tabs.map(([n, where, items, total, t]) => (
          <div key={n} className='slh-scr-bt__tab'>
            <span className='slh-scr-bt__ic'>
              <Wine size={18} />
            </span>
            <span>
              <b>{n}</b>
              <small>
                {where} · {items} rounds · {t}
              </small>
            </span>
            <em>{N(total)}</em>
          </div>
        ))}
      </div>
      <div className='slh-scr-wt__send'>
        <span>Booth 2</span>
        <button type='button'>Add round</button>
      </div>
    </div>
  );
}

/* ---------- Receipt slip (prints out of StoreLense POS and Mini) ---------- */
function ReceiptSlip() {
  return (
    <div className='slh-scr-rc'>
      <b className='slh-scr-rc__name'>MAMA TOBI'S KITCHEN</b>
      <span>Lekki Phase 1, Lagos</span>
      <span className='slh-scr-rc__rule' />
      {CART.map((c) => (
        <p key={c.name}>
          <span>
            {c.qty} {c.name}
          </span>
          <span>{(c.qty * c.price).toLocaleString()}</span>
        </p>
      ))}
      <span className='slh-scr-rc__rule' />
      <p className='slh-scr-rc__tot'>
        <span>TOTAL</span>
        <span>{N(24725)}</span>
      </p>
      <span>Paid · Transfer</span>
      <span className='slh-scr-rc__qr' />
      <span>Thank you!</span>
    </div>
  );
}

const SCREENS = {
  salesPoint: SalesPoint,
  salesPointPos: SalesPointPos,
  tables: Tables,
  kitchen: Kitchen,
  waiter: Waiter,
  menu: MenuMgmt,
  storage: Storage,
  online: Online,
  analytics: Analytics,
  rooms: Rooms,
  barTabs: BarTabs,
  receiptSlip: ReceiptSlip,
};

export default function AppScreen({ name }) {
  const shot = screenshots[name];
  if (shot) return <img className='slh-scr-shot' src={shot} alt='' loading='lazy' />;
  const Screen = SCREENS[name] || SalesPoint;
  return <Screen />;
}
