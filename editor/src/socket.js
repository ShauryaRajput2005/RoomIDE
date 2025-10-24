import { io } from 'socket.io-client';

export const initSocket = () => {
  const options = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ['websocket', 'polling'],
  };


  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://your-backend.onrender.com';
  return io(backendUrl, options);
};
