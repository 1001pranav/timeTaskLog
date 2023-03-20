import { useNavigate } from "react-router-dom";

export default function Logout() {
  localStorage.clear();
  const navigate = useNavigate();

  return (
    <>
      <h1>  Logged out successfully </h1>
      {navigate("/login") }
    </>
  )
}