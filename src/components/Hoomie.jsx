import "../css_components/Hoomie.css";

export default function Hoomie({HoomieState}) {
  return (
    <div className="hoomie">
      <div className="hoomie__image-wrap">
        <img src={HoomieState} alt="Hoomie body" className="hoomie__body" />
      </div>
    </div>
  );
}