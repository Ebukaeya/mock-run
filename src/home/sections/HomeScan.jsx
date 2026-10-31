import POSScanningFeature from "../../component/scanningAnimation/ScanningAnimation.jsx";
import QRScanningFeature from "../../component/scanningAnimation/ScanAndRetrive.jsx";
import "./HomeScan.css";

/* The two existing animations (scan → receipt, and receipt QR lookup), restyled to match */
export default function HomeScan() {
  return (
    <div className='slw-legacy slw-scan' id='scanning'>
      <POSScanningFeature />
      <QRScanningFeature />
    </div>
  );
}
