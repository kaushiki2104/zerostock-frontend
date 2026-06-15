import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, loading }) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    // Prevent body scroll when modal open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Sheet on mobile, dialog on desktop */}
      <div className="relative w-full sm:max-w-sm bg-white
                      rounded-t-3xl sm:rounded-2xl
                      shadow-2xl animate-slide-up
                      px-5 pt-5 pb-8 sm:p-6">

        {/* Drag handle (mobile) */}
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-5 sm:hidden" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn-icon
                     text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 bg-red-100 rounded-2xl
                        flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={26} className="text-red-600" />
        </div>

        <h3 className="text-lg font-bold text-slate-800 text-center mb-2">
          {title || 'Are you sure?'}
        </h3>
        <p className="text-sm text-slate-500 text-center mb-6 leading-relaxed">
          {message || 'This action cannot be undone.'}
        </p>

        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
          <button onClick={onConfirm} disabled={loading} className="btn-danger flex-1">
            {loading ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
            ) : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}