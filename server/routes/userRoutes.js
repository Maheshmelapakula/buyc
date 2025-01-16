const express = require('express');
const { isAuthenticated, checkRole } = require('../middleware/auth');
// const { updateProfile } = require('../controllers/userController');
const router = express.Router();

// PUT: Update user profile (role-based access)
router.put('/update-profile', isAuthenticated);

module.exports = router;
