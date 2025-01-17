import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Dashboard.css';
// import './MedicalProfile.css'

const MedicalProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    return (
      <div className="dashboard">
        <Navbar role={user.role} />
        <div className="dashboard-content">
            <div>Medical Profile Page</div>
        </div>
        <Footer />
      </div>
    );
  };
  
export default MedicalProfile;
  