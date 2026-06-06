import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('@taskflow:mode') || 'dark');
  const [styleTheme, setStyleTheme] = useState(() => localStorage.getItem('@taskflow:styleTheme') || 'default');

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Limpa todas as classes que influenciam o tema
    root.classList.remove('light', 'dark', 'default', 'dracula');
    
    // Adiciona as novas classes de acordo com as preferências
    if (mode === 'dark') root.classList.add('dark');
    if (styleTheme !== 'default') root.classList.add(styleTheme);

    // Salva as escolhas do usuário
    localStorage.setItem('@taskflow:mode', mode);
    localStorage.setItem('@taskflow:styleTheme', styleTheme);
  }, [mode, styleTheme]);

  const toggleMode = () => setMode(prev => prev === 'light' ? 'dark' : 'light');
  const changeStyle = (newStyle) => setStyleTheme(newStyle);

  return (
    <ThemeContext.Provider value={{ mode, styleTheme, toggleMode, changeStyle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
