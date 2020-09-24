import React from "react";
import { Link } from "react-router-dom";
// import { ReactComponent as LinkSvg } from "../../Assets/SVGs/teamworkSVG.svg";
import { ReactComponent as CodeSvg } from "../../Assets/SVGs/code4.svg";

import { connect } from "react-redux";

import "./showcase.css";

const Showcase = ({ isAuth }) => (
  <div className="landing">
    {/* <div className="dark-overlay"> */}
    <div className="landing-inner landing-column">
      <h1 className="x-large theme-heading ">DevLink</h1>
      {/* <LinkSvg /> */}
      <TheSvg />
      <p className="lead text-gray ">
        Create a developer profile, share ideas, projects and connect with other
        developers.
      </p>
      {!isAuth && (
        <div className="buttons">
          <Link to="/signup" className="btn btn-primary">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-light pink-btn ">
            Login
          </Link>
        </div>
      )}
    </div>
    {/* </div> */}
  </div>
);

const TheSvg = () => <CodeSvg id="thecodesvg" />;

export default connect((state) => ({
  isAuth: state.auth.isAuth,
}))(Showcase);
