import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Dashboard.css';

const DoctorDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    return (
      <div className="dashboard">
        <Navbar role={user.role} />
        <div className="dashboard-content">
            <h1>Welcome, Dr. {user.username}!</h1>
            <div className="dashboard-links">
            <a href="/patients">View Patients</a>
            <a href="/availability">Manage Availability</a>
            <a href="/chat">Manage Chats</a>
            </div>
        </div>
        <Footer />
      </div>
    );
  };
  
export default DoctorDashboard;
  