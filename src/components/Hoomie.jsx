import "../css_components/Hoomie.css";
import bodyImg from "../assets/Hoomie/Hoomie Body.svg";

export default function Hoomie({eyes}) {
  return (
    <div className="hoomie">
      <div className="hoomie__image-wrap">
        <img src={bodyImg} alt="Hoomie body" className="hoomie__body" />
        <img src={eyes} alt="Hoomie eyes" className="hoomie__eyes" />
      </div>
    </div>
  );
}