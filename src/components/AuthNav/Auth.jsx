import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

const getNavLinkClass = ({ isActive }) =>
  isActive ? `${css.link} ${css.active}` : css.link;

export default function AuthNav() {
  return (
    <div className={css.container}>
      <NavLink className={getNavLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={getNavLinkClass} to="/login">
        Log In
      </NavLink>
    </div>
  );
}
