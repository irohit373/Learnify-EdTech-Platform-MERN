const express = require("express");
const dotenv = require("dotenv");

// Load environment variables first
dotenv.config();

console.log("🚀 Starting Learnify Backend...");
console.log("📋 Environment Variables:");
console.log(`PORT: ${process.env.PORT}`);
console.log(`MONGODB_URL: ${process.env.MONGODB_URL ? 'Set' : 'Not Set'}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? 'Set' : 'Not Set'}`);

const app = express();
const PORT = process.env.PORT || 4000;

// Test basic middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    console.log("✅ Test route accessed");
    return res.json({
        success: true,
        message: "Learnify Backend is working!",
        timestamp: new Date().toISOString()
    });
});

app.get("/health", (req, res) => {
    return res.json({
        success: true,
        message: "Health check passed",
        env: {
            NODE_ENV: process.env.NODE_ENV || 'development',
            PORT: process.env.PORT || 4000,
            hasMongoURL: !!process.env.MONGODB_URL,
            hasJWTSecret: !!process.env.JWT_SECRET
        }
    });
});

// Test database connection
console.log("🔗 Testing Database Connection...");
try {
    const database = require("./Configuration/Database");
    database.connect();
    console.log("✅ Database configuration loaded");
} catch (error) {
    console.error("❌ Database connection error:", error.message);
}

// Test Cloudinary connection
console.log("☁️  Testing Cloudinary Connection...");
try {
    const { cloudinaryConnect } = require("./Configuration/Cloudinary");
    cloudinaryConnect();
    console.log("✅ Cloudinary configuration loaded");
} catch (error) {
    console.error("❌ Cloudinary connection error:", error.message);
}

// Start server
app.listen(PORT, () => {
    console.log(`🎉 Server successfully started on port ${PORT}`);
    console.log(`📡 Test the server at: http://localhost:${PORT}`);
    console.log(`🔍 Health check at: http://localhost:${PORT}/health`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
