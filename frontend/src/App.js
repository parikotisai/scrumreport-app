// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Logo from './components/Logo';  // Import Logo Component
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Dashboard from './components/Dashboard';
// import TaskForm from './components/TaskForm';
// import IssuesForm from './components/IssuesForm';
// import TaskList from './components/TaskList';
// import InternList from './components/InternList'; // Import InternList
// import StandupForm from './components/StandupForm'; // Import StandupForm
// import StandupSummary from './components/StandupSummary'; // Import StandupSummary
// import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

// const App = () => {
//   return (
//     <Router>
//       <div className="container">
//         <Routes>
//           {/* Public routes */}
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />

//           {/* Protected routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/add-task"
//             element={
//               <ProtectedRoute>
//                 <TaskForm />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/edit-task/:id"
//             element={
//               <ProtectedRoute>
//                 <TaskForm />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/report-issue"
//             element={
//               <ProtectedRoute>
//                 <IssuesForm />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/task-list"
//             element={
//               <ProtectedRoute>
//                 <TaskList />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/intern-list"
//             element={
//               <ProtectedRoute>
//                 <InternList />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/standup"
//             element={
//               <ProtectedRoute>
//                 <StandupForm />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/standup-summary"
//             element={
//               <ProtectedRoute>
//                 <StandupSummary />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Logo from './components/Logo';  // Import Logo Component
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import IssuesForm from './components/IssuesForm';
import TaskList from './components/TaskList';
import InternList from './components/InternList'; 
import StandupForm from './components/StandupForm'; 
import StandupSummary from './components/StandupSummary'; 
import TeamIssues from './components/TeamIssues'; // Import TeamIssues
import RoleApproval from './components/RoleApproval';
import RoleRequests from './components/RoleRequests';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Add Logo at the top of every page */}
        <Logo />

        <div className="container">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-task"
              element={
                <ProtectedRoute>
                  <TaskForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-task/:id"
              element={
                <ProtectedRoute>
                  <TaskForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report-issue"
              element={
                <ProtectedRoute>
                  <IssuesForm />
                </ProtectedRoute>
              }
            />

<Route path="/team-issues" element={<ProtectedRoute><TeamIssues /></ProtectedRoute>} /> {/* New Route */}

{/* Inside Routes */}
<Route path="/role-approvals" element={<RoleApproval />} />
<Route path="/role-requests" element={<RoleRequests />} />
<Route path="/request-role" element={<RoleRequests />} /> {/* ✅ Fix */}


            <Route
              path="/task-list"
              element={
                <ProtectedRoute>
                  <TaskList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/intern-list"
              element={
                <ProtectedRoute>
                  <InternList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/standup"
              element={
                <ProtectedRoute>
                  <StandupForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/standup-summary"
              element={
                <ProtectedRoute>
                  <StandupSummary />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
