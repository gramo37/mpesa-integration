import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
    consumerKey: process.env.MPESA_CONSUMER_KEY || 'your_consumer_key',
    consumerSecret: process.env.MPESA_CONSUMER_SECRET || 'your_consumer_secret',
    shortCode: process.env.MPESA_SHORTCODE || 'your_shortcode',
    confirmationUrl: process.env.MPESA_CONFIRMATION_URL || 'https://yourdomain.com/confirmation',
    validationUrl: process.env.MPESA_VALIDATION_URL || 'https://yourdomain.com/validation',
    oauthUrl: 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    c2bRegisterUrl: 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl',
    c2bSimulateUrl: 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate'
};
