import { combineReducers } from "redux";

import alertReducer from "./alert-reducer";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";
import devReducer from "./devs-reducer";
import postsReducer from "./posts-reducer";
import postReducer from "./post-reducer";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  devs: devReducer,
  posts: postsReducer,
  post: postReducer,
});

export default rootReducer;
