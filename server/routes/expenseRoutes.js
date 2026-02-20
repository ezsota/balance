import express from "express";
import { excelUpload, parseExcel } from "../middleware/importExcel.js";
import { getExpenses, createExpense, deleteExpense, uploadExpenses } from "../controllers/expenseController.js";

// Create express router instance
const router = express.Router();

// Define GET route for root path
router.get("/", getExpenses);

// Define POST route for root path
router.post("/", createExpense);

// Define DELETE path by URL param id
router.delete("/:id", deleteExpense);

// Excel imports route + middleware and controller
// See importExcel.js & expenseController.js
router.post("/upload", excelUpload, parseExcel, uploadExpenses);

export default router;