import {  Route, Routes } from 'react-router-dom';
import {LoginPage} from '../pages/login.page';

export default function RoutesComponent(options) {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
  )
}