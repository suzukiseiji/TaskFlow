import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  // shouldRender controla se o HTML existe na tela
  const [shouldRender, setShouldRender] = useState(false);
  // showAnimation controla as classes do Tailwind (opacity-100 etc)
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // O timeout de 10ms permite que o navegador desenhe o elemento com opacity-0
      // antes de mudarmos para opacity-100, forçando a transição acontecer.
      const timer = setTimeout(() => setShowAnimation(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowAnimation(false);
      const timer = setTimeout(() => setShouldRender(false), 200); // tempo da animação
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${showAnimation ? 'bg-black/60 backdrop-blur-sm opacity-100' : 'bg-transparent backdrop-blur-none opacity-0'}`}
    >
      {/* Overlay clicável (clicar fora fecha o modal) */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* Janela do Modal */}
      <div 
        className={`glass-panel w-full max-w-md p-6 relative transition-all duration-200 ease-out transform ${showAnimation ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-theme-muted hover:text-theme-main transition-colors"
        >
          <X size={24} />
        </button>

        {title && <h2 className="text-2xl font-bold text-theme-main mb-6">{title}</h2>}

        {/* Conteúdo flexível injetado aqui */}
        {children}
      </div>
    </div>
  );
}
