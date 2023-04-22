require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');

// Initialisation port variable. 
// If variable doesn't match in env file, it will be 5000;
const PORT = process.env.PORT || 5000;

// Initialisation server.
const app = express();


// Middlewares

// JSON for work with JSON format.
app.use(express.json());

// cookieParser for work with cookie.
app.use(cookieParser());

// CORS for http process requests.
// Credentials on true value allows to make requests from the client's side.
// Origin is client's ip, from where the requests will be send.
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));

// /api with root router 
app.use('/api', router);

// errorMiddleware for processing erros. This middleware must be connected last. 
app.use(errorMiddleware);


// Create start async-function with try-catch block.
const start = async () => {
  try {
    // Firstly server tries to connect to the database with the connect method.
    // Database url is stored in env file.
    // useNewUrlParser with value true should not be getting the 'DeprecationWarning' error message.
    // useUnifiedTopology removes support for those connection options that are no longer relevant with the new topology engine.
    // If it does'nt connect, the server will not start.
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    // If the server connects to the database, a console log will appear, and then the server will start.
    console.log('DB connected')
    app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })
  } catch (e) {
    console.log(e)
  }
}

// Start the server.
start();
