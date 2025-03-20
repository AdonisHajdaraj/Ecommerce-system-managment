import React from 'react';

import { Route, Routes, Link  } from 'react-router-dom';
import './App.css';
import Dashboard from './admin/Dashboard';
import Sidebar from './admin/Sidebar'


import Logout from './components/logout';
import Signup from './components/Signup';
import Login from './components/Login';
import Users from './admin/Users';


import UDashboard from './user/UserDashboard';
import USidebar from './user/UserSidebar';






const App = () => {
  return (
  
     
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/sidebar' element={<Sidebar />} />
  

      
     
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/users' element={<Users />}/>
     
          <Route path='/logout' element={<Logout />} />
        

          <Route path='/user-dashboard' element={<UDashboard />} />
          <Route path='/user-sidebar' element={<USidebar />} />
         
        </Routes>
       

  );
};

export default App;
