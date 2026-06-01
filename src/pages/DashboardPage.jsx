import TopbarBig from "../components/TopbarBig";
import Hoomie from "../components/Hoomie";
import HoomieDown from "../assets/Hoomie/HoomieDown.svg";
import Hoomie404 from "../assets/Hoomie/Hoomie404.svg";

export default function DashboardPage() {
  return (
    <>
      <header>
        <h1>Dashboard</h1>
      </header>
      <main>
        <p>Welcome to the dashboard page...</p>
        <Hoomie HoomieState={Hoomie404} />
      </main>
    </>
  );
}
