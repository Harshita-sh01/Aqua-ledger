const { Server } = require('socket.io');
let io;
function initializeSockets(httpServer) {
  io = new Server(httpServer, { cors: { origin: process.env.CORS_ORIGIN || true, methods: ['GET', 'POST'] } });
  io.on('connection', (socket) => {
    socket.emit('socket:ready', { connectedAt: new Date().toISOString() });
    socket.on('dashboard:subscribe', () => socket.join('dashboard'));
  });
  return io;
}
function getIO() { if (!io) throw new Error('Socket.IO has not been initialized'); return io; }
module.exports = { getIO, initializeSockets };
