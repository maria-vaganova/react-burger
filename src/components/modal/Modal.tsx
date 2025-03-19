import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import modal from './Modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay";

interface IModalProps {
    onClose: () => void,
    children: React.ReactNode
}

function Modal({onClose, children}: IModalProps) {
    useEffect((): () => void => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return (): void => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <div>
            <ModalOverlay onClose={onClose}/>
            <div className={modal.modal}>
                <CloseIcon type="primary" onClick={onClose} className={modal.closeButton}/>
                <div className={modal.modalContent}>
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
}

export default Modal;
