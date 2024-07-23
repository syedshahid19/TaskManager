import React from 'react';
import Modal from 'react-modal';

const ModalComponent = ({ isOpen, onRequestClose, title, children }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="modal-overlay"
    className="modal-content"
  >
    <div className="flex flex-col items-center p-4 relative">
      <button onClick={onRequestClose} className="modal-close-button">X</button>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  </Modal>
);

export default ModalComponent;
