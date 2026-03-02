/* 
Components: TransactionChart.jsx, SummaryCards.jsx
                       OUTLOOK
    ===========================================
         
           ~Area Chart of entire history~
    
    ===========================================
    |Total   |       |Total   |      |Net     |
    |Expenses|       |Income  |      |Balance |
    |Card    |       |Card    |      |Card    |
    ===========================================
              [ADD TRANSACTIONS CTA]
*/

import { useState, useEffect } from "react";
import { getTransactions } from "../api/backendApi.js";
import TransactionChart from "../components/TransactionChart.jsx";
import SummaryCards from "../components/SummaryCards.jsx";
import CtaBox from "../components/CTABox.jsx";

export default function Overview() {
    // Transactions state (primary)
    const [transactions, setTransactions] = useState([]);

    // Get transactions on page render
    useEffect(() => {
        getTransactions().then(setTransactions).catch(console.error);
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center h-100 w-100">
            {/* HEADER */}
            <header>
                <h1 className="text-center">Overview</h1>
            </header>
            {/* COMPONENTS */}
            <TransactionChart transactions={transactions} />
            <SummaryCards transactions={transactions} />
            <CtaBox />
        </div>
    )
};