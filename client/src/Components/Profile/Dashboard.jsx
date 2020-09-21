import React from "react";

import { Link } from "react-router-dom";

const Dashboard = ({ profile, deleteExp, delfunc, isMe, exist, user }) => {
  console.log("is it my profile ", isMe);

  return !exist ? (
    <>
      {isMe ? (
        <>
          <h1 className="large text-primary">{user.name}</h1>
          <Link to="/create-profile" className="btn btn-dark">
            <i className="fas fa-user-circle text-primary"></i> Create Profile
          </Link>
          <DelBut delfunc={delfunc} />
        </>
      ) : (
        <>
          <h2>This User doesn't exist</h2>
        </>
      )}
    </>
  ) : (
    <>
      <div className="profile-grid my-1">
        {/* <!-- Top --> */}
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={`https://robohash.org/${
              profile.user.picName || profile.user.name
            }?set=set5`}
            alt=""
            style={{
              background: "#1b1c34",
            }}
          />
          <h1 className="large">{profile.user.name}</h1>
          <p className="lead">
            {profile.status} at {profile.company}
          </p>
          <p>{profile.location}</p>

          <div className="icons my-1">
            <i className="fas fa-globe fa-2x"></i>
            <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
          {isMe ? <DashButtons /> : null}
        </div>

        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">Bio</h2>
          <p>{profile.bio}</p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {profile.skills.map((ski) => (
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
            {profile.experience.map((exp) => (
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
                {!isMe ? null : (
                  <button
                    onClick={(ev) => deleteExp(exp._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {isMe ? (
        <div className="my-2">
          <DelBut delfunc={delfunc} />
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;

const DelBut = (delfunc) => (
  <button onClick={(ev) => delfunc()} className="btn btn-danger">
    <i className="fas fa-user-minus"></i>
    Delete My Account
  </button>
);

const DashButtons = () => (
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
);
