import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Backend API:
import { deleteTransaction } from "../api/backendApi.js";
// Context:
import { useTransactionContext } from "../context/TransactionContext.jsx";
// Helpers:
import { apiCaller } from "../helpers/apiCaller.js";
import { formatCurrencyUSD } from "../helpers/formatUSD.js";
//Modal:
import EditingModal from "./EditingModal.jsx";
import editIcon from "../assets/edit-pencil.svg";
import deleteIcon from "../assets/delete-bin.svg";

export default function TransactionList(props) {
    // Transaction context data
    const { transactionsData, setTransactionsData } = useTransactionContext();

    // Delete transaction based on confirmation
    const navigate = useNavigate();
    async function handleDelete(transaction) {
        // Verify delete
        const verifyDeletion = confirm(`Are you sure you want to delete the following transaction:
            Date: ${transaction.date}
            Title: "${transaction.title}"
            Category: ${transaction.category}
            Amount: $${transaction.amount}`);
        // IF cancel delete
        if (!verifyDeletion) return;
        // ELSE Delete transaction backend using helper
        const result = await apiCaller(() => deleteTransaction(transaction._id), navigate);
        // ELSE Delete transaction frontend
        setTransactionsData(prev =>
            prev.filter(data => data._id !== transaction._id)
        );
        // Log
        console.log(`Deleted ${transaction._id}`);
    };

    /* === EDIT MODAL === */
    // Used by openModal() and EditingModal.jsx
    const [modalShow, setModalShow] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});

    // Edit modal init
    function openModal(transaction) {
        setSelectedTransaction(transaction);
        setModalShow(true);
        console.log('Opened edit modal', transaction);
    };

    /* === PAGINATION === */
    const [pageCounter, setPageCounter] = useState(1);
    const ITEMS_PER_PAGE = 20;
    const startAtItem = (pageCounter - 1) * ITEMS_PER_PAGE;
    const paginatedList = props.removePagination
        ? transactionsData
        : transactionsData.slice(startAtItem, startAtItem + ITEMS_PER_PAGE);

    return (
        <section className="border rounded overflow-auto text-center shadow">
            <header className="sticky">
                <h2 className="text-center">History</h2>
            </header>
            {/* DATA TABLE */}
            <table className="table table-striped">
                <thead>
                    <tr className="table-secondary">
                        <th>Date</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {(transactionsData.length > 0)
                        ? paginatedList.map(transaction => (
                            <tr key={transaction._id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.title}</td>
                                <td>{transaction.category}</td>
                                <td className={transaction.amount.toString().startsWith('-') ? 'table-danger' : 'table-success'}>
                                    {formatCurrencyUSD(transaction.amount)}
                                </td>
                                <td>
                                    <div className="d-flex justify-content-center gap-1">
                                        <button onClick={() => openModal(transaction)} className="transaction-icon-container bg-primary">
                                            <img src={editIcon} alt="Edit pencil icon" className="transaction-icon-imgs" />
                                        </button>
                                        <button onClick={() => handleDelete(transaction)} className="transaction-icon-container bg-danger">
                                            <img src={deleteIcon} alt="Deletion bin icon" className="transaction-icon-imgs" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                        : <tr><td colSpan={5} className="text-center">No current transactions</td></tr>}
                </tbody>
            </table>
            {/* PAGINATION */}
            <div>
                {!props.removePagination && (transactionsData.length > 0) &&
                    <span>
                        {/* BACK BUTTON */}
                        <button
                            className="btn btn-success bg-green m-1 py-0"
                            disabled={pageCounter === 1}
                            onClick={() => setPageCounter(page => page - 1)}
                        >
                            &lt;
                        </button>
                        {/* NEXT BUTTON */}
                        <button
                            className="btn btn-success bg-green m-1  py-0"
                            disabled={startAtItem + ITEMS_PER_PAGE >= transactionsData.length}
                            onClick={() => setPageCounter(page => page + 1)}
                        >
                            &gt;
                        </button>
                    </span>}
            </div>
            {/* CHILD COMPONENT */}
            <EditingModal
                modalShow={modalShow}
                setModalShow={setModalShow}
                selectedTransaction={selectedTransaction}
                setSelectedTransaction={setSelectedTransaction}
            />
        </section>
    );
};