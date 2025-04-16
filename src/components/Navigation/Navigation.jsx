import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
const Navigation = () => {
  const addActive = ({ isActive }) => (isActive ? s.active : s.link);
  return (
    <header>
      <nav>
        <ul className={s["nav-list"]}>
          <li>
            <NavLink className={addActive} to={"/"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={addActive} to={"/movies"}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
