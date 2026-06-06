import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2, LayoutDashboard } from 'lucide-react';
import api from '../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Chamando a API de registro do backend
      await api.post('/auth/register', { name, email, password });
      
      setSuccess('Conta criada com sucesso! Redirecionando...');
      
      // Redirecionando para o Login após alguns segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error('Erro no registro:', err);
      // Se a API retornar mensagem (ex: validação)
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.errors) {
        // Formatar erros de validação do Spring, se houver
        const errorMessages = Object.values(err.response.data.errors).join('. ');
        setError(errorMessages);
      } else {
        setError('Ocorreu um erro ao conectar com o servidor. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-dark-bg">
      {/* Efeitos de fundo (Círculos decorativos) */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="glass-panel w-full max-w-md p-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-400 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 mb-4 transform transition-transform hover:scale-105">
            <LayoutDashboard size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Criar Conta</h2>
          <p className="text-gray-400 mt-2 text-sm text-center">
            Junte-se ao TaskFlow e comece a produzir mais.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleRegister} className="space-y-5">
          
          {/* Mensagem de Erro */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg flex items-start gap-2">
              <span className="flex-1">{error}</span>
            </div>
          )}

          {/* Mensagem de Sucesso */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-400 text-sm p-3 rounded-lg flex items-start gap-2">
              <span className="flex-1">{success}</span>
            </div>
          )}

          {/* Campo Nome */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 ml-1">Nome Completo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <User size={18} />
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field pl-10"
                placeholder="Seu nome"
                required
              />
            </div>
          </div>

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
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Botão de Submit */}
          <button 
            type="submit" 
            disabled={isLoading || !!success}
            className="btn-primary w-full mt-6 group"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                Cadastrar
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-400">
          Já tem uma conta? <Link to="/login" className="text-primary-400 font-medium hover:text-primary-300 transition-colors">Faça login</Link>
        </p>

      </div>
    </div>
  );
}
