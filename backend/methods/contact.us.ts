import { NextFunction } from "express";
import { RESPONSE } from "../constant/response";
import { replaceStatusMessage } from "../library/helperLib/responseHelper";
import addContactUsQuery from "../library/sql/contactUs.sql";
import { getUserByID } from "../library/sql/user.sql";

const contactUs = async (req: any, res: any, next: NextFunction) => { //Todo need to find types for req, res
    const { id, email } = req.body;
    let { name : userName } = req.body;

    if(id) {
        try {
            const user = await getUserByID(id);
            userName = user.user_name;       
        } catch (error) {
            console.error(error);
            res.status(RESPONSE.SOMETHING_WRONG.statusCode).json(RESPONSE.SOMETHING_WRONG);
            return;
        }
    }
    
    if(!id && !email){
        const statusMessage = replaceStatusMessage("MISSING_DATA", {"<data>": "email or id"});
        res.status(RESPONSE.MISSING_DATA.statusCode).json({
            ...RESPONSE.MISSING_DATA,
            statusMessage
        });
      return;
    } else if(!id && !userName){
        const statusMessage = replaceStatusMessage("MISSING_DATA", {"<data>": "name"});
        res.status(RESPONSE.MISSING_DATA.statusCode).json({
            ...RESPONSE.MISSING_DATA,
            statusMessage
          });
        return;
    } else {
        try {
            await addContactUsQuery(req.body);
            res.status(RESPONSE.SUCCESS.statusCode).json({...RESPONSE.SUCCESS, data: {name: userName}});
            return;
        } catch (error) {
            console.error(error);
            res.status(RESPONSE.SOMETHING_WRONG.statusCode).json(RESPONSE.SOMETHING_WRONG);
            return;
        }
    }
}

export { contactUs };
