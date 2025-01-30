const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');
const authorizationMiddleware = require('../middleware/authorization.middleware');

// ✅ Only existing admins can add new admins
router.post('/add-admin', authMiddleware, authorizationMiddleware(['admin']), adminController.addAdminEmail);

module.exports = router;
