const express = require('express');
const session = require('express-session');
const Grant = require('grant').express();

const app = express();

// Configure session middleware
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Grant configuration
const grant = new Grant({
  defaults: {
    protocol: 'http',
    host: 'localhost:3000',
    transport: 'session',
    state: true,
  },
  google: {
    key: 'YOUR_GOOGLE_CLIENT_ID',
    secret: 'YOUR_GOOGLE_CLIENT_SECRET',
    scope: ['profile', 'email'],
    response: ['profile', 'token'],
    callback: '/auth/google/callback',
  },
});

// Use Grant as middleware
app.use(grant);

// Define routes
app.get('/', (req, res) => {
  res.send('<a href="/connect/google">Login with Google</a>');
});

// Handle Google OAuth 2.0 callback
app.get('/auth/google/callback', (req, res) => {
  // Perform authentication logic and save user information here
  res.send(req.session.grant.response);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
