import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Dashboard.css';

const PatientDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    return (
      <div className="dashboard">
        <Navbar role={user.role} />
        <div className="dashboard-content">
          <h1>Welcome, {user.username}!</h1>
          <div className="dashboard-links">
            <a href="/medical-profile">View Medical Profile</a>
            <a href="/search">Search for Doctors</a>
            <a href="/chat">Chat with Doctors</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
export default PatientDashboard;
  