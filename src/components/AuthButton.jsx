import "../css_components/AuthButton.css";

export default function AuthButton({
  children,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  className = "",
}) {
  return (
    <button
      type={type}
      className={`auth-button auth-button--${variant} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
