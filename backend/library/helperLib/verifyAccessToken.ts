import { NextFunction, Request, Response } from "express";
import { decode, JwtPayload, verify } from "jsonwebtoken";
import { jsonSecret, User } from "../../constant/constant";

import { RESPONSE } from "../../constant/response";
import { getUser } from "../sql/user.sql";
import { replaceStatusMessage } from "./responseHelper";

const verifyAccessToken = async( req: Request, res: Response, next: NextFunction ) => {
  try {
    
  
    const accessToken: string[]|string|undefined = req.headers.access_token;
  
    if( !accessToken ) {

      const statusMessage: string = replaceStatusMessage("NOT_FOUND", { "<data>": "access_token" });
      res.status(RESPONSE.NOT_FOUND.statusCode).json({
        ...RESPONSE.NOT_FOUND,
        statusMessage
      })
      return {};

    }
    const userData: User = (await getUser({access_token: accessToken}))[0];
    
    if( !userData || Array.isArray(accessToken) ) {

      const statusMessage: string = replaceStatusMessage("NOT_FOUND", { "<data>" : "user" });

      res.status(RESPONSE.NOT_FOUND.statusCode).json({
        ...RESPONSE.NOT_FOUND, 
        statusMessage
      });
      return {};

    } 
    const jwtUserVerify :any  = verify(accessToken, jsonSecret) ;
    console.log(jwtUserVerify);
    
    if( jwtUserVerify.user_id != userData.id ) {

      const statusMessage:string = replaceStatusMessage("NOT_FOUND", { "<data>" : "user" });
      res.status(RESPONSE.NOT_FOUND.statusCode).json({
        ...RESPONSE.NOT_FOUND, 
        statusMessage
      });
      return {};
      
    }
    console.log("***** AUTHENTICATED *****", userData.id);
    
    res.locals.userData = userData;
    next();

  } catch (error) {
    res.status(RESPONSE.SOMETHING_WRONG.statusCode).json(RESPONSE.SOMETHING_WRONG)
  }
}

export { verifyAccessToken };
