import { useNavigate } from "react-router-dom";
import TopbarBig from "../components/TopbarBig";
import "../css_pages/NotFound.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-top">
        <TopbarBig color="var(--yellow)" showBack={false} />
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
