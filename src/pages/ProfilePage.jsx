import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";
import TopbarLarge from "../components/TopbarLarge";
import Hoomie from "../components/Hoomie";
import Notification from "../components/Notification";
import HoomieKlovn from "../assets/Hoomie/HoomieKlovn.svg";
import NOTIFICATIONS from "../data/notifications.json";
import "../css_pages/ProfilePage.css";

const XP_TOTAL_BLOCKS = 8;
const XP_FILLED_BLOCKS = 3;

const TABS = ["Historik", "Milepæle", "Dokumenter", "Ejendele"];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [activeTab, setActiveTab] = useState("Historik");
  const hour = new Date().getHours();

  let greeting;

  if (hour >= 5 && hour < 12) {
    greeting = "Godmorgen";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Hejsa";
  } else if (hour >= 17 && hour < 22) {
    greeting = "Godaften";
  } else {
    greeting = "Godnat";
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const name =
        data?.user?.user_metadata?.full_name ||
        data?.user?.user_metadata?.name ||
        data?.user?.email?.split("@")[0] ||
        "";
      setUserName(name);
    });
  }, []);

  const handleLogOut = async () => {
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signOut();

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/signin", { replace: true });
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <>
      <header className="profile-top">
        <TopbarLarge
          title="Profil"
          color="var(--blue)"
          onSettingsClick={handleSettingsClick}
          settingsLabel="Gå til indstillinger"
        />
        <div className="profile-hoomie">
          <Hoomie HoomieState={HoomieKlovn} />
        </div>
      </header>
      <main className="profile-page">
        <p className="profile-greeting">
          {greeting} {userName}
        </p>

        <div className="profile-xp-bar" aria-label="XP fremgang">
          <div className="profile-xp-level">1</div>
          {Array.from({ length: XP_TOTAL_BLOCKS }, (_, i) => (
            <div
              key={i}
              className={`profile-xp-block${i < XP_FILLED_BLOCKS ? " profile-xp-block--filled" : ""}`}
            />
          ))}
        </div>

        <div className="profile-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`profile-tab${activeTab === tab ? " profile-tab--active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

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
          {NOTIFICATIONS.map((n) => (
            <Notification key={n.id} notification={n} />
          ))}
        </section>

        {error && <p>{error}</p>}
        <button
          className="profile-logout-btn"
          onClick={handleLogOut}
          disabled={loading}
        >
          {loading ? "Logger ud..." : "Log ud"}
        </button>
      </main>
    </>
  );
}
