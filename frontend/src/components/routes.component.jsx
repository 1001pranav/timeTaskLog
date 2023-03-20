import {  Route, Routes } from 'react-router-dom';
import {LoginPage} from '../pages/login.page';
import ViewTasks from '../pages/viewTasks.page';
import Register from '../pages/register.page';
import Logout from '../pages/logout.page';

export default function RoutesComponent(options) {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<Register/>} />
      <Route path='/tasks/view' element={<ViewTasks/>}/>
      <Route path='/logout' element={< Logout />}/>
    </Routes>
  )
}