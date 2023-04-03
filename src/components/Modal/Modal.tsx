import React from 'react';
import './Modal.scss';

const Modal = ({
  hideModal,
  toggleModal,
  children
}: {
  hideModal: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
}) => {
  if (hideModal) return null;

  return (
    <>
      <div className="modalOverlay" onClick={() => toggleModal()} data-testid="modalOverlay" />
      <div className="modal" data-testid="modal">
        {children}
      </div>
    </>
  );
};

export default Modal;
