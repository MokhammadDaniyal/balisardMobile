export const USER_CREATE_SUCCESS = "USER_CREATE_SUCCESS";
export const USER_RECORD_HISTORY = "USER_RECORD_HISTORY";
export const USER_STORE_IGTOKEN = "USER_STORE_IGTOKEN";
export const USER_STORE_IGDATA = "USER_STORE_IGDATA";
export const CLEAR_IGDATA = "CLEAR_IGDATA";
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

export const storeIgToken = data => {
  return {
    type: USER_RECORD_HISTORY,
    payload: data
  };
};

export const storeIgData = data => {
  return {
    type: USER_STORE_IGDATA,
    payload: data
  };
};
export const clearIgData = () => {
  return {
    type: CLEAR_IGDATA
  };
};
