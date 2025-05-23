import React from 'react';

import { Route, Routes, Link  } from 'react-router-dom';
import './App.css';
import Dashboard from './admin/Dashboard';
import Sidebar from './admin/Sidebar'

import Logout from './components/logout';
import Signup from './components/Signup';
import Login from './components/Login';
import Products from './admin/Products';


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

import AllPants from './user/AllPants';
import Pants from './admin/Pants';
import AddPants from './admin/AddPants';
import EditPants from './admin/EditPants';
import PantsWomen from './admin/PantsWomen';
import AddPantsWomen from './admin/AddPantsWomen';
import EditPantsWomen from './admin/EditPantsWomen';


import Footwear from './user/Footwear';
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
import UProducts from './user/UserProducts';  
import UserCart from './user/UserCart';
















const App = () => {
  return (
  
     
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/sidebar' element={<Sidebar />} />
  
          <Route path='/products' element={<Products/>}/>
          {/*Tshirt Admin */}
          <Route path='/tshirt-men' element={<Tshirt />}/>
          <Route path='/addtshirt-men' element={<AddTshirt />}/>
          <Route path='/edittshirt-men/:id' element={<EditTshirt/>}/>

          <Route path='/tshirt-women' element={<TshirtWomen />}/>
          <Route path='/addtshirt-women' element={<AddTshirtWomen />}/>
          <Route path='/edittshirt-women/:id' element={<EditTshirtWomen />}/>

          <Route path='/tshirt-kids' element={<TshirtKids />}/>
          <Route path='/addtshirt-kids' element={<AddTshirtKids />}/>
          <Route path='/edittshirt-kids/:id' element={<EditTshirtKids />}/>
          
          {/*Hoodie Admin */}
          <Route path='/hoodie-men' element={<Hoodie />}/>
          <Route path='/addhoodie-men' element={<AddHoodie />}/>
          <Route path='/edithoodie-men/:id' element={<EditHoodie/>}/>

          <Route path='/hoodie-women' element={<HoodieWomen />}/>
          <Route path='/addhoodie-women' element={<AddHoodieWomen />}/>
          <Route path='/edithoodie-women/:id' element={<EditHoodieWomen/>}/>

          <Route path='/hoodie-kids' element={<HoodieKids />}/>
          <Route path='/addhoodie-kids' element={<AddHoodieKids />}/>
          <Route path='/edithoodie-kids/:id' element={<EditHoodieKids/>}/>

          {/*Pants Admin */}
          <Route path='/pants-men' element={<Pants />}/>
          <Route path='/addpants-men' element={<AddPants />}/>
          <Route path='/editpants-men/:id' element={<EditPants/>}/>

          <Route path='/pants-women' element={<PantsWomen />}/>
          <Route path='/addpants-women' element={<AddPantsWomen />}/>
          <Route path='/editpants-women/:id' element={<EditPantsWomen/>}/>

          <Route path='/pants-kids' element={<PantsKids />}/>
          <Route path='/addpants-kids' element={<AddPantsKids />}/>
          <Route path='/editpants-kids/:id' element={<EditPantsKids/>}/>


          
          
          {/*Shoes Admin */}
          <Route path='/shoes-men' element={<Shoes />}/>
          <Route path='/addshoes-men' element={<AddShoes />}/>
          <Route path='/editshoes-men/:id' element={<EditShoes/>}/>

          <Route path='/shoes-women' element={<ShoesWomen />}/>
          <Route path='/addshoes-women' element={<AddShoesWomen />}/>
          <Route path='/editshoes-women/:id' element={<EditShoesWomen/>}/>

          <Route path='/shoes-kids' element={<ShoesKids />}/>
          <Route path='/addshoes-kids' element={<AddShoesKids />}/>
          <Route path='/editshoes-kids/:id' element={<EditShoesKids/>}/>

          


          
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/users' element={<Users />}/>

     
          <Route path='/logout' element={<Logout />} />
        

          <Route path='/user-dashboard' element={<UDashboard />} />
          <Route path='/user-sidebar' element={<USidebar />} />

          {/*Tshirt */}
          <Route path='/clothing' element={<Clothing />}/>
          <Route path='/all-tshirts' element={<AllTshirts />}/>
          <Route path='/user-tshirt-men' element={<UserTshirt />} />
          <Route path='/user-tshirt-women' element={<UserTshirtWomen />} />
          <Route path='/user-tshirt-kids' element={<UserTshirtKids />} />
          {/*Hoodie */}
          <Route path='/all-hoodies' element={<AllHoodies />}/>
          <Route path='/user-hoodie-men' element={<UserHoodieMen/>}/>
          <Route path='/user-hoodie-women' element={<UserHoodieWomen/>}/>
          <Route path='/user-hoodie-kids' element={<UserHoodieKids/>}/>
          {/*Pants */}
          <Route path='/all-pants' element={<AllPants />}/>
          <Route path='/user-pants-men' element={<UserPants/>}/>
          <Route path='/user-pants-women' element={<UserPantsWomen/>}/>
          <Route path='/user-pants-kids' element={<UserPantsKids/>}/>
          {/*Shoes */}
          <Route path='/footwear' element={<Footwear />}/>
          <Route path='/user-shoes' element={<UserShoes />} />
          <Route path='/user-shoes-women' element={<UserShoesWomen />} />
          <Route path='/user-shoes-kids' element={<UserShoesKids />} />
          {/*Bags */}
          <Route path='/user-bag' element={<UserBag />} />
          <Route path='/user-products' element={<UProducts />} />
          <Route path='/user-cart' element={<UserCart />} />
        

          <Route path='/bag' element={<Bag />}/>
          <Route path='/addbag' element={<AddBag />}/>
          <Route path='/editbag/:id' element={<EditBag/>}/>
          <Route path='/admin-orders' element={<AdminOrders/>}/>
        </Routes>
       

  );
};

export default App;
