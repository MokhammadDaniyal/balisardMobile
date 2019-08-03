import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import logger from "redux-logger";

import reducers from "../store/index";

const store = createStore(reducers, applyMiddleware(logger));

// Connect our store to the reducers
export default store;
