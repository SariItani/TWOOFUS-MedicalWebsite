import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Dashboard.css';
// import './Chats.css'

const Chats = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    return (
      <div className="dashboard">
        <Navbar role={user.role} />
        <div className="dashboard-content">
            <div>Chats Page</div>
        </div>
        <Footer />
      </div>
    );
  };
  
export default Chats;
  