import React from "react";
import { connect } from "react-redux";

import CreateProfile from "../CreateProfile/CreateProfile";
import PrivateComponents from "../PrivateComponents/PrivateComponents";
import { Redirect } from "react-router-dom";

const EditProfile = ({ profileData, profileExist, profileLoad }) => {
  console.log("profiledata", profileData, profileExist);

  if (!profileExist) {
    return <Redirect to="/profile" />;
  }

  const theProfileData = {
    ...profileData,
    skills: profileData.skills.join(","),
  };
  console.log("Edit Profile rendered ");
  return <CreateProfile editMode profileData={theProfileData} />;
};

export default PrivateComponents(
  connect((state) => ({
    profileData: state.profile.profile,
    profileExist: state.profile.exist,
    // profileLoad: state.profile.loading,
  }))(EditProfile)
);
