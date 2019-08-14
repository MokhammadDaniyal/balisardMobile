import { combineReducers } from "redux";

import loginReducer from "./login/loginReducer";
import reservationReducer from "./reservation/reservationReducer";
import servicesReducer from "./services/servicesReducer";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  reservations: reservationReducer,
  services: servicesReducer,
  user: userReducer
});

export default rootReducer;
