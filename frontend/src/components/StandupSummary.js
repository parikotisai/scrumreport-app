// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// const StandupSummary = () => {
//   const [standups, setStandups] = useState([]);
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Define navigate using useNavigate

//   useEffect(() => {
//     const fetchStandups = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`http://localhost:3000/api/standups/${date}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setStandups(response.data);
//       } catch (error) {
//         console.error('Error fetching standup reports:', error);
//         setError('Error fetching standup reports. Please try again later.');
//       }
//     };

//     if (date) {
//       fetchStandups();
//     }
//   }, [date]);

//   return (
//     <div className="standup-summary-container">
//       <h2>Daily Standup Summary for {date}</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         className="date-input"
//       />
//       {standups.length === 0 ? (
//         <p>No standup reports available for this date.</p>
//       ) : (
//         <ul>
//           {standups.map((standup) => (
//             <li key={standup.id}>
//               <p><strong>Intern:</strong> {standup.username}</p>
//               <p><strong>Yesterday:</strong> {standup.yesterday}</p>
//               <p><strong>Today:</strong> {standup.today}</p>
//               <p><strong>Blockers:</strong> {standup.blockers || 'None'}</p>
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}

//       <button
//         className="back-button"
//         onClick={() => navigate('/dashboard')}
//       >
//         Back to Dashboard
//       </button>
//     </div>
//   );
// };

// export default StandupSummary;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const StandupSummary = () => {
//   const [standups, setStandups] = useState([]);
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Function to fetch standups
//   const fetchStandups = async (selectedDate) => {
//     setLoading(true);
//     setError('');
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`http://localhost:3000/api/standups/reports/${selectedDate}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setStandups(response.data);
//     } catch (error) {
//       console.error('Error fetching standup reports:', error);
//       setError('Error fetching standup reports. Please try again later.');
//     }
//     setLoading(false);
//   };

//   // Fetch standups when date changes
//   useEffect(() => {
//     fetchStandups(date);
//   }, [date]);

//   return (
//     <div className="standup-summary-container">
//       <h2>Daily Standup Summary for {date}</h2>

//       {/* Error message */}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {/* Date Picker */}
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         className="date-input"
//       />

//       {/* Loading Indicator */}
//       {loading && <p>Loading...</p>}

//       {/* Display Standup Reports */}
//       {!loading && standups.length === 0 ? (
//         <p>No standup reports available for this date.</p>
//       ) : (
//         <ul>
//           {standups.map((standup) => (
//             <li key={standup.id}>
//               <p><strong>Intern:</strong> {standup.username}</p>
//               <p><strong>Yesterday:</strong> {standup.yesterday}</p>
//               <p><strong>Today:</strong> {standup.today}</p>
//               <p><strong>Blockers:</strong> {standup.blockers || 'None'}</p>
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Back Button */}
//       <button
//         className="back-button"
//         onClick={() => navigate('/dashboard')}
//       >
//         Back to Dashboard
//       </button>
//     </div>
//   );
// };

// export default StandupSummary;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuBar from '../components/MenuBar';

const StandupSummary = () => {
  const [standups, setStandups] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Get user role

  const fetchStandups = async (selectedDate) => {
    setLoading(true);
    setError('');
    setStandups([]); // Clear old data before fetching new reports

    try {
      const token = localStorage.getItem('token');
      const cleanedToken = token?.replace(/^Bearer\s+/i, ''); // Ensure "Bearer " is removed if duplicated

      let url = '';

      // ✅ Interns can now change the date to see old reports
      if (role === 'intern') {
        url = `http://localhost:3000/api/standups/my-reports?date=${selectedDate}`;
      } 
      // ✅ Managers/CEOs fetch reports by date
      else if (role === 'manager' || role === 'CEO') {
        url = `http://localhost:3000/api/standups/reports/${selectedDate}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${cleanedToken}` },
      });

      if (!response.data || response.data.length === 0) {
        setStandups([]);
        setError('No standup reports found for this date.');
      } else {
        setStandups(response.data);
        setError('');
      }
    } catch (error) {
      console.error('Error fetching standup reports:', error);
       // Handle 404 differently for Intern role
    if (error.response && error.response.status === 404) {
      setStandups([]);
      setError('No standup reports found for this date.');
    } else {
      setStandups([]);
      setError('Error fetching standup reports. Please try again later.');
    }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStandups(date);
  }, [date, role]);

  return (
    <div>
    <MenuBar />
    <div className="standup-summary-container">
    {/* <MenuBar /> */}
      <h2>Daily Standup Summary for {date}</h2>
      
      {/* ✅ Show Date Picker for Everyone (Interns, Managers, CEOs) */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="date-input"
      />

      {/* ✅ Only show error when API request actually fails */}
      {error && !loading && standups.length === 0 && <p style={{ color: 'red' }}>{error}</p>}

      {/* ✅ Proper Handling When No Reports Exist */}
      {loading && <p>Loading...</p>}
      {!loading && standups.length === 0 && <p></p>}

      {/* ✅ Display Standup Reports */}
      {!loading && standups.length > 0 && (
        <ul>
          {standups.map((standup) => (
            <li key={standup.id}>
              {(role === 'manager' || role === 'CEO') && (
                <p><strong>Intern:</strong> {standup.intern_name || 'Unknown'}</p>
              )}
              <p><strong>Yesterday:</strong> {standup.yesterday}</p>
              <p><strong>Today:</strong> {standup.today}</p>
              <p><strong>Blockers:</strong> {standup.blockers || 'None'}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}

      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </button>
    </div>
    </div>
  );
};

export default StandupSummary;
