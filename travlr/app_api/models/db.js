const mongoose = require('mongoose');
const readLine = require('readline');

// Retrieve database host
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Build connection string and set timeout
const connect = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongoose connected to ${dbURI}`);
  } catch (err) {
    console.error('Mongoose connection error:', err);
    setTimeout(connect, 1000); // Retry after 1 second
  }
};

// Monitor connection events
mongoose.connection.on('error', err => {
  console.error('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Windows-specific listener
if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

// Graceful shutdown
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// Event listeners for shutdown
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown', () => {
    process.exit(0);
  });
});

// Connect to the database
connect();

// Import schema
require('./travlr');

module.exports = mongoose;
