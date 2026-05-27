// lavet med hjælp fra https://www.youtube.com/watch?v=fq_Cd8U_YKM 

import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import "../css_pages/SignInPage.css";
import { supabase } from "../lib/supabaseClient";



function SignInPage() {
  const navigate = useNavigate();
  const [email,setEmail]=useState("");
  const [password , setPassword]=useState("");
  const [user,setUser]=useState(null);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  const handleLogin = async ()=>{
    setError("");
    setLoading(true);
    const {data,error} = await supabase.auth.signInWithPassword({email,password});
    setLoading(false);
    if (error) return setError(error.message);
    setUser(data.user ?? null);
    navigate("/task", { replace: true });
  }


  // keep session + react to changes
  useEffect(() => {

    const init = async () => {
      // 1. Get the current session from Supabase
      const { data: { session } } = await supabase.auth.getSession();
      // 2. If a user is logged in, setUser updates the state with user data, else null
      setUser(session?.user ?? null);
    };

    init();

    // 3. Listen to authentication state changes (login, logout, refresh)
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        // 4. Update the user state whenever auth changes
        setUser(session?.user ?? null);
      });

    // 5. Cleanup: unsubscribe when component unmounts
    return () => subscription.unsubscribe();
  }, []);

  if (user) {
    return <Navigate to="/task" replace />;
  }



  return (
    <div className="container">
      <div className="card">
        <h2>React Supabase Login</h2>
        {error && <p className="error">{error}</p>}
        {loading?"Please wait ..":""}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}

        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          
        />
        <div className="button-group">
          <button className="login"
                  onClick={handleLogin}
                  disabled={loading || !email || !password }
          >
            Login
          </button>
          <button className="signup"
                  onClick={() => navigate("/signup")}
                  disabled={loading}
          >
            Sign Up
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;