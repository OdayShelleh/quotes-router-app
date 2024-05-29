import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Great Quote</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              to="quotes"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="new-quote"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              New Quote
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
