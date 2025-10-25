const express = require('express');
const Router = express.Router();
const { processPayment, sendStripeApi } = require('../controller/paymentController');
const { isAuthenticatedUser } = require('../middleware/auth');

Router.route('/payment/process').post(isAuthenticatedUser, processPayment);
Router.route('/stripeapi').get(isAuthenticatedUser, sendStripeApi);

module.exports = Router;