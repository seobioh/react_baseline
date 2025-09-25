import { create } from 'zustand';
import { useAccountStore } from './accountStore';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Referral {
  referrer: number;
  referrer_username: string | null;
  referree: number;
  referree_username: string | null;
  created_at: string;
  modified_at: string;
}

export interface ReferralStatus {
  referrals_given: Referral[];
  referrals_received: Referral[];
}

interface PointTransaction {
  id: number;
  user: number;
  amount: number;
  description: string | null;
  transaction_type: string;
  transaction_id: number | null;
  created_at: string;
  modified_at: string;
}

interface UserState {
  referralStatus: ReferralStatus | null;
  pointTransactions: PointTransaction[];
  isLoading: boolean;
  
  getReferralStatus: () => Promise<ReferralStatus>;
  getPointTransactions: () => Promise<PointTransaction[]>;
  addPointCoupon: (couponCode: string) => Promise<any>;
  addReferralCode: (referralCode: string) => Promise<any>;
  
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  referralStatus: null,
  pointTransactions: [],
  isLoading: false,

  getReferralStatus: async () => {
    const { token } = useAccountStore.getState();
    
    if (!token?.access_token) throw new Error('인증이 필요합니다.');
    set({ isLoading: true });
    
    try {
      const response = await fetch(`${BASE_URL}/users/referrals`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        }
      });
      const result = await response.json();
      if (response.status >= 200 && response.status < 300 && result.data) {
        set({ 
          referralStatus: result.data.referrals,
          isLoading: false 
        });
        return result.data.referrals;
      } else {
        set({ isLoading: false });
        throw new Error(result.message || '추천인 현황 조회에 실패했습니다.');
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  getPointTransactions: async () => {
    const { token } = useAccountStore.getState();
    
    if (!token?.access_token) throw new Error('인증이 필요합니다.');
    set({ isLoading: true });
    
    try {
      const response = await fetch(`${BASE_URL}/users/point-transactions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        }
      });
      const result = await response.json();
      if (response.status >= 200 && response.status < 300 && result.data) {
        set({ 
          pointTransactions: result.data.point_transactions || [],
          isLoading: false 
        });
        return result.data.point_transactions || [];
      } else {
        set({ isLoading: false });
        throw new Error(result.message || '포인트 거래내역 조회에 실패했습니다.');
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addPointCoupon: async (couponCode: string) => {
    const { token } = useAccountStore.getState();
    
    if (!token?.access_token) throw new Error('인증이 필요합니다.');
    set({ isLoading: true });
    
    try {
      const response = await fetch(`${BASE_URL}/users/point-coupons/${couponCode}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        }
      });
      const result = await response.json();
      if (response.status >= 200 && response.status < 300) {
        set({ isLoading: false });
        return result.data;
      } else {
        set({ isLoading: false });
        throw new Error(result.message || '포인트 쿠폰 사용에 실패했습니다.');
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addReferralCode: async (referralCode: string) => {
    const { token } = useAccountStore.getState();
    
    if (!token?.access_token) throw new Error('인증이 필요합니다.');
    set({ isLoading: true });
    
    try {
      const response = await fetch(`${BASE_URL}/users/referrals/${referralCode.toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        }
      });
      const result = await response.json();
      if (response.status >= 200 && response.status < 300) {
        set({ isLoading: false });
        return result.data.referral;
      } else {
        set({ isLoading: false });
        throw new Error(result.message || '추천인 코드 등록에 실패했습니다.');
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  }
}));