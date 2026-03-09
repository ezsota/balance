import { useState, useEffect, useRef } from "react";
import { getTransactions } from "../api/backendApi.js";
import FilterBox from "../components/FilterBox.jsx";
import AreaChart from "../components/AreaChart.jsx";
import DoughnutChart from "../components/DoughnutChart.jsx";
import IncomeCard from "../components/IncomeCard.jsx";
import BalanceCard from "../components/BalanceCard.jsx";
import ExpenseCard from "../components/ExpenseCard.jsx";
import TransactionList from "../components/TransactionList.jsx";
import ReportExporter from "../components/ReportExporter.jsx";

export default function Reports() {
    const reportRef = useRef();

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
        },
        {
            title: "Test30",
            amount: 5000.50,
            category: "Test30 Data",
            date: new Date("2026-04-20").getTime()
        },
        {
            title: "Test40",
            amount: 5000.25,
            category: "Test40 Data",
            date: new Date("2026-04-01").getTime()
        }
    ]);

    // Get transactions when filters change
    useEffect(() => {
        getTransactions(filters).then(setFilteredTransactions);
    }, [filters]);

    return (
        <div className="container-fluid w-100 h-100 text-center">
            {/* ROW1 - FILTER / EXPORT */}
            <div className="row sticky-top bg-gray shadow rounded pb-4">
                <header>
                    <h2>Filter Range</h2>
                </header>
                {/* filter */}
                <nav className="d-flex justify-content-center">
                    <FilterBox setFilters={setFilters} />
                </nav>
                {/* export */}
                <section className="col-12">
                    <ReportExporter reportRef={reportRef} />
                </section>
            </div>

            {/* === START PRINTABLE === */}
            <div id="printable-report" ref={reportRef}>
                {/* ROW2- CHARTS */}
                <div className="row">
                    <header className="mt-4">
                        <h2>Charts</h2>
                    </header>
                    <section className="col-12 col-md-6">
                        <AreaChart transactions={filteredTransactions} />
                    </section>
                    <section className="col-12 col-md-6">
                        <DoughnutChart transactions={filteredTransactions} />
                    </section>
                </div>

                {/* ROW3 - CARDS */}
                <section className="row col-12 mx-auto" id="report-cards-container">
                    <header>
                        <h2>Summary</h2>
                    </header>
                    <IncomeCard transactions={filteredTransactions} />
                    <ExpenseCard transactions={filteredTransactions} />
                    <BalanceCard transactions={filteredTransactions} />
                </section>

                {/* ROW4 - LIST */}
                <div className="row mt-md-4">
                    <section className="col-12">
                        <TransactionList
                            transactions={filteredTransactions}
                            removePagination={true}
                        />
                    </section>
                </div>
            </div>
            {/* === END PRINTABLE === */}

        </div>
    )
};