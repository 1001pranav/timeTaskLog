import { useNavigate } from "react-router-dom";

export function checkIsLoggedIn(isLoggedIn = 0 ) {

  // > Getting the access token stored in the local storage of browser.
  const accessToken = localStorage.getItem("access_token");

  /*
    > Check if the access token is present.
      > If access token is present check for length of accessToken
    > Check if isLoggedIn state is true or false.
  */
  console.log((
      !accessToken || 
      accessToken.length === 0 
    ) &&
    isLoggedIn);

    console.log("typeof ",typeof isLoggedIn );
  if(
    (
      !accessToken || 
      accessToken.length === 0 
    ) &&
    isLoggedIn === 0
    ) {
      console.log(" logged in ==> ", false);
      return [false, null]
    };
    console.log(" logged in ==> ", true);
    return [true, accessToken];
  }
  
  export function VerifyToken({ isLoggedIn, children}) {

    const navigate = useNavigate();
    const [verifyAccess] = checkIsLoggedIn(isLoggedIn)

    console.log("isLoggedIn ==> ",{isLoggedIn, verifyAccess });

    //> If not logged in then navigate to login page.
    if (
      !verifyAccess
    ) {
      navigate("/login");
      return;
    }
    return children;
  }