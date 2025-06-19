const express = require('express');
const { translateText, getTranslations } = require('../controllers/translationController');
const { protect } = require('../middleware/authMiddleware'); // if you're using JWT

const router = express.Router();

router.post('/', protect, translateText);
router.get('/history', protect, getTranslations);

module.exports = router;
