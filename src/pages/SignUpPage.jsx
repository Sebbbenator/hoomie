import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import "../css_pages/SignUpPage.css";
import AuthButton from "../components/AuthButton";
import AuthHeading from "../components/AuthHeading";
import TopbarBig from "../components/TopbarBig";
import { supabase } from "../lib/supabaseClient";

function SignUpPage() {
  const emailRedirectTo = new URL("/", window.location.origin).toString();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo,
        data: {
          name,
        },
      },
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setUser(data.user ?? null);
    if (!data.session) {
      setSuccess("Account created. Check your email to confirm your signup.");
    }
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
    <div className="signup-page">
      <div className="signup-page__topbar">
        <TopbarBig color="var(--green)" />
      </div>

      <main className="signup-page__content">
        <section className="signup-page__card" aria-labelledby="signup-title">
          <AuthHeading
            titleId="signup-title"
            title="Opret bruger"
            subtitle="Velkommen tilbage, du har været savnet homie!"
          />

          {error && (
            <p className="signup-page__message signup-page__message--error">
              {error}
            </p>
          )}
          {success && (
            <p className="signup-page__message signup-page__message--success">
              {success}
            </p>
          )}

          <form className="signup-page__form" onSubmit={handleSignUp}>
            <input
              className="signup-page__input"
              type="text"
              placeholder="Navn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <input
              className="signup-page__input"
              type="email"
              placeholder="Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <input
              className="signup-page__input"
              type="password"
              placeholder="Adgangskode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <input
              className="signup-page__input"
              type="password"
              placeholder="Bekræft Adgangskode"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />

            <AuthButton
              type="submit"
              variant="success"
              className="signup-page__submit"
              disabled={
                loading || !name || !email || !password || !confirmPassword
              }
            >
              {loading ? "Please wait..." : "Opret Bruger"}
            </AuthButton>
          </form>
        </section>
      </main>
    </div>
  );
}

export default SignUpPage;
