import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "../store/index";

const store = createStore(reducers, applyMiddleware(thunk));

// Connect our store to the reducers
export default store;
