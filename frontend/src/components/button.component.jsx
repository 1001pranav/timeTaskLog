import { Link } from "react-router-dom";


export function Button({name, nameClass, nameID, title, onClick, styles}) {

  nameClass = !nameClass ? "": nameClass;
  nameID = !nameID ? "": nameID;
  
  return (
    <> 
      <button title={title} className={nameClass} id = {nameID} style={styles} onClick={onClick}> {name} </button> 
    </>
  ); 
}

export function LinkButton({name, route, className, title}) {
  if(!route) return null;
  return (
    <>
      <Link className={className} title={title} to={route}>{name}</Link>
    </>
  )
}