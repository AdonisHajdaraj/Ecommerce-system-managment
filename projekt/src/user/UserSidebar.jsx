import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import {
  FaTachometerAlt,
  FaUsers,
  FaSignOutAlt,
  FaBoxOpen,
  FaChartLine,
  FaTshirt,
  FaShoePrints,
  FaShoppingBag
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const USidebar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 shadow-sm"
      style={{
        fontWeight: 'bold',
        fontSize: '1.5rem',
        backgroundColor: '	#5A8DEE',
        color: 'black',
        minHeight: '100vh',
        
      }}
    >
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 text-black text-decoration-none">
        <span className="fs-4 fw-bold">BoHoChic</span>
      </a>
      <hr className="border-light" />
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/user-dashboard" className="d-flex align-items-center py-2" style={{ color: 'black' }}>
          <FaTachometerAlt className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/user-tshirt" className="d-flex align-items-center py-2" style={{ color: 'black' }}>
          <FaTshirt className="me-2" /> T-Shirt
        </Nav.Link>
        <Nav.Link as={Link} to="/user-shoes" className="d-flex align-items-center py-2" style={{ color: 'black' }}>
          <FaShoePrints className="me-2" /> Shoes
        </Nav.Link>
        <Nav.Link as={Link} to="/user-bag" className="d-flex align-items-center py-2" style={{ color: 'black' }}>
          <FaShoppingBag className="me-2" /> Bag
        </Nav.Link>
        <Nav.Link as={Link} to="/user-sale" className="d-flex align-items-center py-2" style={{ color: 'black' }}>
          <FaChartLine className="me-2" /> Sales
        </Nav.Link>
        <Nav.Link as={Link} to="/logout" className="d-flex align-items-center py-2" style={{ color: '#ff4d4d' }}>
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default USidebar;
