import { useNavigate } from "react-router";
import TopbarSmall from "../components/TopbarSmall";

export default function TaskPage() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <TopbarSmall
          color="var(--green)"
          title="Task"
          notificationLabel="Open notifications"
          onNotificationClick={() => navigate("/notifications")}
        />
        <h1>Task</h1>
      </header>
      <main>
        <p>This is the task page.</p>
      </main>
    </>
  );
}
