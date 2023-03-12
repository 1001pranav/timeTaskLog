import { useState } from "react";
import { Button } from "../components/button.component";
import Input from "../components/input.component";



export function LoginPage() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password:""
  })

  const setUserName = (event) => setUserDetails({ ...userDetails, username: event.target.value });
  const setPassword = (event) => setUserDetails({ ...userDetails, password: event.target.value });

  // setUserDetails({userDetails});
  return (
    <div className="formContainer" >
      <form  className="form">
        <Input type={"text"} name={"user_name"} value={userDetails.username} handleValue={setUserName} placeHolder={"User name"} className={"formInp"} required
        ={true} />
        <Input type={"password"} name={"password"} placeHolder={"password"} required={true}  handleValue={setPassword}/>
        <div className="formButton">
          <Input type={"submit"} />
          <Input type={"reset"} />  
        </div>
      </form >
    </div>
  )
}