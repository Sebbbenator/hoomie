import "../css_components/TopbarSmall.css";

export default function TopbarSmall({ color = "var(--green)" }) {
  return (
    <div className="topbar-small" style={{ "--topbar-color": color }}>
      <svg
        className="topbar-small__shape"
        viewBox="0 0 393 101"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M393 0H0V101C0 101 50.4354 93.5672 83 92.6168C128.789 91.2804 153.587 101.427 200 100.987C250.997 100.504 277.249 90.5837 327 90.9254C352.808 91.1027 393 94.3212 393 94.3212V0Z" />
      </svg>
    </div>
  );
}
