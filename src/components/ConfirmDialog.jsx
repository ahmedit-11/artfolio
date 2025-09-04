import React from 'react';
import { cn } from '@/lib/utils';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, placement = 'center' }) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 dark:bg-black/70 flex p-4 z-50",
        placement === 'bottom' ? 'items-end justify-center pb-8' : 'items-center justify-center'
      )}
    >
      <div className="bg-background border border-border rounded-xl shadow-2xl max-w-sm w-full">
        <div className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-2">{title || 'Confirm Action'}</h3>
          <p className="text-muted-foreground mb-6">{message || 'Are you sure you want to proceed?'}</p>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
