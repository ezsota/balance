import Expense from "../models/Expense.js";
import multer from "multer";
import XLSX from "xlsx";
import fs from "fs";

// Init multer for file uploads
// Store in "server/uploads" dir
const upload = multer({ dest: "uploads/" });

// Config middleware function
// Accept only items with "file" attributes from HTML form
const excelMiddleware = upload.single("file");

// Async func handling file imports
// Checks if file was uploaded
// Validates proper data is present
// Deletes file from server memory after uploaded
const importExpenses = async (req, res) => {
    //Check file
    if (!req.file) {
        return res.status(400).json({ message: "400  Request Error - No file uploaded" });
    };

    const book = XLSX.readFile(req.file.path);
    const sheet = book.Sheets[book.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    try {
        // Validate file
        const validFile = data.filter(entry => {
            return (
                entry.title && entry.amount > 0 && entry.category
            );
        });
        if (validFile.length === 0) {
            return res.status(400).json({ message: "No valid file selected, check your file and try again" });
        };
        // Import file
        await Expense.insertMany(validFile);
        res.status(201).json({ message: "Expenses imported successfully" });
        // Delete file
        fs.unlinkSync(req.file.path);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "500 Server Error - Failed importing expenses" })
    }
};

export { excelMiddleware, importExpenses };