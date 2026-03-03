// ==============================================
// Logic between transactionRoutes.js <=> Transactions.js
// ==============================================
import sanitizeHtml from "sanitize-html";
import { checkBadWords } from "../utils/badwordsFilter.js";
import Transaction from "../models/Transaction.js";
import AppError from "../utils/AppError.js";

// Sanitize user generate strings
// Avoids script injection
function sanitizeString(value) {
    return sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {}
    });
}

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
        // Create sanitized request
        const transaction = new Transaction(sanitizedData);
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
        // Save sanitized edits
        const editValues = await Transaction.findByIdAndUpdate(
            req.params.id,
            sanitizedData,
            { new: true, runValidators: true }
        );
        // Error fallback
        if (!editValues) {
            return next(new AppError("Transaction not found", 404));
        }
        // Update
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