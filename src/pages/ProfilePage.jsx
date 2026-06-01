import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";
import TopbarLarge from "../components/TopbarLarge";
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

    navigate("/", { replace: true });
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <>
      <header>
        <TopbarLarge
          title="Profil"
          color="var(--blue)"
          onSettingsClick={handleSettingsClick}
          settingsLabel="Gå til indstillinger"
        />
      </header>
      <main className="profile-page">
        <p className="profile-greeting">
          Godmorgen {userName}
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

        {error && <p>{error}</p>}
        <button className="profile-logout-btn" onClick={handleLogOut} disabled={loading}>
          {loading ? "Logger ud..." : "Log ud"}
        </button>
      </main>
    </>
  );
}
