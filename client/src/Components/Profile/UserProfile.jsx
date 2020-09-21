import React, { useEffect } from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import Dashboard from "./Dashboard";

import { getSingleDevActionCreator } from "../../redux/reducers/devs-reducer";

const UserProfile = ({ match, profile, getProfile, user }) => {
  console.log(profile);

  useEffect(() => {
    getProfile(match.params.userId);
  }, [getProfile, match.params.userId]);

  return profile.loading ? (
    <h2>Loading...</h2>
  ) : (
    <Dashboard
      profile={profile.profile}
      exist={profile.exist}
      delfunc={null}
      deleteExp={null}
      user={null}
      isMe={user._id === profile.profile.user._id}
    />
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
