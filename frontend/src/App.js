import logo from './logo.svg';
import './App.css';
import { React, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AccessDenied from './pages/AccessDenied';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import Logout from './pages/Logout';

const PatientDashboard = lazy(() => import('./pages/PatientDashboard'));
const DoctorDashboard = lazy(() => import('./pages/DoctorDashboard'));
const MedicalProfile = lazy(() => import('./pages/MedicalProfile'));
const SearchDoctors = lazy(() => import('./pages/SearchDoctors'));
const Chats = lazy(() => import('./pages/Chats'));
const DiagnosisHistory = lazy(() => import('./pages/DiagnosisHistory'));
const Profile = lazy(() => import('./pages/Profile'));
const Patients = lazy(() => import('./pages/Patients'));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* Patient-specific routes */}
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
        <Route
          path="/medical-profile"
          element={
            <PrivateRoute role="user">
              <Suspense fallback={<div>Loading...</div>}>
                <MedicalProfile />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/search-doctors"
          element={
            <PrivateRoute role="user">
              <Suspense fallback={<div>Loading...</div>}>
                <SearchDoctors />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/diagnosis-history"
          element={
            <PrivateRoute role="user">
              <Suspense fallback={<div>Loading...</div>}>
                <DiagnosisHistory />
              </Suspense>
            </PrivateRoute>
          }
        />

        {/* Doctor-specific routes */}
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
          path="/profile"
          element={
            <PrivateRoute role="doctor">
              <Suspense fallback={<div>Loading...</div>}>
                <Profile />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <PrivateRoute role="doctor">
              <Suspense fallback={<div>Loading...</div>}>
                <Patients />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/diagnosis-history"
          element={
            <PrivateRoute role="doctor">
              <Suspense fallback={<div>Loading...</div>}>
                <DiagnosisHistory />
              </Suspense>
            </PrivateRoute>
          }
        />

        {/* Shared route for Chats */}
        <Route
          path="/chats"
          element={
            <PrivateRoute role={['user', 'doctor']}>
              <Suspense fallback={<div>Loading...</div>}>
                <Chats />
              </Suspense>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
