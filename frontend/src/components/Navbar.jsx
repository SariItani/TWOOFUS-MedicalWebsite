import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ role }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Healthcare Portal</div>
      <ul className="navbar-links">
        {role === 'user' && (
          <>
            <li><Link to="/patient-dashboard">Dashboard</Link></li>
            <li><Link to="/medical-profile">Medical Profile</Link></li>
            <li><Link to="/search-doctors">Search Doctors</Link></li>
          </>
        )}
        {role === 'doctor' && (
          <>
            <li><Link to="/doctor-dashboard">Dashboard</Link></li>
            <li><Link to="/patients">Patients</Link></li>
            <li><Link to="/availability">Availability</Link></li>
          </>
        )}
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
