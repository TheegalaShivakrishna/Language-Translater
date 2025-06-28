const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Check if MONGO_URI is provided
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not defined');
        }

        // Validate URI format
        const uri = process.env.MONGO_URI;
        if (uri.includes('mongodb+srv://') && uri.includes(':')) {
            // Check if there's a port number in mongodb+srv URI
            const portMatch = uri.match(/mongodb\+srv:\/\/[^\/]+:(\d+)/);
            if (portMatch) {
                throw new Error('mongodb+srv URI cannot have port number. Remove the port from your connection string.');
            }
        }

        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;