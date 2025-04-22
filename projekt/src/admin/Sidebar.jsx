import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaTachometerAlt, FaUsers, FaSignOutAlt, FaBoxOpen, FaChartLine, FaTshirt ,FaShoePrints,FaShoppingBag} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  return (
    <div
    className="d-flex flex-column flex-shrink-0 p-3 shadow-sm"
    style={{
      width: '250px',
      height: '100vh',
      position: 'fixed',
      backgroundColor: '#C0C0C0' // 🎨 ngjyra hint
    }}
  >



      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 text-dark text-decoration-none">
        <span className="fs-4 fw-bold">Ecommerce</span>
      </a>
      <hr />
      <Nav className="flex-column">
        <Nav.Link href="dashboard" className="d-flex align-items-center text-dark py-2">
          <FaTachometerAlt className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link href="tshirt" className="d-flex align-items-center text-dark py-2">
          <FaTshirt className="me-2" /> T-Shirt
        </Nav.Link>
        <Nav.Link href="shoes" className="d-flex align-items-center text-dark py-2">
          <FaShoePrints className="me-2" /> Shoes
          </Nav.Link>

          <Nav.Link href="bag" className="d-flex align-items-center text-dark py-2">
          <FaShoppingBag className="me-2" /> Bag
        </Nav.Link>

      
        <Nav.Link href="sales" className="d-flex align-items-center text-dark py-2">
          <FaChartLine className="me-2" /> Sales
        </Nav.Link>
        <Nav.Link href="users" className="d-flex align-items-center text-dark py-2">
          <FaUsers className="me-2" /> Users
        </Nav.Link>
        <Nav.Link href="logout" className="d-flex align-items-center text-danger py-2">
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;