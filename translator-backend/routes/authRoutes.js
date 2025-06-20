const express = require('express');
const router = express.Router();
const { register, login, validateToken } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/validate', protect, validateToken);

module.exports = router;
