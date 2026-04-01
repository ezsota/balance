// Context:
import { useTransactionContext } from "../context/TransactionContext.jsx";
// Components
import TransactionInputBox from "../components/TransactionInputBox.jsx";
import TransactionList from "../components/TransactionList.jsx";


export default function Transactions() {
    // Get transactions data from context
    const { transactionsData } = useTransactionContext();

    // LOADING
    const { loadingMessage } = useTransactionContext();
    if (loadingMessage) {
        return (
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading Transactions...</span>
            </div>
        )
    }

    //NOT LOADING
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