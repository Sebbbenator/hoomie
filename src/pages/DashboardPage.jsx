import TopbarMedium from "../components/TopbarMedium";
import Hoomie from "../components/Hoomie";
import HoomieKlovn from "../assets/Hoomie/HoomieKlovn.svg";
import HoomieDown from "../assets/Hoomie/HoomieDown.svg";
import Hoomie404 from "../assets/Hoomie/Hoomie404.svg";

export default function DashboardPage() {
  return (
    <>
      <TopbarMedium
        color="var(--violet)" 
        hoomieState={HoomieKlovn} 
      />
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
