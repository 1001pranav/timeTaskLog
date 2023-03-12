import { useEffect, useState } from "react";
import { Button, LinkButton } from "./button.component";


export function NavBar({title, navClass, navID, titleClass, titleNav}) {
  navClass = navClass? navClass: "";
  navID = navID? navID: "";
  let menuID = "";

  const [navBarStatus, setNavBarStatus] = useState();
  const [isDisplayed, setIsDisplayed] = useState(true);

  function ButtonClickHandler() {
    console.log("CLicked");
   
    
    setIsDisplayed(!isDisplayed)
    console.log(navBarStatus, isDisplayed);
  }

  return ( 
    <div className={navClass}>
      <h3>
        {title}
      </h3>
      <Button name={"="} nameClass={"webMenuButton"}  onClick={ 
        useEffect(()=> {
          menuID = "menuInLine";
        })
      }/  > 

      <ul className="navClass" >
        {console.log(menuID)}
        <li>
          <LinkButton name={"Home"} route={"/"} className={"homeBtn"}/>
        </li> <li>
         {/* <Button name={"Login"} nameClass={"homeBtn"} title={"Welcome Back dude!!, Whats up..,"}/> */}
         <LinkButton name={"login"} className={"homeBtn"} title={"Welcome back boss!!"} route={"/login"}></LinkButton>
        </li> <li>
         <LinkButton name={"Register"} className={"homeBtn"} route={"/register"} title={"Hello Boss, Don't have account aah!!, Please register..."}/>
        </li> <li>
          <LinkButton name={"About us"} className={"homeBtn"} route={"/aboutUs"}title={"What's special about us!!"}/>
        </li><li>
          <LinkButton name={"Contact us"} className={"homeBtn"} route={"/contactUs"} title={"Off!!, you have anything to say? F eel free.., But don't expect quick reply. Will contact soon!!!"}/>
        </li> 
      </ul>
    </div>
  )
}