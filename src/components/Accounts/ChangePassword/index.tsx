import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountStore } from '../../../stores/accountStore';
import './ChangePassword.css';

const ChangePassword : React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { updateAccount, token } = useAccountStore();
    
    useEffect(() => {
        if (!token) {
            navigate('/accounts');
        }
    }, [token, navigate]);
    
    const handlePasswordReset = async () => {
        if (!newPassword.trim()) {
            alert('새 비밀번호를 입력해주세요.');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (newPassword.length < 8) {
            alert('비밀번호는 8자 이상이어야 합니다.');
            return;
        }
        setIsLoading(true);
        try {
            await updateAccount({ password: newPassword });
            alert('비밀번호가 성공적으로 변경되었습니다.');
            navigate('/accounts');
        } catch (error) {
            alert('비밀번호 변경에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };


    if (!token) {
        return null;
    }

    return (
        <div className="change-password">
            <div className="change-password-container">
                <div className="change-password-space"></div>
                <h3>새로운 비밀번호를 입력해주세요</h3>
                <div className="change-password-space"></div>
                <p>비밀번호는 8자 이상이어야 합니다.</p>
                <div className="change-password-space"></div>
                <input
                    className="change-password-input"
                    type="password"
                    placeholder="새 비밀번호 (8자 이상)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    className="change-password-input"
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button 
                    className={`change-password-button ${newPassword && confirmPassword && newPassword === confirmPassword ? 'valid' : 'invalid'}`}
                    onClick={handlePasswordReset}
                    disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                >
                    {isLoading ? '변경 중...' : '비밀번호 변경'}
                </button>
            </div>
        </div>
    );
}

export default ChangePassword;