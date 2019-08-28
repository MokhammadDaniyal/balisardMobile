import { USER_CREATE_SUCCESS, USER_RECORD_HISTORY } from "./actions";

const initialState = {
  userData: {
    recordHistory: {
      pastRecords: [],
      futureRecords: []
    }
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
    default:
      return state;
  }
};

export default userReducer;
