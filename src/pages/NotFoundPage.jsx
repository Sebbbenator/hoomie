import { useNavigate } from "react-router-dom";
import "../css_pages/NotFound.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-top">
        <button className="notfound-back" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

      </div>

      <div className="notfound-bottom">
        <h1>Åh nej!</h1>
        <p>
          Det ser ud til, at noget gik galt.
          <br />
          Lad os prøve at komme på rette spor igen
        </p>

        <div className="notfound-btn-bar">
          <button className="notfound-btn" onClick={() => navigate("/")}>
            Gå tilbage
          </button>
        </div>
      </div>
    </div>
  );
}
