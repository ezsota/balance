// import { useState, useEffect } from "react";
// import { getTransactions } from "../api/backendApi.js";
// Context:
import { useTransactionContext } from "../context/TransactionContext.jsx";
import AreaChart from "../components/AreaChart.jsx";
import IncomeCard from "../components/IncomeCard.jsx";
import BalanceCard from "../components/BalanceCard.jsx";
import ExpenseCard from "../components/ExpenseCard.jsx";
import CtaBox from "../components/CtaBox.jsx";

export default function Overview() {
    // const [transactions, setTransactions] = useState([]);
    
    // Transactions data context
    const { transactionsData } = useTransactionContext();

    // Get transactions on page render
    // useEffect(() => {
    //     getTransactions().then(setTransactions).catch(console.error);
    // }, []);

    return (
        <div className="d-flex flex-column justify-content-center h-100 w-100">
            <header>
                <h1 className="text-center">Overview</h1>
            </header>

            {/* CHART */}
            <AreaChart transactions={transactionsData} />

            {/* CARDS - GRID BOX */}
            <section className="container text-center mt-4">
                <div className="row justify-content-center">
                    <IncomeCard transactions={transactionsData} />
                    <ExpenseCard transactions={transactionsData} />
                    <BalanceCard transactions={transactionsData} />
                </div>
            </section>

            {/* CTA */}
            <CtaBox />
        </div>
    )
};