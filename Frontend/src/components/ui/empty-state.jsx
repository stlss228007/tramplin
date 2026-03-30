import React from 'react';
import { cn } from '@/shared/lib/utils';

export const EmptyState = ({ icon, title, description, action, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8", className)}>
      {icon && (
        <div className="text-4xl mb-4 opacity-50">
          <i className={`fas ${icon}`}></i>
        </div>
      )}
      {title && <p className="text-white/70 mb-2">{title}</p>}
      {description && <p className="text-white/50 text-sm">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-2 bg-white/20 rounded-full text-sm text-white hover:bg-white/30 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};