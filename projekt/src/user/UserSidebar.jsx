import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaTachometerAlt, FaUsers, FaSignOutAlt, FaBoxOpen, FaChartLine, FaTshirt ,FaShoePrints,FaShoppingBag } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const USidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-white shadow-sm"  style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 text-dark text-decoration-none">
        <span className="fs-4 fw-bold">BoHoChic</span>
      </a>
      <hr />
      <Nav className="flex-column">
        <Nav.Link href="user-dashboard" className="d-flex align-items-center text-dark py-2" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          <FaTachometerAlt className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/user-tshirt" className="d-flex align-items-center text-dark py-2"  style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          <FaTshirt className="me-2" /> T-Shirt
        </Nav.Link>
        <Nav.Link href="/user-shoes" className="d-flex align-items-center text-dark py-2"  style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          <FaShoePrints className="me-2" /> Shoes
        </Nav.Link>
      
        <Nav.Link href="/user-bag" className="d-flex align-items-center text-dark py-2"  style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          <FaShoppingBag className="me-2" /> Bag
        </Nav.Link>
      
      
              <Nav.Link href="UserSale
              " className="d-flex align-items-center text-dark py-2" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                <FaChartLine className="me-2" /> Sales
                </Nav.Link>
        <Nav.Link href="logout" className="d-flex align-items-center text-danger py-2"  style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default USidebar;