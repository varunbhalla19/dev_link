import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getDevProfsActionCreator } from "../../redux/reducers/devs-reducer";

import { Link } from "react-router-dom";

const Devs = ({ profiles, getProfs }) => {
  useEffect(() => {
    getProfs();
  }, [getProfs]);

  console.log("dev profiles ", profiles);

  return (
    <>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {profiles.map((profile) => (
          <div key={profile._id} className="profile bg-light">
            <img
              style={{ filter: "drop-shadow(2px 3px 6px black)" }}
              className="round-img"
              src={`https://robohash.org/${profile.user.picName}?set=set5`}
              alt=""
            />
            <div>
              <h2>{profile.user.name}</h2>
              <p>
                {profile.status} at {profile.company}
              </p>
              <p>{profile.location}</p>
              <Link to={`user/${profile.user._id}`} className="btn btn-primary">
                View Profile
              </Link>
            </div>

            <ul>
              {profile.skills.map((skill) => (
                <li key={skill} className="text-primary">
                  <i className="fas fa-check"></i> {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default connect(
  (state) => ({
    profiles: state.devs.profiles,
  }),
  (dispatch) => ({
    getProfs: () => dispatch(getDevProfsActionCreator()),
  })
)(Devs);
