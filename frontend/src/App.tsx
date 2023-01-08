import './styles/App.css';

import NavComponent from './components/nav';
import { Login } from './components/login';

function App() {
  
  return (
   <div className='container'>
    <NavComponent />
    <Login />
   </div>
  )
}

export default App;
