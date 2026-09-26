import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Check, Phone } from 'lucide-react';

import { ShowroomBooking } from '../../types';

interface ShowroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBooking?: (booking: ShowroomBooking) => void;
}

export const ShowroomModal: React.FC<ShowroomModalProps> = ({
  isOpen,
  onClose,
  onAddBooking,
}) => {
  const [date, setDate] = useState<string>('2026-09-26');
  const [time, setTime] = useState<string>('14:00');
  const [consultType, setConsultType] = useState<string>('3D 공간 배치 및 맞춤 주방 상담');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddBooking) {
      const now = new Date();
      const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      onAddBooking({
        id: `RSV-2026-${String(Math.floor(Math.random() * 900) + 100)}`,
        name: name ? `${name} 고객님` : '익명 고객님',
        phone: phone || '010-****-****',
        date,
        time,
        consultType,
        guests: 2,
        status: '예약확정',
        createdAt: formattedDate,
      });
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl sm:max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E5DFD4] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#1E1B18] text-white p-5 flex items-center justify-between">
          <div>
            <div className="text-[10px] tracking-widest uppercase font-semibold text-[#D8B98C] mb-1">
              NONHYEON SHOWROOM 1:1 PRIVATE RESERVATION
            </div>
            <h3 className="font-serif-kr text-lg sm:text-xl font-bold text-[#F4EFE6]">
              논현 쇼룸 1:1 프라이빗 방문 예약
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-[#C4BCB3] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh] text-[#242220]">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 bg-[#FAF7F2] rounded-lg border border-[#EAE3D6] text-xs text-[#6B6358] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#1E1B18]">
                  <MapPin className="w-3.5 h-3.5 text-[#B89B72]" />
                  <span>더 숨 디자인 하우스 (1-3F 플래그십 쇼룸)</span>
                </div>
                <p>더 숨 디자인 하우스 (방문 시 무료 발렛파킹 지원)</p>
                <p className="text-[11px] text-[#8C8479]">운영시간: 화~토 10:00 - 19:00 (사전 예약 고객 전용 1:1 디자이너 배정)</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4E473F] mb-1">
                  방문 희망 일자
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded border border-[#D5CDC2] focus:outline-none focus:border-[#B89B72]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4E473F] mb-1">
                  방문 희망 시간
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['10:30', '13:30', '15:00', '16:30', '18:00'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`p-2 rounded border text-center transition-all cursor-pointer ${
                        time === slot
                          ? 'border-[#B89B72] bg-[#FAF6EE] text-[#1E1B18] font-bold'
                          : 'border-[#E2DBD0] text-[#665F55]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4E473F] mb-1">
                  상담 관심 분야
                </label>
                <select
                  value={consultType}
                  onChange={(e) => setConsultType(e.target.value)}
                  className="w-full text-xs p-2.5 rounded border border-[#D5CDC2] focus:outline-none focus:border-[#B89B72] bg-white"
                >
                  <option>3D 공간 배치 및 맞춤 주방 상담</option>
                  <option>ㄷ자 대면형 싱크대 &amp; 세라믹 상판 체험</option>
                  <option>마스터 침실 일체형 스위트 가구 세트</option>
                  <option>키친핏 냉장고장 &amp; 히든 팬트리 홈바</option>
                  <option>거실 월플렉스 &amp; 전체 주거 리모델링 가구</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4E473F] mb-1">
                    예약자 성함 *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded border border-[#D5CDC2] focus:outline-none focus:border-[#B89B72]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4E473F] mb-1">
                    휴대전화 번호 *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded border border-[#D5CDC2] focus:outline-none focus:border-[#B89B72]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-bold py-3 rounded-sm shadow-sm transition-all cursor-pointer"
                >
                  1:1 프라이빗 쇼룸 예약 접수하기
                </button>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#EBF8F2] text-[#10B981] flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="font-serif-kr text-xl font-bold text-[#1E1B18]">
                쇼룸 방문 예약이 접수되었습니다
              </h3>
              <p className="text-xs text-[#6B645B] max-w-sm mx-auto leading-relaxed">
                <strong>{name}</strong> 고객님 ({phone})<br />
                선택 일시: <strong>{date} {time}</strong><br />
                쇼룸 담당 매니저가 1시간 내에 예약 확정 문자 및 주차/방문 안내를 발송해 드립니다.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-[#1E1B18] text-white text-xs font-semibold px-6 py-2.5 rounded-sm hover:bg-[#332E29] transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
