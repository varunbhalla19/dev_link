import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar bg-dark">
    <h1>
      <Link to="/">
        <i className="fas fa-code"></i> DevLink
      </Link>
    </h1>
    <ul>
      <li>
        <NavLink to="/profiles">Developers</NavLink>
      </li>
      <li>
        <NavLink to="/signup">Signup</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
