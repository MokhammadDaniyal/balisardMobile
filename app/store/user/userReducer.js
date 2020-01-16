import { REHYDRATE } from "redux-persist";

import {
  USER_CREATE_SUCCESS,
  USER_RECORD_HISTORY,
  USER_STORE_IGTOKEN,
  USER_STORE_IGDATA,
  CLEAR_IGDATA,
  LOGOUT
} from "./actions";

const initialState = {
  recordHistory: {
    pastRecords: [],
    futureRecords: []
  },
  igToken: null,
  rehydrated: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload
      };
    case USER_RECORD_HISTORY:
      return {
        ...state,
        isLoading: false,
        ...action.payload
      };
    case USER_STORE_IGTOKEN:
      return {
        ...state,
        isLoading: false,
        ...action.payload
      };
    case USER_STORE_IGDATA:
      return {
        ...state,
        ...{ igData: action.payload }
      };
    case CLEAR_IGDATA:
      return {
        ...state,
        ...{ igData: null },
        ...{ igToken: null }
      };
    case LOGOUT: {
      return initialState;
    }
    case REHYDRATE:
      var rehydrateObj;
      if (action.payload) {
        rehydrateObj = action.payload.user;
      } else {
        rehydrateObj = action.payload;
      }
      return { ...state, ...rehydrateObj, ...{ rehydrated: true } };
    default:
      return state;
  }
};

export default userReducer;
