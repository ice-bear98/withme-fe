import React from 'react';
import ReactDOM from 'react-dom';
import { FaWindowClose } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
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
      <div onClick={handleModalClick} className="bg-white p-5 rounded-2xl shadow-lg flex flex-col items-end h-3/5">
        <div className="flex w-full justify-center mt-3 relative mb-7 pb-7 border-b-2">
          <h1 className="text-2xl font-['LINESeedKR-Bd']">{title}</h1>
          <button onClick={onClose} className="absolute right-0 focus:outline-none focus:shadow-outline mb-5">
            <FaWindowClose className="w-8 h-8 text-brand_1" />
          </button>
        </div>
        <div className="overflow-y-auto p-2 mt-[-30px]" style={{ flex: '1 1 auto' }}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
