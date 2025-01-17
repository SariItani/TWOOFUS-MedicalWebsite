import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Dashboard.css';
// import './DiagnosisHistory.css'

const DiagnosisHistory = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    return (
      <div className="dashboard">
        <Navbar role={user.role} />
        <div className="dashboard-content">
            <div>Diagnosis History Page</div>
        </div>
        <Footer />
      </div>
    );
  };
  
export default DiagnosisHistory;
  