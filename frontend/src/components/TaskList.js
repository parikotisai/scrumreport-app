import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const cleanedToken = token?.replace(/^Bearer\s+/i, ''); // Ensure "Bearer " is removed if duplicated

        const response = await axios.get('http://localhost:3000/api/tasks', {
          headers: {
            Authorization: `Bearer ${cleanedToken}`,
          },
        });
        setTasks(response.data);
        setFilteredTasks(response.data); // Initialize filteredTasks with all tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (!result.isConfirmed) return; // If user cancels, exit function

    try {
      const token = localStorage.getItem('token');
      const cleanedToken = token?.replace(/^Bearer\s+/i, ''); // Ensure "Bearer " is removed if duplicated

      await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${cleanedToken}`,
        },
      });
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);

      Swal.fire("Deleted!", "Your task has been deleted.", "success");

    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === 'all') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.status === selectedFilter);
      setFilteredTasks(filtered);
    }
  };

  return (
    <div className="task-list-container">
      <h2>Task List</h2>

      <div className="filter-container">
        <label htmlFor="status-filter">Filter by status:</label>
        <select id="status-filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="TODO">TODO</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks available. Create a new task to get started!</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-header">
                <strong>{task.title}</strong>
                <span className={`task-status ${task.status}`}>{task.status}</span>
              </div>
              <p className="task-description">{task.description || 'No description provided.'}</p>
              <div className="task-actions">
                <button
                  className="edit-button"
                  onClick={() => navigate(`/edit-task/${task.id}`)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        className="add-task-button"
        style={{ backgroundColor: "#FFD700", color: "black" }} // ✅ Change color to gold
        onClick={() => navigate('/add-task')}
      >
        Add New Task
      </button>
      {/* <button className="add-task-button" onClick={() => navigate('/add-task')}>
        Add New Task
      </button> */}
    </div>
  );
};

export default TaskList;
