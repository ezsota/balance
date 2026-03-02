/*
Components: Filterbox.jsx, TransactionChart.jsx, TransactionList.jsx SummaryCards.jsx

                       REPORT
    ===========================================
                    [FILTER BOX]
    ===========================================
         
          ~Area Chart of Filtered History~
    
    ===========================================
    ------------------------------  |Filtered|
    ------------------------------  |Expenses|
    ------------------------------  |Card    |
    ------------------------------  ----------
            FILTERED                |Filtered|
        TRANSACTIONS LIST           |Income  |
    ------------------------------  |Card    |
    ------------------------------  ----------
    ------------------------------  |Filtered|
    ------------------------------  |Balance |
    ------------------------------  |Card    | 
    ===========================================
                [EXPORT TO PDF]
    ===========================================
    */

import { useState, useEffect } from "react";
import { getTransactions } from "../api/backendApi.js";
import FilterBox from "../components/FilterBox.jsx";
import AreaChart from "../components/AreaChart.jsx";
import DoughnutChart from "../components/DoughnutChart.jsx";
import SummaryCards from "../components/SummaryCards.jsx";
import IncomeCard from "../components/IncomeCard.jsx";
import BalanceCard from "../components/BalanceCard.jsx";
import ExpenseCard from "../components/ExpenseCard.jsx";
import TransactionList from "../components/TransactionList.jsx";

export default function Reports() {
    // Date filters
    const [filters, setFilters] = useState({});
    console.log('Filtered dates:', filters);

    // Transactions for report data
    const [filteredTransactions, setFilteredTransactions] = useState([
        {
            title: "Test1",
            amount: 2000.50,
            category: "Test1 Data",
            date: new Date("2026-01-02").getTime()
        },
        {
            title: "Test1",
            amount: 2000.50,
            category: "Test1 Data",
            date: new Date("2026-01-15").getTime()
        },
        {
            title: "Test2",
            amount: -200.25,
            category: "Test2 Data",
            date: new Date("2026-02-02").getTime()
        },
        {
            title: "Test1",
            amount: -1000.50,
            category: "Test1 Data",
            date: new Date("2026-02-15").getTime()
        },
        {
            title: "Test3",
            amount: 1000.50,
            category: "Test3 Data",
            date: new Date("2026-02-20").getTime()
        },
        {
            title: "Test4",
            amount: 2000.25,
            category: "Test4 Data",
            date: new Date("2026-03-01").getTime()
        }
    ]);

    // Get transactions when filters change
    useEffect(() => {
        getTransactions(filters).then(setFilteredTransactions);
    }, [filters]);


    // =================
    // SUMMARY CARDS    
    // =================
    // Format amounts function
    function formatCurrencyUSD(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    // Get transactions gt 0 and add those together
    const income = filteredTransactions
        .filter(transaction => transaction.amount > 0)
        .reduce((sum, income) => sum + income.amount, 0);

    // Get transactions lt 0 and add those together
    const expenses = filteredTransactions
        .filter(transaction => transaction.amount < 0)
        .reduce((sum, expense) => sum + expense.amount, 0);

    // Get the account balance
    const balance = income + expenses;

    return (
        <div className="container-fluid w-100 h-100 justify-content-center text-center">
            {/* ROW1 - FILTER */}
            <div className="row">
                <nav className="d-flex justify-content-center">
                    <FilterBox setFilters={setFilters} />
                </nav>
            </div>
            {/* ROW2- CHARTS */}
            <div className="row">
                <section className="col-12 col-md-6">
                    <AreaChart transactions={filteredTransactions} />
                </section>
                <section className="col-12 col-md-6">
                    <DoughnutChart transactions={filteredTransactions} />
                </section>
            </div>
            {/* ROW3 - CARDS & LIST */}
            <div className="row">
                <section className="col-12 col-md-9">
                    <TransactionList transactions={filteredTransactions} />
                </section>
                <section className="col-12 col-md-3">
                    <IncomeCard income={income} formatCurrencyUSD={formatCurrencyUSD} />
                    <ExpenseCard expenses={expenses} formatCurrencyUSD={formatCurrencyUSD} />
                    <BalanceCard balance={balance} formatCurrencyUSD={formatCurrencyUSD} />
                </section>
            </div>
        </div>
    )
};