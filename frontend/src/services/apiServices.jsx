import { API_ENDPOINT } from "../constants/API.const";

export function makePOSTMethod({headers, data, apiResource}) {
  return fetch(API_ENDPOINT+apiResource, {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: JSON.stringify(data)
  }).then((data)=> data.json()).catch((e)=> console.error("API: Error", e));
}