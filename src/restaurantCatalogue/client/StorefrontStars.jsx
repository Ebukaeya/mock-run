import { Star } from "lucide-react";
import "./storefrontStars.css";

/*
  Five stars showing a rating, with part-filled stars for 4.6 and the like.
  Display only: the rating form has its own buttons.
*/
export default function StorefrontStars({ value = 0, size = 16, label }) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  return (
    <span className='slhStars' role='img' aria-label={label || `${v} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, v - i)) * 100;
        return (
          <span key={i} className='slhStars__one' style={{ width: size, height: size }}>
            <Star size={size} strokeWidth={0} fill='#E2E8F0' className='slhStars__empty' aria-hidden='true' />
            {fill > 0 && (
              <span className='slhStars__fill' style={{ width: `${fill}%` }}>
                <Star size={size} strokeWidth={0} fill='#F59E0B' aria-hidden='true' />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
