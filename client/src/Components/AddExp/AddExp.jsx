import React, { useState } from "react";
import { connect } from "react-redux";

import PrivateComponents from "../PrivateComponents/PrivateComponents";
import { addExpActionCreator } from "../../redux/reducers/profile-reducer";

import { useHistory, Link } from "react-router-dom";
import { Alert } from "../Alert/Alert";

const initValues = {
  title: "",
  company: "",
  location: "",
  from: "",
  current: false,
  to: "",
  description: "",
};

const inpChange = (name, value, values) => ({ ...values, [name]: value });

export const AddExp = ({ addExp }) => {
  const [values, setValues] = useState(initValues);

  const history = useHistory();

  const onChangefunc = (ev) =>
    setValues(inpChange(ev.target.name, ev.target.value, values));

  // console.log(values.current);

  return (
    <div className="landing-inner">
      <Alert />
      <h1 className="large head-green">Add An Experience</h1>
      <p className="lead text-gray ">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small className="text-gray">* = required field</small>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          // console.log(values);
          addExp(values, history);
        }}
        className="form"
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            value={values.title}
            name="title"
            required
            onChange={onChangefunc}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={values.company}
            required
            onChange={onChangefunc}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            onChange={onChangefunc}
            name="location"
            value={values.location}
          />
        </div>
        <div className="form-group">
          <h4 className="text-gray">From Date</h4>
          <input
            type="date"
            name="from"
            value={values.from}
            onChange={onChangefunc}
          />
        </div>
        <div className="form-group">
          <p className="text-gray">
            <input
              type="checkbox"
              name="current"
              value={values.current}
              onChange={(ev) =>
                setValues(inpChange(ev.target.name, ev.target.checked, values))
              }
            />
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4 className="text-gray">To Date</h4>
          <input
            type="date"
            name="to"
            onChange={onChangefunc}
            value={values.to}
            disabled={Boolean(values.current)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            onChange={onChangefunc}
            value={values.description}
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn bg-green my-1" />
        <Link className="btn bg-dark my-1" to="/profile">
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default PrivateComponents(
  connect(null, (dispatch) => ({
    addExp: (values, history) => dispatch(addExpActionCreator(values, history)),
  }))(AddExp)
);
