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
