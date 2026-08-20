import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export type NotificationType = 'success' | 'warning' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: NotificationType;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (msg: Omit<ToastMessage, 'id'>) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeNotification = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showNotification = useCallback(({ title, description, type = 'info', duration = 4000 }: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, description, type, duration };
    
    setToasts(prev => [newToast, ...prev].slice(0, 4));

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  }, [removeNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification, removeNotification }}>
      {children}
      
      {/* Fixed Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-md w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map(toast => {
            const icons = {
              success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
              warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />,
              error: <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
              info: <Info className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />,
            };

            const borderColors = {
              success: 'border-emerald-500/30 bg-emerald-950/80 text-emerald-100 dark:bg-emerald-950/90',
              warning: 'border-amber-500/30 bg-amber-950/80 text-amber-100 dark:bg-amber-950/90',
              error: 'border-red-500/30 bg-red-950/80 text-red-100 dark:bg-red-950/90',
              info: 'border-teal-500/30 bg-slate-900/90 text-slate-100 dark:bg-slate-900/95',
            };

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                className={`pointer-events-auto flex items-start justify-between p-4 rounded-xl border shadow-xl backdrop-blur-md ${borderColors[toast.type]}`}
              >
                <div className="flex items-start space-x-3">
                  {icons[toast.type]}
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide text-white">{toast.title}</h4>
                    {toast.description && (
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.description}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeNotification(toast.id)}
                  className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
