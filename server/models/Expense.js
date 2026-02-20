import mongoose from "mongoose";

// Define model schema via mongoose:
const expenseSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    category: String,
    date: Date
});

// Export model as "Expense" for MongoDB:
export default mongoose.model("Expense", expenseSchema);