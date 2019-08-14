export const USER_CREATE_SUCCESS = "USER_CREATED_SUCCESS";

export const userCreateSuccess = data => {
  return {
    type: USER_CREATE_SUCCESS,
    payload: data
  };
};
