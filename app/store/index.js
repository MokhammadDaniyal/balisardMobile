import { combineReducers } from "redux";

import loginReducer from "./login/loginReducer";
import reservationReducer from "./reservation/reservationReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  reservation: reservationReducer
});

export default rootReducer;
