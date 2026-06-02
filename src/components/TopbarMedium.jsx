import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import HoomieKlovn from "../assets/Hoomie/HoomieKlovn.svg";
import "../css_components/TopbarMedium.css";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Godmorgen";
  if (hour >= 12 && hour < 17) return "Goddag";
  if (hour >= 17 && hour < 22) return "Godaften";
  return "Godnat";
}

export default function TopbarMedium({
  color = "var(--violet)",
  hoomieState = HoomieKlovn,
}) {
  const [userName, setUserName] = useState("");

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

  return (
    <div className="topbar-medium" style={{ "--topbar-color": color }}>
      <div className="topbar-medium__content">
        <div className="topbar-medium__greeting">
          <h1 className="topbar-medium__title">{getGreeting()}</h1>
          {userName && <p className="topbar-medium__name">{userName}</p>}
        </div>
        <img
          className="topbar-medium__mascot"
          src={hoomieState}
          alt=""
          aria-hidden="true"
        />
      </div>
      <svg
        className="topbar-medium__shape"
        viewBox="0 0 393 147"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M393 0H0V137C0 137 50.4014 146.001 83 145.888C129.284 145.727 153.721 127.695 200 126.981C250.091 126.209 277.3 151.353 327 145.06C353.512 141.703 393 126.981 393 126.981V0Z" />
      </svg>
    </div>
  );
}
