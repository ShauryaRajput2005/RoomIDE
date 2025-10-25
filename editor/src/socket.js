import { io } from 'socket.io-client';

export const initSocket = () => {
  const options = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ['websocket', 'polling'],
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const socket = io(backendUrl, options);

  socket.on("connect_error", (err) => {
    console.error("Socket connection failed:", err.message);
  });

  return socket;
};
