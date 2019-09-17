export const FETCH_SERVICECATEGORIES_SUCCESS =
  "FETCH_SERVICECATEGORIES_SUCCESS";

export const FETCH_SERVICES_SUCCESS = "FETCH_SERVICES_SUCCESS";

export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_ADMINPOSTS_SUCCESS = "FETCH_ADMINPOSTS_SUCCESS";

export const fetchServiceCategoriesSuccess = data => {
  return {
    type: FETCH_SERVICECATEGORIES_SUCCESS,
    payload: data
  };
};

export const fetchServicesSuccess = data => {
  return {
    type: FETCH_SERVICES_SUCCESS,
    payload: data
  };
};
export const storeNews = data => {
  return {
    type: FETCH_NEWS_SUCCESS,
    payload: data
  };
};

export const storeAdminPosts = data => {
  return {
    type: FETCH_ADMINPOSTS_SUCCESS,
    payload: data
  };
};
