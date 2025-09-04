import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const BASE_URL = import.meta.env.VITE_API_URL;

interface User {
  id: number;
  email: string;
  mobile: string;
  name: string;
  username: string;
  ci_verified: boolean;
  birthday: string;
  gender: string;
  profile_image: string;
  referral_code: string;
  point: number;
  last_access: string;
  created_at: string;
  modified_at: string;
}

interface Token {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  mobile?: string;
  birthday?: string;
  gender?: string;
}

interface UpdateUserRequest {
  name?: string;
  mobile?: string;
  birthday?: string;
  gender?: string;
  profile_image?: string;
  password?: string;
}

interface CheckEmailRequest {
  email: string;
}

interface VerificationRequest {
  check_unique: boolean;
  type: string;
  target: string;
}

interface VerificationCheckRequest {
  target: string;
  verification_code: string;
}

interface SocialLoginRequest {
  code: string;
  state?: string;
}

interface AccountState {
  user: User | null;
  token: Token | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
  signup: (data: SignUpRequest) => Promise<void>;
  refreshToken: () => Promise<void>;
  
  getAccountInfo: () => Promise<void>;
  updateAccount: (data: UpdateUserRequest) => Promise<void>;
  deleteAccount: () => Promise<void>;
  
  checkEmail: (data: CheckEmailRequest) => Promise<boolean>;
  sendVerificationCode: (data: VerificationRequest) => Promise<void>;
  verifyCode: (data: VerificationCheckRequest) => Promise<void>;
  
  kakaoLogin: (data: SocialLoginRequest) => Promise<void>;
  googleLogin: (data: SocialLoginRequest) => Promise<void>;
  naverLogin: (data: SocialLoginRequest) => Promise<void>;
  
  requestPassAuth: () => Promise<any>;
  verifyPassAuth: (identityCode: string) => Promise<void>;
  
  setLoading: (loading: boolean) => void;
  checkTokenValidity: () => boolean;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (data: LoginRequest) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${BASE_URL}/accounts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });
          const result = await response.json();
          if (result.code === 0 && result.token) {
            set({
              user: result.user,
              token: result.token,
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '로그인에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        });
      },

      signup: async (data: SignUpRequest) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${BASE_URL}/accounts/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });
          const result = await response.json();
          if (result.code === 0 && result.token) {
            set({
              user: result.user,
              token: result.token,
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '회원가입에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      refreshToken: async () => {
        const { token } = useAccountStore.getState();
        if (!token?.refresh_token) throw new Error('리프레시 토큰이 없습니다.');
        try {
          const response = await fetch(`${BASE_URL}/accounts/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              refresh_token: token.refresh_token
            })
          });
          const result = await response.json();
          if (result.code === 0) {
            set({
              token: {
                ...token,
                access_token: result.access_token,
                expires_in: result.expires_in
              }
            });
            return result.access_token;
          } else {
            throw new Error('토큰 갱신에 실패했습니다.');
          }
        } catch (error) {
          // 토큰 갱신 실패 시 로그아웃
          useAccountStore.getState().logout();
          throw error;
        }
      },

      getAccountInfo: async () => {
        const { token } = useAccountStore.getState();
        if (!token?.access_token) throw new Error('인증이 필요합니다.');
        set({ isLoading: true });
        try {
          const response = await fetch(`${BASE_URL}/accounts`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token.access_token}`,
              'Content-Type': 'application/json',
            }
          });
          const result = await response.json();
          if (result.code === 0) {
            set({
              user: result.user,
              isLoading: false
            });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '계정 정보 조회에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      updateAccount: async (data: UpdateUserRequest) => {
        const { token } = useAccountStore.getState();
        if (!token?.access_token) throw new Error('인증이 필요합니다.');
        set({ isLoading: true });
        try {
          const response = await fetch(`${BASE_URL}/accounts`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token.access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });
          const result = await response.json();
          if (result.code === 0) {
            set({
              user: result.user,
              isLoading: false
            });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '계정 정보 수정에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      deleteAccount: async () => {
        const { token } = useAccountStore.getState();
        if (!token?.access_token) throw new Error('인증이 필요합니다.');
        set({ isLoading: true });
        try {
          const response = await fetch(`${BASE_URL}/accounts`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token.access_token}`,
              'Content-Type': 'application/json',
            }
          });
          const result = await response.json();
          if (result.code === 0) {
            useAccountStore.getState().logout();
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '계정 삭제에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      checkEmail: async (data: CheckEmailRequest) => {
        try {
          const response = await fetch(`${BASE_URL}/accounts/check-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });
          const result = await response.json();
          if (response.status === 400) {
            return false; // 사용 불가능한 이메일
          }
          return result.code === 0;
        } catch (error) {
          throw error;
        }
      },

      sendVerificationCode: async (data: VerificationRequest) => {
        set({ isLoading: true });

        try {
          const response = await fetch(`${BASE_URL}/accounts/send-code`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });

          const result = await response.json();

          if (result.code === 0) {
            set({ isLoading: false });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '인증번호 전송에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      verifyCode: async (data: VerificationCheckRequest) => {
        set({ isLoading: true });

        try {
          const response = await fetch(`${BASE_URL}/accounts/reset-password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });

          const result = await response.json();

          if (result.code === 0 && result.token) {
            set({
              user: result.user,
              token: result.token,
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '인증번호 확인에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      kakaoLogin: async (data: SocialLoginRequest) => {
        set({ isLoading: true });

        try {
          const response = await fetch(`${BASE_URL}/accounts/kakao`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });

          const result = await response.json();

          if (result.code === 0 && result.token) {
            set({
              user: result.user,
              token: result.token,
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '카카오 로그인에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      googleLogin: async (data: SocialLoginRequest) => {
        set({ isLoading: true });

        try {
          const response = await fetch(`${BASE_URL}/accounts/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });

          const result = await response.json();

          if (result.code === 0 && result.token) {
            set({
              user: result.user,
              token: result.token,
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '구글 로그인에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      naverLogin: async (data: SocialLoginRequest) => {
        set({ isLoading: true });

        try {
          const response = await fetch(`${BASE_URL}/accounts/naver`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });

          const result = await response.json();

          if (result.code === 0 && result.token) {
            set({
              user: result.user,
              token: result.token,
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || '네이버 로그인에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      requestPassAuth: async () => {
        set({ isLoading: true });

        try {
          const response = await fetch(`${BASE_URL}/accounts/pass/request`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          const result = await response.json();

          if (result.code === 0) {
            set({ isLoading: false });
            return result.data;
          } else {
            set({ isLoading: false });
            throw new Error(result.message || 'PASS 인증 요청에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      verifyPassAuth: async (identityCode: string) => {
        set({ isLoading: true });

        try {
          const response = await fetch(`${BASE_URL}/accounts/pass`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identity_code: identityCode
            })
          });

          const result = await response.json();

          if (result.code === 0) {
            set({ isLoading: false });
          } else {
            set({ isLoading: false });
            throw new Error(result.message || 'PASS 인증에 실패했습니다.');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      checkTokenValidity: () => {
        const { token } = useAccountStore.getState();
        if (!token?.access_token) return false;
        
        // 토큰 만료 시간 체크 (선택사항)
        // 현재는 토큰 존재 여부만 확인
        return true;
      }
    }),
    {
      name: 'account-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
