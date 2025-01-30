// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import TaskList from './TaskList';
// import { useNavigate } from 'react-router-dom';
// import MenuBar from './MenuBar';

// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:3000/api/tasks', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setTasks(response.data);
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           navigate('/');
//         }
//       }
//     };
//     fetchTasks();
//   }, [navigate]);

//   const filteredTasks = tasks.filter(task =>
//     filter === 'all' || task.status === filter
//   );

//   const handleDeleteTask = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setTasks(tasks.filter(task => task.id !== id));
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   return (
//     <div>
//       <MenuBar />
//       <h2>Dashboard</h2>
//       {/* <div>
//         <label>Filter tasks by status: </label>
//         <select onChange={(e) => setFilter(e.target.value)} value={filter}>
//           <option value="all">All</option>
//           <option value="todo">To Do</option>
//           <option value="in-progress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>
//       </div> */}
//       {filteredTasks.length === 0 ? (
//         <div>
//           <p>No tasks available. Please create a new task.</p>
//           <button onClick={() => navigate('/add-task')}>Create New Task</button>
//         </div>
//       ) : (
//         <TaskList tasks={filteredTasks} onDelete={handleDeleteTask} />
//       )}
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import TaskList from './TaskList';
// import { useNavigate } from 'react-router-dom';
// import MenuBar from './MenuBar';

// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   // eslint-disable-next-line no-unused-vars
//   const [filter, setFilter] = useState('all');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const cleanedToken = token?.replace(/^Bearer\s+/i, ''); // Ensure "Bearer " is removed if duplicated

//         const response = await axios.get('http://localhost:3000/api/tasks', {
//           headers: {
//             Authorization: `Bearer ${cleanedToken}`,
//           },
//         });
//         setTasks(response.data); // Fetch only tasks
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           navigate('/');
//         }
//       }
//     };

//     fetchTasks();
//   }, [navigate]);

//   const filteredTasks = tasks.filter(
//     (task) => filter === 'all' || task.status === filter
//   );

//   const handleDeleteTask = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setTasks(tasks.filter((task) => task.id !== id));
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   return (
//     <div>
//       <MenuBar />
//       <h2>Dashboard</h2>

//       {filteredTasks.length === 0 ? (
//         <div>
//           <p>No tasks available. Please create a new tasks.</p>
//           <button onClick={() => navigate('/add-task')}>Create New Task</button>
//         </div>
//       ) : (
//         <TaskList tasks={filteredTasks} onDelete={handleDeleteTask} />
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// // In the code snippet above, we added a new state variable called issues to store the list of reported issues. We also added a new useEffect hook to fetch the list of issues when the component mounts. The issues are fetched only if the user role is manager or CEO. We also added a new section to display the reported issues in the UI.


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import TaskList from './TaskList';
// import { useNavigate } from 'react-router-dom';
// import MenuBar from './MenuBar';
// import Swal from 'sweetalert2';

// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [userRole, setUserRole] = useState('');
//   const [pendingRoleRequest, setPendingRoleRequest] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const cleanedToken = token?.replace(/^Bearer\s+/i, '');

//         // Fetch user profile to get the role
//         const response = await axios.get('http://localhost:3000/api/auth/profile', {
//           headers: { Authorization: `Bearer ${cleanedToken}` },
//         });

//         setUserRole(response.data.role);
//       } catch (error) {
//         console.error('Error fetching user role:', error);
//       }
//     };

//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const cleanedToken = token?.replace(/^Bearer\s+/i, '');

//         const response = await axios.get('http://localhost:3000/api/tasks', {
//           headers: { Authorization: `Bearer ${cleanedToken}` },
//         });

//         setTasks(response.data);
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           navigate('/');
//         }
//       }
//     };

//     const checkPendingRoleRequest = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const cleanedToken = token?.replace(/^Bearer\s+/i, '');
//         const userId = localStorage.getItem('user_id'); // ✅ Get logged-in user ID
    
//         const response = await axios.get('http://localhost:3000/api/users/role-change/pending', {
//           headers: { Authorization: `Bearer ${cleanedToken}` },
//         });
    
//         // ✅ Check if there is a pending request for the logged-in user
//         const pendingRequest = response.data.some(req => req.user_id == userId);
//         setPendingRoleRequest(pendingRequest);
//       } catch (error) {
//         console.error('Error checking pending role requests:', error);
//       }
//     };
    

//     fetchUserRole();
//     fetchTasks();
//     checkPendingRoleRequest(); // Check if a role change request is already pending
//   }, [navigate]);

//   const handleRequestRoleChange = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const cleanedToken = token?.replace(/^Bearer\s+/i, '');

//       // Send role change request
//       await axios.post(
//         'http://localhost:3000/api/users/role-change',
//         { requestedRole: 'manager' }, // Change to dropdown input later
//         { headers: { Authorization: `Bearer ${cleanedToken}` } }
//       );

//       // Show success confirmation
//       Swal.fire({
//         icon: 'success',
//         title: 'Request Submitted!',
//         text: 'Your request for role change has been sent to the admin.',
//       });

//       setPendingRoleRequest(true); // Set state to prevent multiple requests
//     } catch (error) {
//       console.error('Error requesting role change:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Could not send request. Please try again later.',
//       });
//     }
//   };

//   return (
//     <div>
//       <MenuBar />
//       <h2>Dashboard</h2>

//       {userRole === 'intern' && (
//         <div>
//           {pendingRoleRequest ? (
//             <p style={{ color: 'gold', fontWeight: 'bold' }}>Your role change request is pending approval.</p>
//           ) : (
//             <button className="role-request-button" onClick={handleRequestRoleChange}>
//               Request Role Change
//             </button>
//           )}
//         </div>
//       )}

//       {tasks.length === 0 ? (
//         <div>
//           <p>No tasks available. Please create a new task.</p>
//           <button onClick={() => navigate('/add-task')}>Create New Task</button>
//         </div>
//       ) : (
//         <TaskList tasks={tasks} />
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const cleanedToken = token?.replace(/^Bearer\s+/i, '');

        const response = await axios.get('http://localhost:3000/api/tasks', {
          headers: { Authorization: `Bearer ${cleanedToken}` },
        });

        setTasks(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
      }
    };

    fetchTasks();
  }, [navigate]);

  return (
    <div>
      <MenuBar />
      <h2>Dashboard</h2>

      {tasks.length === 0 ? (
        <div>
          <p>No tasks available. Please create a new task.</p>
          <button onClick={() => navigate('/add-task')}>Create New Task</button>
        </div>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
};

export default Dashboard;

