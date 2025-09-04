import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountStore } from '../../../stores/accountStore';
import arrowForwardIcon from '../../../assets/icons/light/arrow_forward.svg';
import './AccountSetting.css';

const AccountSetting: React.FC = () => {
    const navigate = useNavigate();
    const { token, user, logout } = useAccountStore();
    
    useEffect(() => {
        if (!token) {
            navigate('/accounts/login');
        }
    }, [token, navigate]);
    
    const handleIdentityVerification = () => {
        // TODO: 본인 인증 페이지로 이동
        alert('본인 인증 기능은 준비 중입니다.');
    };

    const handleCouponBox = () => {
        // TODO: 쿠폰함 페이지로 이동
        alert('쿠폰함 기능은 준비 중입니다.');
    };
        
    const handleReferralStatus = () => {
        navigate('/users/referrals');
    };

    const handleEditProfile = () => {
        navigate('/accounts/edit');
    };

    const handleChangePassword = () => {
        navigate('/accounts/change-password');
    };

    const handleLogout = () => {
        logout();
        navigate('/accounts/login');
    };

    
    if (!token) {
        return null;
    }
    
    return (
        <div className="account-setting">
            <div className="account-action-container">
                <div className="account-action-section">
                    <button className="account-action-section-button" onClick={handleCouponBox}>
                        <p>혜택 쿠폰함</p>
                        <img src={arrowForwardIcon} alt="arrow-forward" />
                    </button>
                    <div className="account-action-divider" />
                    <button className="account-action-section-button" onClick={handleReferralStatus}>
                        <p>추천인 현황</p>
                        <img src={arrowForwardIcon} alt="arrow-forward" />
                    </button>
                    <div className="account-action-divider" />
                    {!user?.ci_verified && (
                        <>
                            <button className="account-action-section-button" onClick={handleIdentityVerification}>
                                <p>본인인증</p>
                                <img src={arrowForwardIcon} alt="arrow-forward" />
                            </button>
                            <div className="account-action-divider" />
                        </>
                    )}
                    <button className="account-action-section-button" onClick={handleEditProfile}>
                        <p>회원정보 수정</p>
                        <img src={arrowForwardIcon} alt="arrow-forward" />
                    </button>
                    <div className="account-action-divider" />
                    <button className="account-action-section-button" onClick={handleChangePassword}>
                        <p>비밀번호 변경</p>
                        <img src={arrowForwardIcon} alt="arrow-forward" />
                    </button>
                    <div className="account-action-divider" />
                    <button className="account-action-section-button" onClick={handleLogout}>
                        <p>로그아웃</p>
                        <img src={arrowForwardIcon} alt="arrow-forward" />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default AccountSetting;