import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('intern'); // Default role is 'intern'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/auth/signup', { email, username, password, role });
      alert('User registered successfully!');
      navigate('/');
    } catch (error) {
      setError('Username already taken. Please choose a different one.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <h2>Signup</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {/* <div>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="intern">Intern</option>
            <option value="manager">Manager</option>
            <option value="CEO">CEO</option>
          </select>
        </div> */}
        <button type="submit" style={{ marginTop: '10px' }}>Signup</button>
      </form>
      <p>Already have an account? <Link to="/">Login here</Link></p>
    </div>
  );
};

export default Signup;
