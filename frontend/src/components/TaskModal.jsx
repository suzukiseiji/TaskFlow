import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Modal from './Modal.jsx';

export default function TaskModal({ isOpen, onClose, onSave, isLoading, taskToEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TODO');

  // Limpar ou preencher os campos toda vez que o modal abre
  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description || '');
        setStatus(taskToEdit.status);
      } else {
        setTitle('');
        setDescription('');
        setStatus('TODO');
      }
    }
  }, [isOpen, taskToEdit]);
  // A remoção do early return permite que o Modal filho controle a animação de saída
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, status });
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-theme-main ml-1">Título</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              placeholder="Ex: Estudar React"
              required
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-theme-main ml-1">Descrição</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field min-h-[100px] resize-y"
              placeholder="Detalhes da tarefa..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-theme-main ml-1">Status</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input-field appearance-none"
            >
              <option value="TODO">Pendente</option>
              <option value="IN_PROGRESS">Em Andamento</option>
              <option value="DONE">Concluída</option>
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 btn-primary"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Salvar'}
            </button>
          </div>

        </form>
    </Modal>
  );
}
