import { combineReducers } from "redux";

import loginReducer from "./login/loginReducer";
import reservationReducer from "./reservation/reservationReducer";
import servicesReducer from "./services/servicesReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  reservations: reservationReducer,
  services: servicesReducer
});

export default rootReducer;
