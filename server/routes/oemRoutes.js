// routes/oemRoutes.js
const express = require('express');
const { getOEMCount,addOEMModel,searchOEMSpecs } = require('../controllers/oemController');
const router = express.Router();

// Route to get the count of available OEM models
router.get('/count', getOEMCount);
router.post('/add', addOEMModel);
router.get('/search', searchOEMSpecs);

module.exports = router;
