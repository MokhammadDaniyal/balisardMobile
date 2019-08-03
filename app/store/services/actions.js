export const FETCH_SERVICECATEGORIES_SUCCESS =
  "FETCH_SERVICECATEGORIES_SUCCESS";

export const FETCH_SERVICES_SUCCESS = "FETCH_SERVICES_SUCCESS";

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
