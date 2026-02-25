import { Modal } from "react-bootstrap";

// Parent Component: TransactionList.jsx
export default function EditingModal(props) {

    function saveEdits(updatedTransaction) {
        // [ replace with update logic ]
        console.log('Saved edit', updatedTransaction);
        props.closeModal();
    };

    return (
        <Modal show={props.modalShow} onHide={props.closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* FORM DATA = TransactionList.jsx useState 'selectedTransaction' */}
                <form>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date:</label>
                        <input type="text" id="date" className="form-control" defaultValue={props.selectedTransaction.date} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title:</label>
                        <input type="text" id="title" className="form-control" defaultValue={props.selectedTransaction.title} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category:</label>
                        <input type="text" id="category" className="form-control" defaultValue={props.selectedTransaction.category} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount:</label>
                        <input type="number" id="amount" className="form-control" defaultValue={props.selectedTransaction.amount} />
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

