import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';

const StandupForm = () => {
  const [yesterday, setYesterday] = useState('');
  const [today, setToday] = useState('');
  const [blockers, setBlockers] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const cleanedToken = token?.replace(/^Bearer\s+/i, ''); // Ensure "Bearer " is removed if duplicated

      await axios.post(
        'http://localhost:3000/api/standups',
        {
          yesterday,
          today,
          blockers,
        },
        {
          headers: {
            Authorization: `Bearer ${cleanedToken}`,
          },
        }
      );
      alert('Standup report submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting standup report:', error);
      setError('Failed to submit the report. Please try again.');
    }
  };

  const handleCancel = () => {
    // Navigate back to the dashboard
    navigate('/dashboard');
  };

  return (
    <div>
      <MenuBar />
    <div className="standup-form-container">
      
      <h2>Daily Standup Report</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>What did you work on yesterday?</label>
          <textarea
            value={yesterday}
            onChange={(e) => setYesterday(e.target.value)}
            required
          />
        </div>
        <div>
          <label>What will you work on today?</label>
          <textarea
            value={today}
            onChange={(e) => setToday(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Any blockers?</label>
          <textarea
            value={blockers}
            onChange={(e) => setBlockers(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-button">Submit Standup</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default StandupForm;
