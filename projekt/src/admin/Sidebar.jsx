import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FaTachometerAlt, FaUsers, FaSignOutAlt, FaTshirt, FaShoePrints, FaShoppingBag, FaShoppingCart, FaEnvelope,FaHatCowboy } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const [showVeshjeDropdown, setShowVeshjeDropdown] = useState(false);
  const [showShoesDropdown, setShowShoesDropdown] = useState(false);

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 shadow-sm"
      style={{
        width: '250px',
        height: '100vh',
        position: 'fixed',
        backgroundColor: '#C0C0C0',
        zIndex: 1000,
      }}
    >
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 text-dark text-decoration-none">
        <span className="fs-4 fw-bold">Ecommerce</span>
      </a>
      <hr />
      <Nav className="flex-column position-relative">
        <Nav.Link
          as={Link}
          to="/dashboard"
          className="d-flex align-items-center text-dark py-2 justify-content-center"
        >
          <FaTachometerAlt className="me-2" /> Dashboard
        </Nav.Link>

        {/* Clothing dropdown */}
        <div
          onMouseEnter={() => setShowVeshjeDropdown(true)}
          onMouseLeave={() => setShowVeshjeDropdown(false)}
          style={{ position: 'relative', cursor: 'pointer' }}
        >
          <div
            className="d-flex align-items-center text-dark py-2 justify-content-center"
            style={{ fontWeight: 'bold' }}
          >
            <FaTshirt className="me-2" />
            <span>Clothing</span>
          </div>

          {showVeshjeDropdown && (
            <div
              className="bg-white shadow-sm rounded"
              style={{
                position: 'absolute',
                top: 0,
                left: '100%', // hapet anash sidebar-it, pra në të djathtë
                minWidth: '200px',
                border: '1px solid #ccc',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-around',
                gap: '20px',
                zIndex: 1100,
              }}
            >
              {/* T-Shirts */}
              <div style={{ minWidth: '100px' }}>
                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    textAlign: 'center',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '3px',
                  }}
                >
                  T-Shirts
                </div>
                <Nav className="flex-column">
                  <Nav.Link as={Link} to="/tshirt-men" style={{ color: 'black', fontSize: '1rem' }}>
                    T-Shirts for Men
                  </Nav.Link>
                  <Nav.Link as={Link} to="/tshirt-women" style={{ color: 'black', fontSize: '1rem' }}>
                    T-Shirts for Women
                  </Nav.Link>
                  <Nav.Link as={Link} to="/tshirt-kids" style={{ color: 'black', fontSize: '1rem' }}>
                    T-Shirts for Kids
                  </Nav.Link>
                </Nav>
              </div>

              {/* Hoodies */}
              <div style={{ minWidth: '100px' }}>
                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    textAlign: 'center',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '3px',
                  }}
                >
                  Hoodies
                </div>
                <Nav className="flex-column">
                  <Nav.Link
                    as={Link}
                    to="/hoodie-men"
                    style={{ color: 'black', fontSize: '1rem' }}
                  >
                    Hoodies for Men
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/hoodie-women"
                    style={{ color: 'black', fontSize: '1rem' }}
                  >
                    Hoodies for Women
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/hoodie-kids"
                    style={{ color: 'black', fontSize: '1rem' }}
                  >
                    Hoodies for Kids
                  </Nav.Link>
                </Nav>
              </div>

              {/* Pants */}
              <div style={{ minWidth: '100px' }}>
                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    textAlign: 'center',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '3px',
                  }}
                >
                  Pants
                </div>
                <Nav className="flex-column">
                  <Nav.Link
                    as={Link}
                    to="/pants-men"
                    style={{ color: 'black', fontSize: '1rem' }}
                  >
                    Pants for Men
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/pants-women"
                    style={{ color: 'black', fontSize: '1rem' }}
                  >
                    Pants for Women
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/pants-kids"
                    style={{ color: 'black', fontSize: '1rem' }}
                  >
                    Pants for Kids
                  </Nav.Link>
                </Nav>
              </div>
            </div>
          )}
        </div>

        {/* Shoes dropdown */}
        <div
          onMouseEnter={() => setShowShoesDropdown(true)}
          onMouseLeave={() => setShowShoesDropdown(false)}
          style={{ position: 'relative', cursor: 'pointer' }}
        >
          <div
            className="d-flex align-items-center text-dark py-2 justify-content-center"
            style={{ fontWeight: 'bold' }}
          >
            <FaShoePrints className="me-2" />
            <span>Trainers</span>
          </div>

          {showShoesDropdown && (
            <div
              className="bg-white shadow-sm rounded"
              style={{
                position: 'absolute',
                top: 0,
                left: '100%',
                minWidth: '200px',
                border: '1px solid #ccc',
                padding: '10px',
                zIndex: 1100,
              }}
            >
              <div style={{ minWidth: '100px' }}>
                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    textAlign: 'center',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '3px',
                  }}
                >
                  Shoes
                </div>
                <Nav className="flex-column">
                  <Nav.Link as={Link} to="/shoes-men" style={{ color: 'black', fontSize: '1rem' }}>
                    Shoes for Men
                  </Nav.Link>
                  <Nav.Link as={Link} to="/shoes-women" style={{ color: 'black', fontSize: '1rem' }}>
                    Shoes for Women
                  </Nav.Link>
                  <Nav.Link as={Link} to="/shoes-kids" style={{ color: 'black', fontSize: '1rem' }}>
                    Shoes for Kids
                  </Nav.Link>
                </Nav>
              </div>
            </div>
          )}
        </div>

        <Nav.Link
          as={Link}
          to="/bag"
          className="d-flex align-items-center text-dark py-2 justify-content-center"
        >
          <FaShoppingBag className="me-2" /> Bag
        </Nav.Link>
<Nav.Link
          as={Link}
          to="/hat"
          className="d-flex align-items-center text-dark py-2 justify-content-center"
        >
          <FaHatCowboy className="me-2" /> Hat
        </Nav.Link>






        <Nav.Link
          as={Link}
          to="/admin-orders"
          className="d-flex align-items-center text-dark py-2 justify-content-center"
        >
          <FaShoppingCart className="me-2" /> Orders
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/users"
          className="d-flex align-items-center text-dark py-2 justify-content-center"
        >
          <FaUsers className="me-2" /> Users
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/admin-messages"
          className="d-flex align-items-center text-dark py-2 justify-content-center"
        >
          <FaEnvelope className="me-2" /> Messages
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/logout"
          className="d-flex align-items-center text-danger py-2 justify-content-center"
        >
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
