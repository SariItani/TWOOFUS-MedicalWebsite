import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <header className="landing-header">
          <h1>Welcome to Healthcare Portal</h1>
          <p className="tagline">Your health, our priority</p>
          <p className="subtitle">Experience modern healthcare management with our comprehensive platform</p>
        </header>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👨‍⚕️</div>
            <h3>Expert Doctors</h3>
            <p>Connect with qualified healthcare professionals</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Easy Scheduling</h3>
            <p>Book appointments with just a few clicks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>24/7 Access</h3>
            <p>Manage your health anywhere, anytime</p>
          </div>
        </div>

        <div className="landing-buttons">
          <a href="/login" className="btn btn-primary">
            Login
            <span className="btn-arrow">→</span>
          </a>
          <a href="/signup" className="btn btn-secondary">
            Sign Up
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>

      <div className="background-pattern"></div>
    </div>
  );
};

export default LandingPage;