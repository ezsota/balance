import express from "express";
import Expense from "../models/Expense.js";

// Create express router instance
const router = express.Router();

// GET all expenses from root path asyncly
// Send as JSON to client/app
// catch server error 500
router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: "500 Server Error - Failed retrieving expenses" });
    }
});

// Define POST route for root path
// Create and Save new expense using request data
// Send as JSON to client/app if successful (201)
// catch server error 400 
router.post("/", async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: "400 Request Error - Invalid expense data" })
    }

});

// DELETE expense by ID using URL
// Responds with JSON message
// catch 404 / 500 errors
router.delete("/:id", async (req, res) => {
    try {
        const deletionResult = await Expense.findByIdAndDelete(req.params.id);
        if (!deletionResult) {
            return res.status(404).json({ message: "404 Not Found Error - Expense ID not found" })
        }
        res.json({ message: "Expense Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "500 Server Error - Failed deleting expense" })
    }
});

//Excel imports route and middleware (middleware/importExcel.js)
router.post("/upload", excelMiddleware, importExpenses);

export default router;