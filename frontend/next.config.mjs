// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // Enable server actions if needed
      serverActions: true,
    },
    // Add environment variables
    env: {
      MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app',
      API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:5000/api',
    },
  };
  
  export default nextConfig;