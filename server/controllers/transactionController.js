// ==============================================
// Logic between transactionRoutes.js <=> Transactions.js
// ==============================================
import Transaction from "../models/Transaction.js";
import AppError from "../utils/AppError.js";

// GET all transactions asyncly
// Send as JSON to client/app
// catch triggers errorHandler.js
export const getTransactions = async (req, res, next) => {
    try {
        // Date filters for FilterBox.jsx
        const query = {};
        if (req.query.from || req.query.to) {
            query.date = {};
            if (req.query.from) query.date.$gte = new Date(req.query.from);
            if (req.query.to) query.date.$lte = new Date(req.query.to);
        }
        // Get transactions filtered/unfiltered
        const transactions = await Transaction.find(query).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};

// POST single new transaction
// Save new transaction using request data
// Send as JSON if successful (201)
export const createTransaction = async (req, res, next) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
};

// DELETE single transaction by ID using fetch URL param (not browser URL)
// IF nothing to delete then trigger error
export const deleteTransaction = async (req, res, next) => {
    try {
        const deletionResult = await Transaction.findByIdAndDelete(req.params.id);
        if (!deletionResult) {
            return next(new AppError("Transaction not found", 404));
        }
        res.json({ message: "Transaction Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

// PUT (edit) single transaction by ID using fetch URL param (not browser URL)
// Error if not found
export const editTransaction = async (req, res, next) => {
    try {
        const editValues = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!editValues) {
            return next(new AppError("Transaction not found", 404));
        }

        res.json(editValues);
    } catch (error) {
        next(error);
    }
};

// POST excel bulk import transactions
export const uploadTransactions = async (req, res, next) => {
    try {
        await Transaction.insertMany(req.transactions);
        res.status(201).json({
            message: "Transactions imported successfully",
            count: req.transactions.length
        });
    } catch (error) {
        next(error);
    }
};