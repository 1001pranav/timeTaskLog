import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/input.component";
import { API_RESOURCE, RESPONSE_STATUS } from "../constants/API.const";
import { makePOSTMethod } from "../services/apiServices";
import '../styles/login.page.css';

export default function Register() {
  
  const [register, setRegister] = useState({
    user_name: "",
    email_id: "",
    password: ""
  });
  const [apiResponse, setAPIResponse] = useState({
    code: 502,
    message: "Unable to connect to server",
    data: {}
  });

 const navigate = useNavigate();
  function handleSubmit(event) {
    try {
      event.preventDefault();
      makePOSTMethod({
        apiResource: API_RESOURCE.register,
        headers: {
          'Access-Control-Allow-Origin':'*', 
          "content-type": "application/json"
        },
        data: {
          user_name: register.user_name,
          password: register.password,
          email_id: register.email_id
        }
      }).then((response)=> {
        setAPIResponse({
          code: response.statusCode,
          data: response.data,
          message: response.statusMessage
        })
      })
    } catch (error) {
      console.error("Register API :",error);
    }
  }

  const setUserName = (event)=> setRegister({...register, user_name: event.target.value});
  const setPassword = (event)=> setRegister({...register, password: event.target.value});
  const setEmail = (event)=> setRegister({...register, email_id: event.target.value});
  
  if( apiResponse.code === RESPONSE_STATUS.SUCCESS ) {
    navigate("/login");
  }

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Register</h3>
        <Input type={"text"} name={"user_name"} required={true} placeHolder={"user name"} className={"formInp"} handleValue={setUserName} value={register.user_name}/>
        <Input type={"email"} name={"email_id"} required={true} placeHolder={"Email ID"} className={"formInp"} handleValue={setEmail} value={register.email_id}/>
        <Input type={"password"} name={"password"} required={true} placeHolder={"password"} className={"formInp"} handleValue={setPassword} value={register.password}/>
        <div className="formButton">
          <Input type={"submit"} className={"button submit"}/>
          <Input type={"reset"} className={"button reset"}/>  
        </div>
      </form>
    </div>
  )
}