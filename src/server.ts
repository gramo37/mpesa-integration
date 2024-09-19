import express from 'express';
import bodyParser from 'body-parser';
import { registerC2BUrl, simulateC2BPayment } from './mpesa';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Health check
app.get('/', (req, res) => {
    res.send('M-Pesa C2B Payment Server is running');
});

// Register C2B URLs with Safaricom
app.post('/mpesa/register', async (req, res) => {
    try {
        await registerC2BUrl();
        res.status(200).send('C2B URLs registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering C2B URLs');
    }
});

// Simulate a C2B Payment (for testing)
app.post('/mpesa/simulate', async (req, res) => {
    const { amount, phoneNumber } = req.body;

    try {
        await simulateC2BPayment(amount, phoneNumber);
        res.status(200).send('Payment simulation successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error simulating payment');
    }
});

// Handle M-Pesa payment confirmation callback
app.post('/confirmation', (req, res) => {
    console.log('Payment Confirmation:', req.body);
    res.status(200).json({ message: 'Payment confirmation received' });
});

// Handle M-Pesa payment validation callback
app.post('/validation', (req, res) => {
    console.log('Payment Validation:', req.body);
    res.status(200).json({ message: 'Payment validation received' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
