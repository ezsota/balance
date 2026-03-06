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
    },
    {
        _id: "MongoDB_id029380dg43",
        title: "September Daycare Bill",
        amount: -2456,
        category: "Childcare",
        date: "10/30/1995"
    },
    {
        _id: "MongoDB_id983ergt43e",
        title: "Vet Bill",
        amount: -312,
        category: "Pets",
        date: "11/02/1995"
    },
    {
        _id: "MongoDB_idsgtyhyrh7",
        title: "Paycheck",
        amount: 3000,
        category: "Income",
        date: "10/15/1995"
    },
    {
        _id: "MongoDB_id989786u5ryteg",
        title: "Paycheck",
        amount: 3000,
        category: "Income",
        date: "10/30/1995"
    }
];
// ** TESTING DATA **

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiCaller } from "../helpers/apiCaller.js";
import { deleteTransaction, getTransactions } from "../api/backendApi.js";
import { formatCurrencyUSD } from "../helpers/formatUSD.js";
import EditingModal from "./EditingModal.jsx";
import editIcon from "../assets/edit-pencil.svg";
import deleteIcon from "../assets/delete-bin.svg";

// Child Component: EditingModal.jsx
export default function TransactionList() {
    // ** TESTING **
    const [transactionsData, setTransactionsData] = useState(transactionsTestData);

    useEffect(() => {
        const sorted = [...transactionsData].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTransactionsData(sorted);
    }, []);
    // ** TESTING **

    // Transaction data state
    // const [transactionsData, setTransactionsData] = useState([]);

    // Get transactions sorted from backend
    // Handle errors via useNavigate and apiCaller.js
    // const navigate = useNavigate();
    // useEffect(() => {
    //     async function loadTransactions() {
    //         // Send to helper, handle errors
    //         const data = await apiCaller(getTransactions, navigate);
    //         if (!data) return;

    //         // Sort newset top
    //         const sorted = [...data].sort(
    //             (a, b) => new Date(b.date) - new Date(a.date)
    //         );

    //         // Set state to sorted return data
    //         setTransactionsData(sorted);
    //     }

    //     loadTransactions();
    // }, []);

    function openModal(transaction) {
        setSelectedTransaction(transaction);
        setModalShow(true);
        console.log('Opened edit modal', transaction);
    };

    // Used by openModal(), closeModal, and EditingModal.jsx
    const [modalShow, setModalShow] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});

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
        // ELSE Delete transaction backend using helper
        await apiCaller(() => deleteTransaction(transaction._id), navigate);
        // ELSE Delete transaction frontend
        setTransactionsData(prev =>
            prev.filter(data => data._id !== transaction._id)
        );
        // Log
        console.log(`Deleted ${transaction._id}`);
    };

    // PAGINATION
    const [pageCounter, setPageCounter] = useState(1);
    const ITEMS_PER_PAGE = 5;
    const startAtItem = (pageCounter - 1) * ITEMS_PER_PAGE;
    const paginatedList = transactionsData.slice(startAtItem, startAtItem + ITEMS_PER_PAGE);


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
                {(transactionsData.length > 0) &&
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