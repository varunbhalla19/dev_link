import { alertActionCreator } from "./alert-reducer";
import { authActionTypes } from "./auth-reducer";

export const profileActionTypes = {
  GET_PROFILE_SUCCESS: "GET_PROFILE_SUCCESS",
  GET_PROFILE_ERR: "GET_PROFILE_ERR",
  CLEAR_PROFILE: "CLEAR_PROFILE",
  CREATE_PROFILE_SUCCESS: "CREATE_PROFILE_SUCCESS",
  CREATE_PROFILE_ERR: "CREATE_PROFILE_ERR",
  DEL_EXP_SUCCESS: "DEL_EXP_SUCCESS",
  DEL_EXP_ERR: "DEL_EXP_ERR",
  ADD_EXP_SUCCESS: "ADD_EXP_SUCCESS",
  ADD_EXP_ERR: "ADD_EXP_ERR",
  EDIT_PROFILE_SUCCESS: "EDIT_PROFILE_SUCCESS",
  EDIT_PROFILE_ERR: "EDIT_PROFILE_ERR",
  DELETE_ACC: "DELETE_ACC",
};

const initProfile = {
  loading: true,
  profile: {},
  repos: [],
  exist: false,
};

export default (state = initProfile, { type, payload }) => {
  switch (type) {
    case profileActionTypes.GET_PROFILE_SUCCESS:
    case profileActionTypes.CREATE_PROFILE_SUCCESS:
      return { ...state, profile: payload, loading: false, exist: true };
    case profileActionTypes.GET_PROFILE_ERR:
      return { ...initProfile, loading: false };
    case profileActionTypes.CLEAR_PROFILE:
      return { ...initProfile };

    case profileActionTypes.DEL_EXP_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          experience: state.profile.experience.filter(
            (exp) => payload !== exp._id
          ),
        },
      };

    case profileActionTypes.DEL_EXP_ERR:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const profileActionCreator = () => (dispatch, getState) => {
  const token = getState().auth.token;
  console.log(token);
  // console.log('yo')
  return fetch("/profile/me", {
    headers: { "x-auth-token": token },
    method: "GET",
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Profile fetching failed!");
          er.data = data;
          throw er;
        });
      }
    })
    .then((data) => {
      dispatch({
        type: profileActionTypes.GET_PROFILE_SUCCESS,
        payload: data,
      });
    })
    .catch((er) => {
      console.log(er, er.data);
      dispatch({ type: profileActionTypes.GET_PROFILE_ERR });
    });
};

export const createProfileActionCreator = (values, history) => (
  dispatch,
  getState
) => {
  const token = getState().auth.token;

  values.skills = Array.isArray(values.skills)
    ? values.skills
    : values.skills.split(",");
  console.log(values);
  return fetch("/profile", {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "x-auth-token": token, "content-type": "application/json" },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Profile creating/updating failed!");
          er.data = data;
          throw er;
        });
      }
    })
    .then((data) => {
      dispatch({
        type: profileActionTypes.CREATE_PROFILE_SUCCESS,
        payload: data,
      });
      history.push("/profile");
    })
    .catch((er) => {
      console.log(er, er.data);
      dispatch(alertActionCreator("danger", er.data.errors[0].msg));
      dispatch({ type: profileActionTypes.CREATE_PROFILE_ERR });
    });
};

export const addExpActionCreator = (values, history) => (
  dispatch,
  getState
) => {
  console.log(values);
  const token = getState().auth.token;
  fetch("/profile/experience", {
    method: "PUT",
    headers: {
      "x-auth-token": token,
      "content-type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Adding experience failed!");
          er.data = data;
          throw er;
        });
      }
    })
    .then((data) => {
      dispatch({
        type: profileActionTypes.ADD_EXP_SUCCESS,
        payload: data,
      });
      history.push("/dashboard");
    })
    .catch((er) => {
      console.log(er, er.data);
      dispatch(alertActionCreator("danger", er.data.errors[0].msg));
      dispatch({ type: profileActionTypes.ADD_EXP_ERR });
    });
};

export const deleteExpActionCreator = (id) => (dispatch, getState) => {
  const token = getState().auth.token;
  fetch(`/profile/experience/${id}`, {
    method: "DELETE",
    headers: {
      "x-auth-token": token,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Deleting experience failed!");
          er.data = data;
          throw er;
        });
      }
    })
    .then((data) => {
      dispatch({
        type: profileActionTypes.DEL_EXP_SUCCESS,
        payload: id,
      });
    })
    .catch((er) => {
      console.log(er, er.data);
      dispatch(alertActionCreator("danger", er.data.errors[0].msg));
      dispatch({ type: profileActionTypes.DEL_EXP_ERR });
    });
};

export const deleteProfileActionCreator = (history) => (dispatch, getState) => {
  const token = getState().auth.token;
  fetch("/profile", {
    method: "DELETE",
    headers: {
      "x-auth-token": token,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Deleting Profile failed!");
          er.data = data;
          throw er;
        });
      }
    })
    .then((data) => {
      dispatch({ type: authActionTypes.LOGOUT });
      history.push("/");
    })
    .catch((er) => {
      console.log(er, er.data);
      dispatch(alertActionCreator("danger", er.data.errors[0].msg));
      dispatch({ type: profileActionTypes.DEL_EXP_ERR });
    });
};

export const updatePicActionCreator = (value, history) => (
  dispatch,
  getState
) => {
  console.log("Got picname ", value);
  const token = getState().auth.token;
  return fetch("/users/pic", {
    method: "POST",
    headers: {
      "x-auth-token": token,
      "content-type": "application/json",
    },
    body: JSON.stringify({ picName: value }),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Updating Pic failed!");
          er.data = data;
          throw er;
        });
      }
    })
    .then((data) => history.push("/profile"))
    .catch((er) => {
      console.log(er, er.data);
      dispatch(alertActionCreator("danger", er.data.errors[0].msg));
      // dispatch({ type: profileActionTypes.CREATE_PROFILE_ERR });
    });
};
