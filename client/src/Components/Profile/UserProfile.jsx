import React, { useEffect } from "react";
import { connect } from "react-redux";

import { withRouter, Redirect } from "react-router-dom";

import Dashboard from "./Dashboard";

import { getSingleDevActionCreator } from "../../redux/reducers/devs-reducer";

const UserProfile = ({ match, profile, getProfile, user }) => {
  console.log(profile);

  useEffect(() => {
    getProfile(match.params.userId);
  }, [getProfile, match.params.userId]);

  if (
    !profile.loading &&
    profile.exist &&
    user._id === profile.profile.user._id
  ) {
    return <Redirect to="/profile" />;
  }

  return profile.loading ? (
    <h2 style={{ textAlign: "center" }} className="head-purple">
      Loading...
    </h2>
  ) : profile.exist ? (
    <Dashboard
      profile={profile.profile}
      exist={profile.exist}
      delfunc={null}
      deleteExp={null}
      user={null}
      isMe={user._id === profile.profile.user._id}
    />
  ) : (
    <h2 className="head-purple" style={{ textAlign: "center" }}>
      {" "}
      This Profile doesn't exist yet.{" "}
    </h2>
  );
};

export default withRouter(
  connect(
    (state) => ({
      user: state.auth.user,
      profile: state.devs.publicProfile,
    }),
    (dispatch) => ({
      getProfile: (id) => dispatch(getSingleDevActionCreator(id)),
    })
  )(UserProfile)
);
