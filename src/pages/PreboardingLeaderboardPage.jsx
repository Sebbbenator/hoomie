import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as LottieReact from "lottie-react";
import AuthButton from "../components/AuthButton";
import AuthHeading from "../components/AuthHeading";
import leaderboardAnimation from "../assets/lottie/3-4.json";
import "../css_pages/PreboardingPage.css";

const Lottie =
  LottieReact.default?.default ?? LottieReact.default ?? LottieReact;
const FINAL_FRAME = Math.max((leaderboardAnimation.op ?? 1) - 1, 0);

export default function PreboardingLeaderboardPage() {
  const navigate = useNavigate();
  const lottieRef = useRef(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    lottieRef.current?.play?.();
  }, []);

  const handleComplete = () => {
    lottieRef.current?.goToAndStop?.(FINAL_FRAME, true);
    setFinished(true);
  };

  return (
    <main className="preboarding-page">
      <div className="preboarding-page__stage">
        <Lottie
          lottieRef={lottieRef}
          animationData={leaderboardAnimation}
          autoplay
          loop={false}
          onComplete={handleComplete}
          className="preboarding-page__animation"
        />
        <div className="preboarding-page__overlay">
          <AuthHeading
            title="Du kan se det hele i et overblik"
            subtitle="Hold styr på fremskridt, opgaver og dine næste skridt, så du altid ved, hvad der mangler."
            className={`preboarding-page__heading ${finished ? "is-ready" : ""}`}
          />

          <AuthButton
            variant="secondary"
            className="preboarding-page__button"
            secondaryColor="var(--green)"
            onClick={() => navigate("/preboarding-signup")}
          >
            Fortsæt
          </AuthButton>
        </div>
      </div>
    </main>
  );
}