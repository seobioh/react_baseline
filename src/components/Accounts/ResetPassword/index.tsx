
import React, { useState, useEffect } from 'react';
import { useAccountStore } from '../../../stores/accountStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PortOne from '@portone/browser-sdk/v2';
import './ResetPassword.css';

type TabType = 'identity' | 'email';

const ResetPassword : React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('identity');
    const [email, setEmail] = useState('');
    const isEmailValid = email.trim() !== '';
    const [verificationCode, setVerificationCode] = useState('');
    const isVerificationCodeValid = verificationCode.trim().length === 6;
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [searchParams] = useSearchParams();

    const { sendVerificationCode, resetPassword, token } = useAccountStore();
    const navigate = useNavigate();
    
    useEffect(() => {
        const identityVerificationId = searchParams.get('identityVerificationId');
        if (identityVerificationId) {
            setIsLoading(true);
            resetPassword({
                identity_code: identityVerificationId
            }).then(() => {
                navigate('/accounts/change-password');
            }).catch(() => {
                alert('본인인증에 실패했습니다.');
                setIsLoading(false);
            });
        }
    }, [searchParams, resetPassword, navigate]);
    
    useEffect(() => {
        let interval: number | null = null;
        
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setTimerActive(false);
        }
        
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timerActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleSendCode = async () => {
        if (!email.trim()) {
            alert('이메일을 입력해주세요.');
            return;
        }
        setIsLoading(true);
        try {
            await sendVerificationCode({
                check_unique: false,
                type: 'email',
                target: email
            });
            setIsCodeSent(true);
            setTimeLeft(180); // 3분 = 180초
            setTimerActive(true);
            setVerificationCode(''); // 재전송 시 인증번호 입력 필드 초기화
        } catch (error) {
            alert('인증번호 전송에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode.trim()) {
            alert('인증번호를 입력해주세요.');
            return;
        }
        setIsLoading(true);
        try {
            await resetPassword({
                target: email,
                verification_code: verificationCode
            });
            navigate('/accounts/change-password');
        } catch (error) {
            alert('인증번호가 올바르지 않습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleIdentityVerification = async () => {
        const response = await PortOne.requestIdentityVerification({
            storeId: import.meta.env.VITE_PORTONE_STORE_ID,
            identityVerificationId: `identity-verification-${crypto.randomUUID()}`,
            channelKey: import.meta.env.VITE_PORTONE_CHANNEL_KEY,
            redirectUrl: `${window.location.origin}/accounts/reset-password`,
        });

        navigate(`/accounts/reset-password?identityVerificationId=${response?.identityVerificationId}`);
    };

    const renderHeader = () => (
        <div className="reset-password-section">
            <h3>
                {activeTab === 'identity' 
                    ? '본인인증' 
                    : !isCodeSent 
                        ? '이메일 인증' 
                        : '인증번호 확인'
                }
            </h3>
            <div className="reset-password-space"></div>
            <p>
                {activeTab === 'identity' 
                    ? '본인인증을 통해 비밀번호를 재설정할 수 있습니다.' 
                    : !isCodeSent 
                        ? '가입하신 이메일 주소를 입력해주세요.' 
                        : `${email}로 전송된 인증번호를 입력해주세요.`
                }
            </p>
        </div>
    );

    const renderIdentitySection = () => (
        <div className="reset-password-section">
            <button className="reset-password-button valid" onClick={handleIdentityVerification} disabled={isLoading} >
                {isLoading ? '처리 중...' : '본인인증하기'}
            </button>
        </div>
    );

    const renderEmailInputSection = () => (
        <div className="reset-password-section">
            <input
                className={`reset-password-input`}
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button 
                className={`reset-password-button ${isEmailValid ? 'valid' : 'invalid'}`}
                onClick={handleSendCode}
                disabled={isLoading}
            >
                {isLoading ? '전송 중...' : '인증번호 요청'}
            </button>
        </div>
    );

    const renderVerificationSection = () => (
        <div className="reset-password-section">
            {timerActive && (
                <p className="timer-text">
                    남은 시간: {formatTime(timeLeft)}
                </p>
            )}
            {timerActive && (
                <div className="reset-password-space"></div>
            )}
            <input
                className="reset-password-input"
                type="text"
                placeholder="인증번호 6자리"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
            />
            <button 
                className={`reset-password-button ${timerActive ? 'invalid' : 'valid'}`}
                onClick={() => {
                    if (!timerActive) {
                        handleSendCode();
                    }
                }}
                disabled={timerActive}
            >
                {timerActive ? `재전송 (${formatTime(timeLeft)})` : '재전송'}
            </button>
            <button 
                className={`reset-password-button ${isVerificationCodeValid ? 'valid' : 'invalid'}`}
                onClick={handleVerifyCode}
                disabled={isLoading || !isVerificationCodeValid}
            >
                {isLoading ? '확인 중...' : '확인'}
            </button>
        </div>
    );

    
    if (token) {
        return null;
    }

    return (
        <div className="reset-password">
            <div className="reset-password-container">
                <div className="reset-password-space"></div>
                {renderHeader()}
                <div className="reset-password-space"></div>

                <div className="reset-password-toggle-container">
                    <button 
                        className={`reset-password-toggle-button ${activeTab === 'identity' ? 'active' : 'inactive'}`}
                        onClick={() => setActiveTab('identity')}
                    >
                        본인인증
                    </button>
                    <button 
                        className={`reset-password-toggle-button ${activeTab === 'email' ? 'active' : 'inactive'}`}
                        onClick={() => setActiveTab('email')}
                    >
                        이메일 인증
                    </button>
                </div>

                <div className="reset-password-space"></div>

                {activeTab === 'identity' 
                    ? renderIdentitySection() 
                    : !isCodeSent 
                        ? renderEmailInputSection() 
                        : renderVerificationSection()
                }
            </div>
        </div>
    );
};

export default ResetPassword;