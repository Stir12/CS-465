const express = require('express'); // Express app
const router = express.Router();   // Router logic

// Import the trips controller
const tripsController = require('../controllers/trips');

// Define route for /trips endpoint
router
    .route('/trips') 
    .get(tripsController.tripsList);

// Define route for /trips/:code endpoint
router
    .route('/trips/:tripCode') 
    .get(tripsController.tripsFindByCode); 

module.exports = router;
