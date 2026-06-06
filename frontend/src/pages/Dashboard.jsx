import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, CheckSquare, Loader2 } from 'lucide-react';
import TaskCard from '../components/TaskCard.jsx';
import api from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    // 1. O Contêiner Principal da Tela (O "Pano de Fundo")
    <div className="min-h-screen bg-dark-bg flex">
      
      {/* 2. A Barra Lateral (Sidebar) */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
            <LayoutDashboard size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">TaskFlow</h1>
        </div>

        {/* Menu de Navegação */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 text-white bg-primary-500/10 px-4 py-3 rounded-lg border border-primary-500/20">
                <CheckSquare size={18} className="text-primary-400" />
                <span className="font-medium">Minhas Tarefas</span>
              </a>
            </li>
            {/* Futuros itens de menu iriam aqui */}
          </ul>
        </nav>

        {/* Botão de Sair no final da barra */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 px-4 py-3 rounded-lg transition-colors mt-auto"
        >
          <LogOut size={18} />
          <span className="font-medium">Sair da Conta</span>
        </button>
      </aside>

      {/* 3. A Área de Conteúdo Principal (Onde as tarefas vão aparecer) */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-white">Quadro de Tarefas</h2>
            <p className="text-gray-400 mt-1">Gerencie suas pendências e produza mais.</p>
          </div>
          <button className="btn-primary py-2 px-4 text-sm font-medium">
            + Nova Tarefa
          </button>
        </header>

        {/* Área Central: Carregando, Vazio ou Grid de Cards */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 gap-3">
            <Loader2 className="animate-spin text-primary-500" size={32} />
            <p>Carregando suas tarefas...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="glass-panel p-8 border-dashed border-2 border-gray-700 flex flex-col items-center justify-center h-64 text-center">
            <CheckSquare size={48} className="text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-300">Nenhuma tarefa por aqui</h3>
            <p className="text-gray-500 mt-2">Clique em "+ Nova Tarefa" para começar a produzir.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </main>

    </div>
  );
}
