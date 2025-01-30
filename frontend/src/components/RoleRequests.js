import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuBar from "./MenuBar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RoleRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    // ✅ Redirect unauthorized users
    if (role !== "admin" && role !== "CEO") {
      navigate("/dashboard");
      return;
    }

    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const cleanedToken = token?.replace(/^Bearer\s+/i, '');
        const response = await axios.get(
          "http://localhost:3000/api/users/role-change/pending",
          { headers: { Authorization: `Bearer ${cleanedToken}` } }
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching role requests:", error);
      }
    };

    fetchRequests();
  }, [navigate, role]);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const cleanedToken = token?.replace(/^Bearer\s+/i, '');
      const result = await Swal.fire({
        title: "Approve Role Change?",
        text: "This will update the user's role permanently.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Approve",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await axios.post(
        `http://localhost:3000/api/users/role-change/handle`,
        { requestId: id, action: "approve" },
        { headers: { Authorization: `Bearer ${cleanedToken}` } }
      );

      setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));

      Swal.fire("Success!", "The role change has been approved.", "success");
    } catch (error) {
      console.error("Error approving role:", error);
      Swal.fire("Error", "Failed to approve role change.", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const cleanedToken = token?.replace(/^Bearer\s+/i, '');
      const result = await Swal.fire({
        title: "Reject Role Change?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Reject",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await axios.post(
        `http://localhost:3000/api/users/role-change/handle`,
        { requestId: id, action: "reject" },
        { headers: { Authorization: `Bearer ${cleanedToken}` } }
      );

      setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));

      Swal.fire("Rejected!", "The role change request has been rejected.", "success");
    } catch (error) {
      console.error("Error rejecting role:", error);
      Swal.fire("Error", "Failed to reject role change.", "error");
    }
  };

  return (
    <div>
      <MenuBar />
      <h2>Pending Role Requests</h2>
      {requests.length === 0 ? (
        <p>No pending role requests.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Requested Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.username}</td>
                <td>{req.email}</td>
                <td>{req.requested_role}</td>
                <td>
                  <button onClick={() => handleApprove(req.id)}>Approve</button>
                  <button onClick={() => handleReject(req.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoleRequests;
