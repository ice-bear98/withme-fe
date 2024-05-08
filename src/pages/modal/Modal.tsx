import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onClose();
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div onClick={handleModalClick} className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-end h-3/5">
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold text-sm py-1 px-2 mb-4 rounded focus:outline-none focus:shadow-outline"
        >
          닫기
        </button>
        <div className="overflow-y-auto p-2" style={{ flex: '1 1 auto' }}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
