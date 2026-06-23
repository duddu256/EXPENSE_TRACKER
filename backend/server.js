const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const transactions = require('./routes/transactions');

dotenv.config();

// Handshake with database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Mount API routing
app.use('/api/v1/transactions', transactions);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));