import { LOGIN } from "./actions";

const initialState = {
  data: {},
  isLoading: false
};

const loginReducer = (state = initialState, action) => {
  if (!action) return state;
  const { type, payload } = action;

  switch (type) {
    case LOGIN: {
      return { data: { ...state.data, [payload.item.id]: payload.item } };
    }
    default:
      return state;
  }
};

export default loginReducer;
