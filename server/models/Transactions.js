// ===============
// [MongoDB Model]
// ===============
import mongoose from "mongoose";

// Define model schema via mongoose:
const transactionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    // Force UTC default to avoid timezone bugs
    date: { type: Date, default: () => new Date() }
});

// Export model as "Transaction" for MongoDB:
export default mongoose.model("Transaction", transactionSchema);