import { useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import Navbar from "./components/Navbar";
import StartupSplash from "./components/StartupSplash";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import TaskPage from "./pages/TaskPage";
import ListPage from "./pages/ListPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import CalendarPage from "./pages/CalenderPage";
import PreboardingPage from "./pages/PreboardingPage";
import PreboardingTaskPage from "./pages/PreboardingTaskPage";

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
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/preboarding-task" ||
    location.pathname === "/signup" ||
    location.pathname === "/signin";

  // Ai hjalp med hvordan jeg kunne implementere lottie animationen, når appen starter */
  if (showOpenApp) {
    return (
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
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<PreboardingPage />} />
        <Route path="/preboarding-task" element={<PreboardingTaskPage />} />
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
  );
}
