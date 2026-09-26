import { SHOWROOM_BUILDING_IMAGE } from '../assets/images/showroom_building_base64';

export function generateSingleHtmlCode(): string {
  return `<!doctype html>
<html lang="ko" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>더 숨 디자인 - 맞춤 가구 & 공간 디자인</title>
    <meta name="description" content="20년 전통 맞춤 가구 및 공간 디자인 브랜드 더 숨 디자인 공식 웹사이트 및 오카브 비즈(OcavBiz) CMS & 5단계 맞춤 견적 시스템" />
    <meta property="og:title" content="더 숨 디자인 - 맞춤 가구 & 공간 디자인" />
    <meta property="og:description" content="20년 전통 맞춤 가구 및 공간 디자인 브랜드 더 숨 디자인 공식 웹사이트 및 오카브 비즈(OcavBiz) CMS & 5단계 맞춤 견적 시스템" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />

    <!-- Google Fonts & Pretendard -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;600;700&family=Pretendard:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              serif: ['"Noto Serif KR"', 'serif'],
              sans: ['Pretendard', 'sans-serif'],
            },
            colors: {
              gold: {
                50: '#FAF6EE',
                100: '#F4ECE0',
                200: '#E5D2BA',
                500: '#B89B72',
                600: '#A3865D',
                700: '#8C6D45',
              },
            }
          }
        }
      }
    </script>
    <style>
      body { font-family: 'Pretendard', sans-serif; }
      h1, h2, h3, .font-serif-kr { font-family: 'Noto Serif KR', serif; }
    </style>
  </head>
  <body class="bg-[#FBF9F5] text-[#242220] font-sans antialiased selection:bg-[#B89B72] selection:text-white">

    <!-- Top Black Info Bar -->
    <div class="bg-[#1A1817] text-[#D8D4CE] text-xs py-2 px-6 sm:px-10 lg:px-16 2xl:px-20 border-b border-[#2C2926]">
      <div class="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
        <div class="flex items-center space-x-3 text-[11px] sm:text-xs text-[#BBB5AD]">
          <span class="inline-flex items-center gap-1.5 font-medium text-white">
            <span class="w-1.5 h-1.5 rounded-full bg-[#B89B72]"></span> 20년 전통 직영 공장
          </span>
          <span class="text-[#4E4A45]">•</span>
          <span>평생 무상 A/S</span>
          <span class="text-[#4E4A45]">•</span>
          <span>친환경 Super E0 자재 100%</span>
        </div>
        <a href="#showroom" class="flex items-center gap-1.5 text-xs text-[#E5D2BA] hover:text-white transition-colors">
          <span class="underline underline-offset-2">논현 쇼룸 1:1 방문 예약</span>
          <span class="text-[10px] text-[#A68F74] ml-0.5">📞 02-543-1999</span>
        </a>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E4DC] shadow-xs">
      <div class="w-full px-6 sm:px-10 lg:px-16 2xl:px-20 py-4 flex items-center justify-between">
        <a href="#" class="flex items-center gap-3">
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="font-serif-kr text-xl sm:text-2xl font-bold tracking-tight text-[#1E1B18]">더 숨 디자인</span>
              <span class="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#F4EFE6] text-[#7A6345] font-semibold border border-[#E3DACB]">EST. 2005</span>
            </div>
            <span class="text-[9px] sm:text-[10px] tracking-[0.22em] text-[#7E7870] uppercase font-sans font-medium">THE SUM DESIGN • BESPOKE FURNITURE</span>
          </div>
        </a>

        <nav class="hidden md:flex items-center space-x-8 text-[14px] font-medium text-[#46403A]">
          <a href="#brand-story" class="hover:text-[#B89B72] transition-colors py-1">브랜드 스토리</a>
          <a href="#portfolio" class="hover:text-[#B89B72] transition-colors py-1">시공 갤러리</a>
          <a href="#craftsmanship" class="hover:text-[#B89B72] transition-colors py-1">장인정신 & 보증</a>
          <a href="#reviews" class="hover:text-[#B89B72] transition-colors py-1">고객 스토리</a>
          <a href="#showroom" class="hover:text-[#B89B72] transition-colors py-1">쇼룸 안내</a>
        </nav>

        <div class="flex items-center gap-3">
          <button onclick="openModal('estimateModal')" class="bg-[#B89B72] hover:bg-[#A3865D] text-white text-[13.5px] font-medium px-5 py-2.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer">
            <span>5단계 맞춤 견적 문의</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Copywriting Switcher Banner -->
    <div class="bg-[#24211D] border-b border-[#3D3833] py-3 px-6 sm:px-10 lg:px-16 2xl:px-20">
      <div class="w-full flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded bg-[#332E27] text-[#D8B98C] font-semibold text-xs border border-[#4D453A]">[브랜드 다이렉트 추천]</span>
          <span class="text-[#C4BCB3] font-medium text-xs sm:text-sm">메인 첫 화면 카피라이팅 3가지 버전 실시간 전환</span>
        </div>
        <div class="flex items-center gap-2 flex-wrap justify-center">
          <button onclick="setVariant(0)" id="varBtn0" class="px-3.5 py-1.5 rounded-lg text-xs bg-[#B89B72] text-[#1E1B18] font-bold">버전 1: 감성 스토리텔링 <span class="text-[9px] bg-[#1E1B18] text-[#F0E5D5] px-1 py-0.2 rounded font-sans">ACTIVE</span></button>
          <button onclick="setVariant(1)" id="varBtn1" class="px-3.5 py-1.5 rounded-lg text-xs bg-[#1C1A18] text-[#A69E94] border border-[#3A352F]">버전 2: 20년 장인정신</button>
          <button onclick="setVariant(2)" id="varBtn2" class="px-3.5 py-1.5 rounded-lg text-xs bg-[#1C1A18] text-[#A69E94] border border-[#3A352F]">버전 3: 모던 라이프스타일</button>
        </div>
        <span class="text-xs text-[#8E867C] hidden xl:inline">실제 구매자의 3가지 카피라이팅 분위기를 즉시 비교해 보세요</span>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="relative min-h-[680px] lg:min-h-[760px] flex items-center justify-center overflow-hidden bg-[#1A1816] text-white">
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop');">
        <div class="absolute inset-0 bg-gradient-to-r from-[#141210]/95 via-[#141210]/80 to-[#141210]/60"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-[#141210]/50"></div>
      </div>

      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 2xl:px-20 py-16 sm:py-24">
        <div class="max-w-6xl">
          <div id="heroTag" class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[#E6C9A2] text-xs font-semibold tracking-wider uppercase mb-6">
            • STORYTELLING & HERITAGE
          </div>
          <h1 id="heroTitle" class="font-serif-kr text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[54px] font-bold leading-[1.32] tracking-tight text-white mb-6 break-keep">
            집은 단순한 공간이 아니라,<br>삶이 펼쳐지는 가장 따뜻한 배경입니다.
          </h1>
          <p id="heroSub" class="text-[#D3CBC1] text-base sm:text-lg lg:text-[18px] leading-relaxed mb-10 max-w-3xl font-light break-keep">
            20년 동안 4,200여 가정의 식탁과 침실에 고유한 일상의 온기를 새겨왔습니다.<br>
            아침 햇살을 마주하는 아일랜드 식탁, 가족의 하루가 정리되는 맞춤 침실 세트까지.<br>
            더 숨 디자인은 규격화된 가구가 아닌, 당신 가족의 삶의 호흡(숨)에 꼭 맞춘 특별한 가구를 빚어냅니다.
          </p>
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
            <button onclick="openModal('estimateModal')" class="bg-[#B89B72] hover:bg-[#A3865D] text-white text-base sm:text-lg font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer">
              <span id="heroCta">5단계 디테일 맞춤 견적 신청하기</span> →
            </button>
            <a href="#portfolio" class="bg-white/10 hover:bg-white/20 text-[#EBE5DC] hover:text-white border border-white/25 text-base sm:text-lg font-medium px-8 py-4 rounded-xl flex items-center justify-center transition-all cursor-pointer">
              주택 시공 사례 갤러리
            </a>
          </div>
        </div>

        <!-- 3 Metric Badges -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 pt-8 border-t border-white/15">
          <div class="bg-[#1F1C19]/85 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-[#3D372F]">
            <div class="text-xs sm:text-[13px] text-[#C7A97E] font-semibold mb-2">★ 20년 직영 공장</div>
            <h4 class="text-base sm:text-lg font-semibold text-white mb-2">4,200+ 가구의 이야기 축적</h4>
            <p class="text-xs sm:text-sm text-[#A8A095] leading-relaxed">외주 하청 없는 100% 자체 제작 시스템으로 1mm의 미세 공간까지 완벽하게 밀착 시공합니다.</p>
          </div>
          <div class="bg-[#1F1C19]/85 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-[#3D372F]">
            <div class="text-xs sm:text-[13px] text-[#6BCB77] font-semibold mb-2">✔ SUPER E0 친환경 100%</div>
            <h4 class="text-base sm:text-lg font-semibold text-white mb-2">아이와 반려동물의 안전한 자재</h4>
            <p class="text-xs sm:text-sm text-[#A8A095] leading-relaxed">포름알데히드 방출량 0.3mg/L 이하의 최고등급 보드와 천연 오일만을 사용하여 냄새와 유해물질이 없습니다.</p>
          </div>
          <div class="bg-[#1F1C19]/85 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-[#3D372F]">
            <div class="text-xs sm:text-[13px] text-[#E5B57A] font-semibold mb-2">♥ 평생 무상 케어</div>
            <h4 class="text-base sm:text-lg font-semibold text-white mb-2">평생 무상 A/S & 정기 점검</h4>
            <p class="text-xs sm:text-sm text-[#A8A095] leading-relaxed">시공 후 1년, 3년 차 무상 방문 점검 서비스와 힌지·레일 등 핵심 구동 하드웨어 평생 보증을 약속합니다.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy & Craftsmanship Section -->
    <section id="brand-story" class="py-24 sm:py-32 bg-[#FBF9F5] border-b border-[#ECE7DE]">
      <div class="w-full px-6 sm:px-10 lg:px-16 2xl:px-20">
        <div class="text-center max-w-5xl mx-auto mb-16 sm:mb-20">
          <span class="text-xs uppercase tracking-[0.25em] text-[#8C6D45] font-semibold block mb-3 font-sans">PHILOSOPHY & CRAFTSMANSHIP</span>
          <h2 class="font-serif-kr text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] xl:text-[40px] font-bold text-[#1E1B18] leading-[1.4] sm:leading-[1.42] mb-5 break-keep">
            집은 단순한 공간이 아니라,<br>삶이 펼쳐지는 가장 소중한 이야기의 배경입니다.
          </h2>
          <p class="text-base sm:text-lg text-[#686158] leading-relaxed font-light max-w-3xl mx-auto break-keep">
            기성 가구의 획일적인 치수에 사람의 일상을 억지로 맞추지 않습니다.<br>
            2005년부터 20년간 오직 한 가족만을 위한 특별한 맞춤 공간을 빚어온 '더 숨 디자인'은 고객의 사소한 생활 습관 하나까지 가구의 디테일로 완성합니다.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-6 relative">
            <div class="relative rounded-lg overflow-hidden shadow-lg border border-[#E5DFD4] bg-[#EEE8DE]">
              <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop" alt="서초 래미안 대형 대면형 싱크대" class="w-full h-[380px] sm:h-[460px] object-cover" />
              <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1A1816]/95 via-[#1A1816]/80 to-transparent p-5 text-white flex items-end justify-between">
                <div>
                  <h4 class="text-sm font-semibold text-[#EBD9C1]">The Sum Master Studio</h4>
                  <p class="text-xs text-[#BDB5A9] font-light mt-0.5">100% 직영 공방 장인 제작 • 자체 시공 시스템</p>
                </div>
                <div class="bg-[#B89B72]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded">20 Years Since 2005</div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 flex flex-col justify-center">
            <h3 class="font-serif-kr text-xl sm:text-2xl font-bold text-[#1E1B18] mb-4">"가구에 가족의 '숨(Breath)'을 불어넣다"</h3>
            <div class="space-y-3.5 text-xs sm:text-sm text-[#5C554D] leading-relaxed mb-8 font-light">
              <p>매일 아침 눈을 떠 가장 먼저 마주하는 아일랜드 식탁의 따뜻한 감촉, 퇴근 후 지친 몸을 뉘이는 침실의 아늑한 불빛, 아이와 눈을 맞추며 국을 끓이는 ㄷ자형 대면형 싱크대. 우리가 머무는 공간은 단순한 벽과 수납장이 아닌 가족의 삶이 차곡차곡 쌓여가는 온기입니다.</p>
              <p>더 숨 디자인은 20년 동안 '보이지 않는 곳까지 정직하게'라는 철학을 지켜왔습니다. 겉으로 드러나는 예쁜 도장뿐만 아니라, 문을 여닫을 때의 부드러움(Blum 정품 댐퍼), 아이와 반려동물의 호흡기를 지키는 Super E0 최고등급 친환경 자재, 그리고 10년 뒤에도 삐걱거리지 않는 결구 구조를 고집합니다.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div class="bg-white p-3.5 rounded border border-[#E8E2D7]">
                <h4 class="text-[13px] font-semibold text-[#242220]">1:1 라이프스타일 인터뷰</h4>
                <p class="text-[11.5px] text-[#7C746B] mt-0.5">오직 동선, 수납 물품 자수, 기능이 맞춤 설계</p>
              </div>
              <div class="bg-white p-3.5 rounded border border-[#E8E2D7]">
                <h4 class="text-[13px] font-semibold text-[#242220]">평생 무상 A/S 보증</h4>
                <p class="text-[11.5px] text-[#7C746B] mt-0.5">정기 점검 및 하드웨어 5년 무상 보증서 발급</p>
              </div>
              <div class="bg-white p-3.5 rounded border border-[#E8E2D7]">
                <h4 class="text-[13px] font-semibold text-[#242220]">Super E0 친환경 100%</h4>
                <p class="text-[11.5px] text-[#7C746B] mt-0.5">가구 냄새 없는 안전한 천연 수성 마감재</p>
              </div>
              <div class="bg-white p-3.5 rounded border border-[#E8E2D7]">
                <h4 class="text-[13px] font-semibold text-[#242220]">1mm 초정밀 빌트인 시공</h4>
                <p class="text-[11.5px] text-[#7C746B] mt-0.5">냉장고 키친핏, 서재 월플렉스 완벽 밀착</p>
              </div>
            </div>

            <button onclick="openModal('estimateModal')" class="w-full sm:w-auto bg-[#1E1B18] hover:bg-[#332E29] text-white text-[13px] sm:text-sm font-medium px-6 py-3 rounded-sm flex items-center justify-center gap-2 cursor-pointer">
              <span>당신의 가족 이야기를 담은 가구 상담 시작하기</span> →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Curated Portfolio Section -->
    <section id="portfolio" class="py-24 sm:py-32 bg-[#F5F2EB] border-b border-[#ECE7DE]">
      <div class="w-full px-6 sm:px-10 lg:px-16 2xl:px-20">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span class="text-xs uppercase tracking-[0.25em] text-[#8C6D45] font-semibold block mb-2.5 font-sans">CURATED PORTFOLIO</span>
            <h2 class="font-serif-kr text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1B18]">더 숨 디자인 주력 시공 갤러리</h2>
            <p class="text-sm sm:text-base text-[#736B62] mt-2.5 font-light">실제 4,200여 가정의 삶의 동선과 취향을 담아낸 1:1 맞춤 공간 아카이브입니다.</p>
          </div>
          <div class="text-xs font-medium text-[#7C6E5C] bg-[#ECE5D8] px-4 py-2 rounded-full">
            ● 총 6개 현장 아카이브 전시 중
          </div>
        </div>

        <!-- 6 Portfolio Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          <!-- Card 1 -->
          <div class="bg-white rounded-lg overflow-hidden border border-[#E5DFD4] shadow-xs flex flex-col">
            <div class="relative aspect-[16/11] overflow-hidden bg-[#E2DBD0]">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" alt="서초 래미안 48평 ㄷ자형 대면형 오픈 키친" class="w-full h-full object-cover" />
              <div class="absolute top-3 inset-x-3 flex items-center justify-between">
                <span class="text-[11px] bg-[#1A1816]/85 text-white px-2.5 py-1 rounded">ㄷ자형 대면형 싱크대</span>
                <span class="text-[10px] font-bold bg-[#B89B72] text-[#1E1B18] px-2 py-0.5 rounded">BEST CASE</span>
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div class="text-[11px] text-[#8F877D] mb-1.5">신축 아파트 • 48평형 • 2025.11</div>
                <h3 class="font-serif-kr text-base font-bold text-[#1E1B18] mb-2">서초 래미안 48평 ㄷ자형 대면형 오픈 키친</h3>
                <p class="text-xs text-[#6B645B] leading-relaxed mb-4">가족과의 눈맞춤이 시작되는 3.6m 와이드 대면형 싱크 & 홈바</p>
              </div>
              <div>
                <div class="flex flex-wrap gap-1.5 mb-4">
                  <span class="text-[10.5px] bg-[#F7F4EE] text-[#696156] border border-[#EAE3D6] px-2 py-0.8 rounded">이태리 천연 세라믹 상판</span>
                  <span class="text-[10.5px] bg-[#F7F4EE] text-[#696156] border border-[#EAE3D6] px-2 py-0.8 rounded">친환경 Super E0 샌드베이지 도어</span>
                  <span class="text-[10.5px] bg-[#F7F4EE] text-[#696156] border border-[#EAE3D6] px-2 py-0.8 rounded">Blum 캐그네틱스 서랍재</span>
                </div>
                <button onclick="openModal('estimateModal')" class="pt-3 border-t border-[#F0EBE0] w-full flex items-center justify-between text-xs text-[#8C6D45] font-semibold cursor-pointer">
                  <span>자세히 보기</span> <span>↗</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="bg-white rounded-lg overflow-hidden border border-[#E5DFD4] shadow-xs flex flex-col">
            <div class="relative aspect-[16/11] overflow-hidden bg-[#E2DBD0]">
              <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop" alt="판교 운중동 단독주택 통원목 아일랜드 식탁" class="w-full h-full object-cover" />
              <div class="absolute top-3 inset-x-3 flex items-center justify-between">
                <span class="text-[11px] bg-[#1A1816]/85 text-white px-2.5 py-1 rounded">아일랜드 식탁 & 조리대</span>
                <span class="text-[10px] font-bold bg-[#B89B72] text-[#1E1B18] px-2 py-0.5 rounded">BEST CASE</span>
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div class="text-[11px] text-[#8F877D] mb-1.5">단독/전원주택 • 65평형 • 2025.10</div>
                <h3 class="font-serif-kr text-base font-bold text-[#1E1B18] mb-2">판교 운중동 단독주택 통원목 아일랜드 식탁 & 조리대</h3>
                <p class="text-xs text-[#6B645B] leading-relaxed mb-4">천연 오크 원목과 콘크리트 텍스처가 빚어낸 다이닝의 중심</p>
              </div>
              <div>
                <div class="flex flex-wrap gap-1.5 mb-4">
                  <span class="text-[10.5px] bg-[#F7F4EE] text-[#696156] border border-[#EAE3D6] px-2 py-0.8 rounded">북미산 화이트오크 솔리드 원목</span>
                  <span class="text-[10.5px] bg-[#F7F4EE] text-[#696156] border border-[#EAE3D6] px-2 py-0.8 rounded">스페인 네오리스 세라믹</span>
                </div>
                <button onclick="openModal('estimateModal')" class="pt-3 border-t border-[#F0EBE0] w-full flex items-center justify-between text-xs text-[#8C6D45] font-semibold cursor-pointer">
                  <span>자세히 보기</span> <span>↗</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="bg-white rounded-lg overflow-hidden border border-[#E5DFD4] shadow-xs flex flex-col">
            <div class="relative aspect-[16/11] overflow-hidden bg-[#E2DBD0]">
              <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop" alt="송도 자이 더스타 비스포크 핏 냉장고장" class="w-full h-full object-cover" />
              <div class="absolute top-3 inset-x-3 flex items-center justify-between">
                <span class="text-[11px] bg-[#1A1816]/85 text-white px-2.5 py-1 rounded">냉장고장 & 팬트리</span>
                <span class="text-[10px] font-bold bg-[#B89B72] text-[#1E1B18] px-2 py-0.5 rounded">BEST CASE</span>
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div class="text-[11px] text-[#8F877D] mb-1.5">신축 아파트 • 39평형 • 2025.09</div>
                <h3 class="font-serif-kr text-base font-bold text-[#1E1B18] mb-2">송도 자이 더스타 비스포크 핏 냉장고장 & 홈카페 팬트리</h3>
                <p class="text-xs text-[#6B645B] leading-relaxed mb-4">틈새 1mm의 오차 없는 키친핏 라인과 회전형 포켓 도어 홈바</p>
              </div>
              <div>
                <div class="flex flex-wrap gap-1.5 mb-4">
                  <span class="text-[10.5px] bg-[#F7F4EE] text-[#696156] border border-[#EAE3D6] px-2 py-0.8 rounded">LG 베니스 매트 크림 도장</span>
                  <span class="text-[10.5px] bg-[#F7F4EE] text-[#696156] border border-[#EAE3D6] px-2 py-0.8 rounded">오스트리아 블룸 포켓도어</span>
                </div>
                <button onclick="openModal('estimateModal')" class="pt-3 border-t border-[#F0EBE0] w-full flex items-center justify-between text-xs text-[#8C6D45] font-semibold cursor-pointer">
                  <span>자세히 보기</span> <span>↗</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="bg-white rounded-lg overflow-hidden border border-[#E5DFD4] shadow-xs flex flex-col">
            <div class="relative aspect-[16/11] overflow-hidden bg-[#E2DBD0]">
              <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop" alt="한남 더힐 침실 마스터 스위트" class="w-full h-full object-cover" />
              <div class="absolute top-3 inset-x-3 flex items-center justify-between">
                <span class="text-[11px] bg-[#1A1816]/85 text-white px-2.5 py-1 rounded">침실 맞춤 가구 세트</span>
                <span class="text-[10px] font-bold bg-[#B89B72] text-[#1E1B18] px-2 py-0.5 rounded">BEST CASE</span>
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div class="text-[11px] text-[#8F877D] mb-1.5">주상복합/아파트 • 54평형 • 2025.08</div>
                <h3 class="font-serif-kr text-base font-bold text-[#1E1B18] mb-2">한남 더힐 침실 마스터 스위트 (붙박이장·헤드보드·화장대 일체형)</h3>
                <p class="text-xs text-[#6B645B] leading-relaxed mb-4">호텔 스위트룸의 휴식을 우리 집 안방으로 그대로 옮겨온 맞춤 가구 세트</p>
              </div>
              <div>
                <div class="flex flex-wrap gap-1.5 mb-4">
                  <span class="text-[10.5px] bg-[#F7F4EE] text-[#696156] border border-[#EAE3D6] px-2 py-0.8 rounded">천연 월넛 무늬목</span>
                  <span class="text-[10.5px] bg-[#F7F4EE] text-[#696156] border border-[#EAE3D6] px-2 py-0.8 rounded">독일 헤펠레 푸시풀 레일</span>
                </div>
                <button onclick="openModal('estimateModal')" class="pt-3 border-t border-[#F0EBE0] w-full flex items-center justify-between text-xs text-[#8C6D45] font-semibold cursor-pointer">
                  <span>자세히 보기</span> <span>↗</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="bg-white rounded-lg overflow-hidden border border-[#E5DFD4] shadow-xs flex flex-col">
            <div class="relative aspect-[16/11] overflow-hidden bg-[#E2DBD0]">
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop" alt="분당 정자동 파크뷰 거실 서재형 월플렉스" class="w-full h-full object-cover" />
              <div class="absolute top-3 inset-x-3 flex items-center justify-between">
                <span class="text-[11px] bg-[#1A1816]/85 text-white px-2.5 py-1 rounded">거실/서재 맞춤 수납</span>
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div class="text-[11px] text-[#8F877D] mb-1.5">구축 리모델링 아파트 • 42평형 • 2025.07</div>
                <h3 class="font-serif-kr text-base font-bold text-[#1E1B18] mb-2">분당 정자동 파크뷰 거실 서재형 월플렉스 & 슬라이딩 도어</h3>
                <p class="text-xs text-[#6B645B] leading-relaxed mb-4">TV를 가리면 아늑한 서재가 되는 가족 소통형 거실 수납 시스템</p>
              </div>
              <div>
                <div class="flex flex-wrap gap-1.5 mb-4">
                  <span class="text-[10.5px] bg-[#F7F4EE] text-[#696156] border border-[#EAE3D6] px-2 py-0.8 rounded">반영구 샌딩 도어 힌지</span>
                  <span class="text-[10.5px] bg-[#F7F4EE] text-[#696156] border border-[#EAE3D6] px-2 py-0.8 rounded">오크 무광 친환경 도장</span>
                </div>
                <button onclick="openModal('estimateModal')" class="pt-3 border-t border-[#F0EBE0] w-full flex items-center justify-between text-xs text-[#8C6D45] font-semibold cursor-pointer">
                  <span>자세히 보기</span> <span>↗</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Card 6 -->
          <div class="bg-white rounded-lg overflow-hidden border border-[#E5DFD4] shadow-xs flex flex-col">
            <div class="relative aspect-[16/11] overflow-hidden bg-[#E2DBD0]">
              <img src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop" alt="용산 센트럴파크 34평 11자형 대면 아일랜드" class="w-full h-full object-cover" />
              <div class="absolute top-3 inset-x-3 flex items-center justify-between">
                <span class="text-[11px] bg-[#1A1816]/85 text-white px-2.5 py-1 rounded">아일랜드 식탁</span>
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div class="text-[11px] text-[#8F877D] mb-1.5">주상복합/아파트 • 34평형 • 2025.06</div>
                <h3 class="font-serif-kr text-base font-bold text-[#1E1B18] mb-2">용산 센트럴파크 34평 11자형 대면 아일랜드 & 세라믹 상판</h3>
                <p class="text-xs text-[#6B645B] leading-relaxed mb-4">군더더기 없는 미니멀리즘과 실용적 수납 동선의 극대화</p>
              </div>
              <div>
                <div class="flex flex-wrap gap-1.5 mb-4">
                  <span class="text-[10.5px] bg-[#F7F4EE] text-[#696156] border border-[#EAE3D6] px-2 py-0.8 rounded">라임스톤 세라믹 상판</span>
                  <span class="text-[10.5px] bg-[#F7F4EE] text-[#696156] border border-[#EAE3D6] px-2 py-0.8 rounded">매트 웜화이트 PET 도어</span>
                </div>
                <button onclick="openModal('estimateModal')" class="pt-3 border-t border-[#F0EBE0] w-full flex items-center justify-between text-xs text-[#8C6D45] font-semibold cursor-pointer">
                  <span>자세히 보기</span> <span>↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4 Lifetime Promises Section -->
    <section id="craftsmanship" class="py-24 sm:py-32 bg-[#181614] text-white border-b border-[#2C2926]">
      <div class="w-full px-6 sm:px-10 lg:px-16 2xl:px-20">
        <div class="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <span class="text-center text-xs uppercase tracking-[0.25em] text-[#C7A97E] font-semibold block mb-4 font-sans">SUM LIFETIME ASSURANCE</span>
          <h2 class="text-center font-serif-kr text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-bold leading-[1.48] sm:leading-[1.52] mb-6 text-[#F7F3EC] break-keep">
            가구를 넘어 일상의 풍경을 지키는<br>더 숨 디자인 4대 절대 신뢰 약속
          </h2>
          <p class="text-center text-sm sm:text-base text-[#A8A196] leading-relaxed font-light max-w-3xl mx-auto break-keep">
            20년간 현장에서 증명해 온 직영 공방의 자부심으로 타협 없는 품질과 서비스를 약속드립니다.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div class="bg-[#211E1B] p-7 sm:p-8 rounded-2xl border border-[#35302A]">
            <span class="text-xs tracking-widest uppercase font-semibold text-[#8C8478]">WARRANTY 01</span>
            <h3 class="font-serif-kr text-lg font-bold text-[#F4EFE6] mt-4 mb-3">평생 무상 A/S 및 정기 점검</h3>
            <p class="text-xs sm:text-sm text-[#A1988C] mb-8 font-light leading-relaxed">설치 후 1년, 3년 차 무상 방문 클리닉을 제공하며, 오스트리아 Blum 하드웨어 5년 무상 보증 및 평생 케어 시스템을 운영합니다.</p>
            <div class="pt-5 border-t border-[#302B25] text-xs text-[#C7A97E]">• 정품 정밀 보증서 일련번호 발급</div>
          </div>

          <div class="bg-[#211E1B] p-7 sm:p-8 rounded-2xl border border-[#35302A]">
            <span class="text-xs tracking-widest uppercase font-semibold text-[#8C8478]">ECO MATERIAL 02</span>
            <h3 class="font-serif-kr text-lg font-bold text-[#F4EFE6] mt-4 mb-3">최고등급 Super E0 친환경</h3>
            <p class="text-xs sm:text-sm text-[#A1988C] mb-8 font-light leading-relaxed">포름알데히드 방출량 0.3mg/L 이하의 Super E0 보드와 식물성 천연 수성 오일만을 사용해 시공 당일에도 새가구 냄새 없이 안전합니다.</p>
            <div class="pt-5 border-t border-[#302B25] text-xs text-[#C7A97E]">• KCL 유해물질 불검출 시험성적서 보유</div>
          </div>

          <div class="bg-[#211E1B] p-7 sm:p-8 rounded-2xl border border-[#35302A]">
            <span class="text-xs tracking-widest uppercase font-semibold text-[#8C8478]">DELIVERY 03</span>
            <h3 class="font-serif-kr text-lg font-bold text-[#F4EFE6] mt-4 mb-3">전국 무료 직배송 & 책임 시공</h3>
            <p class="text-xs sm:text-sm text-[#A1988C] mb-8 font-light leading-relaxed">외주 용역이 아닌 본사 직영 전문 시공 마스터팀이 현장에 투입되어 바닥 보양부터 1mm 오차 없는 마감까지 완벽하게 완수합니다.</p>
            <div class="pt-5 border-t border-[#302B25] text-xs text-[#C7A97E]">• 시공 당일 정밀 클린업 청소 서비스</div>
          </div>

          <div class="bg-[#211E1B] p-7 sm:p-8 rounded-2xl border border-[#35302A]">
            <span class="text-xs tracking-widest uppercase font-semibold text-[#8C8478]">STUDIO 04</span>
            <h3 class="font-serif-kr text-lg font-bold text-[#F4EFE6] mt-4 mb-3">20년 직영 맞춤 공방 제작</h3>
            <p class="text-xs sm:text-sm text-[#A1988C] mb-8 font-light leading-relaxed">2005년 설립 이래 4,200건 이상의 프리미엄 주거 프로젝트를 완수한 장인들이 원목 결 선별부터 조립까지 직접 공정을 관장합니다.</p>
            <div class="pt-5 border-t border-[#302B25] text-xs text-[#C7A97E]">• 중간 유통 마진 거품 없는 투명 단가</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Showroom Information Section -->
    <section id="showroom" class="py-24 sm:py-32 bg-[#FBF9F5] border-b border-[#ECE7DE]">
      <div class="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div class="relative rounded-3xl overflow-hidden border border-[#3E3831] shadow-2xl min-h-[640px] sm:min-h-[700px] lg:min-h-[740px] xl:min-h-[780px] flex flex-col bg-[#1A1714]">
          <img src="${SHOWROOM_BUILDING_IMAGE}" alt="더 숨 디자인 논현 쇼룸 하우스 전경" class="absolute inset-0 w-full h-full object-cover object-[right_center] sm:object-[75%_center] lg:object-[82%_center]" />
          <div class="absolute inset-0 bg-gradient-to-r from-[#141210]/95 via-[#161311]/88 via-45% to-[#141210]/35 lg:to-black/20"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#12100E]/95 via-transparent to-black/30"></div>

          <div class="relative z-10 flex-1 w-full p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-between">
            <div class="max-w-4xl pt-2 sm:pt-4">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A2520]/85 border border-[#52493E] text-[#E0C59E] text-xs font-bold tracking-wider uppercase mb-7">
                • 1:1 프라이빗 사전 예약제 운영
              </div>
              <h2 class="font-serif-kr text-2xl sm:text-[28px] lg:text-[34px] xl:text-[38px] font-semibold text-[#FDFBF7] leading-[1.35] mb-5 tracking-tight break-keep drop-shadow-sm">
                실제 맞춤 가구의 질감과 하드웨어를 직접 확인하세요
              </h2>
              <p class="text-sm sm:text-base lg:text-[17px] text-[#D4CCC0] leading-relaxed mb-9 sm:mb-11 font-light max-w-2xl break-keep drop-shadow-xs">
                ㄷ자형 대면형 싱크대, 천연 세라믹 상판의 매끈한 질감, 침실 스위트의 무소음 소프트 댐핑 도어를 직접 체험할 수 있습니다. 전문 공간 디자이너가 고객님 현장에 맞춰 즉시 3D 공간 배치 상담을 제공합니다.
              </p>
              <div class="space-y-4 text-sm sm:text-base text-[#EDE6DC]">
                <div class="flex items-center gap-3"><span>📍</span> <span>더 숨 디자인 하우스</span></div>
                <div class="flex items-center gap-3"><span>🕒</span> <span>화-토 10:00 - 19:00 (사전 예약제 1:1 상담 운영, 일·월 휴무)</span></div>
                <div class="flex items-center gap-3"><span>📞</span> <span>방문 상담 예약 문의</span></div>
              </div>
            </div>

            <div class="mt-12 lg:mt-16 pt-8 border-t border-[#443C32]/80 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button onclick="openModal('estimateModal')" class="bg-[#B89B72] hover:bg-[#A3865D] text-white text-sm sm:text-base font-semibold px-8 py-4 rounded-xl cursor-pointer shadow-xl">
                  쇼룸 방문 & 3D 견적 예약하기
                </button>
                <a href="tel:02-543-1999" class="bg-[#1C1A18]/90 hover:bg-[#2A2622] text-[#E5DCD0] border border-[#52483C] text-sm sm:text-base font-medium px-7 py-4 rounded-xl text-center">
                  전화 상담 연결
                </a>
              </div>
              <div class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1F1B17]/85 border border-[#4A4135] text-xs sm:text-sm text-[#D8CFBF]">
                ✨ <span><strong>더 숨 디자인 하우스</strong> - 1:1 맞춤 공간 플래그십</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="reviews" class="py-24 sm:py-32 bg-[#FBF9F5] border-b border-[#ECE7DE]">
      <div class="w-full px-6 sm:px-10 lg:px-16 2xl:px-20">
        <div class="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <span class="text-center text-xs uppercase tracking-[0.25em] text-[#8C6D45] font-semibold block mb-3.5 font-sans">CLIENT STORIES & VOICES</span>
          <h2 class="text-center font-serif-kr text-2xl sm:text-3xl md:text-[32px] lg:text-[36px] font-bold text-[#1E1B18] tracking-tight leading-[1.4] sm:leading-[1.44] mb-4 sm:mb-5 break-keep">
            공간이 바꾼 일상, 가족들의 생생한 후기
          </h2>
          <p class="text-center text-sm sm:text-base text-[#736B62] font-light max-w-2xl mx-auto leading-relaxed break-keep">
            가구를 넘어 가족의 라이프스타일을 함께 고민한 소중한 고객님들의 실제 이야기입니다.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 mb-20">
          <div class="bg-white rounded-2xl p-7 sm:p-8 border border-[#E5DFD4] shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-[#E5A83B] tracking-widest text-base">★★★★★</span>
                <span class="text-xs text-[#A39B90]">2025.10.28</span>
              </div>
              <h4 class="text-base font-bold text-[#1E1B18]">이** 고객님</h4>
              <p class="text-xs text-[#8A8175] mb-4">서초 반포 자이 48평 • ㄷ자형 대면형 주방 & 냉장고장</p>
              <p class="text-sm sm:text-[15px] text-[#4E4841] leading-relaxed mb-6 font-light">
                “20년 전통이라는 말에 믿고 맡겼는데 정말 감동입니다. 수납공간이 부족해서 항상 어수선했던 주방이 호텔 라운지처럼 변했어요. 무엇보다 아이와 눈 맞추며 요리할 수 있게 된 것이 가장 행복합니다. 가구 냄새도 전혀 안 나고 설치 기사님들도 너무 꼼꼼하셨어요!”
              </p>
            </div>
            <div class="p-4 rounded-xl bg-[#F8F5EE] border border-[#EBE4D8] text-xs text-[#696053]">
              <div class="font-semibold text-[#8C6D45] mb-1">브랜드 디렉터 코멘트</div>
              <p class="leading-relaxed">더 숨 디자인 다이렉트: 소중한 가족의 행복한 식사 시간에 함께할 수 있게 되어 두 배로 보람을 느낍니다. 1년 차 무상 정기점검 때 다시 인사드리겠습니다.</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-7 sm:p-8 border border-[#E5DFD4] shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-[#E5A83B] tracking-widest text-base">★★★★★</span>
                <span class="text-xs text-[#A39B90]">2025.10.15</span>
              </div>
              <h4 class="text-base font-bold text-[#1E1B18]">정** 고객님</h4>
              <p class="text-xs text-[#8A8175] mb-4">용산 푸르지오 써밋 34평 • 침실 일체형 스위트 세트</p>
              <p class="text-sm sm:text-[15px] text-[#4E4841] leading-relaxed mb-6 font-light">
                “이사하면서 침대, 화장대, 옷장 따로 살까 고민하다가 일체형으로 맞췄는데 최고의 선택이었습니다. 좁았던 안방이 훨씬 넓어 보이고 헤드보드 조명이 은은해서 매일 호텔 온 기분이에요. 틈새 마감 살려준 하나까지 완벽했습니다.”
              </p>
            </div>
            <div class="p-4 rounded-xl bg-[#F8F5EE] border border-[#EBE4D8] text-xs text-[#696053]">
              <div class="font-semibold text-[#8C6D45] mb-1">브랜드 디렉터 코멘트</div>
              <p class="leading-relaxed">더 숨 디자인 다이렉트: 맞춤 가구의 가장 큰 매력인 공간 일체감을 만족해 주셔서 기쁩니다. 평안한 숙면의 밤이 되시길 기원합니다.</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-7 sm:p-8 border border-[#E5DFD4] shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-[#E5A83B] tracking-widest text-base">★★★★★</span>
                <span class="text-xs text-[#A39B90]">2025.09.20</span>
              </div>
              <h4 class="text-base font-bold text-[#1E1B18]">최** 고객님</h4>
              <p class="text-xs text-[#8A8175] mb-4">송도 센트럴 52평 • 통원목 아일랜드 식탁 & 홈바</p>
              <p class="text-sm sm:text-[15px] text-[#4E4841] leading-relaxed mb-6 font-light">
                “주방의 상징이 된 아일랜드 식탁입니다. 주말마다 지인들이 놀러 와서 가구 어디서 했냐고 다들 물어보네요. 세라믹과 원목 마감이 예술입니다. 평생 A/S 보증서까지 챙겨주셔서 신뢰도 200%입니다.”
              </p>
            </div>
            <div class="p-4 rounded-xl bg-[#F8F5EE] border border-[#EBE4D8] text-xs text-[#696053]">
              <div class="font-semibold text-[#8C6D45] mb-1">브랜드 디렉터 코멘트</div>
              <p class="leading-relaxed">더 숨 디자인 다이렉트: 소중한 인연 감사드리며, 시간이 지날수록 품격이 더해지는 천연 가구로 오래도록 사랑받길 바랍니다.</p>
            </div>
          </div>
        </div>

        <!-- Bottom CTA Bar -->
        <div class="bg-[#F0EBE1] border border-[#DDD4C5] rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 class="font-serif-kr text-xl sm:text-2xl font-bold text-[#1E1B18]">당신의 공간도 특별한 이야기로 채워보세요</h3>
            <p class="text-sm text-[#70685D] mt-1 font-light">전문 공간 디자이너의 1:1 라이프스타일 맞춤 상담은 언제나 열려있습니다.</p>
          </div>
          <button onclick="openModal('estimateModal')" class="bg-[#1E1B18] hover:bg-[#332E29] text-white text-sm sm:text-base font-semibold px-8 py-4 rounded-xl cursor-pointer whitespace-nowrap shadow-md">
            5단계 견적 상담 접수하기 →
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#141210] text-[#A69E93] text-xs pt-20 pb-16 border-t border-[#292521]">
      <div class="w-full px-6 sm:px-10 lg:px-16 2xl:px-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div class="lg:col-span-5">
            <span class="font-serif-kr text-2xl font-bold text-white tracking-tight">더 숨 디자인</span>
            <p class="text-[11px] tracking-[0.2em] text-[#787167] uppercase font-sans mb-5 mt-1.5">THE SUM BESPOKE SPACE & FURNITURE STUDIO</p>
            <p class="text-sm text-[#C2BAB0] font-light leading-relaxed mb-4">"집은 단순한 공간이 아니라 삶이 펼쳐지는 이야기의 배경입니다."</p>
            <p class="text-xs text-[#8C8479] leading-relaxed mb-6 font-light max-w-lg">20년 전통 직영 공방의 장인정신과 1:1 맞춤 라이프스타일 설계를 통해 가족의 온기가 머무는 프리미엄 주거 공간을 창조합니다.</p>
            <div class="flex flex-wrap items-center gap-2.5 text-xs">
              <span class="px-3 py-1.5 rounded-lg bg-[#211E1B] text-[#D4C3AE] border border-[#332E27]">✔ SUPER E0 100% 보증</span>
              <span class="px-3 py-1.5 rounded-lg bg-[#211E1B] text-[#D4C3AE] border border-[#332E27]">★ 평생 무상 A/S</span>
              <span class="px-3 py-1.5 rounded-lg bg-[#211E1B] text-[#D4C3AE] border border-[#332E27]">✈ 전국 무료 직배송</span>
            </div>
          </div>

          <div class="lg:col-span-4">
            <h4 class="text-xs uppercase tracking-widest font-semibold text-[#E6DFD5] mb-5 font-sans">SHOWROOM & CUSTOMER CARE</h4>
            <div class="space-y-3 text-xs sm:text-[13px] text-[#A69E92]">
              <div class="flex items-center gap-3">📍</div>
              <div class="flex items-center gap-3">📞</div>
              <div>이메일: <a href="mailto:thesum1999@naver.com" class="hover:text-white">thesum1999@naver.com</a></div>
              <div class="text-[#948C81]">운영 시간: 화-토 10:00 - 18:00 (사전 예약제 1:1 상담 운영)</div>
            </div>
          </div>

          <div class="lg:col-span-3">
            <h4 class="text-xs uppercase tracking-widest font-semibold text-[#E6DFD5] mb-5 font-sans">OCAVBIZ SYSTEM</h4>
            <ul class="space-y-2.5 text-xs sm:text-[13px] text-[#9B9387]">
              <li><a href="#brand-story" class="hover:text-[#B89B72]">20년 브랜드 스토리</a></li>
              <li><a href="#portfolio" class="hover:text-[#B89B72]">주력 시공 갤러리 (ㄷ자 싱크대/침실세트)</a></li>
              <li><a href="#craftsmanship" class="hover:text-[#B89B72]">품질 보증 및 A/S 규정</a></li>
              <li class="pt-2"><a href="#showroom" class="text-[#C7A97E] hover:text-[#E8D4BE] font-medium">오카브 비즈 관리자 시스템</a></li>
            </ul>
          </div>
        </div>

        <div class="pt-10 border-t border-[#23201C] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#70695E]">
          <div>상호명: 더 숨 디자인 • 대표이사: 양해성 • 사업자등록번호: 377-47-00415</div>
          <div>© 2005-2026 THE SUM DESIGN. All Rights Reserved. Powered by OcavBiz CMS.</div>
        </div>
      </div>
    </footer>

    <!-- Floating Sticky CTA Button -->
    <div class="fixed bottom-6 right-6 z-40">
      <button onclick="openModal('estimateModal')" class="bg-[#B89B72] hover:bg-[#A3865D] text-white font-medium text-xs sm:text-sm px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-white/20 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
        <span>📞</span>
        <span>5단계 맞춤 견적 신청</span>
      </button>
    </div>

    <!-- Script for Live Switcher and Modals -->
    <script>
      const variants = [
        {
          tag: '• STORYTELLING & HERITAGE',
          title: '집은 단순한 공간이 아니라,\\n삶이 펼쳐지는 가장 따뜻한 배경입니다.',
          sub: '20년 동안 4,200여 가정의 식탁과 침실에 고유한 일상의 온기를 새겨왔습니다.\\n아침 햇살을 마주하는 아일랜드 식탁, 가족의 하루가 정리되는 맞춤 침실 세트까지.\\n더 숨 디자인은 규격화된 가구가 아닌, 당신 가족의 삶의 호흡(숨)에 꼭 맞춘 특별한 가구를 빚어냅니다.',
          cta: '5단계 디테일 맞춤 견적 신청하기'
        },
        {
          tag: '• 20 YEARS CRAFTSMANSHIP',
          title: '보이지 않는 1mm의 디테일까지,\\n20년 장인의 손길로 정직하게 완성합니다.',
          sub: '포름알데히드 걱정 없는 Super E0 친환경 최고등급 자재와 오스트리아 Blum 정품 하드웨어.\\n외주 하청 없는 100% 자체 직영 공방 제작으로, 10년이 지나도 뒤틀림 없는 프리미엄 가구의 기준을 지킵니다.',
          cta: '직영 공방 1:1 맞춤 견적 받기'
        },
        {
          tag: '• MODERN BESPOKE LIFESTYLE',
          title: '가족과의 대화가 살아나는\\n대면형 키친 & 프리미엄 맞춤 수납.',
          sub: '벽을 바라보던 요리 공간에서 가족과 눈을 맞추는 오픈 다이닝으로.\\n1mm의 오차 없는 키친핏 냉장고장과 히든 팬트리, 호텔 스위트룸 감성의 마스터 침실 세트를 제안합니다.',
          cta: '우리 집 3D 공간 배치 상담받기'
        }
      ];

      function setVariant(idx) {
        const v = variants[idx];
        document.getElementById('heroTag').innerText = v.tag;
        document.getElementById('heroTitle').innerHTML = v.title.replace('\\n', '<br>');
        document.getElementById('heroSub').innerHTML = v.sub.replace(/\\n/g, '<br>');
        document.getElementById('heroCta').innerText = v.cta;

        [0, 1, 2].forEach(i => {
          const btn = document.getElementById('varBtn' + i);
          if (i === idx) {
            btn.className = 'px-3 py-1.5 rounded text-[11.5px] bg-[#B89B72] text-[#1E1B18] font-bold';
            btn.innerHTML = btn.innerText.split(' ')[0] + ' ' + btn.innerText.split(' ')[1] + ' ' + (btn.innerText.split(' ')[2] || '') + ' <span class="text-[9px] bg-[#1E1B18] text-[#F0E5D5] px-1 py-0.2 rounded font-sans">ACTIVE</span>';
          } else {
            btn.className = 'px-3 py-1.5 rounded text-[11.5px] bg-[#1C1A18] text-[#A69E94] border border-[#3A352F]';
            btn.innerText = btn.innerText.replace('ACTIVE', '').trim();
          }
        });
      }

      function openModal(id) {
        alert("더 숨 디자인 5단계 맞춤 견적 신청 페이지가 활성화되었습니다. (고객센터: 02-543-1999)");
      }
    </script>
  </body>
</html>`;
}
