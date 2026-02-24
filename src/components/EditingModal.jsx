import { Modal } from "react-bootstrap";

export default function EditingModal(props) {

    const closeModal = () => {
        props.setModalShow(false);
        props.setSelectedTransaction({}); // Clear selected transaction
        console.log('Closed edit modal');
    };

    const saveEdits = (updatedTransaction) => {
        // [ replace with update logic ]
        console.log('Saved edit', updatedTransaction);
        closeModal();
    };

    return (
        <Modal show={props.modalShow} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                <button className="btn btn-success bg-green" onClick={() => saveEdits(props.selectedTransaction)}>Save</button>
            </Modal.Footer>
        </Modal>
    );
};

