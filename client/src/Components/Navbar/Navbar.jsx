import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { ReactComponent as CodeSvg } from "../../Assets/SVGs/code4.svg";

import { authActionTypes } from "../../redux/reducers/auth-reducer";

import "./nav.css";

const Navbar = ({ isAuth, logout }) => (
  <nav className="navbar ">
    {/* <h1> */}
    <Link className="main-logo" to="/">
      <CodeSvg id="thelogosvg" />
      {/* DevLink */}
    </Link>
    {/* </h1> */}
    <ul>
      {isAuth ? (
        <>
          <li>
            <NavLink activeClassName="head-purple" className="nav-links"  to="/profile">Profile</NavLink>
          </li>

          <li>
            <a className="nav-links"
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
            <NavLink className="nav-links" activeClassName="head-orange" to="/signup">Signup</NavLink>
          </li>
          <li>
            <NavLink className="nav-links" activeClassName="head-pink" to="/login">Login</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink className="nav-links" activeClassName="head-red" to="/posts">Posts</NavLink>
      </li>
      <li>
        <NavLink className="nav-links" to="/devs">Developers</NavLink>
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
