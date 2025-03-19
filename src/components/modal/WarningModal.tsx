import Modal from "./Modal";
import modal from "./Modal.module.css";
import Warning from "../../images/warning.svg";

export interface IWarningModalProps {
    closeModal: () => void,
    message: string
}

function WarningModal({closeModal, message}: IWarningModalProps) {
    return (
        <div>
            <Modal onClose={closeModal}>
                <div className={modal.content}>
                    <img alt={"Warning"} src={Warning}/>
                    <p className="text text_type_main-default">{message}</p>
                </div>
            </Modal>
        </div>
    );
}

export default WarningModal;