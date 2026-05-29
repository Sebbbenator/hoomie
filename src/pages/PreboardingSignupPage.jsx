import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as LottieReact from "lottie-react";
import AuthButton from "../components/AuthButton";
import AuthHeading from "../components/AuthHeading";
import signupAnimation from "../assets/lottie/4-4.json";
import "../css_pages/PreboardingPage.css";

const Lottie =
  LottieReact.default?.default ?? LottieReact.default ?? LottieReact;
const FINAL_FRAME = Math.max((signupAnimation.op ?? 1) - 1, 0);

export default function PreboardingSignupPage() {
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
          animationData={signupAnimation}
          autoplay
          loop={false}
          onComplete={handleComplete}
          className="preboarding-page__animation"
        />
        <div className="preboarding-page__overlay">
          <AuthHeading
            title="Så er du klar til at komme i gang"
            subtitle="Opret din bruger og begynd at bruge Hoomie på få sekunder."
            className={`preboarding-page__heading ${finished ? "is-ready" : ""}`}
          />

          <AuthButton
            variant="secondary"
            className="preboarding-page__button"
            secondaryColor="var(--violet)"
            onClick={() => navigate("/signin")}
          >
            Fortsæt
          </AuthButton>
        </div>
      </div>
    </main>
  );
}