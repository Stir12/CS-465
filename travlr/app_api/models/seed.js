// Bring in the DB connection and trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');

// Import `fs` for file system operations
const fs = require('fs');

let trips; // Declare trips variable

// Read seed data from JSON file
try {
  trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8')); // Ensure correct path
} catch (err) {
  console.error('Error reading trips.json:', err);
  process.exit(1); // Exit if trips data cannot be read
}

// Function to seed the database
const seedDB = async () => {
  try {
    await Trip.deleteMany({}); // Clear existing records
    await Trip.insertMany(trips); // Insert seed data
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding the database:', err);
    process.exit(1);
  }
};

// Seed database and close connection
seedDB()
  .then(async () => {
    await Mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0); // Exit successfully
  })
  .catch((err) => {
    console.error('Unexpected error during seeding:', err);
    process.exit(1); // Exit with failure
  });
