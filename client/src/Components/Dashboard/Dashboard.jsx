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
    </>
  ) : (
    <>
      <h1 className="large text-primary">{user.name}</h1>
      <p className="lead">{profile.bio}</p>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="fab fa-black-tie text-primary"></i> Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Add Education
        </Link>
      </div>

      <h2 className="my-2">Experience Credentials</h2>
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
          ))}
          {/* <tr>
            <td>Traversy Media</td>
            <td className="hide-sm">Instructor & Developer</td>
            <td className="hide-sm">02-03-2015 - Now</td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr> */}
        </tbody>
      </table>

      <h2 className="my-2">Education Credentials</h2>
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
      </table>

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
