import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MenuBar from './MenuBar';
const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TODO'); // Set default status to "TODO"
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          setIsLoading(true);
          const token = localStorage.getItem('token');
          const cleanedToken = token?.replace(/^Bearer\s+/i, ''); // Ensure "Bearer " is removed if duplicated

          const response = await axios.get(`http://localhost:3000/api/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${cleanedToken}`
            }
          });
          const { title, description, status } = response.data;

          // Set the state with fetched task data
          setTitle(title);
          setDescription(description);
          setStatus(status || 'TODO'); // Default to "TODO" if status is not provided
        } catch (error) {
          console.error('Error fetching task:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const cleanedToken = token?.replace(/^Bearer\s+/i, ''); // Ensure "Bearer " is removed if duplicated

      const taskData = { title, description, status };

      if (id) {
        // Update existing task
        await axios.put(`http://localhost:3000/api/tasks/${id}`, taskData, {
          headers: {
            Authorization: `Bearer ${cleanedToken}`
          }
        });
        setSuccessMessage('Task updated successfully!');
      } else {
        // Create new task
        await axios.post('http://localhost:3000/api/tasks', taskData, {
          headers: {
            Authorization: `Bearer ${cleanedToken}`
          }
        });
        setSuccessMessage('Task created successfully!');
      }

      // Redirect to dashboard after displaying success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <MenuBar />
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Task' : 'Create Task'}</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <div style={{ marginBottom: '15px' }}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="TODO">TODO</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button type="submit">{id ? 'Update Task' : 'Create Task'}</button>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          style={{ marginLeft: '10px' }}
        >
          Cancel
        </button>
      </div>
    </form>
    </div>

  );
};

export default TaskForm;
