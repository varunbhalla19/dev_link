import React, { useState } from "react";

import { Link } from "react-router-dom";

const initValues = {
  email: "",
  password: "",
};

const changeInput = (name, value, values) => ({ ...values, [name]: value });

const Login = () => {
  const [values, setValues] = useState(initValues);
  return (
    <>
      {/* <div className="alert alert-danger">Invalid credentials</div> */}
      <h1 className="large text-primary">Log In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form
        className="form"
        onSubmit={(ev) => {
          ev.preventDefault();
          console.log(values);
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </>
  );
};

export default Login;
