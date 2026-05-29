/* Ai hjalp med hvordan jeg kunne implementere lottie animationen, eller den lavede alt det her */
import { useEffect, useRef, useState } from "react";
import * as LottieReact from "lottie-react";
import openAppAnimation from "../assets/lottie/Open-App.json";

const Lottie = LottieReact.default?.default ?? LottieReact.default ?? LottieReact;
const FALLBACK_DURATION_MS = 4000;

export default function StartupSplash({ onDone }) {
	const lottieRef = useRef(null);
	const [ended, setEnded] = useState(false);

	useEffect(() => {
		lottieRef.current?.play?.();

		const fallbackTimer = window.setTimeout(() => {
			setEnded(true);
		}, FALLBACK_DURATION_MS);

		return () => {
			window.clearTimeout(fallbackTimer);
		};
	}, []);

	useEffect(() => {
		if (ended) {
			onDone();
		}
	}, [ended, onDone]);

	return (
		<main
			style={{
				minHeight: "100vh",
				width: "100%",
				background: "#2f3136",
				display: "grid",
				placeItems: "center",
			}}
		>
			<Lottie
				lottieRef={lottieRef}
				animationData={openAppAnimation}
				autoplay
				loop={false}
				onComplete={() => setEnded(true)}
				style={{ width: "100vw", height: "100vh" }}
			/>
		</main>
	);
}
