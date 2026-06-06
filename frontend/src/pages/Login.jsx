import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, LayoutDashboard } from 'lucide-react';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState(''); // Deixando default para facilitar testes
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Chamando a API de login do backend
      const response = await api.post('/auth/login', { email, password });
      
      // Salvando o token recebido no LocalStorage do navegador
      const { token } = response.data;
      localStorage.setItem('@taskflow:token', token);
      
      // Redirecionando para o Dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Erro no login:', err);
      // Se a API retornar mensagem (ex: credenciais inválidas)
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Ocorreu um erro ao conectar com o servidor. Verifique se o backend está rodando.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-dark-bg">
      {/* Efeitos de fundo (Círculos decorativos) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="glass-panel w-full max-w-md p-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-400 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 mb-4 transform transition-transform hover:scale-105">
            <LayoutDashboard size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">TaskFlow</h2>
          <p className="text-gray-400 mt-2 text-sm text-center">
            Gerencie suas tarefas com elegância e produtividade.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Mensagem de Erro */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg flex items-start gap-2">
              <span className="flex-1">{error}</span>
            </div>
          )}

          {/* Campo Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 ml-1">E-mail</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          {/* Campo Senha */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 ml-1 flex justify-between">
              Senha
              <a href="#" className="text-primary-400 hover:text-primary-300 text-xs transition-colors">Esqueceu a senha?</a>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Botão de Submit */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary w-full mt-6 group"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                Entrar na Conta
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-400">
          Não tem uma conta? <Link to="/register" className="text-primary-400 font-medium hover:text-primary-300 transition-colors">Cadastre-se</Link>
        </p>

      </div>
    </div>
  );
}
