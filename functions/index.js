const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

// 1. Initialize Stripe with your SECRET KEY
// Old way: require("stripe")("sk_test_...");
// NEW WAY:
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// 2. Set up the Express App
const app = express();

// 3. Middlewares (Security & JSON formatting)
app.use(cors({ origin: true }));
app.use(express.json());

// 4. API Routes
app.get('/', (request, response) => response.status(200).send('Backend is running!'));

app.post('/payments/create', async (request, response) => {
  const total = request.query.total;
  console.log('Payment Request Received! Amount >>> ', total);

  // Tell Stripe to create a payment session for this amount
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, 
    currency: 'inr',
  });

  // Send the secret confirmation code back to the React frontend
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// 5. Turn the Express app into a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
