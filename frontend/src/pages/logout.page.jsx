import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({loginState}) {
  localStorage.clear();
  loginState(0)
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login"); 
  })
  
  return (
    <>
      <h1>  Logged out successfully </h1>
      
    </>
  )
}