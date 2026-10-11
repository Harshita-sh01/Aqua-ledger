// server.js
require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { initializeSockets } = require('./sockets/socketManager');

const authRoutes = require('./routes/auth');
const telemetryRoutes = require('./routes/telemetry');
const alertRoutes = require('./routes/alerts');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/telemetry', telemetryRoutes);
app.use('/api/v1/alerts', alertRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', database: 'connected' });
});

const server = http.createServer(app);
initializeSockets(server);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});