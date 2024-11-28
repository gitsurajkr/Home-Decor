const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ Database connection successful');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        throw error; // Throw the error to propagate it to the caller
    }
};

module.exports = connectDB;
