const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const callRoutes = require('./routes/callRoutes');
const smsRoutes = require('./routes/smsRoutes');
const linkRoutes = require('./routes/linkRoutes');
const qrRoutes = require('./routes/qrRoutes');
const familyRoutes = require('./routes/familyRoutes');
const educationRoutes = require('./routes/educationRoutes');

// Use routes
app.use('/api/calls', callRoutes);
app.use('/api/sms', smsRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/education', educationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Fraud Detection API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});






