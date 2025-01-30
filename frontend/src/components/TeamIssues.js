// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import MenuBar from './MenuBar';

// const TeamIssues = () => {
//   const [issues, setIssues] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:3000/api/issues', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setIssues(response.data);
//       } catch (error) {
//         console.error('Error fetching issues:', error);
//         if (error.response && error.response.status === 403) {
//           alert('You do not have permission to access this resource.');
//           navigate('/dashboard');
//         }
//       }
//     };

//     fetchIssues();
//   }, [navigate]);

//   return (
//     <div>
//       <MenuBar />
//       <h2>Team Reported Issues</h2>
//       {issues.length === 0 ? (
//         <p>No reported issues available.</p>
//       ) : (
//         <ul>
//           {issues.map((issue) => (
//             <li key={issue.id}>
//               <p><strong>Reported by:</strong> {issue.username}</p>
//               <p><strong>Title:</strong> {issue.title}</p>
//               <p><strong>Description:</strong> {issue.description}</p>
//               {issue.screenshot_url && (
//                 <img src={`http://localhost:3000/uploads/${issue.screenshot_url}`} alt="Screenshot" style={{ width: '200px' }} />
//               )}
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TeamIssues;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import MenuBar from './MenuBar';

// const TeamIssues = () => {
//   const [issues, setIssues] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:3000/api/issues', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setIssues(response.data);
//       } catch (error) {
//         console.error('Error fetching issues:', error);
//         if (error.response && error.response.status === 403) {
//           alert('You do not have permission to access this resource.');
//           navigate('/dashboard');
//         }
//       }
//     };

//     fetchIssues();
//   }, [navigate]);

//   return (
//     <div>
//       <MenuBar />
//       <div className="issues-container">
//         <h2>Team Reported Issues</h2>
//         {issues.length === 0 ? (
//           <p>No reported issues available.</p>
//         ) : (
//           <table className="issues-table">
//             <thead>
//               <tr>
//                 <th>Reported By</th>
//                 <th>Title</th>
//                 <th>Description</th>
//                 <th>Date Reported</th>
//                 <th>Screenshot</th>
//               </tr>
//             </thead>
//             <tbody>
//               {issues.map((issue) => (
//                 <tr key={issue.id}>
//                   <td>{issue.username}</td>
//                   <td>{issue.title}</td>
//                   <td>{issue.description}</td>
//                   <td>{new Date(issue.created_at).toLocaleDateString()}</td>
//                   <td>
//                     {issue.screenshot_url ? (
//                       <img
//                         src={`http://localhost:3000/uploads/${issue.screenshot_url}`}
//                         alt="Screenshot"
//                         style={{ width: '100px' }}
//                       />
//                     ) : (
//                       'No screenshot'
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeamIssues;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import MenuBar from './MenuBar';

// const TeamIssues = () => {
//   const [issues, setIssues] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:3000/api/issues', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setIssues(response.data);
//       } catch (error) {
//         console.error('Error fetching issues:', error);
//         if (error.response && error.response.status === 403) {
//           alert('You do not have permission to access this resource.');
//           navigate('/dashboard');
//         }
//       }
//     };

//     fetchIssues();
//   }, [navigate]);

//   return (
//     <div>
//       <MenuBar />
//       <h2>Team Reported Issues</h2>
//       {issues.length === 0 ? (
//         <p>No reported issues available.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Reported By</th>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Date Reported</th>
//               <th>Screenshot</th>
//             </tr>
//           </thead>
//           <tbody>
//             {issues.map((issue) => (
//               <tr key={issue.id}>
//                 <td>{issue.reported_by || 'Unknown'}</td>
//                 <td>{issue.title}</td>
//                 <td>{issue.description}</td>
//                 <td>{new Date(issue.date_reported).toLocaleDateString()}</td>
//                 <td>
//                   {issue.screenshot_url ? (
//                     <a href={`http://localhost:3000/uploads/${issue.screenshot_url}`} target="_blank" rel="noopener noreferrer">
//                       View Screenshot
//                     </a>
//                   ) : (
//                     'No screenshot'
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default TeamIssues;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';

const TeamIssues = () => {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem('token');
        const cleanedToken = token?.replace(/^Bearer\s+/i, ''); // Ensure "Bearer " is removed if duplicated

        const response = await axios.get('http://localhost:3000/api/issues', {
          headers: {
            Authorization: `Bearer ${cleanedToken}`,
          },
        });

        console.log("Fetched Issues:", response.data); // Debugging log
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
        if (error.response && error.response.status === 403) {
          alert('You do not have permission to access this resource.');
          navigate('/dashboard');
        }
      }
    };

    fetchIssues();
  }, [navigate]);

  return (
    <div>
      <MenuBar />
      <h2>Team Reported Issues</h2>
      {issues.length === 0 ? (
        <p>No reported issues available.</p>
      ) : (
        <table className="issues-table">
          <thead>
            <tr>
              <th>Reported By</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date Reported</th>
              <th>Screenshot</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => {
              // ✅ Extract filename if full URL is stored in DB
              let screenshotFilename = issue.screenshot;
              if (screenshotFilename && screenshotFilename.startsWith("http")) {
                const parts = screenshotFilename.split('/');
                screenshotFilename = parts[parts.length - 1]; // Extract filename only
              }

              const screenshotPath = screenshotFilename
                ? `http://localhost:3000/uploads/${screenshotFilename}`
                : null;

              return (
                <tr key={issue.id}>
                  <td>{issue.reported_by || 'Unknown'}</td>
                  <td>{issue.title}</td>
                  <td>{issue.description}</td>
                  <td>{new Date(issue.created_at).toLocaleDateString()}</td>
                  <td>
                    {screenshotPath ? (
                      <a href={screenshotPath} target="_blank" rel="noopener noreferrer">
                        <img 
                          src={screenshotPath} 
                          alt="Screenshot" 
                          style={{ width: '100px', borderRadius: '5px', cursor: 'pointer' }} 
                          onError={(e) => { 
                             e.target.style.display = 'none'; 
                             e.target.parentNode.innerHTML = '<span class="no-screenshot">No Screenshot</span>'; 
                            }}

                        />
                      </a>
                    ) : (
                      <span className="no-screenshot">No screenshot</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeamIssues;
