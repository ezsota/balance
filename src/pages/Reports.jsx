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

    return (
        <div className="border border-danger w-100 h-100 container-fluid d-flex flex-column">
            <nav className="d-flex justify-content-center">
                <FilterBox setFilters={setFilters} />
            </nav>
            <section className="border d-flex">
                <AreaChart transactions={filteredTransactions} />
                <DoughnutChart transactions={filteredTransactions}/>
            </section>
            <section className="border d-flex col-5">
                <SummaryCards transactions={filteredTransactions} />
            </section>
            <section className="border d-flex col-7 justify-content-center">
                <TransactionList transactions={filteredTransactions} />
            </section>
        </div>
    )
};