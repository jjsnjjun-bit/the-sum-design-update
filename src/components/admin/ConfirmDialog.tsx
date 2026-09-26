import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  itemTitle?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning';
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  itemTitle,
  message = '해당 항목을 삭제하시겠습니까? 삭제된 데이터는 홈페이지와 관리자 목록에서 즉시 제거됩니다.',
  confirmLabel = '삭제 확인',
  cancelLabel = '취소',
  variant = 'danger',
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in font-sans">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E5DFD4] overflow-hidden flex flex-col animate-scale-up">
        {/* Header */}
        <div className="p-6 pb-4 flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              variant === 'danger'
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'bg-amber-50 text-amber-600 border border-amber-200'
            }`}
          >
            {variant === 'danger' ? (
              <Trash2 className="w-6 h-6" />
            ) : (
              <AlertTriangle className="w-6 h-6" />
            )}
          </div>

          <div className="flex-1 pr-6">
            <h3 className="font-serif-kr text-lg font-bold text-[#1E1B18] leading-tight">
              {title}
            </h3>
            {itemTitle && (
              <div className="mt-2 p-2.5 bg-[#FAF7F2] rounded-lg border border-[#EAE3D6] text-xs font-semibold text-[#8C6D45] break-words">
                &ldquo;{itemTitle}&rdquo;
              </div>
            )}
            <p className="text-xs sm:text-[13px] text-[#6E665B] mt-2.5 leading-relaxed">
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-[#A69E92] hover:text-[#1E1B18] hover:bg-[#F5EFE6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#EAE3D6] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#D5CDC2] bg-white hover:bg-[#F2ECE1] text-xs sm:text-sm font-semibold text-[#5A5145] transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-98 ${
              variant === 'danger'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-[#B89B72] hover:bg-[#A3865D] text-white'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>{confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
