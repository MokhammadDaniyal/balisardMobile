import { FETCH_MASTER_SUCCESS, FETCH_RESERVATIONS_SUCCESS } from "./actions";

const initialState = {
  masters: [],
  reservations: [],
  isLoading: true,
  error: null
};

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MASTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        masters: action.payload
      };
    case FETCH_RESERVATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reservations: action.payload
      };
    default:
      return state;
  }
};

export default reservationReducer;
