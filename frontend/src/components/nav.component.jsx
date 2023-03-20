import { useLocation } from "react-router-dom";

import { Button, LinkButton } from "./button.component";


export function NavBar({title, navClass, navID, navItems}) {

  navClass = navClass? navClass: "";
  navID = navID? navID: "";

  const navButtons = {
    "LOGIN": {
      "name": "Login",
      "title": "Welcome back boss!!",
      "route": "/login"
    },
    "REGISTER": {
      "name": "Register",
      "title": "Hello Boss, Don't have account aah!!, Please register...",
      "route": "/register"
    },
    "CONTACT_US": {
      "name": "Contact US",
      "title": "Off!!, you have anything to say? Feel free.., But don't expect quick reply. Will contact soon!!!",
      "route": "/contactUs"
    },
    "ABOUT_US": {
      "name": "About US",
      "title": "What's special about us!!",
      "route": "/aboutUs"
    },
    "LOGOUT": {
      "name": "Logout",
      "title": "Lets meet you soon!!",
      "route": "/logout"
    },
    "HOME": {
      "name": "Home",
      "title": "Lets visit home",
      "route": "/"
    },
    "VIEW_TASK": {
      "name": "View Tasks",
      "title": "View the tasks",
      "route": "/tasks/view"
    },
    "DAILY_TASK": {
      "name": "Daily Logs",
      "title": "Daily logs tasks",
      "route": "/daily/logs"
    }
  }

   navItems = [];
  const location = useLocation();
  const accessToken = localStorage.getItem("access_token");

  if ( accessToken ) {
    const path = location.pathname.split("/");
    console.log("path",path[0], location.pathname.split("/"), location.pathname);
    if( path[1] === "" ) {
      navItems = [ 
        navButtons.VIEW_TASK, 
        navButtons.DAILY_TASK, 
        navButtons.CONTACT_US, 
        navButtons.ABOUT_US, 
        navButtons.LOGOUT 
      ];
    }
    else if ( path[1] === "tasks" ) {
      navItems = [
        navButtons.HOME, 
        navButtons.DAILY_TASK, 
        navButtons.CONTACT_US, 
        navButtons.ABOUT_US, 
        navButtons.LOGOUT
      ]
    }
    else if ( path[1] === "daily") {
      navItems = [
        navButtons.HOME, 
        navButtons.VIEW_TASK, 
        navButtons.CONTACT_US, 
        navButtons.ABOUT_US, 
        navButtons.LOGOUT
      ]
    }
    else if( path[1] === "contactUs" ) {
      navItems = [
        navButtons.HOME, 
        navButtons.VIEW_TASK, 
        navButtons.DAILY_TASK, 
        navButtons.ABOUT_US, 
        navButtons.LOGOUT
      ]
    } 
    else if( path[1] === "aboutUs" ) {
      navItems = [
        navButtons.HOME, 
        navButtons.VIEW_TASK, 
        navButtons.DAILY_TASK, 
        navButtons.CONTACT_US, 
        navButtons.LOGOUT
      ]
    } 
  } else {
    switch(location.pathname) {

      case "/":
        navItems.push(
          navButtons.LOGIN, 
          navButtons.REGISTER, 
          navButtons.ABOUT_US, 
          navButtons.CONTACT_US
        );
        break;
      case "/login": 
      navItems.push(
        navButtons.HOME,
        navButtons.REGISTER,
        navButtons.ABOUT_US,
        navButtons.CONTACT_US
      );
      break;
      case "/register": 
        navItems.push(
          navButtons.HOME,
          navButtons.LOGIN,
          navButtons.ABOUT_US,
          navButtons.CONTACT_US
        );
        break;
      case "/aboutUs": 
        navItems.push(
          navButtons.HOME,
          navButtons.LOGIN,
          navButtons.REGISTER,
          navButtons.CONTACT_US
        );
        break;
      case "/contactUs": 
        navItems.push(
          navButtons.HOME,
          navButtons.LOGIN,
          navButtons.REGISTER,
          navButtons.ABOUT_US
        );
        break;
      default:
        navItems.push(
          navButtons.HOME,
          navButtons.LOGIN,
          navButtons.REGISTER,
          navButtons.ABOUT_US,
          navButtons.CONTACT_US
        );
        break;
  }
  }
  
  return ( 
    <div className={navClass}>
      <h3>
        {title}
      </h3>
      <Button name={"="} nameClass={"webMenuButton"} /  > 

      <ul className="navClass" >
        {
          navItems.map(
            (items, index)=>
              <List items={items} key={index}/>
          )
        }
      </ul>
    </div>
  )
}

export function TaskSubNav({title, navClass, navID, }){

}
function List({items, key}) {
  return (
    <li>
      <LinkButton name={items.name} key={key} className={"homeBtn"} route={items.route} title={items.title}/>
    </li>
  )
}