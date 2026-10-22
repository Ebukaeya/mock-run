import { useState } from "react";
import { Check, Expand, Images, Minus, Play, Plus, UtensilsCrossed } from "lucide-react";
import StorefrontSheet from "./StorefrontSheet";
import { mediaOf, unitPriceOf } from "./storefrontTools";
import "./storefrontItemSheet.css";

/*
  One menu item: photo, description, size (choose one), extras (any;
  required ones are included and can't be removed), a note for the
  kitchen and the quantity. Same rules as the Sales Point.
*/
export default function StorefrontItemSheet({ item, money, inCart = 0, canOrder = true, onAdd, onView, onClose }) {
  const variants = item.variants || [];
  const media = mediaOf(item);
  const cover = media.find((m) => m.type === "image");
  const videos = media.filter((m) => m.type === "video").length;
  const modifiers = item.modifiers || [];
  const [variant, setVariant] = useState(variants[0]?.name || null);
  const [picked, setPicked] = useState(() => modifiers.filter((m) => m.isRequired).map((m) => m.name));
  const [note, setNote] = useState("");
  const [qty, setQty] = useState(1);

  const limit = Math.max(0, (item.maxQty ?? 50) - inCart);
  const unit = unitPriceOf(item, variant, picked);
  const canAdd = canOrder && item.available && qty >= 1 && qty <= limit && (!variants.length || variant);

  const toggle = (m) => {
    if (m.isRequired) return;
    setPicked((p) => (p.includes(m.name) ? p.filter((n) => n !== m.name) : [...p, m.name]));
  };

  const add = () => {
    if (!canAdd) return;
    onAdd({ itemId: item._id, variant, modifiers: picked, note: note.trim(), qty });
  };

  const footer = (
    <div className='slhShopItem__foot'>
      <div className='slhShopItem__qty' aria-label='Quantity'>
        <button type='button' onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label='One less'>
          <Minus size={16} />
        </button>
        <span aria-live='polite'>{qty}</span>
        <button type='button' onClick={() => setQty((q) => Math.min(limit, q + 1))} disabled={qty >= limit} aria-label='One more'>
          <Plus size={16} />
        </button>
      </div>
      <button type='button' className='slhShopItem__add' onClick={add} disabled={!canAdd}>
        {!item.available ? "Not available" : !canOrder ? "Ordering is closed" : limit <= 0 ? "No more left" : `Add · ${money(unit * qty)}`}
      </button>
    </div>
  );

  return (
    <StorefrontSheet bare label={item.name} onClose={onClose} footer={footer}>
      {media.length ? (
        <button type='button' className='slhShopItem__media' onClick={() => onView?.(0)} aria-label={`See photos${videos ? " and videos" : ""} of ${item.name}`}>
          {cover ? <img src={cover.url} alt='' /> : <video src={`${media[0].url}#t=0.1`} muted playsInline preload='metadata' />}
          <span className='slhShopItem__mediaTag'>
            {videos > 0 ? <Play size={13} fill='currentColor' /> : media.length > 1 ? <Images size={13} /> : <Expand size={13} />}
            {media.length > 1 ? `${media.length} ${videos ? "photos & videos" : "photos"}` : videos ? "Play video" : "View"}
          </span>
        </button>
      ) : (
        <div className='slhShopItem__media slhShopItem__media--empty'>
          <UtensilsCrossed size={42} strokeWidth={1.6} />
        </div>
      )}

      <div className='slhShopItem__body'>
        <h2 className='slhShopItem__name'>{item.name}</h2>
        <p className='slhShopItem__price'>{variants.length ? `From ${money(Math.min(...variants.map((v) => v.price)))}` : money(item.price)}</p>
        {item.description && <p className='slhShopItem__desc'>{item.description}</p>}
        {item.fewLeft && <p className='slhShopItem__few'>Only {item.fewLeft} left today</p>}

        {variants.length > 0 && (
          <section className='slhShopItem__group'>
            <div className='slhShopItem__groupHead'>
              <h3>Choose a size</h3>
              <span className='slhShopItem__tag'>Required</span>
            </div>
            <div className='slhShopItem__opts' role='radiogroup' aria-label='Size'>
              {variants.map((v) => {
                const on = v.name === variant;
                return (
                  <button key={v.name} type='button' role='radio' aria-checked={on} className={`slhShopItem__opt${on ? " slhShopItem__opt--on" : ""}`} onClick={() => setVariant(v.name)}>
                    <span className='slhShopItem__mark slhShopItem__mark--radio' />
                    <span className='slhShopItem__optName'>{v.name}</span>
                    <span className='slhShopItem__optPrice'>{money(v.price)}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {modifiers.length > 0 && (
          <section className='slhShopItem__group'>
            <div className='slhShopItem__groupHead'>
              <h3>Extras</h3>
              <span className='slhShopItem__tag slhShopItem__tag--soft'>Optional</span>
            </div>
            <div className='slhShopItem__opts'>
              {modifiers.map((m) => {
                const on = picked.includes(m.name);
                return (
                  <button
                    key={m.name}
                    type='button'
                    role='checkbox'
                    aria-checked={on}
                    aria-disabled={m.isRequired || undefined}
                    className={`slhShopItem__opt${on ? " slhShopItem__opt--on" : ""}${m.isRequired ? " slhShopItem__opt--locked" : ""}`}
                    onClick={() => toggle(m)}
                  >
                    <span className='slhShopItem__mark'>{on && <Check size={13} strokeWidth={3} />}</span>
                    <span className='slhShopItem__optName'>
                      {m.name}
                      {m.isRequired && <em>Included</em>}
                    </span>
                    <span className='slhShopItem__optPrice'>{m.price ? `+${money(m.price)}` : "Free"}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <label className='slhShopItem__note'>
          <span>Note for the kitchen</span>
          <textarea rows={2} maxLength={300} value={note} onChange={(e) => setNote(e.target.value)} placeholder='e.g. no pepper, sauce on the side' />
        </label>
      </div>
    </StorefrontSheet>
  );
}
