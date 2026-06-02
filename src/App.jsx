import React, { useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

const StartupSplash = lazy(() => import("./components/StartupSplash"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const TaskPage = lazy(() => import("./pages/TaskPage"));
const ListPage = lazy(() => import("./pages/ListPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const CalendarPage = lazy(() => import("./pages/CalenderPage"));
const PreboardingPage = lazy(() => import("./pages/PreboardingPage"));
const PreboardingTaskPage = lazy(() => import("./pages/PreboardingTaskPage"));
const PreboardingFeaturesPage = lazy(
  () => import("./pages/PreboardingFeaturesPage"),
);
const PreboardingLeaderboardPage = lazy(
  () => import("./pages/PreboardingLeaderboardPage"),
);
const PreboardingSignupPage = lazy(
  () => import("./pages/PreboardingSignupPage"),
);

// Ai hjalp med hvordan jeg kunne implementere lottie animationen, når appen starter */
const OPEN_APP_KEY = "hoomie-open-app-played";

export default function App() {
  const location = useLocation();
  const [showOpenApp, setShowOpenApp] = useState(() => {
    try {
      return sessionStorage.getItem(OPEN_APP_KEY) !== "true";
    } catch {
      return false;
    }
  });
  //Ai hjalp med hvordan jeg skulle gemme navbar på log in og sign up siden
  const navbarRoutes = ["/dashboard", "/task", "/list", "/profile", "/calendar"];
  const hideNavbar = !navbarRoutes.includes(location.pathname);

  // Ai hjalp med hvordan jeg kunne implementere lottie animationen, når appen starter */
  if (showOpenApp) {
    return (
      <Suspense fallback={<Loading />}>
        <StartupSplash
          onDone={() => {
            try {
              sessionStorage.setItem(OPEN_APP_KEY, "true");
            } catch {
              // If sessionStorage is unavailable, we still continue into the app.
            }

            setShowOpenApp(false);
          }}
        />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <>
        <Routes>
          <Route path="/" element={<PreboardingPage />} />
          <Route path="/preboarding-task" element={<PreboardingTaskPage />} />
          <Route
            path="/preboarding-features"
            element={<PreboardingFeaturesPage />}
          />
          <Route
            path="/preboarding-leaderboard"
            element={<PreboardingLeaderboardPage />}
          />
          <Route
            path="/preboarding-signup"
            element={<PreboardingSignupPage />}
          />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/task" element={<TaskPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {!hideNavbar && <Navbar />}
      </>
    </Suspense>
  );
}
