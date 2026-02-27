/*
    ===================================
    Transaction Input Form / XL Uploader 
            (Toggle Between)
    ===================================
*/

import { useState } from "react";
import { createTransaction, uploadExcel } from "../api/backendApi.js";
import TransactionForm from "./TransactionForm.jsx";
import ExcelUploader from "./ExcelUploader.jsx";

export default function TransactionInputBox() {
    // NAV TAB STATE -> used consts for clarity and avoiding typos
    const tab1 = "form"
    const tab2 = "uploader"
    const [activeTab, setActiveTab] = useState(tab1);

    return (
        <section className="card text-center shadow" id="transaction-input-box">
            {/* INPUT NAV */}
            <div className="card-header px-0 pb-0 pt-2 bg-gray">
                <ul className="nav nav-tabs justify-content-center gap-2">
                    {/* TAB 1 */}
                    <li className="nav-item">
                        <button
                            className={`nav-link input-tab ${activeTab === tab1 ? "active-tab " : ""}`}
                            onClick={() => setActiveTab(tab1)}>
                            Form
                        </button>
                    </li>
                    {/* TAB 2 */}
                    <li className="nav-item">
                        <button
                            className={`nav-link input-tab ${activeTab === tab2 ? "active-tab " : ""}`}
                            onClick={() => setActiveTab(tab2)}>
                            Uploader
                        </button>
                    </li>
                </ul>
            </div>
            {/* INPUT DISPLAY */}
            <div className="card-body">
                {/* TAB 1 */}
                {activeTab === tab1 && <TransactionForm createTransaction={createTransaction} />}
                {/* TAB 2 */}
                {activeTab === tab2 && <ExcelUploader handleUpload={uploadExcel} />}
            </div>
        </section>
    )
};