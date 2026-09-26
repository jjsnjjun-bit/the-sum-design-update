import React, { useState } from 'react';
import { Lock, User, AlertCircle, X, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      // Required credentials: ocav0329 / biz190329
      if (username.trim() === 'ocav0329' && password === 'biz190329') {
        setIsLoading(false);
        setUsername('');
        setPassword('');
        onSuccessLogin();
      } else {
        setIsLoading(false);
        setErrorMsg('아이디 또는 비밀번호가 올바르지 않습니다. 다시 확인해 주세요.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#1C1A17] text-white rounded-2xl shadow-2xl border border-[#3E3830] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#141210] p-6 border-b border-[#2C2721] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#B89B72] text-[#1E1B18] flex items-center justify-center font-serif-kr font-bold shadow-sm text-base">
              숨
            </div>
            <div>
              <h3 className="font-serif-kr text-lg font-bold text-white leading-tight">
                오카브 비즈 CMS 로그인
              </h3>
              <p className="text-[11px] text-[#A69E92] font-mono">
                THE SUM DESIGN ADMIN AUTH
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-[#A69E92] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Notice: NO auto-input values, clean and secure */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
          <div className="text-xs text-[#BCB2A4] leading-relaxed bg-[#25221D] p-3.5 rounded-xl border border-[#3A342B] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#C7A97E] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">대표 관리자: 엄태준</strong>
              <p className="text-[11px] text-[#9E9587] mt-0.5">
                더 숨 디자인 통합 관리자 시스템 인가 계정으로 로그인해 주세요.
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-950/70 border border-red-800 text-red-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#D4CCC1] mb-1.5">
              관리자 아이디 (Username)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7A7266]">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디를 입력하세요"
                autoComplete="off"
                required
                className="w-full bg-[#12100E] border border-[#3C362E] focus:border-[#B89B72] text-white text-sm rounded-xl pl-10 pr-4 py-3 placeholder:text-[#5E574E] focus:outline-none transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D4CCC1] mb-1.5">
              비밀번호 (Password)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7A7266]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                autoComplete="new-password"
                required
                className="w-full bg-[#12100E] border border-[#3C362E] focus:border-[#B89B72] text-white text-sm rounded-xl pl-10 pr-4 py-3 placeholder:text-[#5E574E] focus:outline-none transition-all font-mono"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#B89B72] hover:bg-[#A3865D] disabled:opacity-50 text-[#1E1B18] font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
            >
              {isLoading ? (
                <span>보안 인증 확인 중...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>관리자 시스템 로그인</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-[11px] text-[#6E6659]">
              관리자 계정 분실 문의: 본사 기획팀 (02-543-1999)
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
