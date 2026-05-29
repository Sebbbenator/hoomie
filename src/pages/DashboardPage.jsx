import TopbarBig from "../components/TopbarBig";
import Hoomie from "../components/Hoomie";
import smileEyes from "../assets/Hoomie/Øjne/Property 1=Smile.svg";


export default function DashboardPage() {
  return (
    <>
      <header>
        <h1>Dashboard</h1>
      </header>
      <main>
        <p>Welcome to the dashboard page...</p>

      </main>
      <Hoomie eyes={smileEyes} />
    </>
  );
}
