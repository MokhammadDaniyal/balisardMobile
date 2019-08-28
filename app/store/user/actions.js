export const USER_CREATE_SUCCESS = "USER_CREATED_SUCCESS";
export const USER_RECORD_HISTORY = "USER_RECORD_HISTORY";

export const userCreateSuccess = data => {
  return {
    type: USER_CREATE_SUCCESS,
    payload: data
  };
};
export const getRecordHistorySuccess = data => {
  return {
    type: USER_RECORD_HISTORY,
    payload: data
  };
};
