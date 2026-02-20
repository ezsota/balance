// ===============
// [MongoDB Model]
// ===============
import mongoose from "mongoose";

// Define model schema via mongoose:
const expenseSchema = new mongoose.Schema({
    title: { String, required: true },
    amount: { Number, required: true },
    category: { String, required: true },
    date: { Date, required: true }
});

// Export model as "Expense" for MongoDB:
export default mongoose.model("Expense", expenseSchema);