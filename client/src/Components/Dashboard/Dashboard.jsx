import React, { useEffect } from "react";

import { connect } from "react-redux";
import { Link, history, useHistory } from "react-router-dom";

import PrivateComponents from "../PrivateComponents/PrivateComponents";

import {
  profileActionCreator,
  deleteExpActionCreator,
  deleteProfileActionCreator,
} from "../../redux/reducers/profile-reducer";

const Dashboard = ({ user, getProfile, profile, deleteExp, deleteProfile }) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const history = useHistory();

  return profile.loading ? (
    <h2>Loading...</h2>
  ) : !profile.exist ? (
    <>
      <h1 className="large text-primary">{user.name}</h1>
      <Link to="/create-profile" className="btn btn-dark">
        <i className="fas fa-user-circle text-primary"></i> Create Profile
      </Link>
      <button onClick={() => deleteProfile(history)} className="btn btn-danger">
        <i className="fas fa-user-minus"></i>
        Delete My Account
      </button>
    </>
  ) : (
    <>
      <div className="profile-grid my-1">
        {/* <!-- Top --> */}
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={`https://robohash.org/${profile.profile.picName}?set=set5`}
            alt=""
            style={{
              background: "#1b1c34",
            }}
          />
          <h1 className="large">{user.name}</h1>
          <p className="lead">
            {profile.profile.status} at {profile.profile.company}
          </p>
          <p>{profile.profile.location}</p>
          <div className="icons my-1">
            <i className="fas fa-globe fa-2x"></i>
            <a
              href={profile.profile.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a
              href={profile.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
          <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light">
              <i className="fas fa-user-circle text-primary"></i> Edit Profile
            </Link>
            <Link to="/add-experience" className="btn btn-light">
              <i className="fab fa-black-tie text-primary"></i> Add Experience
            </Link>
            <Link to="/edit-pic" className="btn btn-light">
              <i className="fas fa-portrait text-primary"></i> Edit Picture
            </Link>
          </div>
        </div>

        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">Bio</h2>
          <p>{profile.profile.bio}</p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {profile.profile.skills.map((ski) => (
              <div key={ski} className="p-1">
                <i className="fa fa-check"></i> {ski}
              </div>
            ))}
          </div>
        </div>

        {/* <!-- Experience --> */}
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          <div className="exp-cover">
            {profile.profile.experience.map((exp) => (
              <div key={exp._id}>
                <h3 className="text-dark">{exp.company}</h3>
                <p>Oct 2011 - Current</p>
                <p>
                  <strong>Position: </strong>
                  {exp.title}
                </p>
                <p>
                  <strong>Description: </strong>
                  {exp.description}
                </p>
                <button
                  onClick={(ev) => deleteExp(exp._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <h1 className="large text-primary">{user.name}</h1> */}
      {/* <p className="lead">{profile.profile.bio}</p> */}

      {/* <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {profile.profile.experience.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.company}</td>
              <td className="hide-sm">{exp.description}</td>
              <td className="hide-sm">
                {new Date(exp.from).toLocaleDateString(undefined, {
                  month: "short",
                  year: "numeric",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(exp.to).toLocaleDateString(undefined, {
                  month: "short",
                  year: "numeric",
                  day: "numeric",
                })}
              </td>
              <td>
                <button
                  onClick={(ev) => deleteExp(exp._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))} */}
      {/* <tr>
            <td>Traversy Media</td>
            <td className="hide-sm">Instructor & Developer</td>
            <td className="hide-sm">02-03-2015 - Now</td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr> */}
      {/* </tbody>
      </table> */}

      {/* <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {profile.profile.education.map((ed) => (
            <tr key={ed._id}>
              <td>Northern Essex</td>
              <td className="hide-sm">Associates</td>
              <td className="hide-sm">02-03-2007 - 01-02-2009</td>
              <td>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <div className="my-2">
        <button
          onClick={() => deleteProfile(history)}
          className="btn btn-danger"
        >
          <i className="fas fa-user-minus"></i>
          Delete My Account
        </button>
      </div>
    </>
  );
};

export default PrivateComponents(
  connect(
    (state) => ({
      user: state.auth.user,
      profile: state.profile,
    }),
    (dispatch) => ({
      getProfile: () => dispatch(profileActionCreator()),
      deleteExp: (expId) => dispatch(deleteExpActionCreator(expId)),
      deleteProfile: (history) => dispatch(deleteProfileActionCreator(history)),
    })
  )(Dashboard)
);
