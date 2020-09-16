import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LinkSvg } from "../../Assets/SVGs/teamworkSVG.svg";

const Navbar = () => (
  <section className="landing">
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">DevLink</h1>
        <LinkSvg />
        <p className="lead">
          Create a developer profile, share ideas, projects and connect with
          other developers.
        </p>
        <div className="buttons">
          <Link to="/signup" className="btn btn-primary">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-light">
            Login
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Navbar;
