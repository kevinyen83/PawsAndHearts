/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { 
      domains: ["images.ctfassets.net"]
    },
    env: {
      AWS_API_KEY: process.env.AWS_API_KEY,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    },
  };
  
  module.exports = nextConfig;
  