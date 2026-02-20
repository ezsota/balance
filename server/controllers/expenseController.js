// ==============================================
// Logic between expenseRoutes.js <=> Expense.js
// ==============================================
import Expense from "../models/Expense.js";
import AppError from "../utils/AppError.js";

// GET all expenses asyncly
// Send as JSON to client/app
// catch triggers errorHandler.js
export const getExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        next(error);
    }
};

// POST new expense
// Save new expense using request data
// Send as JSON if successful (201)
export const createExpense = async (req, res, next) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        next(error);
    }
};

// DELETE expense by ID using URL
// IF nothing to delete then trigger error
export const deleteExpense = async (req, res, next) => {
    try {
        const deletionResult = await Expense.findByIdAndDelete(req.params.id);
        if (!deletionResult) {
            return next(new AppError("Expense not found", 404));
        }
        res.json({ message: "Expense Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

export const uploadExpenses = async (req, res, next) => {
    try {
        await Expense.insertMany(req.expenses);
        res.status(201).json({
            message: "Expenses imported successfully",
            count: req.expenses.length
        });
    } catch (error) {
        next(error);
    }
};