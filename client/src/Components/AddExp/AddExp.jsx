import React, { useState } from "react";
import { connect } from "react-redux";

import PrivateComponents from "../PrivateComponents/PrivateComponents";
import { addExpActionCreator } from "../../redux/reducers/profile-reducer";

import { useHistory } from "react-router-dom";
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

  return (
    <>
      <Alert />
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
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
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={values.from}
            onChange={onChangefunc}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={values.current}
              onChange={onChangefunc}
            />
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
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
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </>
  );
};

export default PrivateComponents(
  connect(null, (dispatch) => ({
    addExp: (values, history) => dispatch(addExpActionCreator(values, history)),
  }))(AddExp)
);
