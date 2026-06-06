import { Clock, Edit2, Trash2, CheckCircle2, Circle } from 'lucide-react';

// O componente recebe "props" (propriedades). 
export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  
  // Função auxiliar para definir a cor da borda/badge dependendo do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO':        return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400';
      case 'IN_PROGRESS': return 'border-primary-500/50 bg-primary-500/10 text-primary-400';
      case 'DONE':        return 'border-green-500/50 bg-green-500/10 text-green-400';
      default:            return 'border-gray-500/50 bg-gray-500/10 text-gray-400';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'TODO':        return 'Pendente';
      case 'IN_PROGRESS': return 'Em Andamento';
      case 'DONE':        return 'Concluída';
      default:            return 'Desconhecido';
    }
  };

  return (
    // Card Principal: Efeito de vidro com uma borda sutil
    <div className="glass-panel p-5 flex flex-col gap-4 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 group">
      
      {/* Cabeçalho do Card: Status e Título */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mb-3 ${getStatusColor(task.status)}`}>
            {getStatusLabel(task.status)}
          </div>
          <h3 className={`text-lg font-semibold text-theme-main leading-tight ${task.status === 'DONE' ? 'line-through opacity-50' : ''}`}>
            {task.title}
          </h3>
        </div>
        
        {/* Botão rápido para completar tarefa */}
        <button 
          onClick={() => onToggleStatus(task)}
          className={`shrink-0 p-1 rounded-full transition-colors ${task.status === 'DONE' ? 'text-green-500' : 'text-theme-muted hover:text-green-500 hover:bg-theme-border'}`}
          title="Marcar como concluída"
        >
          {task.status === 'DONE' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>
      </div>

      {/* Descrição */}
      <p className="text-theme-muted text-sm line-clamp-2">
        {task.description || "Nenhuma descrição fornecida."}
      </p>

      {/* Rodapé: Data e Ações */}
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-theme-border/50">
        <div className="flex items-center gap-1.5 text-xs text-theme-muted">
          <Clock size={14} />
          <span>{new Date(task.createdAt).toLocaleDateString('pt-BR')}</span>
        </div>
        
        {/* Ações (Editar / Deletar) aparecem mais fortes no Hover da linha inteira (group-hover) */}
        <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(task)}
            className="p-1.5 text-theme-muted hover:text-primary-500 hover:bg-primary-500/10 rounded-md transition-colors" title="Editar"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-theme-muted hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors" title="Excluir"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
    </div>
  );
}
