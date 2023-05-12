import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';

export function Button({
  name, 
  nameClass, 
  nameID, 
  type, 
  title, 
  onClick, 
  styles
}) {

  nameClass = !nameClass ? "": nameClass;
  nameID = !nameID ? "": nameID;
  
  return (
    <> 
      <button
        title={title} 
        className={nameClass} 
        id = {nameID} 
        style={styles} 
        onClick={onClick}
        type={type}
      > 
        {name} 
      </button> 
    </>
  ); 
}

export function LinkButton({
  name,
  route, 
  className, 
  title
}) {
  
  if(!route) return null;
  
  return (
    <>
      <Link className={className} title={title} to={route}>{name}</Link>
    </>
  )

}

export function ImageButton ({ 
  Component,
  title, 
  nameClass, 
  nameID, 
  styles, 
  onClick 
}) {
  return (
    <> 
      <button 
        title={title} 
        className={nameClass} 
        id = {nameID} 
        style={styles} 
        onClick={onClick}
      > 
        <Component/> 
      </button> 
    </>
  );
}