import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import modal from './Modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface ModalProps {
    onClose: () => void,
    children: React.ReactNode
}

function Modal({onClose, children}: ModalProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <div className={modal.modal}>
            <CloseIcon type="primary" onClick={onClose} className={modal.closeButton}/>
            <div className={modal.modalContent}>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
}

export default Modal;
