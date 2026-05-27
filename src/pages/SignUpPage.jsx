import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import "../css_pages/SignInPage.css";
import { supabase } from "../lib/supabaseClient";

function SignUpPage() {
  const navigate = useNavigate();
  const emailRedirectTo = new URL("/", window.location.origin).toString();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
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
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (user) {
    return <Navigate to="/task" replace />;
  }

  return (
    <div className="container">
      <div className="card">
        <h2>React Supabase Sign Up</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="error">{success}</p>}
        {loading ? "Please wait .." : ""}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="button-group">
          <button
            className="login"
            onClick={handleSignUp}
            disabled={loading || !name || !email || !password || !confirmPassword}
          >
            Sign Up
          </button>
          <button
            className="signup"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;