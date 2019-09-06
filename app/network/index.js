import { serverAddress } from "./config";

export const postRequest = (endpointPath, body, callback) => {
  fetch(serverAddress + endpointPath, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response =>
      response.json().then(responseJson => {
        callback(responseJson.rows);
      })
    )
    .catch(err => alert(err));
};

export const postRequestResponse = (endpointPath, body, callback) => {
  fetch(serverAddress + endpointPath, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      callback(response);
    })
    .catch(err => alert(err));
};

export const getRequest = (endpointPath, callback) => {
  fetch(serverAddress + endpointPath, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response =>
      response.json().then(responseJson => {
        callback(responseJson.rows);
      })
    )
    .catch(err => alert(err));
};
