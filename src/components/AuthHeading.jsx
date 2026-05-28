import "../css_components/AuthHeading.css";

export default function AuthHeading({
  title,
  subtitle,
  titleId,
  className = "",
}) {
  return (
    <div className={`auth-heading ${className}`.trim()}>
      <h1 id={titleId} className="auth-heading__title">
        {title}
      </h1>
      <p className="auth-heading__subtitle">{subtitle}</p>
    </div>
  );
}
