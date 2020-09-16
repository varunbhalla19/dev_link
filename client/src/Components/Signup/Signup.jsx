import React, { useState } from "react";

import { Link } from "react-router-dom";

const initValues = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const changeInput = (name, value, values) => ({ ...values, [name]: value });

const Signup = () => {
  const [values, setValues] = useState(initValues);
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
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
          {/* <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small> */}
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

export default Signup;
