// ================
// [Express Server]
// ================
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import transactionRoutes from "./routes/transactionRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Load environment variables from server/.env
dotenv.config();

// Init Express app
const app = express();

// Register CORS and Express.json
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Rate Limiter (avoids server spamming)
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // req window (1 min)
    max: 20, // # request per IP address
    standardHeaders: true,
    legacyHeaders: false
});
// Register rate limiter (for all below routes -> api/*)
app.use("/api", limiter);

// Connect transaction route
app.use("/api/transactions", transactionRoutes);
// Error Handler (must be last)
app.use(errorHandler);

// MONGO_URI error handler
// (MONGO_URI defined in server/.env)
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined, check environment variables");
    process.exit(1); // terminate process
};

// Connect to mongo server via mongoose
// Use specified port or fallback 5000
// (PORT defined in server/.env)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const PORT = process.env.APP_SERVER_PORT || 5000;
        app.listen(PORT, () => {
            console.log(`MongoDB server connected on port ${PORT}`);
        });
    })
    .catch(error => console.error(`Error connecting to MongoDB server: ${error}`));