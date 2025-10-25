const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

//Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 
  'backend/config/config.env' });



//Import all routes here
const products = require("./routes/product.js");
const auth = require("./routes/auth.js");
const payment = require("./routes/payment.js");
const order = require("./routes/order.js");

//Using the routes here
app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", payment);
app.use("/api/v1", order);

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });

}

//Error handling middleware
app.use(errorMiddleware);
module.exports = app;