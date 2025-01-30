// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const InternList = () => {
//   const [interns, setInterns] = useState([]);
//   const navigate = useNavigate(); // Define navigate using useNavigate

//   useEffect(() => {
//     const fetchInterns = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:3000/api/users/interns', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setInterns(response.data);
//       } catch (error) {
//         console.error('Error fetching interns:', error);
//         if (error.response && error.response.status === 403) {
//           alert('You do not have permission to access this resource.');
//         }
//       }
//     };

//     fetchInterns();
//   }, []);

//   return (
//     <div className="intern-list-container">
//       <h2>List of Interns</h2>
//       {interns.length === 0 ? (
//         <p>No interns available.</p>
//       ) : (
//         <ul>
//           {interns.map((intern) => (
//             <li key={intern.id}>
//               <strong>{intern.username}</strong> ({intern.role})
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Back to Dashboard Button */}
//       <button
//         className="back-button"
//         onClick={() => navigate('/dashboard')}
//       >
//         Back to Dashboard
//       </button>
//     </div>
//   );
// };

// export default InternList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';

const InternList = () => {
  const [interns, setInterns] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Get user role

  useEffect(() => {
    if (role !== 'manager' && role !== 'CEO') {
      setError('Access Denied');
      return;
    }

    const fetchInterns = async () => {
      try {
        const token = localStorage.getItem('token');
        const cleanedToken = token?.replace(/^Bearer\s+/i, ''); // Ensure "Bearer " is removed if duplicated
        const response = await axios.get('http://localhost:3000/api/users/interns', {
          headers: { Authorization: `Bearer ${cleanedToken}` },
        });
        setInterns(response.data);
      } catch (error) {
        console.error('Error fetching interns:', error);
        setError('Failed to fetch interns. Please try again later.');
      }
    };

    fetchInterns();
  }, [role]);

  return (
    <div>
    <MenuBar />
    <div className="intern-list-container">
      <h2>List of Interns</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {interns.length === 0 ? (
        <p>No interns available.</p>
      ) : (
        <ul>
          {interns.map((intern) => (
            <li key={intern.id}>
              <strong>{intern.username}</strong> ({intern.email})
            </li>
          ))}
        </ul>
      )}

      <button
        className="back-button"
        onClick={() => navigate('/dashboard')}
      >
        Back to Dashboard
      </button>
    </div>
    </div>
  );
};

export default InternList;
