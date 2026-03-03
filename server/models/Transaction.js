// ===============
// [MongoDB Model]
// ===============
import mongoose from "mongoose";

// Define model schema via mongoose
// Restrictions avoid script insertion and invalid data
// Categories must match src/helpers/categoryGroups.js
// Force date UTC default to avoid timezone bugs
const transactionSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 100 },
    amount: {
        type: Number, required: true,
        validate: {
            validator: v => v !== 0 && Number.isFinite(v),
            message: "Amount can't be zero"
        }
    },
    category: {
        type: String, required: true, enum: [
        "Business",
        "Insurance",
        "Payments",
        "Savings",
        "Childcare",
        "Clothing",
        "Education",
        "Food",
        "Housing",
        "Transportation",
        "Utilities",
        "Entertainment",
        "Occasions",
        "Recreation",
        "Social",
        "Vacations",
        "Gifts",
        "Memberships",
        "Pets",
        "Seasonal",
        "Subscriptions"
        ]
    },
    date: { type: Date, default: () => new Date(), required: true }
});

// Export model as "Transaction" to MongoDB:
export default mongoose.model("Transaction", transactionSchema);