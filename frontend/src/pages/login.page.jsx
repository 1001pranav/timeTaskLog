import {  useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/input.component";
import { RESPONSE_STATUS, API_RESOURCE } from "../constants/API.const";
import { makePOSTMethod } from "../services/apiServices";
import { Error } from "../components/api.card";

export function LoginPage() {

  const navigation = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password:""
  })

  const [ apiResponse, setAPIResponse ] = useState({
    apiCalled: false,
    code: 502,
    message: "Failed to connect to server",
    data: {}
  })
  const setUserName = (event) => setUserDetails({ ...userDetails, username: event.target.value });
  const setPassword = (event) => setUserDetails({ ...userDetails, password: event.target.value });

  function  handleSubmit(event) {
    try {
        event.preventDefault();
      if( userDetails?.username === " " || userDetails?.password === " " ) {
        alert("Please enter username and password");
        return
      } 
      makePOSTMethod({
        apiResource: API_RESOURCE.login,
        headers: { 
          'Access-Control-Allow-Origin':'*', 
          "content-type": "application/json",
          Accept:"application/json"
        },
        data: {
          email_id:  userDetails.username,
          password: userDetails.password
        }
      }).then((responseData)=> {
        console.log(responseData);
        setAPIResponse({
          ...apiResponse,
          apiCalled: true,
          code: responseData.statusCode,
          message: responseData.statusMessage,
          data: responseData.data
        })
      })
      console.log(apiResponse);
    } catch (error) {
      console.error("API Fetch error", error);
    }
  }

  function handleResponse() {
    if(apiResponse.code === RESPONSE_STATUS.SUCCESS)  {
          localStorage.setItem("access_token", apiResponse.data.access_token);
          navigation("/tasks/view");
        } else if(apiResponse.apiCalled) {
          return  <Error message={apiResponse.message} />
        }
  }
  // setUserDetails({userDetails});
  return (
    <>
      {handleResponse()}
      <div className="formContainer" >
        <form  className="form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type={"email"} name={"user_name"} value={userDetails.username} handleValue={setUserName} placeHolder={"Email ID"} className={"formInp"} required
          ={true} />
          <Input type={"password"} name={"password"} placeHolder={"password"} required={true}  handleValue={setPassword}/>
          <div className="formButton">
            <Input type={"submit"} />
            <Input type={"reset"} />  
          </div>
        </form >
      </div>
    </>
  )
}