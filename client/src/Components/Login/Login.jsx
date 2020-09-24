import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { alertActionCreator } from "../../redux/reducers/alert-reducer";
import { loginActionCreator } from "../../redux/reducers/auth-reducer";

import Alert from "../Alert/Alert";

const initValues = {
  email: "",
  password: "",
};

const changeInput = (name, value, values) => ({ ...values, [name]: value });

const Login = ({ dispatchfunc, login, isAuth }) => {
  const [values, setValues] = useState(initValues);

  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <div className="landing-inner landing-column ">
      <Alert />
      <h1 className="large head-pink">Log In</h1>
      <p className="lead text-gray ">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form
        className="form"
        onSubmit={(ev) => {
          ev.preventDefault();
          console.log(values);
          login(values);
        }}
      >
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            onChange={(ev) =>
              setValues(changeInput(ev.target.name, ev.target.value, values))
            }
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(ev) =>
              setValues(changeInput(ev.target.name, ev.target.value, values))
            }
          />
        </div>
        <input type="submit" className="btn btn-pink" value="Login" />
        {/* <button onClick={(ev) => dispatchfunc("danger", "Just an Alert")}>
          Dispatch!
        </button> */}
      </form>
      <p className="my-1 text-gray">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default connect(
  (state) => ({
    isAuth: state.auth.isAuth,
  }),
  (dispatch) => ({
    dispatchfunc: (style, message) =>
      dispatch(alertActionCreator(style, message)),
    login: (loginData) => dispatch(loginActionCreator(loginData)),
  })
)(Login);
