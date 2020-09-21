const devActionTypes = {
  GET_DEVS_SUCCESS: "GET_DEVS_SUCCESS",
  GET_DEVS_ERR: "GET_DEVS_ERR",
  GET_SINGLE_DEV_SUCCESS: "GET_SINGLE_DEV_SUCCESS",
  GET_SINGLE_DEV_ERR: "GET_SINGLE_DEV_ERR",
};

const initProfiles = {
  profiles: [],
  publicProfile: {
    loading: true,
    exist: false,
    profile: {},
  },
};

export default (state = initProfiles, { type, payload }) => {
  switch (type) {
    case devActionTypes.GET_DEVS_SUCCESS:
      return { ...state, profiles: payload };
    case devActionTypes.GET_DEVS_ERR:
      return { ...state, profiles: [] };
    case devActionTypes.GET_SINGLE_DEV_SUCCESS:
      return {
        ...state,
        publicProfile: {
          ...state.publicProfile,
          loading: false,
          exist: true,
          profile: payload,
        },
      };
    case devActionTypes.GET_SINGLE_DEV_ERR:
      return {
        ...state,
        publicProfile: { loading: false, exist: false, profile: {} },
      };
    default:
      return state;
  }
};

export const getDevProfsActionCreator = () => (dispatch) => {
  return fetch("/profile", {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Profiles fetching failed!");
          er.data = data;
          throw er;
        });
      }
    })
    .then((data) => {
      dispatch({
        type: devActionTypes.GET_DEVS_SUCCESS,
        payload: data,
      });
    })
    .catch((er) => {
      console.log(er, er.data);
      dispatch({ type: devActionTypes.GET_DEVS_ERR });
    });
};

export const getSingleDevActionCreator = (userId) => (dispatch) => {
  return fetch(`/profile/user/${userId}`, { method: "GET" })
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
        type: devActionTypes.GET_SINGLE_DEV_SUCCESS,
        payload: data,
      });
    })
    .catch((er) => {
      console.log(er, er.data);
      dispatch({ type: devActionTypes.GET_SINGLE_DEV_ERR });
    });
};
