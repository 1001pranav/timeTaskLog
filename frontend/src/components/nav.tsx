import '../styles/Nav.css'
import { BrowserRouter as Router, Route,  } from 'react-router-dom'
function Nav() {
  return (
    <nav className="App">
      <h3>
        Task-Logs
      </h3>
      <a>
        About Us
      </a>
    </nav>
  ) 
}
export default Nav 