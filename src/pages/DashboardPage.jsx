import HoomieKlovn from "../assets/Hoomie/HoomieKlovn.svg";
import { useNavigate } from "react-router";
import TopbarMedium from "../components/TopbarMedium";
import ShoppingWidget from "../components/ShoppingWidget";
import CalendarWidget from "../components/CalendarWidget";
import Notification from "../components/Notification";
import NOTIFICATIONS from "../data/notifications.json";
import "../css_pages/ProfilePage.css";
import "../css_pages/DashboardPage.css";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <TopbarMedium color="var(--violet)" hoomieState={HoomieKlovn} />
      <section className="small-widgets dashboard-page__widgets">
        <ShoppingWidget />
        <CalendarWidget />
      </section>
      <section className="profile-notifications">
        <div className="profile-notifications__header">
          <h2 className="profile-notifications__title">Notifikationer</h2>
          <span
            className="profile-notifications__see-all"
            onClick={() => navigate("/notifications")}
            role="button"
          >
            Se Alle
          </span>
        </div>
        {NOTIFICATIONS.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </section>
    </div>
  );
}
