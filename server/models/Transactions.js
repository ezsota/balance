// ===============
// [MongoDB Model]
// ===============
import mongoose from "mongoose";

// Define model schema via mongoose:
const transactionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { Date, default: Date.now }
});

// Export model as "Transaction" for MongoDB:
export default mongoose.model("Transaction", transactionSchema);