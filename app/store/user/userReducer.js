import {
  USER_CREATE_SUCCESS,
  USER_RECORD_HISTORY,
  USER_STORE_IGTOKEN,
  USER_STORE_IGDATA
} from "./actions";

const initialState = {
  userData: {
    recordHistory: {
      pastRecords: [],
      futureRecords: []
    },
    igToken: ""
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: { ...state.userData, ...action.payload }
      };
    case USER_RECORD_HISTORY:
      return {
        ...state,
        isLoading: false,
        userData: { ...state.userData, ...action.payload }
      };
    case USER_STORE_IGTOKEN:
      return {
        ...state,
        isLoading: false,
        userData: { ...state.userData, ...action.payload }
      };
    case USER_STORE_IGDATA:
      return {
        ...state,
        userData: { ...state.userData, ...{ igData: action.payload } }
      };
    default:
      return state;
  }
};

export default userReducer;
