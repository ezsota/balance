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
import AreaChart from "../components/AreaChart.jsx";
import SummaryCards from "../components/SummaryCards.jsx";
import CtaBox from "../components/CTABox.jsx";

export default function Overview() {
    // Transactions state (primary)
    const [transactions, setTransactions] = useState([
        {
            title: "Test1",
            amount: 2000.50,
            category: "Test1 Data",
            date: new Date("2023-01-09").getTime()
        },
        {
            title: "Test2",
            amount: -200.25,
            category: "Test2 Data",
            date: new Date("2023-05-22").getTime()
        },
        {
            title: "Test3",
            amount: 3000.50,
            category: "Test3 Data",
            date: new Date("2023-08-15").getTime()
        },
        {
            title: "Test4",
            amount: -2000,
            category: "Test4 Data",
            date: new Date("2023-12-02").getTime()
        },
        {
            title: "Test5",
            amount: 12000.75,
            category: "Test5 Data",
            date: new Date("2024-05-15").getTime()
        },
        {
            title: "Test6",
            amount: -3300.50,
            category: "Test6 Data",
            date: new Date("2024-08-03").getTime()
        },
        {
            title: "Test7",
            amount: 10000.50,
            category: "Test7 Data",
            date: new Date("2025-02-17").getTime()
        },
        {
            title: "Test8",
            amount: -2525.25,
            category: "Test8 Data",
            date: new Date("2026-02-05").getTime()
        }
    ]);

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
            <AreaChart transactions={transactions} />
            <SummaryCards transactions={transactions} />
            <CtaBox />
        </div>
    )
};