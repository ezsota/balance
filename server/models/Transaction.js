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
            "Income",
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
    date: { type: Date, default: () => new Date(), required: true },
    //TTL
    expiresAt: {
        type: Date,
        default: null
    },
    // NON-demo data
    isDemo: { type: Boolean, default: false }
});

// TTL index, MongoDB deletes after expiresAt is reached
transactionSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

// Export model as "Transaction" to Express:
export default mongoose.model("Transaction", transactionSchema);