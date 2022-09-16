import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

const activeStyle = {
  borderBottom: "2px solid #fff",
  color: "#fff",
  textDecoration: "none",
};

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes["logo-box"]}>
          <NavLink to="/">Portfolio</NavLink>
        </div>
        <div className={classes["list-box"]}>
          <ul>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/stock-list"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Available Stock
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profit-loss"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Individual Profit/Loss
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Buy/Sell Stock
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
