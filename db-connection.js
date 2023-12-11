const mongoose = require('mongoose');

// Your MongoDB connection string
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://jaredbennett33:W4rz0n3@cluster0.ibs8sxe.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listeners for connection status
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Gracefully close the connection on process termination
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

// Export the connection
module.exports = mongoose.connection;