import express from "express";
import { excelUpload, parseExcel } from "../middleware/importExcel.js";
import { getTransactions, createTransaction, deleteTransaction, editTransaction, uploadTransactions } from "../controllers/transactionController.js";

// Create express router instance
const router = express.Router();

// Define GET route for root path
router.get("/", getTransactions);

// Define POST route for root path
router.post("/", createTransaction);

// Excel imports route + middleware and controller
// Send to excelUpload() -> parseExcel() -> uploadTransactions()
router.post("/upload", excelUpload, parseExcel, uploadTransactions);

// Define DELETE path by URL param id
router.delete("/:id", deleteTransaction);

// Define PUT (edit) path by URL param id
router.put("/:id", editTransaction);

export default router;