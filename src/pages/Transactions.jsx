/* 
Components: TransactionInputs.jsx + Transaction List.jsx
    ===================================
    Transaction Input Form / XL Uploader 
            (Toggle Between)
    ===================================
              Transaction List
    -----------------------------------
    -----------------------------------
    -----------------------------------
    ===================================

*/

import { useState, useEffect } from "react";
import { getTransactions } from "../api/backendApi.js";
import TransactionInputBox from "../components/TransactionInputBox.jsx";
import TransactionList from "../components/TransactionList.jsx";

export default function Transactions() {
    // Initial list transactions (all)
    const [transactions, setTransactions] = useState([]);
    //Filtered list transactions
    const [filteredTransactions, setFilteredTransactions] = useState([])

    // Get all transactions on page render
    useEffect(() => {
        getTransactions().then(setTransactions).catch(console.error);
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center w-100">
            {/* HEADER */}
            <header>
                <h1 className="text-center">Transactions</h1>
            </header>
            {/* COMPONENTS */}
            <TransactionInputBox />
            <TransactionList />
        </div>
    )
};