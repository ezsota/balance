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

import TransactionInputBox from "../components/TransactionInputBox.jsx";
import TransactionList from "../components/TransactionList.jsx";

export default function Transactions() {
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