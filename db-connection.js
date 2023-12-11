const mongoose = require('mongoose');

// Your MongoDB connection string
const uri = 'mongodb+srv://jaredbennett33:W4rz0n3@cluster0.ibs8sxe.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Event listeners for connection status
connection.on('connected', () => {
  console.log('Mongoose connected to ' + uri);
});

connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});

connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Gracefully close the connection on process termination
process.on('SIGINT', () => {
  connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

// Export the connection
module.exports = connection;