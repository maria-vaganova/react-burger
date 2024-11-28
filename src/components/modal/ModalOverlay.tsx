import React from 'react';
import ReactDOM from 'react-dom';
import modal from './Modal.module.css';

interface ModalOverlayProps {
    onClose: () => void
}

function ModalOverlay({onClose}: ModalOverlayProps) {
    return ReactDOM.createPortal(
        <div className={modal.modalOverlay} onClick={onClose}></div>,
        document.getElementById('modal-root')!
    );
};

export default ModalOverlay;