import {
  FETCH_SERVICECATEGORIES_SUCCESS,
  FETCH_SERVICES_SUCCESS,
  FETCH_NEWS_SUCCESS,
  FETCH_ADMINPOSTS_SUCCESS
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
    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        news: action.payload
      };
    case FETCH_ADMINPOSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminPosts: action.payload
      };
    default:
      return state;
  }
};

export default servicesReducer;
