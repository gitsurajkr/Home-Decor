const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const router = require('./routes/index');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: 'http://localhost:5173', // Frontend URL
        credentials: true, // Allow cookies and credentials
    })
);

// Connect to the database and start the server
(async () => {
    try {
        await connectDB(); // Ensure database connection
        const PORT = process.env.PORT || 5000;
        app.use('/api', router);
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to start server due to database connection failure.');
        process.exit(1); // Exit process if database connection fails
    }
})();

module.exports = app;
