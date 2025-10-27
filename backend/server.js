// const dotenv = require('dotenv');
//Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 
  'backend/config/config.env' });
  
const app = require('./app');
const connectDatabase = require("./config/database");
const cloudinary = require('cloudinary');

//Handle uncaught exceptions
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1);
});


// dotenv.config({ path: "backend/config/config.env" }); 

//Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Connecting to database
connectDatabase();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV}  mode`);
});

// Unhandled Promise Rejection
process.on('unhandledRejection', err => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down the server due to Unhandled Promise Rejection');
  server.close(() => {
    process.exit(1);
  });
});