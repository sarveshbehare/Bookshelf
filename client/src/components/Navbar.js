import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ updateAuthStatus }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    updateAuthStatus(false);
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Bookshelf</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/sell" className="nav-link">Sell Book</Link>
        <span className="nav-user">Welcome, {user?.name}</span>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;