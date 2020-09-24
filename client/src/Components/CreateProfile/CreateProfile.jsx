import React, { useState } from "react";
import { connect } from "react-redux";

import PrivateComponents from "../PrivateComponents/PrivateComponents";
import Alert from "../Alert/Alert";

import { createProfileActionCreator } from "../../redux/reducers/profile-reducer";

import { useHistory, Link } from "react-router-dom";

const initValues = {
  bio: "",
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubUsername: "",
  linkedin: "",
  twitter: "",
};

const inpChange = (name, value, values) => ({ ...values, [name]: value });

const CreateProfile = ({ submitProfile, editMode, profileData }) => {
  //   console.log(editMode, profileData);
  const [values, setValues] = useState(editMode ? profileData : initValues);
  const history = useHistory();
  const onChangefunc = (ev) =>
    setValues(inpChange(ev.target.name, ev.target.value, values));

  //   console.log(profileData);

  return (
    <div className="landing-inner" >
      <Alert />
      <h1 className="large head-brown">Create Your Profile</h1>
      <p className="lead text-gray ">
        <i className="fas fa-user text-gray"></i> Let's get some information to make your
        profile stand out
      </p>
      <small className="text-gray" >* = required field</small>
      <form
        className="form"
        onSubmit={(ev) => {
          ev.preventDefault();
          console.log(values);
          submitProfile(values, history);
        }}
      >
        <div className="form-group">
          <select name="status" onChange={onChangefunc} value={values.status}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text text-gray">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            onChange={onChangefunc}
            value={values.company}
          />
          <small className="form-text text-gray">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            onChange={onChangefunc}
            name="website"
            value={values.website}
          />
          <small className="form-text text-gray">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            onChange={onChangefunc}
            name="location"
            value={values.location}
          />
          <small className="form-text text-gray">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            onChange={onChangefunc}
            name="skills"
            value={values.skills}
          />
          <small className="form-text text-gray">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubUsername"
            onChange={onChangefunc}
            value={values.githubUsername}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            onChange={onChangefunc}
            name="bio"
            value={values.bio}
          ></textarea>
          <small className="form-text text-gray">Tell us a little about yourself</small>
        </div>

        {/* <div className="my-2">
          <button type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div> */}

        <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input
            type="text"
            onChange={onChangefunc}
            placeholder="Twitter URL"
            name="twitter"
            value={values.twitter}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input
            type="text"
            onChange={onChangefunc}
            placeholder="Linkedin URL"
            name="linkedin"
            value={values.linkedin}
          />
        </div>
        <input type="submit" className="btn bg-brown my-1" />
        <Link className="btn bg-darky my-1" to="/profile">
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default PrivateComponents(
  connect(null, (dispatch) => ({
    submitProfile: (values, history) =>
      dispatch(createProfileActionCreator(values, history)),
  }))(CreateProfile)
);
