import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountStore } from '../../../stores/accountStore';
import './SignUp.css';

const SignUp : React.FC = () => {
    const [email, setEmail] = useState('');
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isIdentityVerified, setIsIdentityVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        if (!phone.trim()) {
            alert('전화번호를 입력해주세요.');
            return;
        }
        setIsLoading(true);
        try {
            setIsIdentityVerified(true);
            alert('본인 인증이 완료되었습니다.');
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
            await signup({email, name, mobile: phone, password});
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
    
    return (
        <div className="sign-up">
            <div className="sign-up-container">
                <div className="sign-up-email-container">
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
                <input 
                    className={`sign-up-input ${isIdentityVerified ? 'valid' : ''}`}
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isIdentityVerified}
                />
                <div className="sign-up-identity-container">
                    <input 
                        className={`sign-up-input ${isIdentityVerified ? 'valid' : ''}`}
                        placeholder="전화번호"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={isIdentityVerified}
                    />
                    <button 
                        className={`sign-up-button ${isIdentityVerified ? 'invalid' : (isEmailChecked && name.trim() && phone.trim()) ? 'valid' : 'invalid'}`}
                        onClick={handleIdentityVerification}
                        disabled={isLoading || isIdentityVerified || !isEmailChecked || !name.trim() || !phone.trim()}
                    >
                        {isLoading ? '인증 중...' : isIdentityVerified ? '인증 완료' : '본인 인증'}
                    </button>
                </div>
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
                <button 
                    className={`sign-up-button ${isFormValid ? 'valid' : 'invalid'}`}
                    onClick={handleSignup}
                    disabled={isLoading || !isFormValid}
                >
                    {isLoading ? '가입 중...' : '회원가입'}
                </button>
            </div>
        </div>
    )
}

export default SignUp;