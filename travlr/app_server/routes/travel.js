// Import required modules
const express = require('express');
const router = express.Router();

// Dynamically import node-fetch (ESM support)
let fetch;
(async () => {
  fetch = (await import('node-fetch')).default;  // Using ES module import syntax
})();

router.get('/', async function(req, res, next) {
  try {
    // Fetch trips data from the API endpoint
    const response = await fetch('http://localhost:3000/api/trips');
    const trips = await response.json(); // Parse the JSON response

    // Render the travel page with trips data
    res.render('travel', { title: 'Travlr Getaways', trips: trips });
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).send('Error fetching trips');
  }
});

module.exports = router; // Make sure to export the router correctly
