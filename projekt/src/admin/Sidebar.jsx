import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import {
  FaTachometerAlt, FaUsers, FaSignOutAlt, FaTshirt, FaShoePrints,
  FaShoppingBag, FaShoppingCart, FaEnvelope, FaHatCowboy
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const [showVeshjeDropdown, setShowVeshjeDropdown] = useState(false);
  const [showShoesDropdown, setShowShoesDropdown] = useState(false);

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 shadow"
      style={{
        width: '250px',
        height: '100vh',
        position: 'fixed',
        background: 'linear-gradient(to bottom, #fdfbfb, #ebedee)',
        borderRight: '1px solid #ccc',
        zIndex: 1000,
      }}
    >
      <div className="mb-4 text-center">
        <h4 className="fw-bold" style={{ color: '#4A90E2' }}>BoHoChic</h4>
      </div>
      <Nav className="flex-column">

        <NavItem to="/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />

        {/* CLOTHING DROPDOWN */}
        <DropdownItem
          icon={<FaTshirt />}
          label="Clothing"
          show={showVeshjeDropdown}
          onMouseEnter={() => setShowVeshjeDropdown(true)}
          onMouseLeave={() => setShowVeshjeDropdown(false)}
          items={[
            {
              title: 'T-Shirts',
              links: [
                { to: '/tshirt-men', label: 'T-Shirts for Men' },
                { to: '/tshirt-women', label: 'T-Shirts for Women' },
                { to: '/tshirt-kids', label: 'T-Shirts for Kids' }
              ]
            },
            {
              title: 'Hoodies',
              links: [
                { to: '/hoodie-men', label: 'Hoodies for Men' },
                { to: '/hoodie-women', label: 'Hoodies for Women' },
                { to: '/hoodie-kids', label: 'Hoodies for Kids' }
              ]
            },
            {
              title: 'Pants',
              links: [
                { to: '/pants-men', label: 'Pants for Men' },
                { to: '/pants-women', label: 'Pants for Women' },
                { to: '/pants-kids', label: 'Pants for Kids' }
              ]
            }
          ]}
        />

        {/* SHOES DROPDOWN */}
        <DropdownItem
          icon={<FaShoePrints />}
          label="Trainers"
          show={showShoesDropdown}
          onMouseEnter={() => setShowShoesDropdown(true)}
          onMouseLeave={() => setShowShoesDropdown(false)}
          items={[
            {
              title: 'Shoes',
              links: [
                { to: '/shoes-men', label: 'Shoes for Men' },
                { to: '/shoes-women', label: 'Shoes for Women' },
                { to: '/shoes-kids', label: 'Shoes for Kids' }
              ]
            }
          ]}
        />

        <NavItem to="/bag" icon={<FaShoppingBag />} label="Bag" />
        <NavItem to="/hat" icon={<FaHatCowboy />} label="Hat" />
        <NavItem to="/admin-orders" icon={<FaShoppingCart />} label="Orders" />
        <NavItem to="/users" icon={<FaUsers />} label="Users" />
        <NavItem to="/admin-messages" icon={<FaEnvelope />} label="Messages" />

        <Nav.Link
          as={Link}
          to="/logout"
          className="d-flex align-items-center text-danger py-2 mt-auto justify-content-start"
        >
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

// Komponenti për navigim të thjeshtë
const NavItem = ({ to, icon, label }) => (
  <Nav.Link
    as={Link}
    to={to}
    className="d-flex align-items-center text-dark py-2 px-2 rounded mb-1"
    style={{
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6eaf0'}
    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
  >
    {icon} <span className="ms-2">{label}</span>
  </Nav.Link>
);

// Komponenti për dropdown
const DropdownItem = ({ icon, label, show, onMouseEnter, onMouseLeave, items }) => (
  <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ position: 'relative' }}>
    <div
      className="d-flex align-items-center text-dark py-2 px-2 rounded mb-1"
      style={{ fontWeight: 'bold', cursor: 'pointer' }}
    >
      {icon} <span className="ms-2">{label}</span>
    </div>

    {show && (
      <div
        className="bg-white shadow rounded border"
        style={{
          position: 'absolute',
          top: 0,
          left: '100%',
          minWidth: '220px',
          padding: '10px',
          display: 'flex',
          gap: '10px',
          zIndex: 1100,
        }}
      >
        {items.map((group, i) => (
          <div key={i} style={{ minWidth: '100px' }}>
            <div
              style={{
                fontSize: '0.95rem',
                fontWeight: 'bold',
                marginBottom: '8px',
                borderBottom: '1px solid #ccc',
                paddingBottom: '4px',
                textAlign: 'center',
              }}
            >
              {group.title}
            </div>
            <Nav className="flex-column">
              {group.links.map((link, idx) => (
                <Nav.Link
                  key={idx}
                  as={Link}
                  to={link.to}
                  style={{ fontSize: '0.95rem', color: '#333' }}
                >
                  {link.label}
                </Nav.Link>
              ))}
            </Nav>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Sidebar;
