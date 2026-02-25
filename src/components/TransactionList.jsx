// TEST DATA
const transactionsTestData = [
    {
        id: "MongoDB_id02938028934",
        title: "October Daycare Bill",
        amount: -2456,
        category: "Childcare",
        date: "09-30-1995"
    },
    {
        id: "MongoDB_id9834508243",
        title: "Vet Bill",
        amount: -312,
        category: "Pets",
        date: "10-02-1995"
    },
    {
        id: "MongoDB_id098329823043",
        title: "Paycheck",
        amount: 3000,
        category: "Income",
        date: "09-15-1995"
    },
    {
        id: "MongoDB_id987654236494",
        title: "Paycheck",
        amount: 3000,
        category: "Income",
        date: "09-30-1995"
    }
];
// TEST DATA

import { useState } from "react";
import EditingModal from "./EditingModal.jsx";

// Child Component: EditingModal.jsx
export default function TransactionList() {
    // Used by editTransaction() and EditingModal.jsx
    const [modalShow, setModalShow] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});

    function editTransaction(transaction) {
        console.log('Started edit', transaction);
        setSelectedTransaction(transaction);
        setModalShow(true);
    };

    // Used by deleteTransaction()
    function closeModal() {
        setModalShow(false);
        setSelectedTransaction({});
        console.log('Closed edit modal');
    };

    // Delete transaction based on confirmation
    // Used by EditingModal.jsx
    function deleteTransaction(transaction) {
        const verifyDeletion = confirm("Are you sure you want to delete the following transaction:", transaction)
        if (verifyDeletion) {
            console.log('Deleted transaction', transaction);
        } else {
            closeModal();
        }
    }

    return (
        <section className="border rounded overflow-auto text-center">
            {/* DATA TABLE */}
            <table className="table table-striped">
                <thead>
                    <tr>
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
                                <button onClick={() => editTransaction(transaction)}>E</button>
                                <button onClick={() => deleteTransaction(transaction)}>X</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* CHILD COMPONENT */}
            <EditingModal
                closeModal={closeModal}
                modalShow={modalShow}
                setModalShow={setModalShow}
                selectedTransaction={selectedTransaction}
                setSelectedTransaction={setSelectedTransaction}
            />
        </section>
    );
};