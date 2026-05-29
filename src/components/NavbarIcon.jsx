import "../css_components/NavbarIcon.css";

export default function NavbarIcon({
  label,
  color = "currentColor",
  size = 32,
  viewBox = "0 0 44 44",
  className = "",
  children,
}) {
  return (
    /* havde problemer med at få svg til at vise så fik AI til at hjælpe med path */
    <svg
      className={`navbar-icon ${className}`.trim()}
      style={{ color }}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
    >
      {children}
    </svg>
  );
}
