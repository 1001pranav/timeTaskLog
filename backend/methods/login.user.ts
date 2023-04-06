import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { jsonSecret } from "../constant/constant";
import { RESPONSE } from "../constant/response";

import { replaceStatusMessage } from "../library/helperLib/responseHelper";
import { getUser, updateUser } from "../library/sql/user.sql";

const login = async(req, res, next ) => {
  const { email_id, password } = req.body;

  // Checking for status messages.
  // console.log(email_id, req.query, req.body);
  
  // Error responses for required data
  {  
    if( !email_id ) {
      const statusMessage = replaceStatusMessage("MISSING_DATA", {"<data>": "email_id"} )
      res.status(RESPONSE.MISSING_DATA.statusCode).json({
        ...RESPONSE.MISSING_DATA,
        statusMessage
      })
      return;
    }
    if( !password ) {
      const statusMessage = replaceStatusMessage("MISSING_DATA", {"<data>": "password"});
      res.status(RESPONSE.MISSING_DATA.statusCode).json({
        ...RESPONSE.MISSING_DATA,
        statusMessage
      })
      return;
    }
  }

  const userData =( await getUser({email: email_id}))[0];
  if( !userData || !userData?.id ) {
    
    const statusMessage = replaceStatusMessage("NOT_FOUND", { "<data>": email_id })
    res.status(RESPONSE.NOT_FOUND.statusCode).json({
      ...RESPONSE.NOT_FOUND,
      statusMessage
    })
    return;
  }
  
  if(await compare(password, userData.password)) {
    const accessToken = sign( { user_id: userData.id }, jsonSecret );
    await updateUser(userData.id, { access_token: accessToken });
    res.status(RESPONSE.SUCCESS.statusCode).json({
      ...RESPONSE.SUCCESS,
      data: {
        user_id: userData.id,
        user_name: userData.user_name,
        access_token: accessToken
      }
    })
    return;
  }
  else {    
    res.status(RESPONSE.PASSWORD_NOT_FOUND.statusCode).json(RESPONSE.PASSWORD_NOT_FOUND)
    return;
  }
  
}

export { login };
