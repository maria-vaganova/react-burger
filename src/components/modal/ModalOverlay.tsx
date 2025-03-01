import React from 'react';
import modal from './Modal.module.css';

interface IModalOverlayProps {
    onClose: () => void
}

function ModalOverlay({onClose}: IModalOverlayProps) {
    return <div className={modal.modalOverlay} onClick={onClose}/>
}

export default ModalOverlay;