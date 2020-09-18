import React from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

const ThePrivate = ({ auth, authLoading, children }) =>
  !authLoading ? auth ? children : <Redirect to="/" /> : null;

const TheConnectedPrivate = connect((state) => ({
  auth: state.auth.isAuth,
  authLoading: state.auth.loading,
}))(ThePrivate);

const PrivateComponents = (Component) => {
  return (props) => (
    <TheConnectedPrivate>
      <Component {...props} />
    </TheConnectedPrivate>
  );
};

export default PrivateComponents;
