import { RESPONSE } from "../../constant/response";

function replaceStatusMessage( response: string, replaceObj: object  ): string {
  
  let statusMessage = RESPONSE[response].statusMessage;
  for ( const replaceKey in replaceObj ) {
   statusMessage = statusMessage.replace(replaceKey, replaceObj[replaceKey])
  }
  return statusMessage;
}

export { replaceStatusMessage };
