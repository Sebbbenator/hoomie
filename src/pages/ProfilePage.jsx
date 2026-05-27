import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";

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

  return (
    <>
      <header>
        <h1>Profile</h1>
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
