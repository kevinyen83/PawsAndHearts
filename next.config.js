/** @type {import('next').NextConfig} */

const allowedS3Domains = process.env.ALLOWED_S3_DOMAINS
  ? process.env.ALLOWED_S3_DOMAINS.split(',')
  : ['pet-profile-image.s3.ap-southeast-2.amazonaws.com', 'pet-profile-image.s3.amazonaws.com'];

const nextConfig = {
    images: { 
      domains: [...allowedS3Domains, 'www.shutterstock.com', 'myrightbird.com']
    },
    env: {
      AWS_API_KEY: process.env.AWS_API_KEY,
      AWS_API_GATEWAY_INVOKE_URL_PET: process.env.AWS_API_GATEWAY_INVOKE_URL_PET,
      AWS_API_GATEWAY_INVOKE_URL_APPLICATION: process.env.AWS_API_GATEWAY_INVOKE_URL_APPLICATION,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      MAPBOX_SECRET_KEY: process.env.MAPBOX_SECRET_KEY
    },
  };
  
  module.exports = nextConfig;
  