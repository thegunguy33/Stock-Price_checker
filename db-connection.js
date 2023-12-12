const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://jaredbennett33:W4rz0n3@cluster0.ibs8sxe.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true, // Deprecated but keeping for older driver versions
    useUnifiedTopology: true, // Deprecated but keeping for older driver versions
  }
);