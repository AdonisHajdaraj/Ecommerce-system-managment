import React from 'react';

import { Route, Routes, Link  } from 'react-router-dom';
import './App.css';
import Dashboard from './admin/Dashboard';
import Sidebar from './admin/Sidebar'


import Logout from './components/logout';
import Signup from './components/Signup';
import Login from './components/Login';

import Shoes from './admin/Shoes'
import Users from './admin/Users';
import Tshirt from './admin/Tshirt'
import AddTshirt from './admin/AddTshirt';
import EditTshirt from './admin/EditTshirt';
import AddShoes from './admin/AddShoes';
import EditShoes from './admin/EditShoes';


import UDashboard from './user/UserDashboard';
import USidebar from './user/UserSidebar';
import UserTshirt from './user/UserTshirt';
import UserShoes from './user/UserShoes';






const App = () => {
  return (
  
     
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/sidebar' element={<Sidebar />} />
  
          <Route path='/tshirt' element={<Tshirt />}/>
          <Route path='/addtshirt' element={<AddTshirt />}/>
          <Route path='/edittshirt/:id' element={<EditTshirt/>}/>
          
      
          <Route path='/addshoes' element={<AddShoes />}/>
          <Route path='/editshoes/:id' element={<EditShoes/>}/>
          <Route path='/shoes' element={<Shoes />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/users' element={<Users />}/>
     
          <Route path='/logout' element={<Logout />} />
        

          <Route path='/user-dashboard' element={<UDashboard />} />
          <Route path='/user-sidebar' element={<USidebar />} />
          <Route path='/user-tshirt' element={<UserTshirt />} />
          <Route path='/user-shoes' element={<UserShoes />} />
         
        </Routes>
       

  );
};

export default App;
