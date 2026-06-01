import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as LottieReact from "lottie-react";
import AuthButton from "../components/AuthButton";
import AuthHeading from "../components/AuthHeading";
import Loading from "../components/Loading";
import "../css_pages/PreboardingPage.css";
/* Ai hjalp med hvordan jeg kunne implementere lottie animationen */
const Lottie =
  LottieReact.default?.default ?? LottieReact.default ?? LottieReact;

export default function PreboardingPage() {
  const navigate = useNavigate();
  const lottieRef = useRef(null);
  const [finished, setFinished] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    let mounted = true;
    import("../assets/lottie/Preboarding-Start.json").then((m) => {
      if (mounted) setAnimationData(m.default ?? m);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (animationData) lottieRef.current?.play?.();
  }, [animationData]);
  /* dette er dog lavet af os */
  return (
    <main className="preboarding-page">
      <div className="preboarding-page__stage">
        {animationData ? (
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            autoplay
            loop={false}
            onComplete={() => setFinished(true)}
            className="preboarding-page__animation"
          />
        ) : (
          <div className="preboarding-page__animation">
            <Loading />
          </div>
        )}
        <div className="preboarding-page__overlay">
          <AuthHeading
            title="Velkommen til Hoomie!"
            subtitle="Appen, der strukturerer din hverdag."
            className={`preboarding-page__heading ${finished ? "is-ready" : ""}`}
          />

          <AuthButton
            variant="secondary"
            className="preboarding-page__button"
            onClick={() => navigate("/preboarding-task")}
          >
            Fortsæt
          </AuthButton>
        </div>
      </div>
    </main>
  );
}
