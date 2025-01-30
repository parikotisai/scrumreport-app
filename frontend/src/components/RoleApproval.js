import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MenuBar from './MenuBar';
import { useNavigate } from 'react-router-dom';

const RoleApproval = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    // Redirect if user is not Manager or CEO
   // ✅ Allow admins to view role approvals
if (role !== 'manager' && role !== 'CEO' && role !== 'admin') 
    {
      navigate('/dashboard');
      return;
    }

    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const cleanedToken = token?.replace(/^Bearer\s+/i, '');
        const response = await axios.get(
          'http://localhost:3000/api/users/role-change/pending',
          { headers: { Authorization: `Bearer ${cleanedToken}` } }
        );
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching role requests:', error);
        setError('Failed to fetch role requests. Please try again later.');
      }
    };

    fetchRequests();
  }, [navigate, role]);

  const handleAction = async (requestId, action) => {
    try {
      const token = localStorage.getItem('token');
      const cleanedToken = token?.replace(/^Bearer\s+/i, '');
      // Customized confirmation message
      const actionText = action === 'approve' ? 'approved' : 'rejected';
      const result = await Swal.fire({
        title: `Are you sure you want to ${action} this request?`,
        text: `This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Yes, ${actionText} it!`,
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      // API Call
      await axios.post(
        'http://localhost:3000/api/users/role-change/handle',
        { requestId, action },
        { headers: { Authorization: `Bearer ${cleanedToken}` } }
      );

      // Remove the approved/rejected request from the UI
      setRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId));

      // Show success message
      Swal.fire("Success!", `Request has been ${actionText}.`, "success");

    } catch (error) {
      console.error('Error processing request:', error);
      Swal.fire("Error!", "Something went wrong, please try again.", "error");
    }
  };

  return (
    <div className="role-approval-container">
      <MenuBar /> {/* ✅ Added MenuBar */}
      <h2>Pending Role Change Requests</h2>

      {/* ✅ Show error if API fails */}
      {error && <p className="error-message">{error}</p>}

      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table className="role-approval-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Requested Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.username}</td>
                <td><strong>{req.requested_role}</strong></td>
                <td>
                  <button className="approve-button" onClick={() => handleAction(req.id, 'approve')}>Approve</button>
                  <button className="reject-button" onClick={() => handleAction(req.id, 'reject')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoleApproval;
