import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    // Overlay semi-trasparente
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={onClose} // Chiude il modale se si clicca fuori
    >
      {/* Contenitore del modale */}
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()} // Impedisce la chiusura se si clicca dentro
      >
        {/* Pulsante di chiusura */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}
