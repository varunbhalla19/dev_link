import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { authActionTypes } from "../../redux/reducers/auth-reducer";

const Navbar = ({ isAuth, logout }) => (
  <nav className="navbar bg-dark">
    <h1>
      <Link to="/">
        <i className="fas fa-code"></i> DevLink
      </Link>
    </h1>
    <ul>
      {isAuth ? (
        <>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>

          <li>
            <a
              href="#!"
              onClick={(ev) => {
                ev.preventDefault();
                logout();
              }}
            >
              Logout
            </a>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/posts">Posts</NavLink>
      </li>
      <li>
        <NavLink to="/devs">Developers</NavLink>
      </li>
    </ul>
  </nav>
);

export default connect(
  ({ auth }) => ({ isAuth: auth.isAuth }),
  (dispatch) => ({
    logout: () => {
      dispatch({ type: "CLEAR_PROFILE" });
      dispatch({ type: authActionTypes.LOGOUT });
    },
  })
)(Navbar);
