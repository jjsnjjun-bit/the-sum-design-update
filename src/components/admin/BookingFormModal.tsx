import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, Clock, Users, Trash2, AlertCircle } from 'lucide-react';
import { ShowroomBooking } from '../../types';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (booking: ShowroomBooking) => void;
  onDelete?: (id: string, name: string) => void;
  editingBooking?: ShowroomBooking | null;
}

const CONSULT_TYPES = [
  'ㄷ자 대면형 싱크대 & 세라믹 상판 실물 상담',
  '침실 스위트 & 프리미엄 조명 헤드보드 체험',
  '서재 월플렉스 & 단독주택 층고 맞춤 설계',
  '아일랜드 식탁 & 홈바 와인랙 커스텀 상담',
  '논현 쇼룸 1~3F 전체 투어 및 3D 공간 배치',
];

const TIME_SLOTS = [
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];

const STATUS_OPTIONS: ShowroomBooking['status'][] = [
  '예약대기',
  '예약확정',
  '방문완료',
  '취소',
];

export const BookingFormModal: React.FC<BookingFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  editingBooking,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [consultType, setConsultType] = useState(CONSULT_TYPES[0]);
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<ShowroomBooking['status']>('예약확정');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
    if (editingBooking) {
      setName(editingBooking.name || '');
      setPhone(editingBooking.phone || '');
      setDate(editingBooking.date || '');
      setTime(editingBooking.time || '14:00');
      setConsultType(editingBooking.consultType || CONSULT_TYPES[0]);
      setGuests(editingBooking.guests || 2);
      setNotes(editingBooking.notes || '');
      setStatus(editingBooking.status || '예약확정');
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      const defaultDateStr = tomorrow.toISOString().split('T')[0];

      setName('');
      setPhone('');
      setDate(defaultDateStr);
      setTime('14:00');
      setConsultType(CONSULT_TYPES[0]);
      setGuests(2);
      setNotes('');
      setStatus('예약확정');
    }
  }, [editingBooking, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) {
      setErrorMsg('예약자 성함, 연락처, 방문 일자는 필수 입력 항목입니다.');
      return;
    }

    const now = new Date();
    const formattedCreated = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(
      now.getDate(),
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(
      2,
      '0',
    )}`;

    const bookingData: ShowroomBooking = {
      id: editingBooking ? editingBooking.id : `RSV-${Date.now().toString().slice(-6)}`,
      name,
      phone,
      date,
      time,
      consultType,
      guests,
      notes,
      status,
      createdAt: editingBooking ? editingBooking.createdAt : formattedCreated,
    };

    onSave(bookingData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-fade-in font-sans">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#DCD5C9] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#1E1B18] text-[#E4DDD3] px-6 py-4 flex items-center justify-between border-b border-[#352F27]">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-[#B89B72]" />
            <h3 className="font-serif-kr text-lg font-bold text-white">
              {editingBooking ? '쇼룸 예약 일정 수정' : '새 쇼룸 1:1 방문 예약 일정 직접 등록'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#A69E92] hover:text-white hover:bg-[#2C2721] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                예약자 성함 *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 정*우 고객님"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                연락처 (휴대전화) *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
              />
            </div>
          </div>

          {/* Row 2: Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                방문 희망 날짜 *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                방문 시간 *
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] font-semibold text-[#8C6D45] focus:outline-none focus:border-[#B89B72]"
              >
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Consult Type */}
          <div>
            <label className="block text-xs font-bold text-[#3E3831] mb-1">
              상담 유형 및 희망 구역 *
            </label>
            <select
              value={consultType}
              onChange={(e) => setConsultType(e.target.value)}
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
            >
              {CONSULT_TYPES.map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
            </select>
          </div>

          {/* Row 3: Guests & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                동반 인원수
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
              >
                <option value={1}>1인 (단독 방문)</option>
                <option value={2}>2인 (배우자/가족 동반)</option>
                <option value={3}>3인</option>
                <option value={4}>4인 이상</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                예약 상태 *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] font-semibold text-[#8C6D45] focus:outline-none focus:border-[#B89B72]"
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#3E3831] mb-1">
              고객 요청사항 / 주차 및 사전 준비 메모
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="예: 반포 신축 아파트 평면도 지참, 1층 발렛 주차 안내 요망"
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
            />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="pt-4 border-t border-[#EAE3D6] flex items-center justify-between gap-3">
            {editingBooking && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  const id = editingBooking.id;
                  const nameVal = editingBooking.name;
                  onClose();
                  onDelete(id, nameVal);
                }}
                className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>이 예약 일정 삭제</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#D5CDC2] bg-white text-xs font-semibold text-[#5A5145] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingBooking ? '예약 일정 저장' : '쇼룸 예약 등록 완료'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
