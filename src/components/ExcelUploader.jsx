/*
    UPLOADER DATA FLOW
        UI receives file, sends to backend ->
        POST /api/transactions/upload -> 
        multer middleware -> 
        parseExcel() middleware -> 
        transactionController.js -> 
        uploadTransactions() controller ->
        MongoDB
*/
import { useState } from "react";
import { uploadExcel } from "../api/backendApi.js";

export default function ExcelUploader() {
    const [userFile, setUserFile] = useState(null);

    async function handleFormSubmit(event) {
        event.preventDefault();
        // Alert if no user file selected:
        if (!userFile) {
            alert("Please choose a file to upload");
            return;
        }
        // Send file, if selected, or throw error
        try {
            await uploadExcel(userFile);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form
            // onSubmit={handleFormSubmit}
            className="
            d-flex
            flex-column
            justify-content-center 
            align-items-center
            gap-4 
            text-center"
        >
            {/* FILE INSTRUCTIONS */}
            <p className="col-12 text-white bg-danger rounded-pill p-0 m-0">** UNDER CONSTRUCTION **</p>
            <header className="row col-12 p-2 bg-light border rounded">
                <h3>Upload File Requirements</h3>
                <p className="mb-0">
                    <strong className="w-auto m-0">Format:</strong> <em>.xlsx</em>
                </p>
                <p className="mb-0">
                    <strong>Headers:</strong> <em>"Date", "Title", "Category",</em> and <em>"Amount".</em>
                </p>
            </header>
            {/* INPUT FILE */}
            <div className="col-12">
                <input
                    type="file"
                    id="file-input"
                    accept=".xlsx"
                    onChange={event => setUserFile(event.target.files[0])}
                    className="form-control w-100"
                    required
                    disabled
                />
            </div>
            {/* SEND FILE */}
            <div className="col-12">
                <button
                    className="btn btn-success bg-green w-100"
                    // disabled={!userFile}
                    disabled
                >
                    Upload File
                </button>
            </div>
        </form>
    )
};