import {
  CopyVariant,
  PortfolioItem,
  Testimonial,
  WarrantyItem,
  EstimateInquiry,
  ShowroomBooking,
  SiteNotice,
  SiteConfig,
  PhilosophyContent,
} from '../types';
import { SUNKEN_LIVING_IMAGE } from '../assets/images/sunken_living_base64';
import { KITCHEN_C_SHAPE_IMAGE } from '../assets/images/kitchen_c_shape_base64';
import { WOOD_ISLAND_TABLE_IMAGE } from '../assets/images/wood_island_table_base64';
import { BESPOKE_HOMEBAR_IMAGE } from '../assets/images/bespoke_homebar_base64';
import { BEDROOM_WARDROBE_VANITY_IMAGE } from '../assets/images/bedroom_wardrobe_vanity_base64';
import { LIVING_LIBRARY_STUDY_IMAGE } from '../assets/images/living_library_study_base64';
import { ISLAND_COUNTER_KITCHEN_IMAGE } from '../assets/images/island_counter_kitchen_base64';

export const COPY_VARIANTS: CopyVariant[] = [
  {
    id: 'story',
    label: '버전 1: 감성 스토리텔링',
    sub: '가족의 온기 & 삶의 배경',
    tag: '• STORYTELLING & HERITAGE',
    heroTitle: '집은 단순한 공간이 아니라,\n삶이 펼쳐지는 가장 따뜻한 배경입니다.',
    heroSub:
      '20년 동안 4,200여 가정의 식탁과 침실에 고유한 일상의 온기를 새겨왔습니다.\n아침 햇살을 마주하는 아일랜드 식탁, 가족의 하루가 정리되는 맞춤 침실 세트까지.\n더 숨 디자인은 규격화된 가구가 아닌, 당신 가족의 삶의 호흡(숨)에 꼭 맞춘 특별한 가구를 빚어냅니다.',
    ctaText: '5단계 디테일 맞춤 견적 신청하기',
  },
  {
    id: 'craftsmanship',
    label: '버전 2: 20년 장인정신',
    sub: 'Super E0 & 평생 A/S',
    tag: '• 20 YEARS CRAFTSMANSHIP',
    heroTitle: '보이지 않는 1mm의 디테일까지,\n20년 장인의 손길로 정직하게 완성합니다.',
    heroSub:
      '포름알데히드 걱정 없는 Super E0 친환경 최고등급 자재와 오스트리아 Blum 정품 하드웨어.\n외주 하청 없는 100% 자체 직영 공방 제작으로, 10년이 지나도 뒤틀림 없는 프리미엄 가구의 기준을 지킵니다.',
    ctaText: '직영 공방 1:1 맞춤 견적 받기',
  },
  {
    id: 'lifestyle',
    label: '버전 3: 모던 라이프스타일',
    sub: '대면형 무몰딩 & 동선설계',
    tag: '• MODERN BESPOKE LIFESTYLE',
    heroTitle: '가족과의 대화가 살아나는\n대면형 키친 & 프리미엄 맞춤 수납.',
    heroSub:
      '벽을 바라보던 요리 공간에서 가족과 눈을 맞추는 오픈 다이닝으로.\n1mm의 오차 없는 키친핏 냉장고장과 히든 팬트리, 호텔 스위트룸 감성의 마스터 침실 세트를 제안합니다.',
    ctaText: '우리 집 3D 공간 배치 상담받기',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'item-1',
    category: 'kitchen-c',
    categoryLabel: 'ㄷ자형 대면형 싱크대',
    isBest: true,
    image: KITCHEN_C_SHAPE_IMAGE,
    locationInfo: '신축 아파트 • 48평형 • 2025.11',
    title: '서초 래미안 48평 ㄷ자형 대면형 오픈 키친',
    description: '가족과의 눈맞춤이 시작되는 3.6m 와이드 대면형 싱크 & 홈바',
    specs: ['이태리 천연 세라믹 상판', '친환경 Super E0 샌드베이지 도어', 'Blum 캐그네틱스 서랍재'],
    fullDetails: {
      concept: '대면형 조리대와 4인 바 테이블 일체형 구조로 가족 간 소통을 극대화한 오픈 키친',
      materials: ['이태리 라미남(Laminam) 12T 천연 세라믹', 'Super E0 친환경 무광 샌드베이지 PET 도장', '독일 에센스 매립 콘센트'],
      hardware: ['오스트리아 Blum 레그라박스 풀익스텐션 댐핑 레일', 'Blum 클립탑 블룸모션 힌지'],
      period: '설계 및 3D 모델링 7일 + 공방 제작 14일 + 직영 설치 2일',
    },
  },
  {
    id: 'item-2',
    category: 'island-dining',
    categoryLabel: '아일랜드 식탁 & 조리대',
    isBest: true,
    image: WOOD_ISLAND_TABLE_IMAGE,
    locationInfo: '단독/전원주택 • 65평형 • 2025.10',
    title: '판교 운중동 단독주택 통원목 아일랜드 식탁 & 조리대',
    description: '천연 오크 원목과 콘크리트 텍스처가 빚어낸 다이닝의 중심',
    specs: ['북미산 화이트오크 솔리드 원목', '스페인 네오리스 세라믹', '탈출 펜트리 오일 발향'],
    fullDetails: {
      concept: '자연의 나뭇결을 그대로 살린 통원목 상판과 세라믹 쿡탑의 조화로운 결합',
      materials: ['북미산 FAS등급 최상급 화이트오크 45T', '스페인 네오리스 12T 포세린 세라믹', '천연 독일 루비오 모노코트 친환경 오일'],
      hardware: ['헤펠레 히든 브라켓 보강 구조', '터치형 무선 충전 매립 모듈'],
      period: '원목 선별 및 함수율 안정화 20일 + 가공 및 조립 10일 + 설치 1일',
    },
  },
  {
    id: 'item-3',
    category: 'fridge-pantry',
    categoryLabel: '냉장고장 & 팬트리',
    isBest: true,
    image: BESPOKE_HOMEBAR_IMAGE,
    locationInfo: '신축 아파트 • 39평형 • 2025.09',
    title: '송도 자이 더스타 비스포크 핏 냉장고장 & 홈카페 팬트리',
    description: '틈새 1mm의 오차 없는 키친핏 라인과 회전형 포켓 도어 홈바',
    specs: ['LG 베니스 매트 크림 도장', '오스트리아 블룸 포켓도어 하드웨어', '은은한 3000K 간접 히든 LED'],
    fullDetails: {
      concept: '냉장고 도어 단차를 완벽히 일치시키고 평소에는 깔끔히 가려지는 슬라이딩 포켓 홈카페',
      materials: ['Super E0 고밀도 MDF + 무황변 우레탄 6회 매트도장', '3000K 전구색 바타입 확산 LED'],
      hardware: ['Blum 포켓도어 하드웨어 세트 (소프트 클로징)', '독일 헤펠레 마이크로 힌지'],
      period: '실측 및 키친핏 치수 감리 3일 + 제작 10일 + 밀착 시공 1일',
    },
  },
  {
    id: 'item-4',
    category: 'bedroom',
    categoryLabel: '침실 맞춤 가구 세트',
    isBest: true,
    image: BEDROOM_WARDROBE_VANITY_IMAGE,
    locationInfo: '주상복합/아파트 • 54평형 • 2025.08',
    title: '한남 더힐 침실 마스터 스위트 (붙박이장·침대 헤드보드·화장대 일체형)',
    description: '호텔 스위트룸의 휴식을 우리 집 안방으로 그대로 옮겨온 맞춤 가구 세트',
    specs: ['캐시미어 베이지 & 브론즈 글라스', '오벌 앰비언트 LED 거울 & 화장대', '독일 헤펠레 댐핑 & 하부 간접조명'],
    fullDetails: {
      concept: '파우더룸 화장대와 수납 선반 타워, 슬림 골드 롱핸들 붙박이장, 브론즈 글라스 쇼케이스를 유기적으로 연결한 최고급 마스터 스위트',
      materials: ['Super E0 친환경 캐시미어 무광 PET', '템바보드 루버 우드 월 패널', '3000K 전구색 바타입 확산 LED & 오벌 터치 거울', '브론즈 강화유리'],
      hardware: ['독일 헤펠레 무소음 댐핑 언더레일 & 힌지', '슬림 샴페인 골드 롱핸들', '디밍 컨트롤 터치 센서 스위치'],
      period: '주거 동선 분석 5일 + 정밀 맞춤 목공 14일 + 설치 2일',
    },
  },
  {
    id: 'item-5',
    category: 'living-library',
    categoryLabel: '거실/서재 맞춤 수납',
    isBest: false,
    image: LIVING_LIBRARY_STUDY_IMAGE,
    locationInfo: '구축 리모델링 아파트 • 42평형 • 2025.07',
    title: '분당 정자동 파크뷰 거실 서재형 라운드 데스크 & 윈도우 데이베드',
    description: '소파 뒤 라운드 원목 서재 데스크와 창가 평상 벤치가 어우러진 가족 북카페형 거실',
    specs: ['북미산 월넛 라운드 데스크', '창가 빌트인 데이베드 벤치', '천연 라탄 & 매립 간접조명'],
    fullDetails: {
      concept: '거실 소파 후면에 곡선 라운딩 원목 데스크를 배치하고, 채광 좋은 창가에 빌트인 데이베드 벤치와 천장까지 닿는 월넛 서가장을 유기적으로 결합한 프리미엄 북카페형 거실',
      materials: ['북미산 최고급 월넛 건식 천연 무늬목', 'Super E0 친환경 합판', '천연 케인 라탄 도어', '3000K 전구색 매립 다운라이트 & 간접 라인조명'],
      hardware: ['독일 헤펠레 무소음 댐핑 힌지', '빌트인 멀티탭 & 펜 트레이 매립 홈 가공', '하부 라탄 통풍 수납 도어'],
      period: '공간 동선 실측 및 3D 모델링 4일 + 직영 공방 수제작 14일 + 현장 정밀 시공 2일',
    },
  },
  {
    id: 'item-6',
    category: 'island-dining',
    categoryLabel: '아일랜드 식탁',
    isBest: false,
    image: ISLAND_COUNTER_KITCHEN_IMAGE,
    locationInfo: '주상복합/아파트 • 34평형 • 2025.06',
    title: '용산 센트럴파크 대면형 아일랜드 & 원목 다이닝 카운터 일체형',
    description: '워터폴 마블 세라믹과 천연 원목 식탁이 결합된 대면형 오픈 키친',
    specs: ['이태리 워터폴 포세린 세라믹', '내추럴 오크 원목 바 카운터', '천장 라인조명 우드 루버 캐노피'],
    fullDetails: {
      concept: '대면형 아일랜드 조리대 측면에 바 카운터 일체형 원목 다이닝 테이블을 연결하고, 상부에 우드 천장 등박스 및 간접 라인조명을 설계한 프리미엄 주방',
      materials: ['이태리 칼라카타 스타투아리오 포세린 세라믹 상판 및 측판 워터폴 마감', '천연 건식 내추럴 오크 무늬목 도어 & 다이닝 바', '매립형 인덕션 쿡탑', '3000K 전구색 천장 빌트인 라인조명 & 상부장 하부 간접등'],
      hardware: ['Blum 최고급 레그라박스 전동 터치 푸시풀 서랍재', '독일 매립형 바흐만 전원 콘센트 & 무선 충전 모듈'],
      period: '동선 시뮬레이션 및 3D 렌더링 3일 + 직영 공방 정밀 가공 12일 + 현장 설치 2일',
    },
  },
];

export const WARRANTIES: WarrantyItem[] = [
  {
    code: 'WARRANTY 01',
    title: '평생 무상 A/S 및 정기 점검',
    description:
      '설치 후 1년, 3년 차 무상 방문 클리닉을 제공하며, 오스트리아 Blum 하드웨어 5년 무상 보증 및 평생 케어 시스템을 운영합니다.',
    tag: '정품 정밀 보증서 일련번호 발급',
    iconName: 'shield',
  },
  {
    code: 'ECO MATERIAL 02',
    title: '최고등급 Super E0 친환경',
    description:
      '포름알데히드 방출량 0.3mg/L 이하의 Super E0 보드와 식물성 천연 수성 오일만을 사용해 시공 당일에도 새가구 냄새 없이 안전합니다.',
    tag: 'KCL 유해물질 불검출 시험성적서 보유',
    iconName: 'leaf',
  },
  {
    code: 'DELIVERY 03',
    title: '전국 무료 직배송 & 책임 시공',
    description:
      '외주 용역이 아닌 본사 직영 전문 시공 마스터팀이 현장에 투입되어 바닥 보양부터 1mm 오차 없는 마감까지 완벽하게 완수합니다.',
    tag: '시공 당일 정밀 클린업 청소 서비스',
    iconName: 'truck',
  },
  {
    code: 'STUDIO 04',
    title: '20년 직영 맞춤 공방 제작',
    description:
      '2005년 설립 이래 4,200건 이상의 프리미엄 주거 프로젝트를 완수한 장인들이 원목 결 선별부터 조립까지 직접 공정을 관장합니다.',
    tag: '중간 유통 마진 거품 없는 투명 단가',
    iconName: 'wrench',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    author: '이** 고객님',
    location: '서초 반포 자이 48평 • ㄷ자형 대면형 주방 & 냉장고장',
    date: '2025.10.28',
    stars: 5,
    quote:
      '“20년 전통이라는 말에 믿고 맡겼는데 정말 감동입니다. 수납공간이 부족해서 항상 어수선했던 주방이 호텔 라운지처럼 변했어요. 무엇보다 아이와 눈 맞추며 요리할 수 있게 된 것이 가장 행복합니다. 가구 냄새도 전혀 안 나고 설치 기사님들도 너무 꼼꼼하셨어요!”',
    reply:
      '더 숨 디자인 다이렉트: 소중한 가족의 행복한 식사 시간에 함께할 수 있게 되어 두 배로 보람을 느낍니다. 1년 차 무상 정기점검 때 다시 인사드리겠습니다. 늘 평안하세요!',
  },
  {
    id: 'rev-2',
    author: '정** 고객님',
    location: '용산 푸르지오 써밋 34평 • 침실 일체형 스위트 세트',
    date: '2025.10.15',
    stars: 5,
    quote:
      '“이사하면서 침대, 화장대, 옷장 따로 살까 고민하다가 일체형으로 맞췄는데 최고의 선택이었습니다. 좁았던 안방이 훨씬 넓어 보이고 헤드보드 조명이 은은해서 매일 호텔 온 기분이에요. 틈새 마감 살려준 하나까지 완벽했습니다.”',
    reply:
      '더 숨 디자인 다이렉트: 맞춤 가구의 가장 큰 매력인 공간 일체감을 만족해 주셔서 기쁩니다. 평안한 숙면의 밤이 되시길 기원합니다.',
  },
  {
    id: 'rev-3',
    author: '최** 고객님',
    location: '송도 센트럴 52평 • 통원목 아일랜드 식탁 & 홈바',
    date: '2025.09.20',
    stars: 5,
    quote:
      '“주방의 상징이 된 아일랜드 식탁입니다. 주말마다 지인들이 놀러 와서 가구 어디서 했냐고 다들 물어보네요. 세라믹과 원목 마감이 예술입니다. 평생 A/S 보증서까지 챙겨주셔서 신뢰도 200%입니다.”',
    reply:
      '더 숨 디자인 다이렉트: 소중한 인연 감사드리며, 시간이 지날수록 품격이 더해지는 천연 가구로 오래도록 사랑받길 바랍니다.',
  },
];

export const INITIAL_INQUIRIES: EstimateInquiry[] = [
  {
    id: 'EST-2026-081',
    name: '김*은 고객님',
    phone: '010-3849-2918',
    date: '2026.09.22 14:20',
    housing: '신축 아파트 (반포 래미안 원베일리)',
    size: '48평형',
    furniture: ['ㄷ자형 대면형 싱크대', '냉장고 키친핏 빌트인장', '팬트리 수납장'],
    material: 'Super E0 최고등급 + 이태리 천연 세라믹 상판',
    timeframe: '2~3개월 이내',
    location: '서울 서초구 반포동',
    preferredTime: ['오전 (10:00 ~ 12:00)', '오후 (14:00 ~ 18:00)'],
    notes: '아일랜드 쿡탑과 바체어 공간 4인석 연결 희망',
    status: '신규접수',
  },
  {
    id: 'EST-2026-080',
    name: '박*훈 고객님',
    phone: '010-9182-3841',
    date: '2026.09.22 11:05',
    housing: '주상복합 / 타운하우스',
    size: '56평형',
    furniture: ['아일랜드 식탁 & 조리대', '침실 맞춤 가구 세트 (호텔식 침대 헤드/붙박이장)'],
    material: 'Super E0 친환경 오크 원목 & Blum 정품 하드웨어',
    timeframe: '1개월 이내 (이사 일정 촉박)',
    location: '경기 성남시 분당구 판교동',
    preferredTime: ['저녁 (18:00 ~ 20:00)'],
    notes: '화이트오크 통원목 식탁 3,000mm 이상 대형 제작 요청',
    status: '3D도면설계',
  },
  {
    id: 'EST-2026-079',
    name: '이*민 고객님',
    phone: '010-5542-9912',
    date: '2026.09.21 17:40',
    housing: '단독주택 / 빌라',
    size: '65평형',
    furniture: ['ㄷ자형 대면형 싱크대', '서재 월플렉스 전면 책장'],
    material: 'Super E0 무황변 우레탄 도장 + 스페인 세라믹',
    timeframe: '3~6개월 이내',
    location: '서울 용산구 한남동',
    notes: '지하 서재 공간 층고 3.2m 맞춤 사다리 포함 월플렉스',
    status: '쇼룸방문예정',
  },
  {
    id: 'EST-2026-078',
    name: '최*서 고객님',
    phone: '010-7731-5021',
    date: '2026.09.20 15:15',
    housing: '구축 전체 리모델링 아파트',
    size: '42평형',
    furniture: ['ㄷ자형 대면형 싱크대', '주방 아일랜드', '현관 벤치 수납장'],
    material: 'Super E0 친환경 자재 100%',
    timeframe: '2개월 이내',
    location: '인천 연수구 송도동',
    notes: '배관 이설과 함께 대면형 아일랜드 싱크볼 이전 시공',
    status: '계약완료',
  },
  {
    id: 'EST-2026-077',
    name: '윤*영 고객님',
    phone: '010-4491-1209',
    date: '2026.09.19 10:30',
    housing: '신축 아파트',
    size: '34평형',
    furniture: ['냉장고장 & 팬트리', '침실 맞춤 가구 세트'],
    material: 'Super E0 샌드베이지 PET + 독일 헤펠레 하드웨어',
    timeframe: '1개월 이내',
    location: '서울 강동구 고덕동',
    notes: 'LG 오브제 3도어 키친핏 완벽 밀착 및 포켓 홈카페 도어',
    status: '상담완료',
  },
];

export const INITIAL_BOOKINGS: ShowroomBooking[] = [
  {
    id: 'RSV-2026-042',
    name: '김*은 고객님',
    phone: '010-3849-2918',
    date: '2026-09-24',
    time: '14:00',
    consultType: 'ㄷ자 대면형 싱크대 & 세라믹 상판 실물 상담',
    guests: 2,
    notes: '배우자분과 동반 방문, 반포 신축 도면 지참',
    status: '예약확정',
    createdAt: '2026.09.22 14:25',
  },
  {
    id: 'RSV-2026-041',
    name: '정*우 고객님',
    phone: '010-8201-9482',
    date: '2026-09-25',
    time: '11:00',
    consultType: '침실 스위트 & 프리미엄 조명 헤드보드 체험',
    guests: 2,
    notes: '주상복합 안방 치수 측정 데이터 지참 예정',
    status: '예약확정',
    createdAt: '2026.09.22 09:15',
  },
  {
    id: 'RSV-2026-040',
    name: '이*민 고객님',
    phone: '010-5542-9912',
    date: '2026-09-26',
    time: '16:00',
    consultType: '서재 월플렉스 & 단독주택 층고 3.2m 맞춤 설계',
    guests: 1,
    notes: '원목 오크 샘플과 월넛 샘플 비교 상담 희망',
    status: '예약대기',
    createdAt: '2026.09.21 17:45',
  },
  {
    id: 'RSV-2026-039',
    name: '한*진 고객님',
    phone: '010-3942-8819',
    date: '2026-09-21',
    time: '15:00',
    consultType: '아일랜드 식탁 & 홈바 와인랙 커스텀 상담',
    guests: 3,
    notes: '쇼룸 1~3층 전체 둘러본 후 3D 공간 배치 완료',
    status: '방문완료',
    createdAt: '2026.09.18 13:20',
  },
];

export const INITIAL_NOTICES: SiteNotice[] = [
  {
    id: 'NOT-01',
    title: '2026년 가을 시즌 프리미엄 직영 공방 주문 제작 일정 안내',
    category: '시공일정',
    date: '2026.09.20',
    content: '10월~11월 이사 성수기 맞춤 가구 제작 의뢰는 공방 품질 유지를 위해 주당 한정 8가구 선착순 접수로 운영됩니다. 3D 도면 확정 후 2~3주 제작 기간이 소요됩니다.',
    isImportant: true,
  },
  {
    id: 'NOT-02',
    title: '논현 쇼룸 3F 2026 신규 이태리 천연 세라믹 라미남 12T 컬렉션 런칭',
    category: '쇼룸안내',
    date: '2026.09.15',
    content: '스크래치와 열에 완벽히 안전한 이태리 명품 세라믹 12종 실물 상판과 원목 프레임 매칭 샘플이 논현 하우스 3층에 새롭게 입고되었습니다.',
    isImportant: false,
  },
  {
    id: 'NOT-03',
    title: 'Super E0 친환경 인증 및 전 자재 KCL 유해물질 불검출 성적서 갱신',
    category: '공지',
    date: '2026.09.01',
    content: '한국건설생활환경시험연구원(KCL)을 통한 2026년 3분기 친환경 자재 유해물질 안전성 시험에서 포름알데히드 불검출 기준을 전수 통과하였습니다.',
    isImportant: false,
  },
];

export const INITIAL_SITE_CONFIG: SiteConfig = {
  siteTitle: '더 숨 디자인 - 20년 전통 맞춤 가구 & 공간 디자인 스튜디오',
  metaDescription: '20년 전통 직영 공방의 장인정신과 1:1 맞춤 라이프스타일 설계. ㄷ자형 대면형 싱크대, 아일랜드 식탁, 침실 맞춤 가구 세트, Super E0 100% 친환경 보증.',
  keywords: '맞춤가구, 대면형싱크대, ㄷ자싱크대, 아일랜드식탁, 붙박이장, 냉장고장, 더숨디자인, SuperE0, 주문제작가구, 논현쇼룸',
  representative: '엄태준',
  phone: '02-543-1999',
  email: 'thesum1999@naver.com',
  address: '서울특별시 강남구 논현로 142길 18 더 숨 디자인 하우스 1-3F',
  businessNumber: '377-47-00415',
  onlineOrderNumber: '제2023-서울강남-1999호',
  factoryStatus: '100% 직영 공방 정상 가동 중 (평균 가동률 94.8%)',
};

export const INITIAL_PHILOSOPHY: PhilosophyContent = {
  eyebrowTag: 'PHILOSOPHY & CRAFTSMANSHIP',
  mainHeadline: '집은 단순한 공간이 아니라,\n삶이 펼쳐지는 가장 소중한 이야기의 배경입니다.',
  subtitle:
    '기성 가구의 획일적인 치수에 사람의 일상을 억지로 맞추지 않습니다.\n2005년부터 20년간 오직 한 가족만을 위한 특별한 맞춤 공간을 빚어온 \'더 숨 디자인\'은 고객의 사소한 생활 습관 하나까지 가구의 디테일로 완성합니다.',
  image: SUNKEN_LIVING_IMAGE,
  imageBadgeTitle: 'The Sum Master Studio',
  imageBadgeSubtitle: '100% 직영 공방 장인 제작 • 자체 시공 시스템',
  imageBadgeYear: '20 Years Since 2005',
  storyTitle: '“가구에 가족의 ‘숨(Breath)’을 불어넣다”',
  paragraph1:
    '매일 아침 눈을 떠 가장 먼저 마주하는 아일랜드 식탁의 따뜻한 감촉, 퇴근 후 지친 몸을 뉘이는 침실의 아늑한 불빛, 아이와 눈을 맞추며 국을 끓이는 ㄷ자형 대면형 싱크대. 우리가 머무는 공간은 단순한 벽과 수납장이 아닌 가족의 삶이 차곡차곡 쌓여가는 온기입니다.',
  paragraph2:
    '더 숨 디자인은 20년 동안 \'보이지 않는 곳까지 정직하게\'라는 철학을 지켜왔습니다. 겉으로 드러나는 예쁜 도장뿐만 아니라, 문을 여닫을 때의 부드러움(Blum 정품 댐퍼), 아이와 반려동물의 호흡기를 지키는 Super E0 최고등급 친환경 자재, 그리고 10년 뒤에도 삐걱거리지 않는 결구 구조를 고집합니다.',
  features: [
    {
      id: 'feat-1',
      title: '1:1 라이프스타일 인터뷰',
      description: '동선, 가족 수납품 규격, 취향까지 100% 맞춤 설계',
      iconName: 'compass',
    },
    {
      id: 'feat-2',
      title: '평생 무상 A/S 보증',
      description: '정기 점검 및 하드웨어 평생 무상 품질 보증서 발급',
      iconName: 'shield',
    },
    {
      id: 'feat-3',
      title: 'Super E0 친환경 100%',
      description: '새집증후군 냄새 없는 최고등급 보드 & 천연 오일',
      iconName: 'sparkles',
    },
    {
      id: 'feat-4',
      title: '1mm 초정밀 빌트인 시공',
      description: '냉장고 키친핏, 서재 월플렉스 완벽 무몰딩 밀착',
      iconName: 'ruler',
    },
  ],
  ctaButtonText: '당신의 가족 이야기를 담은 가구 상담 시작하기',
};

