import { useNavigate } from "react-router";
import TopbarLarge from "../components/TopbarLarge";
import Hoomie from "../components/Hoomie";
import Hoomie404 from "../assets/Hoomie/Hoomie404.svg";
import "../css_pages/NotFound.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-top">
        <TopbarLarge
          color="var(--yellow)"
          showTitle={false}
          showSettings={false}
        />
        <div className="notfound-hoomie">
          <Hoomie HoomieState={Hoomie404} />
        </div>
      </div>

      <div className="notfound-bottom">
        <h1>Åh nej!</h1>
        <p>
          Det ser ud til, at noget gik galt.
          <br />
          Lad os prøve at komme på rette spor igen
        </p>

        <div className="notfound-btn-bar">
          <button className="notfound-btn" onClick={() => navigate("/task")}>
            Gå tilbage
          </button>
        </div>
      </div>
    </div>
  );
}
