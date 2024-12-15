const express = require('express'); // Express app
const router = express.Router();   // Router logic
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

// Import the trips controller
const authController = reqire('../controllers/authentication');
const tripsController = require('../controllers/trips');

// for Auth

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

// Define route for /trips endpoint
router
    .route('/trips') 
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);


// Define route for /trips/:code endpoint
router
    .route('/trips/:tripCode') 
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;
