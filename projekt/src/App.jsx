import React from 'react';

import { Route, Routes, Link  } from 'react-router-dom';
import './App.css';
import Dashboard from './admin/Dashboard';
import Sidebar from './admin/Sidebar'



import Logout from './components/logout';
import Signup from './components/Signup';
import Login from './components/Login';
import Products from './admin/Products';

import Contactus from './user/Contactus';
import AdminContactus from './admin/AdminContactus';

import Users from './admin/Users';

import Clothing from './user/Clothing';
import AllTshirts from './user/AllTshirts';
import Tshirt from './admin/Tshirt'
import AddTshirt from './admin/AddTshirt';
import EditTshirt from './admin/EditTshirt';
import TshirtWomen from './admin/TshirtWomen';
import AddTshirtWomen from './admin/AddTshirtWomen';
import EditTshirtWomen from './admin/EditTshirtWomen';
import TshirtKids from './admin/TshirtKids';
import AddTshirtKids from './admin/AddTshirtKids';
import EditTshirtKids from './admin/EditTshirtKids';

import AllHoodies from './user/AllHoodies';
import Hoodie from './admin/Hoodie';
import AddHoodie from './admin/AddHoodie';
import EditHoodie from './admin/EditHoodie';
import HoodieWomen from './admin/HoodieWomen';
import AddHoodieWomen from './admin/AddHoodieWomen';
import EditHoodieWomen from './admin/EditHoodieWomen';
import HoodieKids from './admin/HoodieKids';
import AddHoodieKids from './admin/AddHoodieKids';
import EditHoodieKids from './admin/EditHoodieKids';
import Hat from './admin/Hat';
import AddHat from './admin/AddHat';
import EditHat from './admin/EditHat';




import AllPants from './user/AllPants';
import Pants from './admin/Pants';
import AddPants from './admin/AddPants';
import EditPants from './admin/EditPants';
import PantsWomen from './admin/PantsWomen';
import AddPantsWomen from './admin/AddPantsWomen';
import EditPantsWomen from './admin/EditPantsWomen';


import Footwear from './user/Footwear';
import AllShoes from './user/AllShoes';
import Shoes from './admin/Shoes'
import AddShoes from './admin/AddShoes';
import EditShoes from './admin/EditShoes';
import ShoesWomen from './admin/ShoesWomen';
import AddShoesWomen from './admin/AddShoesWomen';
import EditShoesWomen from './admin/EditShoesWomen';
import ShoesKids from './admin/ShoesKids';
import AddShoesKids from './admin/AddShoesKids';
import EditShoesKids from './admin/EditShoesKids';
import PantsKids from './admin/PantsKids';
import AddPantsKids from './admin/AddPantsKids';
import EditPantsKids from './admin/EditPantsKids';



import Bag from './admin/Bag'
import AddBag from './admin/AddBag';
import EditBag from './admin/EditBag';
import AdminOrders from './admin/AdminOrders';



import UDashboard from './user/UserDashboard';
import USidebar from './user/UserSidebar';

import UserTshirt from './user/UserTshirt';
import UserTshirtWomen from './user/UserTshirtWomen';
import UserTshirtKids from './user/UserTshirtKids';

import UserHoodieMen from './user/UserHoodieMen';
import UserHoodieWomen from './user/UserHoodieWomen';
import UserHoodieKids from './user/UserHoodieKids';

import UserPants from './user/UserPants';
import UserPantsWomen from './user/UserPantsWomen';
import UserPantsKids from './user/UserPantsKids';

import UserShoes from './user/UserShoes';
import UserShoesWomen from './user/UserShoesWomen';
import UserShoesKids from './user/UserShoesKids';

import UserBag from './user/UserBag';
import UserHat from './user/UserHat';
import UProducts from './user/UserProducts';  
import UserCart from './user/UserCart';
import PrivateRoute from './components/PrivateRoute';



const App = () => {
  return (
  
     
       (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Private admin routes */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/sidebar" element={<PrivateRoute><Sidebar /></PrivateRoute>} />
      <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
      <Route path="/admin-messages" element={<PrivateRoute><AdminContactus /></PrivateRoute>} />
      <Route path="/admin-orders" element={<PrivateRoute><AdminOrders /></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />

      {/* TShirts */}
      <Route path="/tshirt-men" element={<PrivateRoute><Tshirt /></PrivateRoute>} />
      <Route path="/addtshirt-men" element={<PrivateRoute><AddTshirt /></PrivateRoute>} />
      <Route path="/edittshirt-men/:id" element={<PrivateRoute><EditTshirt /></PrivateRoute>} />
      <Route path="/tshirt-women" element={<PrivateRoute><TshirtWomen /></PrivateRoute>} />
      <Route path="/addtshirt-women" element={<PrivateRoute><AddTshirtWomen /></PrivateRoute>} />
      <Route path="/edittshirt-women/:id" element={<PrivateRoute><EditTshirtWomen /></PrivateRoute>} />
      <Route path="/tshirt-kids" element={<PrivateRoute><TshirtKids /></PrivateRoute>} />
      <Route path="/addtshirt-kids" element={<PrivateRoute><AddTshirtKids /></PrivateRoute>} />
      <Route path="/edittshirt-kids/:id" element={<PrivateRoute><EditTshirtKids /></PrivateRoute>} />

      {/* Hoodies */}
      <Route path="/hoodie-men" element={<PrivateRoute><Hoodie /></PrivateRoute>} />
      <Route path="/addhoodie-men" element={<PrivateRoute><AddHoodie /></PrivateRoute>} />
      <Route path="/edithoodie-men/:id" element={<PrivateRoute><EditHoodie /></PrivateRoute>} />
      <Route path="/hoodie-women" element={<PrivateRoute><HoodieWomen /></PrivateRoute>} />
      <Route path="/addhoodie-women" element={<PrivateRoute><AddHoodieWomen /></PrivateRoute>} />
      <Route path="/edithoodie-women/:id" element={<PrivateRoute><EditHoodieWomen /></PrivateRoute>} />
      <Route path="/hoodie-kids" element={<PrivateRoute><HoodieKids /></PrivateRoute>} />
      <Route path="/addhoodie-kids" element={<PrivateRoute><AddHoodieKids /></PrivateRoute>} />
      <Route path="/edithoodie-kids/:id" element={<PrivateRoute><EditHoodieKids /></PrivateRoute>} />

      {/* Pants */}
      <Route path="/pants-men" element={<PrivateRoute><Pants /></PrivateRoute>} />
      <Route path="/addpants-men" element={<PrivateRoute><AddPants /></PrivateRoute>} />
      <Route path="/editpants-men/:id" element={<PrivateRoute><EditPants /></PrivateRoute>} />
      <Route path="/pants-women" element={<PrivateRoute><PantsWomen /></PrivateRoute>} />
      <Route path="/addpants-women" element={<PrivateRoute><AddPantsWomen /></PrivateRoute>} />
      <Route path="/editpants-women/:id" element={<PrivateRoute><EditPantsWomen /></PrivateRoute>} />
      <Route path="/pants-kids" element={<PrivateRoute><PantsKids /></PrivateRoute>} />
      <Route path="/addpants-kids" element={<PrivateRoute><AddPantsKids /></PrivateRoute>} />
      <Route path="/editpants-kids/:id" element={<PrivateRoute><EditPantsKids /></PrivateRoute>} />

      {/* Shoes */}
      <Route path="/shoes-men" element={<PrivateRoute><Shoes /></PrivateRoute>} />
      <Route path="/addshoes-men" element={<PrivateRoute><AddShoes /></PrivateRoute>} />
      <Route path="/editshoes-men/:id" element={<PrivateRoute><EditShoes /></PrivateRoute>} />
      <Route path="/shoes-women" element={<PrivateRoute><ShoesWomen /></PrivateRoute>} />
      <Route path="/addshoes-women" element={<PrivateRoute><AddShoesWomen /></PrivateRoute>} />
      <Route path="/editshoes-women/:id" element={<PrivateRoute><EditShoesWomen /></PrivateRoute>} />
      <Route path="/shoes-kids" element={<PrivateRoute><ShoesKids /></PrivateRoute>} />
      <Route path="/addshoes-kids" element={<PrivateRoute><AddShoesKids /></PrivateRoute>} />
      <Route path="/editshoes-kids/:id" element={<PrivateRoute><EditShoesKids /></PrivateRoute>} />

      {/* Bags */}
      <Route path="/bag" element={<PrivateRoute><Bag /></PrivateRoute>} />
      <Route path="/addbag" element={<PrivateRoute><AddBag /></PrivateRoute>} />
      <Route path="/editbag/:id" element={<PrivateRoute><EditBag /></PrivateRoute>} />

{/* Hats */}
<Route path="/hat" element={<PrivateRoute><Hat /></PrivateRoute>} />
<Route path="/addhat" element={<PrivateRoute><AddHat /></PrivateRoute>} />
<Route path="/edithat/:id" element={<PrivateRoute><EditHat /></PrivateRoute>} />


      {/* User routes */}
      <Route path="/user-dashboard" element={<PrivateRoute><UDashboard /></PrivateRoute>} />
      <Route path="/user-sidebar" element={<PrivateRoute><USidebar /></PrivateRoute>} />
      <Route path="/clothing" element={<PrivateRoute><Clothing /></PrivateRoute>} />
      <Route path="/all-tshirts" element={<PrivateRoute><AllTshirts /></PrivateRoute>} />
      <Route path="/user-tshirt-men" element={<PrivateRoute><UserTshirt /></PrivateRoute>} />
      <Route path="/user-tshirt-women" element={<PrivateRoute><UserTshirtWomen /></PrivateRoute>} />
      <Route path="/user-tshirt-kids" element={<PrivateRoute><UserTshirtKids /></PrivateRoute>} />
      <Route path="/all-hoodies" element={<PrivateRoute><AllHoodies /></PrivateRoute>} />
      <Route path="/user-hoodie-men" element={<PrivateRoute><UserHoodieMen /></PrivateRoute>} />
      <Route path="/user-hoodie-women" element={<PrivateRoute><UserHoodieWomen /></PrivateRoute>} />
      <Route path="/user-hoodie-kids" element={<PrivateRoute><UserHoodieKids /></PrivateRoute>} />
      <Route path="/all-pants" element={<PrivateRoute><AllPants /></PrivateRoute>} />
      <Route path="/user-pants-men" element={<PrivateRoute><UserPants /></PrivateRoute>} />
      <Route path="/user-pants-women" element={<PrivateRoute><UserPantsWomen /></PrivateRoute>} />
      <Route path="/user-pants-kids" element={<PrivateRoute><UserPantsKids /></PrivateRoute>} />
      <Route path="/all-shoes" element={<PrivateRoute><AllShoes /></PrivateRoute>} />
      <Route path="/footwear" element={<PrivateRoute><Footwear /></PrivateRoute>} />
      <Route path="/user-shoes" element={<PrivateRoute><UserShoes /></PrivateRoute>} />
      <Route path="/user-shoes-women" element={<PrivateRoute><UserShoesWomen /></PrivateRoute>} />
      <Route path="/user-shoes-kids" element={<PrivateRoute><UserShoesKids /></PrivateRoute>} />
      <Route path="/user-bag" element={<PrivateRoute><UserBag /></PrivateRoute>} />
      <Route path="/user-hat" element={<PrivateRoute><UserHat /></PrivateRoute>} />

      <Route path="/user-products" element={<PrivateRoute><UProducts /></PrivateRoute>} />
      <Route path="/user-cart" element={<PrivateRoute><UserCart /> </PrivateRoute>} />

      {/* Contact */}
      <Route path="/user-contactus" element={<PrivateRoute><Contactus /></PrivateRoute>} />

      {/* Logout */}
      <Route path="/logout" element={<Logout />} />
    </Routes>
       

  ));
};

export default App;