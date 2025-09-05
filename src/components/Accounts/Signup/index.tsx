import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAccountStore } from '../../../stores/accountStore';
import './Signup.css';

const SignUp : React.FC = () => {
    const [step, setStep] = useState(0);
    const [agreements, setAgreements] = useState({serviceTerms: false, privacyPolicy: false, ageVerification: false, marketingConsent: false});
    const [email, setEmail] = useState('');
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isIdentityVerified, setIsIdentityVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { token, checkEmail, signup } = useAccountStore();
    
    useEffect(() => {
        if (token) {
            navigate('/accounts');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (isEmailChecked) {
            setIsEmailChecked(false);
        }
    }, [email]);
    
    useEffect(() => {
        if (isIdentityVerified) {
            setIsIdentityVerified(false);
        }
    }, [name, phone]);
    
    const handleAgreementChange = (key: keyof typeof agreements) => {
        setAgreements(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleAllAgreementChange = () => {
        const allChecked = agreements.serviceTerms && agreements.privacyPolicy && agreements.ageVerification && agreements.marketingConsent;
        setAgreements(prev => ({
            ...prev,
            serviceTerms: !allChecked,
            privacyPolicy: !allChecked,
            ageVerification: !allChecked,
            marketingConsent: !allChecked
        }));
    };

    const handleNextStep = () => {
        if (!agreements.serviceTerms || !agreements.privacyPolicy || !agreements.ageVerification) {
            alert('필수 동의 항목을 모두 체크해주세요.');
            return;
        }
        setStep(1);
    };

    const handleCheckEmail = async () => {
        if (!email.trim()) {
            alert('이메일을 입력해주세요.');
            return;
        }
        setIsLoading(true);
        try {
            const isEmailAvailable = await checkEmail({ email });
            if (isEmailAvailable) {
                setIsEmailChecked(true);
                alert('사용 가능한 이메일입니다.');
                setStep(2);
            } else {
                alert('이미 사용 중인 이메일입니다.');
            }
        } catch (error) {
            alert('이메일 확인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleIdentityVerification = async () => {
        if (!name.trim() || !phone.trim()) {
            alert('이름과 전화번호를 입력해주세요.');
            return;
        }
        setIsLoading(true);
        try {
            setIsIdentityVerified(true);
            alert('본인 인증이 완료되었습니다.');
            setStep(3);
        } catch (error) {
            alert('본인 인증에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSignup = async () => {
        if (!isEmailChecked) {
            alert('이메일 중복 확인을 해주세요.');
            return;
        }
        if (!isIdentityVerified) {
            alert('본인 인증을 완료해주세요.');
            return;
        }
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        setIsLoading(true);
        try {
            const signupData: any = {email, name, mobile: phone, password};
            if (referralCode.trim()) {
                signupData.referral_code = referralCode.trim();
            }
            await signup(signupData);
            alert('회원가입이 완료되었습니다.');
            navigate('/accounts');
        } catch (error) {
            alert('회원가입에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const isFormValid = email.trim() && name.trim() && phone.trim() && 
                       password.trim() && confirmPassword.trim() && 
                       password === confirmPassword &&
                       isEmailChecked && isIdentityVerified;
    
    const renderProgressBar = () => (
        <div className="sign-up-progress-container">
            <div className={`sign-up-progress-step ${step === 0 ? 'active' : 'inactive'}`}>
                STEP 0
            </div>
            <div className={`sign-up-progress-step ${step === 1 ? 'active' : 'inactive'}`}>
                STEP 1
            </div>
            <div className={`sign-up-progress-step ${step === 2 ? 'active' : 'inactive'}`}>
                STEP 2
            </div>
            <div className={`sign-up-progress-step ${step === 3 ? 'active' : 'inactive'}`}>
                STEP 3
            </div>
        </div>
    );

    const renderStep0 = () => {
        const isRequiredAgreed = agreements.serviceTerms && agreements.privacyPolicy && agreements.ageVerification;
        
        return (
            <div className="sign-up-container">
                <div className="sign-up-space"></div>
                <h3>약관 동의</h3>
                <div className="sign-up-space"></div>
                <p>회원 가입을 위해 아래 약관에 동의해주세요.</p>
                <div className="sign-up-space"></div>
                {renderProgressBar()}
                <div className="sign-up-space"></div>
                
                <div className="sign-up-agreement">
                    <div className="sign-up-agreement-container">
                        <Link to="/terms"><p>서비스 이용약관 동의 (필수) </p></Link>
                        <label className="sign-up-agreement-checkbox">
                            <input
                                type="checkbox"
                                checked={agreements.serviceTerms}
                                onChange={() => handleAgreementChange('serviceTerms')}
                            />
                            <span className="sign-up-agreement-checkmark"></span>
                        </label>
                    </div>
                    <div className="sign-up-agreement-container">
                        <Link to="/privacy"><p>개인정보 수집 및 이용 동의 (필수) </p></Link>
                        <label className="sign-up-agreement-checkbox">
                            <input
                                type="checkbox"
                                checked={agreements.privacyPolicy}
                                onChange={() => handleAgreementChange('privacyPolicy')}
                            />
                            <span className="sign-up-agreement-checkmark"></span>
                        </label>
                    </div>
                    <div className="sign-up-agreement-container">
                        <p>만 14세 이상입니다 (필수)</p>
                        <label className="sign-up-agreement-checkbox">
                            <input
                                type="checkbox"
                                checked={agreements.ageVerification}
                                onChange={() => handleAgreementChange('ageVerification')}
                            />
                            <span className="sign-up-agreement-checkmark"></span>
                        </label>
                    </div>
                    <div className="sign-up-agreement-container">
                        <p>광고성 정보 수신 동의 (이메일/SMS/푸시)</p>
                        <label className="sign-up-agreement-checkbox">
                            <input
                                type="checkbox"
                                checked={agreements.marketingConsent}
                                onChange={() => handleAgreementChange('marketingConsent')}
                            />
                            <span className="sign-up-agreement-checkmark"></span>
                        </label>
                    </div>
                    <div className="sign-up-space"></div>
                    <div className="sign-up-agreement-container">
                        <p>전체 동의</p>
                        <label className="sign-up-agreement-checkbox">
                            <input
                                type="checkbox"
                                checked={agreements.serviceTerms && agreements.privacyPolicy && agreements.ageVerification && agreements.marketingConsent}
                                onChange={handleAllAgreementChange}
                            />
                            <span className="sign-up-agreement-checkmark"></span>
                        </label>
                    </div>
                </div>

                <div className="sign-up-space"></div>
                <button 
                    className={`sign-up-button ${isRequiredAgreed ? 'valid' : 'invalid'}`}
                    onClick={handleNextStep}
                    disabled={!isRequiredAgreed}
                >
                    다음
                </button>
            </div>
        );
    };

    const renderStep1 = () => (
        <div className="sign-up-container">
            <div className="sign-up-space"></div>
            <h3>이메일 인증</h3>
            <div className="sign-up-space"></div>
            <p>회원 가입을 위해 이메일 중복 확인이 필요합니다.</p>
            <div className="sign-up-space"></div>
            {renderProgressBar()}
            <div className="sign-up-space"></div>
            <input 
                className={`sign-up-input ${isEmailChecked ? 'valid' : ''}`}
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isEmailChecked}
            />
            <button 
                className={`sign-up-button ${isEmailChecked ? 'invalid' : email.trim() ? 'valid' : 'invalid'}`}
                onClick={handleCheckEmail}
                disabled={isLoading || isEmailChecked || !email.trim()}
            >
                {isLoading ? '확인 중...' : isEmailChecked ? '확인 완료' : '중복 확인'}
            </button>
        </div>
    );

    const renderStep2 = () => (
        <div className="sign-up-container">
            <div className="sign-up-space"></div>
            <h3>본인 인증</h3>
            <div className="sign-up-space"></div>
            <p>본인 인증을 통해 회원가입을 진행할 수 있습니다.</p>
            <div className="sign-up-space"></div>
            {renderProgressBar()}
            <div className="sign-up-space"></div>
            <input 
                className={`sign-up-input ${isIdentityVerified ? 'valid' : ''}`}
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isIdentityVerified}
            />
            <input 
                className={`sign-up-input ${isIdentityVerified ? 'valid' : ''}`}
                placeholder="전화번호"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isIdentityVerified}
            />
            <button 
                className={`sign-up-button ${isIdentityVerified ? 'invalid' : (name.trim() && phone.trim()) ? 'valid' : 'invalid'}`}
                onClick={handleIdentityVerification}
                disabled={isLoading || isIdentityVerified || !name.trim() || !phone.trim()}
            >
                {isLoading ? '인증 중...' : isIdentityVerified ? '인증 완료' : '본인 인증'}
            </button>
        </div>
    );

    const renderStep3 = () => (
        <div className="sign-up-container">
            <div className="sign-up-space"></div>
            <h3>비밀번호 설정</h3>
            <div className="sign-up-space"></div>
            <p>비밀번호를 설정해주세요.</p>
            <div className="sign-up-space"></div>
            {renderProgressBar()}
            <div className="sign-up-space"></div>
            <input 
                className="sign-up-input" 
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input 
                className="sign-up-input" 
                placeholder="비밀번호 확인"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="sign-up-space"></div>
            <input 
                className="sign-up-input" 
                placeholder="추천인 코드 (선택사항)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
            />
            <button 
                className={`sign-up-button ${isFormValid ? 'valid' : 'invalid'}`}
                onClick={handleSignup}
                disabled={isLoading || !isFormValid}
            >
                {isLoading ? '가입 중...' : '회원가입'}
            </button>
        </div>
    );

    
    if (token) {
        return null;
    }

    return (
        <div className="sign-up">
            {step === 0 && renderStep0()}
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
        </div>
    )
}

export default SignUp;