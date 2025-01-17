import logo from './logo.svg';
import './App.css';
import { React , lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AccessDenied from './pages/AccessDenied';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';

const PatientDashboard = lazy(() => import('./pages/PatientDashboard'));
const DoctorDashboard = lazy(() => import('./pages/DoctorDashboard'));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route
          path="/doctor/dashboard"
          element={
            <PrivateRoute role="doctor">
              <Suspense fallback={<div>Loading...</div>}>
                <DoctorDashboard />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/patient/dashboard"
          element={
            <PrivateRoute role="user">
              <Suspense fallback={<div>Loading...</div>}>
                <PatientDashboard />
              </Suspense>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
