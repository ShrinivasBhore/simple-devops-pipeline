import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, CheckCircle2, AlertTriangle, Info, AlertCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNotifications } from '../NotificationContext';
import { NotificationType } from '../types';

export const NotificationCenter: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={16} className="text-neon-green" />;
      case 'warning': return <AlertTriangle size={16} className="text-amber-400" />;
      case 'error': return <AlertCircle size={16} className="text-rose-400" />;
      default: return <Info size={16} className="text-neon-blue" />;
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-glass border border-glass-border text-slate-400 hover:text-neon-blue transition-all"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-deep-space">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-80 bg-deep-space/95 backdrop-blur-2xl border border-glass-border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-glass-border bg-glass flex items-center justify-between">
              <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">System Alerts</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-[9px] font-black text-neon-blue uppercase tracking-widest hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell size={32} className="mx-auto text-slate-800 mb-3" />
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">No active alerts</p>
                </div>
              ) : (
                <div className="divide-y divide-glass-border">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 transition-colors relative group ${notification.read ? 'opacity-60' : 'bg-neon-blue/5'}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div className="mt-0.5">{getIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-tight">{notification.title}</h4>
                            <span className="text-[9px] font-mono text-slate-500">{notification.timestamp}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{notification.message}</p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            clearNotification(notification.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-600 hover:text-rose-400 transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-3 border-t border-glass-border bg-glass text-center">
                <button className="text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                  View Audit Log
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
