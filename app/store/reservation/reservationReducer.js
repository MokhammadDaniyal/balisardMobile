import { FETCH_MASTER_SUCCESS, FETCH_RESERVATIONS_SUCCESS } from "./actions";

const initialState = {
  masters: new Array(0),
  reservations: [],
  isLoading: true,
  error: null
};

function pushToArray(arr, obj) {
  const index = arr.findIndex(e => e.id === obj.id);
  var temp = arr.slice();
  if (index === -1) {
    temp.push(obj);
  } else {
    temp[index] = obj;
  }
  return temp;
}

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MASTER_SUCCESS:
      return {
        ...state,
        masters: pushToArray(state.masters, action.payload),
        isLoading: false
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
