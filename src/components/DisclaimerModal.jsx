import { Modal } from "react-bootstrap";

export default function DisclaimerModal(props) {
    // Close disclaimer
    function closeModal() {
        props.setDisclaimerShow(false);
    };

    return (
        <Modal
            show
            backdrop="static"
            keyboard={false}
            aria-label="disclaimer-title"
            className="text-center"
            centered>
            <Modal.Header className="bg-green">
                <Modal.Title className="text-center text-white w-100">DISCLAIMER</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-ink text-white">
                <main>
                    <p className="m-0 p-0">
                        This demo app and its content are accessible to all visitors.
                    </p>
                    <p className="m-0 py-2">
                        All user-generated content is automatically removed after 1 hour.
                    </p>
                    <p className="m-0 py-0">
                        <em>Please refrain from using offensive or inappropriate language.</em>
                    </p>
                </main>
            </Modal.Body>
            <Modal.Footer className="bg-ink border-0">
                <button className="btn btn-success bg-green w-100" onClick={closeModal}>
                    I Agree
                </button>
            </Modal.Footer>
        </Modal>
    );
};