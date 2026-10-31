import { LOGO } from "./hospitalityConfig";
import "./Logo.css";

/*
 * StoreLense Hospitality logo: the StoreLense mark, the wordmark and the
 * small "Hospitality" label. variant="light" for dark backgrounds.
 */
export default function Logo({ variant = "dark", size = "md", label = true, className = "" }) {
  return (
    <span className={`slh-logo slh-logo--${variant} slh-logo--${size} ${className}`}>
      <img className='slh-logo__mark' src={LOGO} alt='' />
      <span className='slh-logo__text'>
        <span className='slh-logo__word'>
          Store<em>Lense</em>
        </span>
        {label && <small>Hospitality</small>}
      </span>
    </span>
  );
}

/* Just the round mark, for app icons and small spaces */
export function LogoMark({ className = "" }) {
  return <img className={`slh-logo__mark ${className}`} src={LOGO} alt='StoreLense' />;
}
