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
    // Ref for screen capture
    const reportRef = useRef();

    // Date filters
    const [filters, setFilters] = useState({});
    console.log('Date filters', filters);

    // Transactions for report data (updates report page transactionlist.jsx)
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    console.log('Filtered transactions', filteredTransactions);

    // Loading + Get fresh transactions from MongoDB when filters change
    const [loadingMessage, setLoadingMessage] = useState(true);
    useEffect(() => {
        setLoadingMessage(true);
        getTransactions(filters)
            .then(setFilteredTransactions)
            .finally(() => setLoadingMessage(false));
    }, [filters]);

    // LOADING
    if (loadingMessage) {
        return (
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading Transactions...</span>
            </div>
        )
    }

    //NOT LOADING
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