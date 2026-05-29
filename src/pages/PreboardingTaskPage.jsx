import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as LottieReact from "lottie-react";
import AuthButton from "../components/AuthButton";
import AuthHeading from "../components/AuthHeading";
import welcomeAnimation from "../assets/lottie/Velkommen.json";
import onboardingAnimation from "../assets/lottie/1-4.json";
import "../css_pages/PreboardingPage.css";

const Lottie =
  LottieReact.default?.default ?? LottieReact.default ?? LottieReact;
const FINAL_FRAME = Math.max((onboardingAnimation.op ?? 1) - 1, 0);

export default function PreboardingTaskPage() {
  const navigate = useNavigate();
  const lottieRef = useRef(null);
  const [stage, setStage] = useState("welcome");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    lottieRef.current?.play?.();
  }, [stage]);

  const animationData =
    stage === "welcome" ? welcomeAnimation : onboardingAnimation;

  const handleComplete = () => {
    if (stage === "welcome") {
      setStage("onboarding");
      return;
    }

    lottieRef.current?.goToAndStop?.(FINAL_FRAME, true);
    setFinished(true);
  };

  return (
    <main className="preboarding-page">
      <div className="preboarding-page__stage">
        <Lottie
          key={stage}
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay
          loop={false}
          onComplete={handleComplete}
          className="preboarding-page__animation"
        />
        <div className="preboarding-page__overlay">
          <AuthHeading
            title="Hverdagen er allerede kaotisk nok"
            subtitle="Hoomie hjælper dig med at huske, planlægge og få ting gjort — uden at du skal holde det hele i hovedet."
            className={`preboarding-page__heading ${finished ? "is-ready" : ""}`}
          />

          <AuthButton
            variant="secondary"
            className="preboarding-page__button"
            secondaryColor="var(--orange)"
            onClick={() => navigate("/signin")}
          >
            Fortsæt
          </AuthButton>
        </div>
      </div>
    </main>
  );
}
