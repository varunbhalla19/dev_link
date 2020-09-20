import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { createProfileActionCreator } from "../../redux/reducers/profile-reducer";

import { useHistory } from "react-router-dom";

const generateNames = (name) => name + Math.floor(Math.random() * 100000);

const getNames = (name) =>
  Array(9)
    .fill(0)
    .map((el) => generateNames(name));

const EditPic = ({ profile, SubmitPic, name }) => {
  const [selectedPic, selectPic] = useState(null);

  const [pics, setPics] = useState([]);

  const history = useHistory();

  const regenerate = () => setPics(getNames(name));

  //   const name = profile.profile.githubUsername;

  useEffect(() => {
    setPics(getNames(name));
  }, [setPics, name]);

  console.log("inside EDITPIC ", name, pics, selectedPic);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <button className="btn btn-primary" onClick={regenerate}>
          Regenerate Images
        </button>
        <button
          className="btn btn-success"
          onClick={() => {
            profile.profile.picName = selectedPic;
            console.log(profile.profile);
            SubmitPic(profile.profile, history);
          }}
        >
          Submit
        </button>
        <button
          className="btn btn-light"
          onClick={() => history.push("/profile")}
        >
          Cancel
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "1rem",
          margin: "1rem",
        }}
      >
        {pics.map((el) => (
          <div key={el}>
            <img
              onClick={(ev) => selectPic(el)}
              style={{
                width: "250px",
                padding: "1rem",
                borderRadius: "50%",
                background: "#1b1c34",
                cursor: "pointer",
                filter: selectedPic === el ? "opacity(0.3)" : "none",
              }}
              src={`https://robohash.org/${el}?set=set5`}
              alt=""
            ></img>
          </div>
        ))}
      </div>
    </>
  );
};

export default connect(
  (state) => ({
    profile: state.profile,
    name: state.profile.profile.githubUsername,
  }),
  (dispatch) => ({
    SubmitPic: (values, history) =>
      dispatch(createProfileActionCreator(values, history)),
  })
)(EditPic);
