import { Loader2, AlertTriangle } from 'lucide-react';
import Modal from './Modal.jsx';

export default function ConfirmModal({ isOpen, onClose, onConfirm, isLoading, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-theme-main mb-2">{title}</h2>
        <p className="text-theme-muted mb-8 leading-relaxed">{message}</p>
        
        <div className="flex gap-3 w-full">
          <button 
            type="button" 
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Excluir'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
