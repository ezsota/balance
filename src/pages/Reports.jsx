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
import TransactionChart from "../components/TransactionChart";

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
            amount: -300.25,
            category: "Test4 Data",
            date: new Date("2023-12-02").getTime()
        }
    ]);

    // Get transactions when filters change
    useEffect(() => {
        getTransactions(filters).then(setFilteredTransactions);
    }, [filters]);

    return (
        <>
            <FilterBox setFilters={setFilters} />
            <TransactionChart transactions={filteredTransactions} />
        </>
    )
};