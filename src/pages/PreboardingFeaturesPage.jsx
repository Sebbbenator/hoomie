import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as LottieReact from "lottie-react";
import AuthButton from "../components/AuthButton";
import AuthHeading from "../components/AuthHeading";
import featuresAnimation from "../assets/lottie/2-4.json";
import "../css_pages/PreboardingPage.css";

const Lottie =
  LottieReact.default?.default ?? LottieReact.default ?? LottieReact;
const FINAL_FRAME = Math.max((featuresAnimation.op ?? 1) - 1, 0);

export default function PreboardingFeaturesPage() {
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
          animationData={featuresAnimation}
          autoplay
          loop={false}
          onComplete={handleComplete}
          className="preboarding-page__animation"
        />
        <div className="preboarding-page__overlay">
          <AuthHeading
            title="Alt det vigtige samlet ét sted"
            subtitle="Få overblik over dine planer, dine opgaver og det, du ellers nemt glemmer i en travl hverdag."
            className={`preboarding-page__heading ${finished ? "is-ready" : ""}`}
          />

          <AuthButton
            variant="secondary"
            className="preboarding-page__button"
            secondaryColor="var(--yellow)"
            onClick={() => navigate("/preboarding-leaderboard")}
          >
            Fortsæt
          </AuthButton>
        </div>
      </div>
    </main>
  );
}
