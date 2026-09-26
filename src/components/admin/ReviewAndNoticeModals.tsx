import React, { useState, useEffect } from 'react';
import { X, Save, Star, Bell, Trash2, AlertCircle } from 'lucide-react';
import { Testimonial, SiteNotice } from '../../types';

// ================= 1. Testimonial Form Modal (후기 직접 등록/수정) =================
interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (testimonial: Testimonial) => void;
  onDelete?: (id: string, author: string) => void;
  editingItem?: Testimonial | null;
}

export const TestimonialFormModal: React.FC<TestimonialModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  editingItem,
}) => {
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [stars, setStars] = useState(5);
  const [quote, setQuote] = useState('');
  const [reply, setReply] = useState('');
  const [date, setDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
    if (editingItem) {
      setAuthor(editingItem.author || '');
      setLocation(editingItem.location || '');
      setStars(editingItem.stars || 5);
      setQuote(editingItem.quote || '');
      setReply(editingItem.reply || '');
      setDate(editingItem.date || '');
    } else {
      const now = new Date();
      const defaultDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(
        now.getDate(),
      ).padStart(2, '0')}`;

      setAuthor('');
      setLocation('서초 래미안 48평 • ㄷ자형 대면형 주방 & 냉장고장');
      setStars(5);
      setQuote('');
      setReply('더 숨 디자인 다이렉트: 소중한 인연 감사드리며, 1년 차 정기 점검 때 다시 인사드리겠습니다!');
      setDate(defaultDate);
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) {
      setErrorMsg('고객명과 후기 내용은 필수 입력 항목입니다.');
      return;
    }

    const item: Testimonial = {
      id: editingItem ? editingItem.id : `rev-${Date.now()}`,
      author,
      location,
      date,
      stars,
      quote,
      reply,
    };

    onSave(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-fade-in font-sans">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#DCD5C9] overflow-hidden flex flex-col max-h-[92vh]">
        <div className="bg-[#1E1B18] text-[#E4DDD3] px-6 py-4 flex items-center justify-between border-b border-[#352F27]">
          <div className="flex items-center gap-2.5">
            <Star className="w-5 h-5 text-[#E5A83B] fill-current" />
            <h3 className="font-serif-kr text-lg font-bold text-white">
              {editingItem ? '고객 후기 직접 수정' : '새 고객 후기 직접 등록'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#A69E92] hover:text-white hover:bg-[#2C2721] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                고객명 (익명 처리 권장) *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="예: 이** 고객님"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                시공 만족도 별점 *
              </label>
              <div className="flex items-center gap-1.5 pt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStars(s)}
                    className="p-1 text-[#E5A83B] hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${s <= stars ? 'fill-[#E5A83B]' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-bold text-[#8C6D45]">{stars}점 만점</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3E3831] mb-1">
              아파트 위치 &amp; 맞춤 가구 품목 *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="예: 서초 반포 자이 48평 • ㄷ자형 대면형 주방 & 냉장고장"
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3E3831] mb-1">
              고객 리얼 시공 후기 내용 *
            </label>
            <textarea
              rows={4}
              required
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="고객이 보내주신 감동적인 시공 후기 문구를 입력하세요."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72] leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3E3831] mb-1">
              엄태준 대표 &amp; 공방 공식 답변
            </label>
            <textarea
              rows={2}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="공방에서 고객에게 전하는 감사 메시지"
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3E3831] mb-1">
              작성 일자
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="2026.09.22"
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] font-mono focus:outline-none focus:border-[#B89B72]"
            />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-4 border-t border-[#EAE3D6] flex items-center justify-between gap-3">
            {editingItem && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  const id = editingItem.id;
                  const authorVal = editingItem.author;
                  onClose();
                  onDelete(id, authorVal);
                }}
                className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>이 후기 삭제</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#D5CDC2] bg-white text-xs font-semibold text-[#5A5145] hover:bg-[#F4EFE6] cursor-pointer transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingItem ? '후기 수정사항 저장' : '새 후기 등록 완료'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// ================= 2. Notice Form Modal (공지사항 직접 등록/수정) =================
interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (notice: SiteNotice) => void;
  onDelete?: (id: string, title: string) => void;
  editingNotice?: SiteNotice | null;
}

export const NoticeFormModal: React.FC<NoticeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  editingNotice,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<SiteNotice['category']>('공지');
  const [content, setContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [date, setDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
    if (editingNotice) {
      setTitle(editingNotice.title || '');
      setCategory(editingNotice.category || '공지');
      setContent(editingNotice.content || '');
      setIsImportant(editingNotice.isImportant || false);
      setDate(editingNotice.date || '');
    } else {
      const now = new Date();
      const defaultDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(
        now.getDate(),
      ).padStart(2, '0')}`;

      setTitle('');
      setCategory('공지');
      setContent('');
      setIsImportant(false);
      setDate(defaultDate);
    }
  }, [editingNotice, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setErrorMsg('공지 제목과 상세 내용은 필수입니다.');
      return;
    }

    const item: SiteNotice = {
      id: editingNotice ? editingNotice.id : `NOT-${Date.now()}`,
      title,
      category,
      content,
      isImportant,
      date,
    };

    onSave(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-fade-in font-sans">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#DCD5C9] overflow-hidden flex flex-col max-h-[92vh]">
        <div className="bg-[#1E1B18] text-[#E4DDD3] px-6 py-4 flex items-center justify-between border-b border-[#352F27]">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-[#B89B72]" />
            <h3 className="font-serif-kr text-lg font-bold text-white">
              {editingNotice ? '공지사항 직접 수정' : '새 공지사항 직접 등록'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#A69E92] hover:text-white hover:bg-[#2C2721] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                공지 제목 *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 2026 직영 공방 가을 맞춤 제작 일정 안내"
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#3E3831] mb-1">
                카테고리 *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72]"
              >
                <option value="공지">공지</option>
                <option value="시공일정">시공일정</option>
                <option value="쇼룸안내">쇼룸안내</option>
                <option value="이벤트">이벤트</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3E3831] mb-1">
              공지 상세 내용 *
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="상세 공지 내용을 입력하세요."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#D5CDC2] bg-[#FAF8F5] focus:outline-none focus:border-[#B89B72] leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl border border-[#EBE4D8]">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#3E3831]">
              <input
                type="checkbox"
                checked={isImportant}
                onChange={(e) => setIsImportant(e.target.checked)}
                className="w-4 h-4 text-[#B89B72] rounded"
              />
              <span>중요 긴급 공지로 상단 고정 노출</span>
            </label>
            <span className="text-[11px] text-[#8C8479]">등록일: {date}</span>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-4 border-t border-[#EAE3D6] flex items-center justify-between gap-3">
            {editingNotice && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  const id = editingNotice.id;
                  const titleVal = editingNotice.title;
                  onClose();
                  onDelete(id, titleVal);
                }}
                className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>이 공지사항 삭제</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#D5CDC2] bg-white text-xs font-semibold text-[#5A5145] hover:bg-[#F4EFE6] cursor-pointer transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="bg-[#B89B72] hover:bg-[#A3865D] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingNotice ? '공지 수정사항 저장' : '새 공지 등록 완료'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
