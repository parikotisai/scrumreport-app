const db = require('../config/db.config');

const RoleChangeRequest = {
  create: async ({ user_id, requested_role }) => {
    const query = `INSERT INTO role_change_requests (user_id, requested_role) VALUES (?, ?)`;
    return db.execute(query, [user_id, requested_role]);
  },

  findById: async (requestId) => {
    const query = `SELECT * FROM role_change_requests WHERE id = ?`;
    const [rows] = await db.execute(query, [requestId]);
    return rows[0] || null;
  },

  findPendingRequest: async (user_id) => {
    const query = `SELECT * FROM role_change_requests WHERE user_id = ? AND status = 'pending'`;
    const [rows] = await db.execute(query, [user_id]);
    return rows[0] || null;
  },

  getAllPending: async () => {
    const query = `SELECT r.*, u.username FROM role_change_requests r JOIN users u ON r.user_id = u.id WHERE r.status = 'pending'`;
    const [rows] = await db.execute(query);
    return rows;
  },

  updateStatus: async (requestId, status) => {
    const query = `UPDATE role_change_requests SET status = ? WHERE id = ?`;
    return db.execute(query, [status, requestId]);
  }
};

module.exports = RoleChangeRequest;
