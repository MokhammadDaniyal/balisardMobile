export const FETCH_MASTER_SUCCESS = "FETCH_MASTER_SUCCESS";
export const FETCH_RESERVATIONS_SUCCESS = "FETCH_RESERVATIONS_SUCCESS";

export const fetchMasterSuccess = data => ({
  type: FETCH_MASTER_SUCCESS,
  payload: data
});

export const fetchReservationsSuccess = data => ({
  type: FETCH_RESERVATIONS_SUCCESS,
  payload: data
});
