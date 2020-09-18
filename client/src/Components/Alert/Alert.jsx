import React from "react";
import { connect } from "react-redux";

export const Alert = ({ message, style }) => {
  // console.log("Alert Rendered");
  return message ? (
    <div className={`alert alert-${style}`}>{message}</div>
  ) : null;
};

export default connect(({ alert }) => ({
  message: alert.message,
  style: alert.style,
}))(Alert);
