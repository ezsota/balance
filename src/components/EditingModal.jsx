import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { editTransaction } from "../api/backendApi.js";
import { CATEGORY_GROUPS } from "../helpers/categoryGroups.js";

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
        closeModal();
    };

    // Close component
    function closeModal() {
        props.setModalShow(false);
        props.setSelectedTransaction({});
        console.log('Closed edit modal');
    };

    return (
        <Modal show={props.modalShow} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Values opt chained and fallback to avoid crashes */}
                <form>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date:</label>
                        <input type="date" name="date" className="form-control" value={editData?.date || ""} required onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" name="title" className="form-control" value={editData?.title || ""} maxLength={50} required onChange={handleChange} />
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount:</label>
                        <input type="number" name="amount" className="form-control" value={editData?.amount || ""} required onChange={handleChange} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                {/* SAVE EDITS */}
                <button className="btn btn-success bg-green" onClick={saveEdits}>Save</button>
            </Modal.Footer>
        </Modal>
    );
};

