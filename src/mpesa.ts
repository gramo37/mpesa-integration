import axios from 'axios';
import { config } from './config';

// Get OAuth token from Safaricom
export const getOAuthToken = async (): Promise<string> => {
    const auth = Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString('base64');
    console.log("Auth ->", auth, config.consumerKey, config.consumerSecret)

    const response = await axios.get(config.oauthUrl, {
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });

    return response.data.access_token;
};

// Register confirmation and validation URLs
export const registerC2BUrl = async (): Promise<void> => {
    const token = await getOAuthToken();
    console.log("Token", token);

    const response = await axios.post(
        config.c2bRegisterUrl,
        {
            ShortCode: config.shortCode,
            ResponseType: 'Completed',
            ConfirmationURL: config.confirmationUrl,
            ValidationURL: config.validationUrl,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    console.log('URL registration response:', response.data);
};

// Simulate a C2B transaction (for testing purposes)
export const simulateC2BPayment = async (amount: number, phoneNumber: string): Promise<void> => {
    const token = await getOAuthToken();

    const response = await axios.post(
        config.c2bSimulateUrl,
        {
            ShortCode: config.shortCode,
            CommandID: 'CustomerPayBillOnline',
            Amount: amount,
            Msisdn: phoneNumber,
            BillRefNumber: 'TestPayment',
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    console.log('C2B Payment Simulation response:', response.data);
};
