import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { AccentColor } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const ThemeToggle: React.FC = () => {
  const { theme, setMode, setAccent } = useTheme();
  const [showAccents, setShowAccents] = React.useState(false);

  const accents: { id: AccentColor; color: string }[] = [
    { id: 'blue', color: '#00f2ff' },
    { id: 'purple', color: '#bc13fe' },
    { id: 'emerald', color: '#10b981' },
    { id: 'rose', color: '#f43f5e' },
    { id: 'amber', color: '#f59e0b' },
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button
          onClick={() => setShowAccents(!showAccents)}
          className="p-2 rounded-xl bg-glass border border-glass-border text-slate-400 hover:text-neon-blue transition-all"
          title="Customize Theme"
        >
          <Palette size={18} />
        </button>

        <AnimatePresence>
          {showAccents && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 p-3 bg-deep-space border border-glass-border rounded-2xl shadow-2xl z-50 flex gap-2 min-w-[160px]"
            >
              {accents.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => {
                    setAccent(acc.id);
                    setShowAccents(false);
                  }}
                  className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                    theme.accent === acc.id ? 'border-white scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: acc.color }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => setMode(theme.mode === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-xl bg-glass border border-glass-border text-slate-400 hover:text-neon-blue transition-all"
        title={theme.mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {theme.mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
};
