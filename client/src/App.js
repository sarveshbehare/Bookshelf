import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SellBook from './components/SellBook';
import './styles.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const updateAuthStatus = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar updateAuthStatus={updateAuthStatus} />}
        <Routes>
          <Route path="/signup" element={!isAuthenticated ? <SignUp updateAuthStatus={updateAuthStatus} /> : <Navigate to="/" />} />
          <Route path="/login" element={!isAuthenticated ? <Login updateAuthStatus={updateAuthStatus} /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/sell" element={isAuthenticated ? <SellBook /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;