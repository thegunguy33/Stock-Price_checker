const mongoose = require("mongoose");

// Replace the connection string with your updated format
const connectionString = "mongodb+srv://jaredbennett33:W4rz0n3@ac-e4jydxs-shard-0.ibs8sxe.mongodb.net/test?authSource=admin&replicaSet=atlas-3ar1yg-shard-0&retryWrites=true&w=majority";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to the database");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from the database");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected through app termination");
    process.exit(0);
  });
});

module.exports = mongoose.connection;