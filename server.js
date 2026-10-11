// server.js
require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { initializeSockets } = require('./sockets/socketManager');
const { bootstrapAdmin } = require('./controllers/authController');

const authRoutes    = require('./routes/auth');
const telemetryRoutes = require('./routes/telemetry');
const alertRoutes   = require('./routes/alerts');

const app  = express();
const PORT = process.env.PORT || 5000;

// Connect MongoDB Atlas, then seed the admin account if absent
connectDB().then(bootstrapAdmin);

// CORS configuration supporting Vite dev server, local test suites, and demo environments
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CORS_ORIGIN,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('Blocked by CORS policy'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/v1/auth',      authRoutes);
app.use('/api/v1/telemetry', telemetryRoutes);
app.use('/api/v1/alerts',    alertRoutes);

// Global error handler — keeps all 500 responses consistent
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error' });
});

app.get('/health', (_req, res) =>
  res.json({ success: true, status: 'healthy', database: 'connected' })
);

const server = http.createServer(app);
const io = initializeSockets(server);
app.set('io', io);

server.listen(PORT, () => console.log(`[AquaLedger] Server listening on port ${PORT}`));