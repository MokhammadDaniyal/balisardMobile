import { FETCH_MASTER_SUCCESS } from "./actions";

const initialState = {
  masters: [],
  isLoading: true,
  error: null
};

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MASTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        masters: action.payload.data
      };
    default:
      return state;
  }
};

export default reservationReducer;
