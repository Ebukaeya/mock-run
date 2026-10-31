import { LOGO_MARK } from "./siteConfig";
import "./SiteLogo.css";

/* StoreLense logo: round mark + wordmark. variant="light" on dark backgrounds. */
export default function SiteLogo({ variant = "dark", size = "md", className = "" }) {
  return (
    <span className={`slw-logo slw-logo--${variant} slw-logo--${size} ${className}`}>
      <img className='slw-logo__mark' src={LOGO_MARK} alt='' />
      <span className='slw-logo__word'>
        Store<em>Lense</em>
      </span>
    </span>
  );
}
