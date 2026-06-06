import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';

export default function ThemeSelect() {
  const { styleTheme, changeStyle } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 'default', label: 'Tema Padrão' },
    { value: 'dracula', label: 'Tema Dracula' }
  ];

  const currentOption = options.find(o => o.value === styleTheme) || options[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão Principal do Select */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 bg-theme-card border text-theme-main rounded-lg pl-3 pr-2 py-2 text-sm focus:outline-none transition-all shadow-sm w-[150px] ${isOpen ? 'border-primary-500 ring-1 ring-primary-500/50' : 'border-theme-border hover:border-primary-500/50'}`}
      >
        <span className="font-medium">{currentOption.label}</span>
        <ChevronDown size={16} className={`text-theme-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Menu Suspenso de Opções */}
      {isOpen && (
        <ul className="absolute right-0 top-[calc(100%+0.5rem)] w-[150px] bg-theme-card border border-theme-border rounded-lg shadow-xl overflow-hidden z-50 py-1 animate-in fade-in zoom-in-95 duration-100">
          {options.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => {
                  changeStyle(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 text-sm flex items-center justify-between transition-colors ${
                  styleTheme === option.value 
                    ? 'bg-primary-500/10 text-primary-500 font-medium' 
                    : 'text-theme-main hover:bg-theme-base'
                }`}
              >
                {option.label}
                {styleTheme === option.value && <Check size={14} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
