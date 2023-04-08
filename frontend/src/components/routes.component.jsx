import {  Route, Routes } from 'react-router-dom';

import { VerifyToken } from '../services/apiServices';
import {LoginPage} from '../pages/login.page';
import ViewTasks from '../pages/viewTasks.page';
import Register from '../pages/register.page';
import Logout from '../pages/logout.page';

export default function RoutesComponent(options) {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<Register/>} />
      <Route path='/tasks/view' element={
        <VerifyToken>
          <ViewTasks/>
        </VerifyToken>
      }/>
      <Route path='/logout' element={<VerifyToken>< Logout /></VerifyToken>}/>
    </Routes>
  )
}