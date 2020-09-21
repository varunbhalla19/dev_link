import { alertActionCreator } from "./alert-reducer";

export const authActionTypes = {
  INITAUTH_SUCCESS: "INITAUTH_SUCCESS",
  INITAUTH_FAIL: "INITAUTH_FAIL",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAILURE: "SIGNUP_FAILURE",
  LOGOUT: "LOGOUT",
};

export const initAuthActionCreator = () => (dispatch) => {
  const token = localStorage.getItem("token");
  fetch("/users", {
    method : "GET",
    headers: {
      "x-auth-token": token,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Validation failed");
          er.data = data;
          throw er;
        });
      }
    })
    .then((user) => {
      dispatch({
        type: authActionTypes.INITAUTH_SUCCESS,
        payload: { user, token },
      });
    })
    .catch((er) => {
      console.log(er, er.data);
      dispatch({ type: authActionTypes.INITAUTH_FAIL });
    });
};

const initAuth = {
  loading: true,
  token: null,
  user: {},
  isAuth: false,
};

export default (state = initAuth, { type, payload }) => {
  switch (type) {
    case authActionTypes.INITAUTH_FAIL:
    case authActionTypes.LOGIN_FAILURE:
    case authActionTypes.SIGNUP_FAILURE:
    case authActionTypes.LOGOUT:
      localStorage.clear();
      return { ...state, loading: false, user: {}, token: null, isAuth: false };

    case authActionTypes.INITAUTH_SUCCESS:
    case authActionTypes.LOGIN_SUCCESS:
    case authActionTypes.SIGNUP_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload, isAuth: true, loading: false };

    default:
      return state;
  }
};

export const loginActionCreator = (loginData) => (dispatch) => {
  fetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Login failed");
          er.data = data;
          throw er;
        });
      }
    })
    .then((data) => {
      console.log("login successful", data);
      dispatch({
        type: authActionTypes.LOGIN_SUCCESS,
        payload: {
          token: data.token,
          user: data.user,
        },
      });
    })
    .catch((er) => {
      console.log(er, er.data);
      dispatch(alertActionCreator("danger", er.data.errors[0].msg));
      dispatch({ type: authActionTypes.LOGIN_FAILURE });
    });
};

export const signupActionCreator = (signupData) => (dispatch) => {
  fetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(signupData),
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Signup failed");
          er.data = data;
          throw er;
        });
      }
    })
    .then(({ user, token }) => {
      console.log("signup successful");
      dispatch({
        type: authActionTypes.SIGNUP_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    })
    .catch((er) => {
      console.log(er, er.data);
      dispatch(alertActionCreator("danger", er.data.errors[0].msg));
      dispatch({ type: authActionTypes.SIGNUP_FAILURE });
    });
};
