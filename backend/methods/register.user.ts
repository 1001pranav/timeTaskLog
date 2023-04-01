import { hash } from "bcrypt";
import { RESPONSE } from "../constant/response";
import { replaceStatusMessage } from "../library/helperLib/responseHelper";
import { createUser, getUser } from "../library/sql/user.sql";

const registerUser  = async (req, res, next) => {

  const userData = res.locals.userData;
  console.log(userData);
  
  let { user_name, password, email_id } = req.body;
  {
    if(!user_name) {
      const statusMessage = replaceStatusMessage("MISSING_DATA", {"<data>":"user_name"})
      res.status(RESPONSE.MISSING_DATA.statusCode).json({
        ...RESPONSE.MISSING_DATA,
        statusMessage
      })
      return {}  
    }

    if( !password ) {
      const statusMessage = replaceStatusMessage("MISSING_DATA", {"<data>": "password"});
      res.status(RESPONSE.MISSING_DATA.statusCode).json({
        ...RESPONSE.MISSING_DATA,
        statusMessage
      })
      return {}
    }

    if( !email_id ) {
      const statusMessage = replaceStatusMessage("MISSING_DATA", {"<data>": "email_id"});
      res.status(RESPONSE.MISSING_DATA.statusCode).json({
        ...RESPONSE.MISSING_DATA,
        statusMessage
      })
      return {}
    }
  }
  const userExistCheck = (await getUser({email: email_id}))[0];

  if ( userExistCheck ) {
    const statusMessage = replaceStatusMessage("EXITS", { "<data>": "user"})
    res.status(RESPONSE.EXISTS.statusCode).json({
      ...RESPONSE.EXISTS,
      statusMessage
    });
    return {}
  }
  
  password = await hash(password, 10);
  await createUser({
    userName: user_name,
    email: email_id,
    password
  })
  res.status(RESPONSE.SUCCESS.statusCode).json({
    ...RESPONSE.SUCCESS
  })
  return {}
}

export { registerUser };

