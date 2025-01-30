// const User = require('../models/user.model');

// // Get all users with role 'intern'
// exports.getAllInterns = async (req, res) => {
//   try {
//     const interns = await User.findAllByRole('intern');
//     res.json(interns);
//   } catch (err) {
//     console.error('Error fetching interns:', err);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };


// const User = require('../models/user.model');

// exports.getAllInterns = async (req, res) => {
//   try {
//     // Check if the user is a CEO or Manager
//     if (req.user.role !== 'manager' && req.user.role !== 'CEO') {
//       return res.status(403).json({ error: 'Access denied. Only managers and CEOs can view interns.' });
//     }

//     // Fetch all interns from the database
//     const interns = await User.findAllByRole('intern');
//     res.json(interns);
//   } catch (err) {
//     console.error('Error fetching interns:', err);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// };


const User = require('../models/user.model');
const RoleChangeRequest = require('../models/roleChangeRequest.model');


exports.getAllInterns = async (req, res) => {
  try {
    // Check if the user is a CEO or Manager
    if (req.user.role !== 'manager' && req.user.role !== 'CEO') {
      return res.status(403).json({ error: 'Access denied. Only managers and CEOs can view interns.' });
    }

    // Fetch all interns from the database
    const interns = await User.findAllByRole('intern');
    res.json(interns);
  } catch (err) {
    console.error('Error fetching interns:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// 📝 User Requests Role Change
exports.requestRoleChange = async (req, res) => {
  const { requestedRole } = req.body;
  const userId = req.user.id;

  try {
    // Prevent users from requesting "admin" role unless predefined
    if (requestedRole === 'admin') {
      return res.status(403).json({ error: "You can't request an admin role." });
    }

    // Check if the user already has a pending request
    const existingRequest = await RoleChangeRequest.findPendingRequest(userId);
    if (existingRequest) {
      return res.status(400).json({ error: "You already have a pending request." });
    }

    // Create a role change request
    await RoleChangeRequest.create({ user_id: userId, requested_role: requestedRole });

    res.status(201).json({ message: "Role change request submitted successfully." });
  } catch (err) {
    console.error("Role change request error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// ✅ CEO/Manager Approves or Rejects Role Requests
exports.handleRoleRequest = async (req, res) => {
  const { requestId, action } = req.body; // action = 'approve' or 'reject'
  const managerRole = req.user.role;

  try {
    if (managerRole !== 'CEO' && managerRole !== 'manager') {
      return res.status(403).json({ error: "Only managers and CEOs can approve/reject requests." });
    }

    const request = await RoleChangeRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Request not found." });
    }

    if (action === 'approve') {
      await User.updateRole(request.user_id, request.requested_role);
      await RoleChangeRequest.updateStatus(requestId, 'approved');
      return res.json({ message: "Role change approved." });
    }

    await RoleChangeRequest.updateStatus(requestId, 'rejected');
    res.json({ message: "Role change rejected." });

  } catch (err) {
    console.error("Role approval error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// 📋 Get Pending Role Change Requests (Managers/CEOs Only)
exports.getPendingRoleRequests = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "CEO" && req.user.role !== "manager") 
      {
      return res.status(403).json({ error: "Access denied." });
    }

    const requests = await RoleChangeRequest.getAllPending();
    res.json(requests);
  } catch (err) {
    console.error("Error fetching role requests:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
