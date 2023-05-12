import {  Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import { VerifyToken } from '../services/loginServices';
import {LoginPage} from '../pages/login.page';
import ViewTasks from '../pages/viewTasks.page';
import Register from '../pages/register.page';
import Logout from '../pages/logout.page';
import HomePage from '../pages/home.page';
import PageNotFound from '../pages/notFound.page';

export default function RoutesComponent(options) {

  const [isLoggedIn, changeLogInState] = useState(0)

  const changeLogin = (loggedIn)=> changeLogInState({isLoggedIn: loggedIn})
  return (
    <Routes>
      <Route path='/login' element={<LoginPage loginState={changeLogin}/>}/>
      <Route path='/register' element={<Register/>} />
      <Route path='/tasks/view' element={
        <VerifyToken isLoggedIn={isLoggedIn}>
          <ViewTasks/>
        </VerifyToken>
      }/>
      <Route path='/logout' element={<VerifyToken><Logout loginState={changeLogin} /></VerifyToken>}/>
      <Route path="/" element={<HomePage isLoggedIn={isLoggedIn}/>} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
  )
}