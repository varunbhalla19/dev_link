import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./reducers/root-reducer";

const store = createStore(rootReducer, compose(applyMiddleware(thunk, logger)));

export default store;
