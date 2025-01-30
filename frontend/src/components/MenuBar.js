// // import React from 'react';
// // import { Link, useNavigate } from 'react-router-dom';

// // const MenuBar = () => {
// //   const navigate = useNavigate();
// //   const role = localStorage.getItem('role'); 
// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('role');
// //     navigate('/');
// //   };

// //   return (
// //     <nav style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#007bff', color: 'white', display: 'flex', alignItems: 'center' }}>
// //       <Link to="/dashboard" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Dashboard</Link>
// //       <Link to="/add-task" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Add Task</Link>
// //       <Link to="/report-issue" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Report Issue</Link>
// //       <Link to="/intern-list" style={{ color: 'white', marginRight: '10px' }}>View Interns</Link>
// //       <Link to="/standup" style={{ color: 'white', marginRight: '10px' }}>Daily Standup</Link> {/* Added link to standup form */}

// //         {/* Conditional Link for Managers to View Standup Summary */}
// //         {role === 'manager' && (
// //           <Link to="/standup-summary" style={{ color: 'white', marginRight: '10px' }}>
// //             View Standup Summary
// //           </Link>
// //         )}

// //       {/* <button 
// //         onClick={handleLogout} 
// //         style={{ 
// //           backgroundColor: 'white', 
// //           color: '#007bff', 
// //           border: '1px solid #007bff',
// //           padding: '5px 10px',
// //           borderRadius: '5px',
// //           cursor: 'pointer',
// //           marginLeft: 'auto' // This aligns the logout button to the right
// //         }}
// //       >
// //         Logout
// //       </button> */}


// //       <button 
// //         onClick={handleLogout} 
// //         className="logout-button"
// //       >
// //         Logout
// //       </button>
// //     </nav>
// //   );
// // };

// // export default MenuBar;



// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const MenuBar = () => {
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role'); 

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     navigate('/');
//   };

//   return (
//     <nav style={{ 
//       marginBottom: '20px', 
//       padding: '15px', 
//       backgroundColor: '#1e1e1e',  /* Dark background matching logo */
//       color: 'white', 
//       display: 'flex', 
//       alignItems: 'center', 
//       justifyContent: 'space-between', 
//       boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
//       borderRadius: '8px'
//     }}>
      
//       <div>
//         <Link to="/dashboard" className="nav-link">Dashboard</Link>
//         <Link to="/add-task" className="nav-link">Add Task</Link>
//         <Link to="/report-issue" className="nav-link">Report Issue</Link>
//         <Link to="/intern-list" className="nav-link">View Interns</Link>
//         <Link to="/standup" className="nav-link">Daily Standup</Link>

//         {/* Conditional Link for Managers to View Standup Summary */}
//         {role === 'manager' && (
//           <Link to="/standup-summary" className="nav-link">View Standup Summary</Link>
//         )}
//       </div>

//       <button 
//         onClick={handleLogout} 
//         className="logout-button"
//       >
//         Logout
//       </button>
//     </nav>
//   );
// };

// export default MenuBar;


// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const MenuBar = () => {
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     navigate('/');
//   };

//   return (
//     <nav className="menu-bar">
//       <Link to="/dashboard">Dashboard</Link>
//       <Link to="/add-task">Add Task</Link>
//       <Link to="/intern-list">View Interns</Link>
//       <Link to="/standup">Daily Standup</Link>

//       {/* CEO/Manager can see "Reported Issues" */}
//       {role === 'manager' || role === 'CEO' ? (
//         <Link to="/team-issues">Team Reported Issues</Link>
//       ) : null}

//  {/* Add Report Issue link only for Interns */}
//  {role === 'intern' && (
//         <Link
//           to="/report-issue"
//           style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}
//         >
//           Report Issue
//         </Link>
//       )}

//       {role === 'intern' && (
//   <Link to="/standup" className="nav-link">Submit Standup</Link>
// )}

// {(role === 'manager' || role === 'CEO' || role === 'intern') && (
//   <Link to="/standup-summary" className="nav-link">View Standups</Link>
// )}

//       <button onClick={handleLogout} className="logout-button">Logout</button>
//     </nav>
//   );
// };

// export default MenuBar;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MenuBar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // ✅ Get role from localStorage

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    navigate('/');
  };

  return (
    <nav className="menu-bar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/add-task">Add Task</Link>

      {/* ✅ Only Interns can request a role change */}
      {role === 'intern' && (
        <Link to="/request-role">Request Role Change</Link>
      )}

      {/* ✅ CEO/Manager can see "View Interns" */}
      {(role === 'manager' || role === 'CEO') && (
        <Link to="/intern-list">View Interns</Link>
      )}

      {/* ✅ CEO/Manager can see "Team Reported Issues" */}
      {(role === 'manager' || role === 'CEO') && (
        <Link to="/team-issues">Team Reported Issues</Link>
      )}

      {/* ✅ Only Interns can report issues */}
      {role === 'intern' && (
        <Link to="/report-issue">Report Issue</Link>
      )}

      {/* ✅ Interns can submit standups */}
      {role === 'intern' && (
        <Link to="/standup">Submit Standup</Link>
      )}

      {/* ✅ CEO, Manager, and Interns can view standups */}
      {(role === 'manager' || role === 'CEO' || role === 'intern') && (
        <Link to="/standup-summary">View Standups</Link>
      )}

      {/* ✅ CEO/Manager can approve role requests */}
      {role === 'manager' || role === 'CEO' ? (
        <Link to="/role-approvals">Role Approval</Link>
      ) : null}

      {/* ✅ Admin/CEO can see all role requests */}
      {role === "admin" || role === "CEO" ? (
        <Link to="/role-requests" className="nav-link">
          Role Requests
        </Link>
      ) : null}

      <button onClick={handleLogout} className="logout-button">Logout</button>
    </nav>
  );
};

export default MenuBar;
