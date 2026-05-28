// lavet med hjælp fra https://www.youtube.com/watch?v=fq_Cd8U_YKM

import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import "../css_pages/SignInPage.css";
import AuthButton from "../components/AuthButton";
import AuthHeading from "../components/AuthHeading";
import { supabase } from "../lib/supabaseClient";
import TopbarBig from "../components/TopbarBig";

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) return setError(error.message);
    setUser(data.user ?? null);
    navigate("/task", { replace: true });
  };

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (user) {
    return <Navigate to="/task" replace />;
  }

  return (
    <div className="signin-page">
      <div className="signin-page__topbar">
        <TopbarBig color="var(--violet)" />
      </div>

      <main className="signin-page__content">
        <section className="signin-page__card" aria-labelledby="signin-title">
          <AuthHeading
            titleId="signin-title"
            title="Log ind her!"
            subtitle="Velkommen tilbage, du har været savnet homie!"
          />

          {error && <p className="signin-page__message">{error}</p>}

          <form
            className="signin-page__form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              className="signin-page__input"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <input
              className="signin-page__input"
              type="password"
              placeholder="Adgangskode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <button
              type="button"
              className="signin-page__forgot"
              onClick={() => navigate("/forgot-password")}
              disabled={loading}
            >
              Glemt din kode?
            </button>

            <AuthButton
              type="submit"
              variant="primary"
              className="signin-page__submit"
              disabled={loading || !email || !password}
            >
              {loading ? "Please wait..." : "Log ind"}
            </AuthButton>

            <AuthButton
              variant="secondary"
              className="signin-page__signup"
              onClick={() => navigate("/signup")}
              disabled={loading}
            >
              Opret Bruger
            </AuthButton>
          </form>
        </section>
      </main>
    </div>
  );
}

export default SignInPage;
