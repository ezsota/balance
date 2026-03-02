// ** TESTING DATA **
const transactionsTestData = [
    {
        _id: "MongoDB_id02938028934",
        title: "October Daycare Bill",
        amount: -2456,
        category: "Childcare",
        date: "09/30/1995"
    },
    {
        _id: "MongoDB_id9834508243",
        title: "Vet Bill",
        amount: -312,
        category: "Pets",
        date: "10/02/1995"
    },
    {
        _id: "MongoDB_id098329823043",
        title: "Paycheck",
        amount: 3000,
        category: "Income",
        date: "09/15/1995"
    },
    {
        _id: "MongoDB_id987654236494",
        title: "Paycheck",
        amount: 3000,
        category: "Income",
        date: "09/30/1995"
    }
];
// ** TESTING DATA **

import { useState, useEffect } from "react";
import { deleteTransaction, getTransactions } from "../api/backendApi.js";
import EditingModal from "./EditingModal.jsx";
import editIcon from "../assets/edit-pencil.svg";
import deleteIcon from "../assets/delete-bin.svg";

// Child Component: EditingModal.jsx
export default function TransactionList(props) {
    // Transaction data state
    const [transactionsData, setTransactionsData] = useState([]);
    // ** TESTING ** :
    // const [transactionsData, setTransactionsData] = useState(transactionsTestData);

    // Get and render transactions from backend
    // ** TEMP CAUSES ERROR: VM583:1 Uncaught (in promise) SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON **
    useEffect(() => {
        getTransactions().then(setTransactionsData);
    }, []);

    // Used by openModal(), closeModal, and EditingModal.jsx
    const [modalShow, setModalShow] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});

    function openModal(transaction) {
        setSelectedTransaction(transaction);
        setModalShow(true);
        console.log('Opened edit modal', transaction);
    };

    // Delete transaction based on confirmation
    async function handleDelete(transaction) {
        // Verify delete
        const verifyDeletion = confirm(`Are you sure you want to delete the following transaction:
            Date: ${transaction.date}
            Title: "${transaction.title}"
            Category: ${transaction.category}
            Amount: $${transaction.amount}`);
        // IF cancel delete
        if (!verifyDeletion) return;
        // ELSE Delete transaction backend
        await deleteTransaction(transaction._id);
        // ELSE Delete transaction frontend
        setTransactionsData(prev =>
            prev.filter(data => data._id !== transaction._id)
        );
        // Log
        console.log(`Deleted ${transaction._id}`);
    };

    return (
        <section className="border rounded overflow-auto text-center shadow">
            <header>
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
                        ? transactionsData.map(transaction => (
                            <tr key={transaction._id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.title}</td>
                                <td>{transaction.category}</td>
                                <td className={transaction.amount.toString().startsWith('-') ? 'table-danger' : 'table-success'}>
                                    ${transaction.amount}
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
                {(transactionsData.length > 0) && <span style={{ color: "red" }}>&lt; PAGINATION WILL GO HERE &gt;</span>}
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