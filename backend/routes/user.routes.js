// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/user.controller');
// const authMiddleware = require('../middleware/auth.middleware');
// const authorizationMiddleware = require('../middleware/authorization.middleware');

// // Route to get all interns (Managers and CEO can access this)
// router.get('/interns', authMiddleware, authorizationMiddleware(['manager', 'CEO']), userController.getAllInterns);

// module.exports = router;


const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const authorizationMiddleware = require('../middleware/authorization.middleware');

// ✅ Route: Get all interns (Managers and CEO can access this)
router.get('/interns', authMiddleware, authorizationMiddleware(['manager', 'CEO']), userController.getAllInterns);

// ✅ Route: User Requests Role Change
router.post('/role-change', authMiddleware, userController.requestRoleChange);

// ✅ Route: CEO/Manager Approves or Rejects Role Requests
router.post('/role-change/handle', authMiddleware, authorizationMiddleware(['manager', 'CEO']), userController.handleRoleRequest);

// ✅ Route: CEO/Manager Gets Pending Role Change Requests
router.get('/role-change/pending', authMiddleware, authorizationMiddleware(['admin', 'CEO', 'manager']), userController.getPendingRoleRequests);

module.exports = router;
