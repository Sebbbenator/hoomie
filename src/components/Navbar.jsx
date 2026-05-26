import { NavLink } from "react-router";
import "../css_components/Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/task">Task</NavLink>
      <NavLink to="/list">List</NavLink>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/calendar">Calendar</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
}
