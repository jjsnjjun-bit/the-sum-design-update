export interface CopyVariant {
  id: string;
  label: string;
  sub: string;
  tag: string;
  heroTitle: string;
  heroSub: string;
  ctaText: string;
}

export interface PortfolioItem {
  id: string;
  category: 'all' | 'kitchen-c' | 'island-dining' | 'fridge-pantry' | 'bedroom' | 'living-library';
  categoryLabel: string;
  isBest?: boolean;
  image: string;
  locationInfo: string;
  title: string;
  description: string;
  specs: string[];
  fullDetails?: {
    concept: string;
    materials: string[];
    hardware: string[];
    period: string;
  };
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  date: string;
  stars: number;
  quote: string;
  reply: string;
}

export interface PhilosophyFeature {
  id: string;
  title: string;
  description: string;
  iconName?: 'compass' | 'shield' | 'sparkles' | 'ruler' | 'heart' | 'wrench';
}

export interface PhilosophyContent {
  eyebrowTag: string;
  mainHeadline: string;
  subtitle: string;
  image: string;
  imageBadgeTitle: string;
  imageBadgeSubtitle: string;
  imageBadgeYear: string;
  storyTitle: string;
  paragraph1: string;
  paragraph2: string;
  features: PhilosophyFeature[];
  ctaButtonText: string;
}

export interface WarrantyItem {
  code: string;
  title: string;
  description: string;
  tag: string;
  iconName: 'shield' | 'leaf' | 'truck' | 'wrench';
}

export interface EstimateInquiry {
  id: string;
  name: string;
  phone: string;
  date: string;
  housing: string;
  size: string;
  furniture: string[];
  material: string;
  timeframe: string;
  location: string;
  budget?: string;
  style?: string;
  preferredTime?: string[];
  notes?: string;
  status: '신규접수' | '3D도면설계' | '쇼룸방문예정' | '계약완료' | '상담완료';
}

export interface ShowroomBooking {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  consultType: string;
  guests: number;
  notes?: string;
  status: '예약대기' | '예약확정' | '방문완료' | '취소';
  createdAt: string;
}

export interface SiteNotice {
  id: string;
  title: string;
  category: '공지' | '시공일정' | '쇼룸안내' | '이벤트';
  date: string;
  content: string;
  isImportant?: boolean;
}

export interface SiteConfig {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  representative: string;
  phone: string;
  email: string;
  address: string;
  businessNumber: string;
  onlineOrderNumber: string;
  factoryStatus: string;
}
