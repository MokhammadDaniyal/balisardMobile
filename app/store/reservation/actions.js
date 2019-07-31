export const FETCH_MASTER_SUCCESS = "FETCH_MASTER_SUCCESS";

export const fetchMasterSuccess = data => ({
  type: FETCH_MASTER_SUCCESS,
  payload: { data }
});
