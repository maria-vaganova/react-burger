import React from 'react';
import modal from './Modal.module.css';

interface ModalOverlayProps {
    onClose: () => void
}

function ModalOverlay({onClose}: ModalOverlayProps) {
    return <div className={modal.modalOverlay} onClick={onClose}/>
}

export default ModalOverlay;