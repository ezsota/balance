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

import TransactionInputs from "../components/TransactionInputs.jsx";
import TransactionList from "../components/TransactionList.jsx";

export default function Transactions() {
    return (
        <div className="d-flex flex-column justify-content-center h-100 w-100">
            {/* HEADER */}
            <header>
                <h1 className="text-center">Transactions</h1>
            </header>
            {/* COMPONENTS */}
            <TransactionInputs />
            <TransactionList />
        </div>
    )
};