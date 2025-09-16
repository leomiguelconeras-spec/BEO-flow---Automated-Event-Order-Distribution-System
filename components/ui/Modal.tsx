import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from './Icon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="relative bg-card rounded-lg shadow-xl w-full max-w-lg mx-4 border border-border" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between p-4 border-b border-border rounded-t">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground bg-transparent hover:bg-accent hover:text-foreground rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <Icon name="x" className="w-5 h-5" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-6">
            {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
