import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy API requests to the User Service backend during development
      '/api/v1/users': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      // Proxy API requests to the Booking Service backend during development
      '/api/v1/bookings': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
});
