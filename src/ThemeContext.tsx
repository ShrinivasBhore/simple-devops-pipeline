import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode, AccentColor, ThemeConfig } from './types';

interface ThemeContextType {
  theme: ThemeConfig;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('nexus-theme');
    return saved ? JSON.parse(saved) : { mode: 'dark', accent: 'blue' };
  });

  useEffect(() => {
    localStorage.setItem('nexus-theme', JSON.stringify(theme));
    
    // Apply theme mode to document
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme.mode);
    
    // Apply accent color as CSS variables
    const colors = {
      blue: { primary: '#00f2ff', secondary: 'rgba(0, 242, 255, 0.2)' },
      purple: { primary: '#bc13fe', secondary: 'rgba(188, 19, 254, 0.2)' },
      emerald: { primary: '#10b981', secondary: 'rgba(16, 185, 129, 0.2)' },
      rose: { primary: '#f43f5e', secondary: 'rgba(244, 63, 94, 0.2)' },
      amber: { primary: '#f59e0b', secondary: 'rgba(245, 158, 11, 0.2)' },
    };
    
    const selected = colors[theme.accent];
    root.style.setProperty('--neon-accent', selected.primary);
    root.style.setProperty('--neon-accent-glow', selected.secondary);
    
    if (theme.mode === 'light') {
      root.style.setProperty('--bg-primary', '#f8fafc');
      root.style.setProperty('--bg-secondary', '#ffffff');
      root.style.setProperty('--text-primary', '#0f172a');
      root.style.setProperty('--text-secondary', '#475569');
      root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.08)');
      root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.7)');
    } else {
      root.style.setProperty('--bg-primary', '#05070a');
      root.style.setProperty('--bg-secondary', '#0a0c10');
      root.style.setProperty('--text-primary', '#f8fafc');
      root.style.setProperty('--text-secondary', '#94a3b8');
      root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.08)');
      root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.03)');
    }
  }, [theme]);

  const setMode = (mode: ThemeMode) => setTheme(prev => ({ ...prev, mode }));
  const setAccent = (accent: AccentColor) => setTheme(prev => ({ ...prev, accent }));

  return (
    <ThemeContext.Provider value={{ theme, setMode, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
