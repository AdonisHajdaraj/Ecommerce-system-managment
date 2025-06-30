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
      className="d-flex flex-column flex-shrink-0 p-3 shadow-sm"
      style={{
        fontWeight: 'bold',
        fontSize: '1.5rem',
        backgroundColor: '#5A8DEE',
        color: 'black',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 text-black text-decoration-none">
        <span className="fs-4 fw-bold">BoHoChic</span>
      </a>
      <hr className="border-light" />
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/user-dashboard" className="d-flex align-items-center py-2" style={{ color: 'black' }}>
          <FaChartBar className="me-2" /> Dashboard
        </Nav.Link>

        {/* Clothing Dropdown */}
        <Nav.Item
          onMouseEnter={() => setShowVeshjeDropdown(true)}
          onMouseLeave={() => setShowVeshjeDropdown(false)}
          style={{ position: 'relative' }}
        >
          <Nav.Link
            href="/clothing"
            onClick={handleClothingClick}
            className="d-flex align-items-center py-2"
            style={{ color: 'black', cursor: 'pointer' }}
          >
            <FaTshirt className="me-2" /> Clothing
          </Nav.Link>

          {showVeshjeDropdown && (
            <div
              className="position-absolute bg-white shadow-sm rounded"
              style={{
                top: '0',
                left: '100%',
                minWidth: '500px',
                zIndex: 1000,
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Row 1: T-Shirts and Hoodies side by side */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                {/* T-Shirts */}
                <div style={{ width: '48%' }}>
                  <Nav.Link
                    as={Link}
                    to="/all-tshirts"
                    style={{
                      color: 'black',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      borderBottom: '1px solid #ccc',
                      paddingBottom: '3px'
                    }}
                  >
                    T-Shirts
                  </Nav.Link>
                  <Nav className="flex-column">
                    <Nav.Link as={Link} to="/user-tshirt-men" style={{ color: 'black', fontSize: '1rem' }}>
                      T-Shirts for Men
                    </Nav.Link>
                    <Nav.Link as={Link} to="/user-tshirt-women" style={{ color: 'black', fontSize: '1rem' }}>
                      T-Shirts for Women
                    </Nav.Link>
                    <Nav.Link as={Link} to="/user-tshirt-kids" style={{ color: 'black', fontSize: '1rem' }}>
                      T-Shirts for Kids
                    </Nav.Link>
                  </Nav>
                </div>

                {/* Hoodies */}
                <div style={{ width: '48%' }}>
                  <Nav.Link
                    as={Link}
                    to="/all-hoodies"
                    style={{
                      color: 'black',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      borderBottom: '1px solid #ccc',
                      paddingBottom: '3px'
                    }}
                  >
                    Hoodies
                  </Nav.Link>
                  <Nav className="flex-column">
                    <Nav.Link as={Link} to="/user-hoodie-men" style={{ color: 'black', fontSize: '1rem' }}>
                      Hoodies for Men
                    </Nav.Link>
                    <Nav.Link as={Link} to="/user-hoodie-women" style={{ color: 'black', fontSize: '1rem' }}>
                      Hoodies for Women
                    </Nav.Link>
                    <Nav.Link as={Link} to="/user-hoodie-kids" style={{ color: 'black', fontSize: '1rem' }}>
                      Hoodies for Kids
                    </Nav.Link>
                  </Nav>
                </div>
              </div>

              {/* Row 2: Pants full width */}
              <div>
                <Nav.Link
                  as={Link}
                  to="/all-pants"
                  style={{
                    color: 'black',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '3px',
                    marginBottom: '5px'
                  }}
                >
                  Pants
                </Nav.Link>
                <Nav className="flex-column">
                  <Nav.Link as={Link} to="/user-pants-men" style={{ color: 'black', fontSize: '1rem' }}>
                    Pants for Men
                  </Nav.Link>
                  <Nav.Link as={Link} to="/user-pants-women" style={{ color: 'black', fontSize: '1rem' }}>
                    Pants for Women
                  </Nav.Link>
                  <Nav.Link as={Link} to="/user-pants-kids" style={{ color: 'black', fontSize: '1rem' }}>
                    Pants for Kids
                  </Nav.Link>
                </Nav>
              </div>
            </div>
          )}
        </Nav.Item>

        {/* Shoes Dropdown */}
        <Nav.Item
          onMouseEnter={() => setShowShoesDropdown(true)}
          onMouseLeave={() => setShowShoesDropdown(false)}
          style={{ position: 'relative' }}
        >
          <Nav.Link
            href="/footwear"
            onClick={handleShoesClick}
            className="d-flex align-items-center py-2"
            style={{ color: 'black', cursor: 'pointer' }}
          >
            <FaShoePrints className="me-2" /> Footwear
          </Nav.Link>

          {showShoesDropdown && (
            <div
              className="position-absolute bg-white shadow-sm rounded"
              style={{
                top: '0',
                left: '100%',
                minWidth: '180px',
                zIndex: 1000,
                padding: '10px'
              }}
            >
              {/* Shoes */}
              <Nav.Link
                as={Link}
                to="/all-shoes"
                style={{
                  color: 'black',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '3px'
                }}
              >
                Shoes
              </Nav.Link>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/user-shoes" style={{ color: 'black', fontSize: '1rem' }}>
                  Shoes for Men
                </Nav.Link>
                <Nav.Link as={Link} to="/user-shoes-women" style={{ color: 'black', fontSize: '1rem' }}>
                  Shoes for Women
                </Nav.Link>
                <Nav.Link as={Link} to="/user-shoes-kids" style={{ color: 'black', fontSize: '1rem' }}>
                  Shoes for Kids
                </Nav.Link>
              </Nav>
            </div>
          )}
        </Nav.Item>

        {/* Other links */}
        <Nav.Link as={Link} to="/user-bag" className="d-flex align-items-center py-2" style={{ color: 'black' }}>
          <FaShoppingBag className="me-2" /> Bag
        </Nav.Link>
        <Nav.Link as={Link} to="/user-cart" className="d-flex align-items-center py-2" style={{ color: 'black' }}>
   <FaShoppingCart className="me-2" /> Hat
</Nav.Link>

        <Nav.Link as={Link} to="/user-cart" className="d-flex align-items-center py-2" style={{ color: 'black' }}>
          <FaShoppingCart className="me-2" /> Cart
        </Nav.Link>
        <Nav.Link as={Link} to="/user-contactus" className="d-flex align-items-center py-2" style={{ color: 'black' }}>
          <FaEnvelope className="me-2" /> Contact Us
        </Nav.Link>
        <Nav.Link as={Link} to="/logout" className="d-flex align-items-center py-2" style={{ color: '#ff4d4d' }}>
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      
      </Nav>
    </div>
  );
};

export default USidebar;
