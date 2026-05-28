import { useNavigate } from "react-router";
import backArrow from "../assets/backarrow.svg";
import "../css_components/BackButton.css";

export default function BackButton({ className = "" }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={`back-button ${className}`.trim()}
      onClick={() => navigate(-1)}
      aria-label="Go back"
    >
      <img src={backArrow} alt="" aria-hidden="true" width="24" height="24" />
    </button>
  );
}
