import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// function SignUp() {
//   const [formData, setFormData] = useState({
//     name: '',
//     rollNumber: '',
//     email: '',
//     password: ''
//   });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/signup', formData);
//       navigate('/login');
//     } catch (err) {
//       console.error(err);
//       alert('Registration failed');
//     }
//   };

function SignUp({ updateAuthStatus }) {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      // After successful signup, automatically log in the user
      const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('token', loginRes.data.token);
      localStorage.setItem('user', JSON.stringify(loginRes.data.user));
      updateAuthStatus(true);
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;