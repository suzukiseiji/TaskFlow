import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, CheckSquare, Loader2, Moon, Sun, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import ThemeSelect from '../components/ThemeSelect.jsx';
import TaskCard from '../components/TaskCard.jsx';
import TaskModal from '../components/TaskModal.jsx';
import ConfirmModal from '../components/ConfirmModal.jsx';
import api from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const { mode, toggleMode } = useTheme();
  
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  
  // Estados para o Modal de Exclusão
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // useEffect roda essa função automaticamente assim que a tela abre
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/tasks');
      // O Spring Pageable retorna o array de tarefas dentro da propriedade "content"
      setTasks(response.data.content || []);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      // Se der erro 401 ou 403, o token expirou ou é inválido
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('@taskflow:token');
    navigate('/login');
  };

  const handleSaveTask = async (taskData) => {
    try {
      setIsSaving(true);
      if (taskToEdit) {
        await api.put(`/tasks/${taskToEdit.id}`, taskData);
      } else {
        await api.post('/tasks', taskData);
      }
      setIsModalOpen(false); // Fecha o modal
      fetchTasks(); // Recarrega a lista do servidor
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
      alert("Não foi possível salvar a tarefa. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTask = (id) => {
    setTaskToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;
    try {
      setIsDeleting(true);
      await api.delete(`/tasks/${taskToDelete}`);
      setIsConfirmOpen(false);
      setTaskToDelete(null);
      fetchTasks();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Erro ao excluir tarefa.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'DONE' ? 'TODO' : 'DONE';
    try {
      await api.put(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        status: newStatus
      });
      fetchTasks();
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  };

  const openNewTaskModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  return (
    // 1. O Contêiner Principal da Tela (O "Pano de Fundo")
    <div className="min-h-screen bg-theme-base flex transition-colors duration-300">
      
      {/* 2. A Barra Lateral (Sidebar) */}
      <aside className="w-64 bg-theme-card border-r border-theme-border p-6 flex flex-col transition-colors duration-300">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg shrink-0">
            <LayoutDashboard size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-theme-main">TaskFlow</h1>
        </div>

        {/* Menu de Navegação */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 text-theme-main bg-primary-500/10 px-4 py-3 rounded-lg border border-primary-500/20">
                <CheckSquare size={18} className="text-primary-500" />
                <span className="font-medium">Minhas Tarefas</span>
              </a>
            </li>
            {/* Futuros itens de menu iriam aqui */}
          </ul>
        </nav>

        {/* Botão de Sair no final da barra */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-theme-muted hover:text-red-500 hover:bg-red-500/10 px-4 py-3 rounded-lg transition-colors mt-auto"
        >
          <LogOut size={18} />
          <span className="font-medium">Sair da Conta</span>
        </button>
      </aside>

      {/* 3. A Área de Conteúdo Principal (Onde as tarefas vão aparecer) */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-theme-main">Quadro de Tarefas</h2>
            <p className="text-theme-muted mt-1">Gerencie suas pendências e produza mais.</p>
          </div>
          <div className="flex gap-4 items-center">
            <ThemeSelect />
            <button 
              onClick={toggleMode}
              className="p-2 rounded-full hover:bg-theme-border transition-colors text-theme-muted hover:text-theme-main border border-transparent hover:border-theme-border"
              title="Alternar Claro/Escuro"
            >
              {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              onClick={openNewTaskModal}
              className="btn-secondary py-2 px-4 text-sm font-medium"
            >
              + Nova Tarefa
            </button>
          </div>
        </header>

        {/* Área Central: Carregando, Vazio ou Grid de Cards */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-theme-muted gap-3">
            <Loader2 className="animate-spin text-primary-500" size={32} />
            <p>Carregando suas tarefas...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="glass-panel p-8 border-dashed border-2 border-theme-border flex flex-col items-center justify-center h-64 text-center">
            <CheckSquare size={48} className="text-theme-muted mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-theme-main">Nenhuma tarefa por aqui</h3>
            <p className="text-theme-muted mt-2">Clique em "+ Nova Tarefa" para começar a produzir.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onEdit={openEditTaskModal}
                onDelete={handleDeleteTask}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal de Criação / Edição */}
      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        isLoading={isSaving}
        taskToEdit={taskToEdit}
      />

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDeleteTask}
        isLoading={isDeleting}
        title="Excluir Tarefa?"
        message="Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita."
      />

    </div>
  );
}
