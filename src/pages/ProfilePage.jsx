import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";
import TopbarLarge from "../components/TopbarLarge";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          title="Profile"
          color="var(--blue)"
          onSettingsClick={handleSettingsClick}
          settingsLabel="Go to settings"
        />
      </header>
      <main>
        <p>This is the profile page.</p>
        {error && <p>{error}</p>}
        <button onClick={handleLogOut} disabled={loading}>
          {loading ? "Logging out..." : "Log out"}
        </button>
      </main>
    </>
  );
}
