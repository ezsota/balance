import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from server/.env
dotenv.config();

// Init Express, CORS, and JSON HTTP reqs
const app = express();
app.use(cors());
app.use(express.json());

// MONGO_URI error handler
// (MONGO_URI defined in server/.env)
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined, check environment variables");
    process.exit(1); // terminate process
};

// Connect to mongo server using via mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error(`Error connecting to MongoDB: ${error}`));

// Start server on specified port or fallback
// (PORT defined in server/.env)
const PORT = process.env.APP_SERVER_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});