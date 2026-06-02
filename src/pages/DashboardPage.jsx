import TopbarMedium from "../components/TopbarMedium";
import Hoomie from "../components/Hoomie";
import HoomieKlovn from "../assets/Hoomie/HoomieKlovn.svg";
import HoomieDown from "../assets/Hoomie/HoomieDown.svg";
import Hoomie404 from "../assets/Hoomie/Hoomie404.svg";
import ShoppingWidget from "../components/ShoppingWidget";

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <TopbarMedium color="var(--violet)" hoomieState={HoomieKlovn} />
      <section className="small-widgets dashboard-page__widgets">
        <ShoppingWidget />
        <ShoppingWidget />
      </section>
    </div>
  );
}
