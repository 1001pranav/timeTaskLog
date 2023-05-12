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
  
  let requestData = "";

  for( let key in data ) {
    requestData += key + "=" + encodeURIComponent(data[key]) + "&"; 
  }

  return fetch(API_ENDPOINT+apiResource+"?"+requestData, {
    method: "GET",
    mode: "cors",
    headers: headers
  }).then((data)=> data.json()).catch((e)=> console.error(e))
}
