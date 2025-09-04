import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAccountStore } from '../../../stores/accountStore';
import './Login.css';

const Login : React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isFormValid = email.trim() !== '' && password.trim() !== '';

    const navigate = useNavigate();
    const { login, isLoading, token } = useAccountStore();

    useEffect(() => {
        if (token) {
            navigate('/accounts');
        }
    }, [token, navigate]);

    const handleKakaoLogin = () => {
        const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID || 'your_kakao_client_id';
        const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI || 'your_kakao_redirect_uri';
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;
        window.location.href = kakaoAuthUrl;
    };
    
    const handleLogin = async () => {
        if (!isFormValid) return;
        try {
            await login({ email: email, password });
            navigate('/accounts');
        } catch (error) {
            alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
        }
    };        

    
    if (token) {
        return null;
    }

    return (
        <div className="login">
            <div className="login-container">
                <input className="login-input" type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input className="login-input" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className={`login-button ${isFormValid ? 'valid' : 'invalid'}`} onClick={handleLogin} disabled={!isFormValid || isLoading}>
                    {isLoading ? '로그인 중...' : '로그인'}
                </button>
                <div className="login-option-container">
                    <Link to="/accounts/signup">
                        <h3>회원가입</h3>
                    </Link>
                    <h3>|</h3>
                    <Link to="/accounts/reset-password">
                        <h3>비밀번호 찾기</h3>
                    </Link>
                </div>
                <button className="kakao-login-button" onClick = {handleKakaoLogin}>카카오 로그인</button>
            </div>
        </div>
    )
}

export default Login;