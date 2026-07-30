import "./Loader.css";
import logo from "./StorelenseLogo.png";

const Loader = ({ size = 140, logoSrc = logo, label = "" }) => {
  return (
    <div className='sl-loader' style={{ width: size, height: size }}>
      <img className='sl-loader__logo' src={logoSrc} alt='StoreLense' />

      <svg className='sl-loader__ring' viewBox='0 0 100 100' style={{ width: size, height: size }}>
        <circle className='sl-loader__arc' cx='50' cy='50' r='46' fill='none' strokeWidth='4' strokeLinecap='round' />
      </svg>

      {label && <span className='sl-loader__label'>{label}</span>}
    </div>
  );
};

export default Loader;
