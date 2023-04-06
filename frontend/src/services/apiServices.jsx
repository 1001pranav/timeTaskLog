import { API_ENDPOINT } from "../constants/API.const";

export function makePOSTMethod({headers, data, apiResource}) {
  return fetch(API_ENDPOINT+apiResource, {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: JSON.stringify(data)
  }).then((data)=> data.json()).catch((e)=> console.error("API: Error", e));
}

export function makeGETMethod({headers, data, apiResource}) {
  if(!apiResource)  return {};
  return fetch(API_ENDPOINT+apiResource+"?"+data, {
    method: "GET",
    mode: "cors",
    headers: headers
  }).then((data)=> data.json()).catch((e)=> console.error(e))
}