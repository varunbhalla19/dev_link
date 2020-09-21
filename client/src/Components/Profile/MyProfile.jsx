import React, { useEffect } from "react";
import { connect } from "react-redux";

import PrivateComponents from "../PrivateComponents/PrivateComponents";
import Dashboard from "./Dashboard";

import {
  profileActionCreator,
  deleteExpActionCreator,
  deleteProfileActionCreator,
} from "../../redux/reducers/profile-reducer";
import { useHistory } from "react-router-dom";

const MyProfile = (props) => {
  const history = useHistory();
  const delfunc = () => props.deleteProfile(history);
  const getProfile = props.getProfile;

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return props.profile.loading ? (
    <h2>Loading...</h2>
  ) : (
    <Dashboard
      profile={props.profile.profile}
      exist={props.profile.exist}
      delfunc={delfunc}
      deleteExp={props.deleteExp}
      isMe={props.user._id === props.profile.profile.user._id}
    />
  );
};

export default PrivateComponents(
  connect(
    (state) => ({
      user: state.auth.user,
      profile: state.profile,
      //   isMe: state.auth.user._id === state.profile.profile.user._id,
    }),
    (dispatch) => ({
      getProfile: () => dispatch(profileActionCreator()),
      deleteExp: (expId) => dispatch(deleteExpActionCreator(expId)),
      deleteProfile: (history) => dispatch(deleteProfileActionCreator(history)),
    })
  )(MyProfile)
);
