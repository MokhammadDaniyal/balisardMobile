import {
  FETCH_SERVICECATEGORIES_SUCCESS,
  FETCH_SERVICES_SUCCESS
} from "./actions";

const initialState = {
  serviceCategories: [],
  services: [],
  isLoading: true,
  error: null
};

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICECATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        serviceCategories: action.payload
      };
    case FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        services: action.payload
      };
    default:
      return state;
  }
};

export default servicesReducer;
