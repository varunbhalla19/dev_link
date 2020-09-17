import React, { useState } from "react";

import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { alertActionCreator } from "../../redux/reducers/alert-reducer";
import { signupActionCreator } from "../../redux/reducers/auth-reducer";

import Alert from "../Alert/Alert";

const initValues = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const changeInput = (name, value, values) => ({ ...values, [name]: value });

const Signup = ({ setWarning, signup, isAuth }) => {
  const [values, setValues] = useState(initValues);

  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <>
      <Alert />
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form
        className="form"
        onSubmit={(ev) => {
          ev.preventDefault();
          if (values.password !== values.password2) {
            setWarning("danger", "Passwords didn't match");
          } else {
            console.log(values);
            signup(values);
          }
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            onChange={(ev) =>
              setValues(changeInput(ev.target.name, ev.target.value, values))
            }
            value={values.name}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            onChange={(ev) =>
              setValues(changeInput(ev.target.name, ev.target.value, values))
            }
            placeholder="Email Address"
            name="email"
            value={values.email}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={(ev) =>
              setValues(changeInput(ev.target.name, ev.target.value, values))
            }
            value={values.password}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            onChange={(ev) =>
              setValues(changeInput(ev.target.name, ev.target.value, values))
            }
            value={values.password2}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </>
  );
};

export default connect(
  ({ auth }) => ({ isAuth: auth.isAuth }),
  (dispatch) => ({
    setWarning: (style, message) =>
      dispatch(alertActionCreator(style, message)),
    signup: (signupData) => dispatch(signupActionCreator(signupData)),
  })
)(Signup);
