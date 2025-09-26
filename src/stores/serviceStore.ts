import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Notice {
  id: number;
  service: 'SUBSCRIPTION' | 'BUTTLER' | 'SALE';
  title: string;
  subtitle?: string;
  mobile_img?: string;
  desktop_img?: string;
  detail_img?: string;
  description?: string;
  link?: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  modified_at: string;
}

interface Event {
  id: number;
  service: 'SUBSCRIPTION' | 'BUTTLER' | 'SALE';
  title: string;
  subtitle?: string;
  mobile_img?: string;
  desktop_img?: string;
  detail_img?: string;
  description?: string;
  link?: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  modified_at: string;
}

interface Ad {
  id: number;
  service: 'SUBSCRIPTION' | 'BUTTLER' | 'SALE';
  title: string;
  subtitle?: string;
  mobile_img?: string;
  desktop_img?: string;
  detail_img?: string;
  background_img?: string;
  description?: string;
  link?: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  modified_at: string;
}

interface FAQ {
  id: number;
  service: 'SUBSCRIPTION' | 'BUTTLER' | 'SALE';
  order: number;
  question: string;
  answer: string;
  is_active: boolean;
  created_at: string;
  modified_at: string;
}

interface PrivacyPolicy {
  id: number;
  service: 'SUBSCRIPTION' | 'BUTTLER' | 'SALE';
  order: number;
  subject: string;
  detail: string;
  is_active: boolean;
  created_at: string;
  modified_at: string;
}

interface Term {
  id: number;
  service: 'SUBSCRIPTION' | 'BUTTLER' | 'SALE';
  order: number;
  subject: string;
  detail: string;
  is_active: boolean;
  created_at: string;
  modified_at: string;
}

interface ServiceState {
  notices: Notice[];
  events: Event[];
  ads: Ad[];
  faqs: FAQ[];
  privacyPolicies: PrivacyPolicy[];
  terms: Term[];
  isLoading: boolean;
  getNotices: (service?: string) => Promise<void>;
  getNoticeDetail: (noticeId: number) => Promise<Notice | null>;
  
  getEvents: (service?: string) => Promise<void>;
  getEventDetail: (eventId: number) => Promise<Event | null>;
  
  getAds: (service?: string) => Promise<void>;
  getAdDetail: (adId: number) => Promise<Ad | null>;
  
  getFAQs: (service?: string) => Promise<void>;
  getFAQDetail: (faqId: number) => Promise<FAQ | null>;
  
  getPrivacyPolicies: (service?: string) => Promise<void>;
  getPrivacyPolicyDetail: (policyId: number) => Promise<PrivacyPolicy | null>;
  
  getTerms: (service?: string) => Promise<void>;
  getTermDetail: (termId: number) => Promise<Term | null>;
  
  setLoading: (loading: boolean) => void;
}

export const useServiceStore = create<ServiceState>()(
  persist(
    (set) => ({
      notices: [],
      events: [],
      ads: [],
      faqs: [],
      privacyPolicies: [],
      terms: [],
      isLoading: false,
      getNotices: async (service?: string) => {
        set({ isLoading: true });
        try {
          const params = new URLSearchParams();
          if (service) params.append('service', service);
          
          const response = await fetch(`${BASE_URL}/services/notices?${params}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          if (response.status >= 200 && response.status < 300 && result.data) {
            set({ notices: result.data.notices || [], isLoading: false });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '공지사항 조회에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      getNoticeDetail: async (noticeId: number) => {
        try {
          const response = await fetch(`${BASE_URL}/services/notices/${noticeId}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          if (response.status >= 200 && response.status < 300 && result.data) {
            return result.data.notice;
          } else {
            throw new Error(result.message || '공지사항 상세 조회에 실패했습니다.');
          }
        } catch (error) {
          throw error;
        }
      },
      getEvents: async (service?: string) => {
        set({ isLoading: true });
        try {
          const params = new URLSearchParams();
          if (service) params.append('service', service);
          
          const response = await fetch(`${BASE_URL}/services/events?${params}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          if (response.status >= 200 && response.status < 300 && result.data) {
            set({ events: result.data.events || [], isLoading: false });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '이벤트 조회에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      getEventDetail: async (eventId: number) => {
        try {
          const response = await fetch(`${BASE_URL}/services/events/${eventId}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          if (response.status >= 200 && response.status < 300 && result.data) {
            return result.data.event;
          } else {
            throw new Error(result.message || '이벤트 상세 조회에 실패했습니다.');
          }
        } catch (error) {
          throw error;
        }
      },
      getAds: async (service?: string) => {
        set({ isLoading: true });
        try {
          const params = new URLSearchParams();
          if (service) params.append('service', service);
          
          const response = await fetch(`${BASE_URL}/services/ads?${params}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          if (response.status >= 200 && response.status < 300 && result.data) {
            set({ ads: result.data.ads || [], isLoading: false });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '광고 조회에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      getAdDetail: async (adId: number) => {
        try {
          const response = await fetch(`${BASE_URL}/services/ads/${adId}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          if (response.status >= 200 && response.status < 300 && result.data) {
            return result.data.ad;
          } else {
            throw new Error(result.message || '광고 상세 조회에 실패했습니다.');
          }
        } catch (error) {
          throw error;
        }
      },
      getFAQs: async (service?: string) => {
        set({ isLoading: true });
        try {
          const params = new URLSearchParams();
          if (service) params.append('service', service);
          
          const response = await fetch(`${BASE_URL}/services/faqs?${params}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          if (response.status >= 200 && response.status < 300 && result.data) {
            set({ faqs: result.data.faqs || [], isLoading: false });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || 'FAQ 조회에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      getFAQDetail: async (faqId: number) => {
        try {
          const response = await fetch(`${BASE_URL}/services/faqs/${faqId}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          if (response.status >= 200 && response.status < 300 && result.data) {
            return result.data.faq;
          } else {
            throw new Error(result.message || 'FAQ 상세 조회에 실패했습니다.');
          }
        } catch (error) {
          throw error;
        }
      },
      getPrivacyPolicies: async (service?: string) => {
        set({ isLoading: true });
        try {
          const params = new URLSearchParams();
          if (service) params.append('service', service);
          
          const response = await fetch(`${BASE_URL}/services/privacy-policies?${params}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          if (response.status >= 200 && response.status < 300 && result.data) {
            set({ privacyPolicies: result.data.privacy_policies || [], isLoading: false });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '개인정보처리방침 조회에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      getPrivacyPolicyDetail: async (policyId: number) => {
        try {
          const response = await fetch(`${BASE_URL}/services/privacy-policies/${policyId}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          if (response.status >= 200 && response.status < 300 && result.data) {
            return result.data.privacy_policy;
          } else {
            throw new Error(result.message || '개인정보처리방침 상세 조회에 실패했습니다.');
          }
        } catch (error) {
          throw error;
        }
      },
      getTerms: async (service?: string) => {
        set({ isLoading: true });
        try {
          const params = new URLSearchParams();
          if (service) params.append('service', service);
          
          const response = await fetch(`${BASE_URL}/services/terms?${params}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          if (response.status >= 200 && response.status < 300 && result.data) {
            set({ terms: result.data.terms || [], isLoading: false });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '이용약관 조회에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      getTermDetail: async (termId: number) => {
        try {
          const response = await fetch(`${BASE_URL}/services/terms/${termId}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const result = await response.json();
          if (response.status >= 200 && response.status < 300 && result.data) {
            return result.data.term;
          } else {
            throw new Error(result.message || '이용약관 상세 조회에 실패했습니다.');
          }
        } catch (error) {
          throw error;
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'service-storage',
      partialize: (state) => ({
        notices: state.notices,
        events: state.events,
        ads: state.ads,
        faqs: state.faqs,
        privacyPolicies: state.privacyPolicies,
        terms: state.terms,
      }),
    }
  )
);

export default useServiceStore;
