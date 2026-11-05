import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      border: 'border-emerald-200',
      bg: 'bg-emerald-50 text-emerald-900',
      iconColor: 'text-emerald-600',
    },
    error: {
      icon: AlertCircle,
      border: 'border-rose-200',
      bg: 'bg-rose-50 text-rose-900',
      iconColor: 'text-rose-600',
    },
    info: {
      icon: Info,
      border: 'border-blue-200',
      bg: 'bg-blue-50 text-blue-900',
      iconColor: 'text-blue-600',
    },
  };

  const config = typeConfig[toast.type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-bounce-in">
      <div
        className={`p-4 rounded-xl border ${config.border} ${config.bg} shadow-lg flex items-start space-x-3`}
      >
        <Icon className={`w-5 h-5 ${config.iconColor} shrink-0 mt-0.5`} />
        <div className="flex-1 text-sm font-medium">{toast.message}</div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
