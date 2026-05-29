import "../css_components/AuthButton.css";

export default function AuthButton({
  children,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  className = "",
  secondaryColor,
}) {
  const style = secondaryColor
    ? { "--auth-button-secondary-bg": secondaryColor }
    : undefined;

  return (
    <button
      type={type}
      className={`auth-button auth-button--${variant} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}
