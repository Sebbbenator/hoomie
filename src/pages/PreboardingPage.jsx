import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as LottieReact from "lottie-react";
import AuthButton from "../components/AuthButton";
import AuthHeading from "../components/AuthHeading";
import preboardingAnimation from "../assets/lottie/Preboarding-Start.json";
import "../css_pages/PreboardingPage.css";
/* Ai hjalp med hvordan jeg kunne implementere lottie animationen */
const Lottie = LottieReact.default?.default ?? LottieReact.default ?? LottieReact;

export default function PreboardingPage() {
  const navigate = useNavigate();
  const lottieRef = useRef(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    lottieRef.current?.play?.();
  }, []);
/* dette er dog lavet af os */
  return (
    <main className="preboarding-page">
      <div className="preboarding-page__stage">
        <Lottie
          lottieRef={lottieRef}
          animationData={preboardingAnimation}
          autoplay
          loop={false}
          onComplete={() => setFinished(true)}
          className="preboarding-page__animation"
        />
        <div className="preboarding-page__overlay">
          <AuthHeading
            title="Velkommen til Hoomie!"
            subtitle="Appen, der strukturerer din hverdag."
            className={`preboarding-page__heading ${finished ? "is-ready" : ""}`}
          />

          <AuthButton
            variant="secondary"
            className="preboarding-page__button"
            onClick={() => navigate("/signin")}
          >
            Fortsæt
          </AuthButton>
        </div>
      </div>
    </main>
  );
}