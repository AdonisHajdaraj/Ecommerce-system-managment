import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import {
  FaChartBar,
  FaTshirt,
  FaShoePrints,
  FaShoppingBag,
  FaShoppingCart,
  FaSignOutAlt,
  FaEnvelope,
  FaHatCowboy
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const USidebar = () => {
  const [showVeshjeDropdown, setShowVeshjeDropdown] = useState(false);
  const [showShoesDropdown, setShowShoesDropdown] = useState(false);
  const navigate = useNavigate();

  const handleClothingClick = (e) => {
    e.preventDefault();
    navigate('/clothing');
  };

  const handleShoesClick = (e) => {
    e.preventDefault();
    navigate('/footwear');
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-4 shadow-sm"
      style={{
        fontSize: '1rem',
        backgroundColor: '#F9FAFB',
        color: '#1F2937',
        minHeight: '100vh',
        borderRight: '1px solid #E5E7EB'
      }}
    >
      <div className="d-flex align-items-center mb-4">
        <span className="fs-4 fw-bold text-primary">BoHoChic</span>
      </div>

      <Nav className="flex-column">
        <SidebarLink to="/user-dashboard" icon={<FaChartBar />} text="Dashboard" />
        <DropdownMenu
          show={showVeshjeDropdown}
          setShow={setShowVeshjeDropdown}
          label="Clothing"
          icon={<FaTshirt />}
          onClick={handleClothingClick}
          dropdownContent={
            <ClothingDropdown />
          }
        />
        <DropdownMenu
          show={showShoesDropdown}
          setShow={setShowShoesDropdown}
          label="Footwear"
          icon={<FaShoePrints />}
          onClick={handleShoesClick}
          dropdownContent={
            <FootwearDropdown />
          }
        />
        <SidebarLink to="/user-bag" icon={<FaShoppingBag />} text="Bag" />
        <SidebarLink to="/user-hat" icon={<FaHatCowboy />} text="Hat" />
        <SidebarLink to="/user-cart" icon={<FaShoppingCart />} text="Cart" />
        <SidebarLink to="/user-contactus" icon={<FaEnvelope />} text="Contact Us" />
        <SidebarLink to="/logout" icon={<FaSignOutAlt />} text="Logout" style={{ color: '#EF4444' }} />
      </Nav>
    </div>
  );
};

// 🔸 Sidebar Link Component
const SidebarLink = ({ to, icon, text, style }) => (
  <Nav.Link
    as={Link}
    to={to}
    className="d-flex align-items-center py-2 px-2 rounded"
    style={{ color: '#1F2937', ...style }}
    onMouseEnter={e => e.currentTarget.style.background = '#E0ECFF'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
  >
    <span className="me-2">{icon}</span> {text}
  </Nav.Link>
);

// 🔸 Dropdown Menu Wrapper
const DropdownMenu = ({ show, setShow, label, icon, onClick, dropdownContent }) => (
  <Nav.Item
    onMouseEnter={() => setShow(true)}
    onMouseLeave={() => setShow(false)}
    style={{ position: 'relative' }}
  >
    <Nav.Link
      href="#"
      onClick={onClick}
      className="d-flex align-items-center py-2 px-2 rounded"
      style={{ color: '#1F2937', cursor: 'pointer' }}
      onMouseEnter={e => e.currentTarget.style.background = '#E0ECFF'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <span className="me-2">{icon}</span> {label}
    </Nav.Link>
    {show && (
      <div
        className="position-absolute bg-white shadow rounded"
        style={{
          top: '0',
          left: '100%',
          minWidth: '500px',
          zIndex: 1000,
          padding: '10px'
        }}
      >
        {dropdownContent}
      </div>
    )}
  </Nav.Item>
);

// 🔸 Clothing Dropdown Content
const ClothingDropdown = () => (
  <div>
    <div className="d-flex justify-content-between mb-3">
      {/* T-Shirts */}
      <div style={{ width: '48%' }}>
        
        <Nav className="flex-column">
          <Nav.Link
            as={Link}
            to="/all-tshirts"
            style={{ color: 'black', fontWeight: 'bold', paddingBottom: '3px' }}
          >
             T-Shirts
          </Nav.Link>
          <Nav.Link as={Link} to="/user-tshirt-men" style={{ color: 'black' }}>
            Men
          </Nav.Link>
          <Nav.Link as={Link} to="/user-tshirt-women" style={{ color: 'black' }}>
            Women
          </Nav.Link>
          <Nav.Link as={Link} to="/user-tshirt-kids" style={{ color: 'black' }}>
            Kids
          </Nav.Link>
        </Nav>
      </div>

      {/* Hoodies */}
      <div style={{ width: '48%' }}>
        
        <Nav className="flex-column">
          <Nav.Link
            as={Link}
            to="/all-hoodies"
            style={{ color: 'black', fontWeight: 'bold', paddingBottom: '3px' }}
          >
            Hoodies
          </Nav.Link>
          <Nav.Link as={Link} to="/user-hoodie-men" style={{ color: 'black' }}>
            Men
          </Nav.Link>
          <Nav.Link as={Link} to="/user-hoodie-women" style={{ color: 'black' }}>
            Women
          </Nav.Link>
          <Nav.Link as={Link} to="/user-hoodie-kids" style={{ color: 'black' }}>
            Kids
          </Nav.Link>
        </Nav>
      </div>
    </div>

    {/* Pants */}
    <div>
      
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/all-pants"
          style={{ color: 'black', fontWeight: 'bold', paddingBottom: '3px' }}
        >
          Pants
        </Nav.Link>
        <Nav.Link as={Link} to="/user-pants-men" style={{ color: 'black' }}>
          Men
        </Nav.Link>
        <Nav.Link as={Link} to="/user-pants-women" style={{ color: 'black' }}>
          Women
        </Nav.Link>
        <Nav.Link as={Link} to="/user-pants-kids" style={{ color: 'black' }}>
          Kids
        </Nav.Link>
      </Nav>
    </div>
  </div>
);


// 🔸 Footwear Dropdown Content
// 🔸 Footwear Dropdown Content
const FootwearDropdown = () => (
  <div>
    
    <Nav className="flex-column">
      <Nav.Link
        as={Link}
        to="/all-shoes"
        style={{ color: 'black', fontWeight: 'bold', paddingBottom: '3px' }}
      >
        Shoes
      </Nav.Link>
      <Nav.Link as={Link} to="/user-shoes" style={{ color: 'black' }}>
        Men
      </Nav.Link>
      <Nav.Link as={Link} to="/user-shoes-women" style={{ color: 'black' }}>
        Women
      </Nav.Link>
      <Nav.Link as={Link} to="/user-shoes-kids" style={{ color: 'black' }}>
        Kids
      </Nav.Link>
    </Nav>
  </div>
);


export default USidebar;