import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Dashboard.css';
// import './Patients.css'

const Patients = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    return (
      <div className="dashboard">
        <Navbar role={user.role} />
        <div className="dashboard-content">
            <div>Patients Page</div>
        </div>
        <Footer />
      </div>
    );
  };
  
export default Patients;
  