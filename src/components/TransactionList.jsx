// TEST DATA
const transactionsTestData = [
    {
        id: "MongoDB_id02938028934",
        title: "October Daycare Bill",
        amount: -2456,
        category: "Childcare",
        date: "09/30/1995"
    },
    {
        id: "MongoDB_id9834508243",
        title: "Vet Bill",
        amount: -312,
        category: "Pets",
        date: "10/02/1995"
    },
    {
        id: "MongoDB_id098329823043",
        title: "Paycheck",
        amount: 3000,
        category: "Income",
        date: "09/15/1995"
    },
    {
        id: "MongoDB_id987654236494",
        title: "Paycheck",
        amount: 3000,
        category: "Income",
        date: "09/30/1995"
    }
];
// TEST DATA

import { useState } from "react";
import { deleteTransaction } from "../api/backendApi.js";
import EditingModal from "./EditingModal.jsx";
import editIcon from "../assets/edit-pencil.svg";
import deleteIcon from "../assets/delete-bin.svg";

// Child Component: EditingModal.jsx
export default function TransactionList(props) {
    // Used by openModal(), closeModal, and EditingModal.jsx
    const [modalShow, setModalShow] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});

    function openModal(transaction) {
        console.log('Opened edit modal', transaction);
        setSelectedTransaction(transaction);
        setModalShow(true);
    };

    // Delete transaction based on confirmation
    function deleteTransaction(id) {
        const verifyDeletion = confirm("Are you sure you want to delete the following transaction:", id)
        if (verifyDeletion) {
            console.log('Deleted transaction', id);
            props.deleteTransaction(id)
        } else {
            closeModal();
        }
    }

    return (
        <section className="border rounded overflow-auto text-center shadow">
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
                    {transactionsTestData.map(transaction => (
                        <tr key={transaction.id}>
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
                                    <button onClick={() => deleteTransaction(transaction.id)} className="transaction-icon-container bg-danger">
                                        <img src={deleteIcon} alt="Deletion bin icon" className="transaction-icon-imgs" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* PAGINATION */}
            <div>
                <span style={{ color: "red" }}>&lt; PAGINATION WILL GO HERE &gt;</span>
            </div>
            {/* CHILD COMPONENT */}
            <EditingModal
                modalShow={modalShow}
                selectedTransaction={selectedTransaction}
            />
        </section>
    );
};