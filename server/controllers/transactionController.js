// ==============================================
// Logic between transactionRoutes.js <=> Transactions.js
// ==============================================
import { sanitizeString } from "../utils/sanitizeString.js";
import { checkBadWords } from "../utils/badwordsFilter.js";
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
            if (req.query.from) {
                query.date.$gte = new Date(req.query.from);
            }
            if (req.query.to) {
                const endOfDay = new Date(req.query.to);
                endOfDay.setHours(23, 59, 59, 999);
                query.date.$lte = endOfDay;
            }
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
        // Check for bad words, (throws error if contains)
        checkBadWords({
            title: req.body.title,
            category: req.body.category
        })
        // Sanitize requests
        const sanitizedData = {
            ...req.body,
            title: sanitizeString(req.body.title),
            category: sanitizeString(req.body.category),
            amount: typeof req.body.amount === 'number' ? req.body.amount : NaN, // Forces number or NaN
            date: new Date(req.body.date), // Forces date
        }
        // Create sanitized request + TTL after 1 hour
        const transaction = new Transaction({
            ...sanitizedData,
            expiresAt: new Date(Date.now() + 60 * 60 * 1000)
        });
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
        // Find transaction
        const transactionCheck = await Transaction.findById(req.params.id);
        // Error handle
        if (!transactionCheck) {
            return next(new AppError("Transaction not found", 404));
        }
        // Block DEMO deletions
        if (transactionCheck.isDemo) {
            return next(new AppError("Demo transactions cannot be deleted", 403));
        }
        // Delete transaction
        await transactionCheck.deleteOne();
        res.json({ message: "Transaction Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

// PUT (edit) single transaction by ID using fetch URL param (not browser URL)
// Error if not found
export const editTransaction = async (req, res, next) => {
    try {
        // Find transaction
        const transaction = await Transaction.findById(req.params.id);
        // Error handling
        if (!transaction) {
            return next(new AppError("Transaction not found", 404));
        }
        // Block edits if demo
        if (transaction.isDemo) {
            return next(new AppError("Demo transactions cannot be edited", 403));
        }
        // Check for bad words, (throws error if contains)
        checkBadWords({
            title: req.body.title,
            category: req.body.category
        })
        // Sanitize requests
        const sanitizedData = {
            title: sanitizeString(req.body.title),
            category: sanitizeString(req.body.category),
            amount: typeof req.body.amount === 'number' ? req.body.amount : NaN, // Forces number or NaN
            date: new Date(req.body.date), // Forces date
        }
        // Find and save edit
        const editValues = await Transaction.findByIdAndUpdate(
            req.params.id,
            sanitizedData,
            { new: true, runValidators: true }
        );
        // Respond with updated transaction from queue
        res.json(editValues);
    } catch (error) {
        next(error);
    }
};

// POST excel bulk import transactions WITH 1 HOUR TTL
export const uploadTransactions = async (req, res, next) => {
    try {
        const transactionsWithTTL = req.transactions.map(transaction => ({
            ...transaction,
            expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour TTL
        }));

        await Transaction.insertMany(transactionsWithTTL);

        res.status(201).json({
            message: "Transactions imported successfully",
            count: transactionsWithTTL.length
        });
    } catch (error) {
        next(error);
    }
};