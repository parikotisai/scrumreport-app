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
      {/* {role === 'intern' && ( */}
        {/* <Link to="/request-role">Request Role Change</Link> */}
      {/* )} */}

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

      <button onClick={handleLogout} className="logout-button">Logout</button>
    </nav>
  );
};

export default MenuBar;
