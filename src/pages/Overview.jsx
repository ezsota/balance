// Context:
import { useTransactionContext } from "../context/TransactionContext.jsx";
// Components
import AreaChart from "../components/AreaChart.jsx";
import IncomeCard from "../components/IncomeCard.jsx";
import BalanceCard from "../components/BalanceCard.jsx";
import ExpenseCard from "../components/ExpenseCard.jsx";
import CtaBox from "../components/CtaBox.jsx";
import LoadingMessage from "../components/LoadingMessage.jsx";

export default function Overview() {
    // Get transactions data from context
    const { transactionsData } = useTransactionContext();

    // LOADING
    const { loadingMessage } = useTransactionContext();
    if (loadingMessage) {
        return <LoadingMessage />
    }

    //NOT LOADING
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