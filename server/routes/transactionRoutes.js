import express from "express";
import { excelUpload, parseExcel } from "../middleware/importExcel.js";
import { getTransactions, createTransaction, deleteTransaction, uploadTransactions } from "../controllers/transactionController.js";

// Create express router instance
const router = express.Router();

// Define GET route for root path
router.get("/", getTransactions);

// Define POST route for root path
router.post("/", createTransaction);

// Define DELETE path by URL param id
router.delete("/:id", deleteTransaction);

// Excel imports route + middleware and controller
// See importExcel.js & transactionController.js
router.post("/upload", excelUpload, parseExcel, uploadTransactions);

export default router;