import multer from "multer";
import XLSX from "xlsx";
import fs from "fs";
import AppError from "../utils/AppError.js";
import { checkBadWords } from "../utils/badwordsFilter.js";
import { sanitizeString } from "../utils/sanitizeString.js";

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
            entry.category &&
            entry.date
        );
        // Throw validation fail error
        if (validFile.length === 0) {
            throw new AppError("No valid transaction data found", 400);
        }
        // Check validated file for bad words
        validFile.forEach(entry => {
            checkBadWords({
                title: entry.title,
                category: entry.category
            });
        });
        // Sanitize validated file
        const sanitizedData = validFile.map(entry => ({
            title: sanitizeString(entry.title),
            category: sanitizeString(entry.category),
            amount: entry.amount,
            date: new Date(entry.date),
            // TTL (time-to-live) del after 1hr [for demo, reduce backend clutter]:
            expiresAt: new Date(Date.now() + 60 * 60 * 1000)
        }));
        // Send valid data
        req.transactions = sanitizedData;
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