import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
// Context:
import { useTransactionContext } from "../context/TransactionContext.jsx";
// Backend API:
import { editTransaction } from "../api/backendApi.js";
// Bad words:
import { Filter } from "bad-words";
// Helpers:
import { apiCaller } from "../helpers/apiCaller";
import { formatCurrencyUSD } from "../helpers/formatUSD.js";
import { CATEGORY_GROUPS } from "../helpers/categoryGroups.js";

// Init bad words filter (not ever render)
const filter = new Filter();

// Parent Component: TransactionList.jsx
export default function EditingModal(props) {
    // Form error message state
    const [errorMessage, setErrorMessage] = useState("");

    // Global transaction data context
    const { setTransactionsData } = useTransactionContext();

    // Local edits state
    const [editData, setEditData] = useState(null);

    // Local amount rendered state
    const [amountDisplayed, setAmountDisplayed] = useState("");

    // Toggle amount edit state
    const [isEditingAmount, setIsEditingAmount] = useState(false);

    // Set editData when props.selectedTransaction changes
    // Allows changes within EditingModal.jsx component
    useEffect(() => {
        if (!props.selectedTransaction) return;

        setEditData(props.selectedTransaction);
        setAmountDisplayed(
            props.selectedTransaction.amount?.toString() ?? ""
        );
    }, [props.selectedTransaction]);

    // Sync editData state with form edits
    function handleChange(event) {
        const { name, value } = event.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
        // Updates change error message
        setErrorMessage("");
    };

    // Send editData to backend, update frontend display sorted, close modal
    const navigate = useNavigate();

    async function saveEdits(editData) {
        if (!editData) return;

        try {
            // Check for bad words
            if (filter.isProfane(editData.title)) {
                setErrorMessage("Please remove foul language, then try again.");
                return;
            }
            // Update edit
            const updatedTransaction = await apiCaller(() => editTransaction(editData._id, editData), navigate);
            if (!updatedTransaction) return;
            setTransactionsData(prev =>
                prev.map(currentTransaction =>
                    currentTransaction._id === updatedTransaction._id
                        ? updatedTransaction
                        : currentTransaction
                ).sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                ));
            closeModal();
        } catch (error) {
            // used to display error in form
            setErrorMessage(error.message);
        }
    };

    // Close modal component
    function closeModal() {
        props.setModalShow(false);
        props.setSelectedTransaction({});
    };

    return (
        <Modal show={props.modalShow} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Values opt chained and fallback to avoid crashes */}
                <form>
                    {/* DATE EDIT */}
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date:</label>
                        <input type="date" name="date" className="form-control" value={editData?.date || ""} required onChange={handleChange} />
                    </div>
                    {/* TITLE EDIT */}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" name="title" className="form-control" value={editData?.title || ""} maxLength={50} required onChange={handleChange} />
                    </div>
                    {/* CATEGORY EDIT */}
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category:</label>
                        <select
                            id="category"
                            className="form-select"
                            value={editData?.category || ""}
                            required
                            name="category"
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select a Category
                            </option>
                            {Object.entries(CATEGORY_GROUPS).map(([groupName, categories]) => (
                                <optgroup key={groupName} label={groupName}>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>
                    {/* AMOUNT EDIT */}
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount:</label>
                        <input
                            required
                            id="amount"
                            type="text"
                            className="form-control"
                            placeholder='Ex: "-1000.50" OR "1000.50"'
                            value={
                                isEditingAmount
                                    ? amountDisplayed
                                    : formatCurrencyUSD(editData?.amount ?? 0)
                            }
                            onFocus={() => {
                                // Activate input rendering
                                setIsEditingAmount(true);
                            }}
                            onChange={(event) => {
                                const rawValue = event.target.value;
                                // Store only digits, minus, and periods
                                const cleanedValue = rawValue.replace(/[^0-9.-]/g, "");
                                setAmountDisplayed(cleanedValue);
                            }}
                            onBlur={() => {
                                setIsEditingAmount(false);

                                const num = Number(amountDisplayed);
                                if (Number.isNaN(num)) {
                                    return;
                                }

                                // store NUMBER in state
                                setEditData(prev => ({
                                    ...prev,
                                    amount: Number(num.toFixed(2))
                                }));

                                // keep input in sync
                                setAmountDisplayed(num.toFixed(2));
                            }}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                {/* ERROR MESSAGE DISPLAY */}
                {errorMessage && (
                    <div className="w-100 alert alert-danger text-center my-1">
                        {errorMessage}
                    </div>
                )}
                {/* SAVE EDITS BTN */}
                <button className="btn btn-success bg-green" onClick={() => saveEdits(editData)}>Save</button>
            </Modal.Footer>
        </Modal>
    );
};

