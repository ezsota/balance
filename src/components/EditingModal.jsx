import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { editTransaction } from "../api/backendApi.js";

// Parent Component: TransactionList.jsx
export default function EditingModal(props) {
    // Local edit data state
    const [editData, setEditData] = useState(null);

    // Set editData when props.selectedTransaction changes
    // Allows changes within EditingModal.jsx component
    useEffect(() => {
        if (props.selectedTransaction) {
            setEditData(props.selectedTransaction);
        }
    }, [props.selectedTransaction]);

    // Sync editData state with form edits
    function handleChange(event) {
        const { name, value } = event.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Send editData to backend for update
    async function saveEdits() {
        await editTransaction(editData._id, editData);
        props.closeModal();
    };

    return (
        <Modal show={props.modalShow} onHide={props.closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Values fallback to "" to avoid crashes */}
                <form>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date:</label>
                        <input type="text" name="date" className="form-control" value={editData?.date || ""} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" name="title" className="form-control" value={editData?.title || ""} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category:</label>
                        <input type="text" name="category" className="form-control" value={editData?.category || ""} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount:</label>
                        <input type="number" name="amount" className="form-control" value={editData?.amount || ""} onChange={handleChange} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                {/* SAVE EDITS */}
                <button className="btn btn-success bg-green" onClick={() => saveEdits(props.selectedTransaction)}>Save</button>
            </Modal.Footer>
        </Modal>
    );
};

