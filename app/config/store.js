import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import logger from "redux-logger";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import autoMergeLevel3 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import rootReducer from "../store/index";

const persistConfig = {
  key: "root",
  storage: AsyncStorage
  // whitelist: ["user"]
};

export default () => {
  const pReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(pReducer, {}, applyMiddleware(logger));
  const persistor = persistStore(store);
  return { store, persistor };
};
