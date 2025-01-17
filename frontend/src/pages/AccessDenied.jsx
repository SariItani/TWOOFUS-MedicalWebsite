import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './Auth.css';

const AccessDenied = () => <div>Access Denied. Go back to <a href="/login">Login</a></div>;

export default AccessDenied;