import { USER_CREATE_SUCCESS } from "./actions";

const initialState = {
  userData: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
