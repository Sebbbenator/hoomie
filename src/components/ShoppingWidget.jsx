import { NavLink } from "react-router";
import rightArrow from "../assets/icons/right-arrow.svg";
import shoppingCart from "../assets/icons/shopping.svg";
import "../css_components/ShoppingWidget.css";

export default function ShoppingWidget() {
  const items = [
    { name: "Toilet Papir", color: "var(--blue)" },
    { name: "Salt", color: "var(--orange)" },
    { name: "Skruer", color: "var(--violet)" },
    { name: "Pasta", color: "var(--orange)" },
  ];

  return (
    <NavLink
      to="/list"
      className="shopping-widget-link"
      aria-label="Gå til indkøbsliste"
    >
      <div className="shopping-widget">
        <div className="widget-header">
          <h2>Indkøb</h2>
          <img src={shoppingCart} alt="Shopping Cart" className="cart-icon" />
        </div>

        <div className="shopping-list">
          {items.map((item, index) => (
            <div key={index} className="shopping-item">
              <span
                className="item-dot"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        <div className="next-button" aria-hidden="true">
          <img src={rightArrow} alt="" aria-hidden="true" />
        </div>
      </div>
    </NavLink>
  );
}
