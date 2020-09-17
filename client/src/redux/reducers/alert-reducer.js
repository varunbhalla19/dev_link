const initAlert = {
  style: "",
  message: "",
};

// const initAlert = [];

export const alertActionTypes = {
  SET_ALERT: "SET_ALERT",
  REMOVE_ALERT: "REMOVE_ALERT",
};

export const alertActionCreator = (style, message) => (dispatch) => {
  dispatch({ type: alertActionTypes.SET_ALERT, payload: { style, message } });
  setTimeout(() => {
    dispatch({ type: alertActionTypes.REMOVE_ALERT });
  }, 2000);
};

export default (state = initAlert, { type, payload }) => {
  switch (type) {
    case alertActionTypes.SET_ALERT:
      return { style: payload.style, message: payload.message };

    case alertActionTypes.REMOVE_ALERT:
      return { ...initAlert };

    default:
      return state;
  }
};
