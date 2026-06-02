import settingsIcon from "../assets/icons/settings.svg";
import "../css_components/TopbarLarge.css";

export default function TopbarLarge({
  color = "var(--green)",
  title = "Side Titel",
  settingsLabel = "Open settings",
  onSettingsClick,
  showSettings = true,
  showTitle = true,
}) {
  return (
    <div className="topbar-large" style={{ "--topbar-color": color }}>
      <div className="topbar-large__content">
        {showTitle && <h1 className="topbar-large__title">{title}</h1>}
        {showSettings && (
          <button
            type="button"
            className="topbar-large__notification"
            onClick={onSettingsClick}
            aria-label={settingsLabel}
          >
            <img src={settingsIcon} alt="" aria-hidden="true" />
          </button>
        )}
      </div>
      <svg
        className="topbar-large__shape"
        viewBox="0 0 393 279"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M393 0H0V265.582C0 265.582 50.2937 250.56 83 250.318C129.421 249.974 153.587 280.179 200 278.964C250.997 277.63 276.311 245.119 327 237.358C352.645 233.432 393 232.927 393 232.927V0Z" />
      </svg>
    </div>
  );
}
