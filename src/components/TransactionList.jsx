/*
    ===================================
              Transaction List
    -----------------------------------
    -----------------------------------
    -----------------------------------
    ===================================

*/

// DELETE - TEST DATA
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
// DELETE - TEST DATA

import { useState } from "react";
import EditingModal from "./EditingModal.jsx";

export default function TransactionList() {
    const [modalShow, setModalShow] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});

    const editTransaction = (transaction) => {
        console.log('Started edit', transaction);
        setSelectedTransaction(transaction);
        setModalShow(true);
    };

    function deleteTransaction(transaction) {
        console.log('Deleted transaction', transaction);
    }

    return (
        <section className="border rounded overflow-auto text-center">
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

            <EditingModal
                modalShow={modalShow}
                setModalShow={setModalShow}
                selectedTransaction={selectedTransaction}
                setSelectedTransaction={setSelectedTransaction}
            />
        </section>
    );
};