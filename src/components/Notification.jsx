import starIcon from "../assets/icons/point.svg";

export default function Notification({
  notification,
  actionLabel = "Godt klaret!",
}) {
  return (
    <div className="profile-notification-card">
      <div className="profile-notification-card__top">
        <div className="profile-notification-card__avatar" aria-hidden="true" />
        <div className="profile-notification-card__meta">
          <span className="profile-notification-card__user">
            {notification.user}
          </span>
          <span className="profile-notification-card__time">
            {notification.time}
          </span>
        </div>
        <div className="profile-notification-card__icons">
          <img src={starIcon} alt="" aria-hidden="true" />
          <span>#</span>
        </div>
      </div>
      <p className="profile-notification-card__description">
        {notification.description}
      </p>
      <button className="profile-notification-card__action">
        {actionLabel}
      </button>
    </div>
  );
}
