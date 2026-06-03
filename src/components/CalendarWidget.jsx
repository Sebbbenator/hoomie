import { NavLink } from "react-router";
import rightArrow from "../assets/icons/right-arrow.svg";
import calendar from "../assets/icons/calender.svg";
import "../css_components/CalendarWidget.css";

export default function CalendarWidget() {
  return (
    <NavLink
      to="/calendar"
      className="calendar-widget-link"
      aria-label="Gå til kalender"
    >
      <div className="calendar-widget">
        <div className="widget-header">
          <h2>Kalender</h2>
          <img src={calendar} alt="Calendar" className="calendar-icon" />
        </div>

        <div className="date-section">
          <div className="date">9. juni</div>
          <div className="weekday">Tirsdag</div>
        </div>

        <div className="event-section">
          <div className="event-bar" />

          <div className="event-content">
            <div className="event-title">Bytur</div>
            <div className="event-time">12:00–23:00</div>
          </div>
        </div>

        <div className="next-button" aria-hidden="true">
          <img src={rightArrow} alt="" aria-hidden="true" />
        </div>
      </div>
    </NavLink>
  );
}
