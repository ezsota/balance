/*
    UPLOADER DATA FLOW
        UI receives file, sends to backend ->
        POST /api/transactions/uploads/ -> 
        multer middleware -> 
        parseExcel() middleware -> 
        transactionController.js -> 
        uploadTransactions() controller ->
        MongoDB
*/
import { useState } from "react";

export default function ExcelUploader({ onUpload }) {
    const [userFile, setUserFile] = useState(null);

    function handleFormSubmit(event) {
        event.preventDefault();
        if (userFile) onUpload(userFile);
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="
            d-flex
            flex-column
            justify-content-center 
            align-items-center
            gap-4 
            text-center"
        >
            <header className="row col-12 p-2 bg-light border rounded">
                <h3>File Requirements</h3>
                <p className="mb-0">
                    <strong className="w-auto m-0">Format:</strong> <em>.xlsx</em>
                </p>
                <p className="mb-0">
                    <strong>Headers:</strong> <em>"Date", "Title", "Category",</em> and <em>"Amount".</em>
                </p>
            </header>

            <div className="col-12">
                <input
                    type="file"
                    id="file-input"
                    accept=".xlsx"
                    onChange={event => setUserFile(event.target.files[0])}
                    className="form-control w-100"
                />
            </div>

            <div className="col-12">
                <button className="btn btn-success bg-green w-100">Upload File</button>
            </div>
        </form>
    )
};