import { Clock, Edit2, Trash2, CheckCircle2, Circle } from 'lucide-react';

// O componente recebe "props" (propriedades). 
// Neste caso, estamos extraindo a propriedade "task" (a tarefa) e "onStatusChange" (uma função).
export default function TaskCard({ task }) {
  
  // Função auxiliar para definir a cor da borda/badge dependendo do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO':        return 'border-gray-500/50 bg-gray-500/10 text-gray-400';
      case 'PENDING':     return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400';
      case 'IN_PROGRESS': return 'border-blue-500/50 bg-blue-500/10 text-blue-400';
      case 'COMPLETED':   return 'border-green-500/50 bg-green-500/10 text-green-400';
      default:            return 'border-gray-500/50 bg-gray-500/10 text-gray-400';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'TODO':        return 'To-Do';
      case 'PENDING':     return 'Pendente';
      case 'IN_PROGRESS': return 'Em Andamento';
      case 'COMPLETED':   return 'Concluída';
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
          <h3 className={`text-lg font-semibold text-white leading-tight ${task.status === 'COMPLETED' ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
        </div>
        
        {/* Botão rápido para completar tarefa */}
        <button 
          className={`shrink-0 p-1 rounded-full transition-colors ${task.status === 'COMPLETED' ? 'text-green-500' : 'text-gray-500 hover:text-green-400 hover:bg-gray-800'}`}
          title="Marcar como concluída"
        >
          {task.status === 'COMPLETED' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>
      </div>

      {/* Descrição */}
      <p className="text-gray-400 text-sm line-clamp-2">
        {task.description || "Nenhuma descrição fornecida."}
      </p>

      {/* Rodapé: Data e Ações */}
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-800/50">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock size={14} />
          <span>{new Date(task.createdAt).toLocaleDateString('pt-BR')}</span>
        </div>
        
        {/* Ações (Editar / Deletar) aparecem mais fortes no Hover da linha inteira (group-hover) */}
        <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-colors" title="Editar">
            <Edit2 size={16} />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors" title="Excluir">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
    </div>
  );
}
