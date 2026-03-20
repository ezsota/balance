// Context:
import { useTransactionContext } from "../context/TransactionContext.jsx";
// Components
import TransactionInputBox from "../components/TransactionInputBox.jsx";
import TransactionList from "../components/TransactionList.jsx";


export default function Transactions() {
    // Transactions data context
    const { transactionsData } = useTransactionContext();

    return (
        <div className="d-flex flex-column justify-content-center w-100">
            {/* HEADER */}
            <header>
                <h1 className="text-center">Transactions</h1>
            </header>
            {/* COMPONENTS */}
            <TransactionInputBox />
            <TransactionList
                transactions={transactionsData}
            />
        </div>
    )
};