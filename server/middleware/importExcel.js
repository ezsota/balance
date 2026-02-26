import multer from "multer";
import XLSX from "xlsx";
import fs from "fs";
import AppError from "../utils/AppError.js";

// Init multer for file uploads
// Receive file from ExcelUploader.jsx
// Store in server "uploads/" dir
const upload = multer({ dest: "uploads/" });

// Config middleware function
// Accept only items with "file" attributes from HTML form
export const excelUpload = upload.single("file");

// Async func handling file imports
// Handles checking, validating, sending, and cleaning file data
export const parseExcel = (req, res, next) => {
    //Check file
    if (!req.file) {
        return next(new AppError("No file uploaded", 400));
    };

    try {
        const book = XLSX.readFile(req.file.path);
        const sheet = book.Sheets[book.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        // Validate file
        const validFile = data.filter(entry =>
            entry.title && 
            typeof entry.amount === "number" &&
            entry.amount !== 0 && 
            entry.category
        );
        // Throw validation fail error
        if (validFile.length === 0) {
            throw new AppError("No valid transaction data found", 400);
        }
        // Send valid data
        req.transactions = validFile;
        // Send to uploadTransactions() controller
        next(); 
    } catch (error) {
        // Catch errors
        next(error);
    } finally {
        // Cleanup file data
        if (req.file?.path) {
            fs.unlinkSync(req.file.path);
        }
    }
};