import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email !== 'eve.holt@reqres.in' || password !== 'cityslicka') {
      alert('Invalid credentials. Use eve.holt@reqres.in / cityslicka');
      return;
    }

    try {
      console.log('Sending:', { email, password }); // Debug log

      const response = await axios.post(
        'https://reqres.in/api/login',
        { email, password },
        {
          headers: {
            'x-api-key': 'reqres-free-v1'
          }
        }
      );
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
