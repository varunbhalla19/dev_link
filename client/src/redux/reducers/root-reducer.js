import { combineReducers } from "redux";

import alertReducer from "./alert-reducer";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";
import devReducer from "./devs-reducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  devs: devReducer,
});

export default rootReducer;
