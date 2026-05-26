import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import TaskPage from "./pages/TaskPage";
import ListPage from "./pages/ListPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import CalendarPage from "./pages/CalenderPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Navbar />
    </>
  );
}
