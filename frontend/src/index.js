import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { NavBar } from './components/nav.component';
import RoutesComponent from './components/routes.component';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <NavBar title={"Time task's Logs"} navClass={"nav"}/>
      <RoutesComponent/>
    </BrowserRouter>
  // </React.StrictMode>
);
