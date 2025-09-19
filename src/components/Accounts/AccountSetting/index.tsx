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

    const handleCouponStatus = () => {
        navigate('/users/coupons');
    };

    const handleIdentityVerification = () => {
        // TODO: 본인 인증 페이지로 이동
        alert('본인 인증 기능은 준비 중입니다.');
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
            <div className="account-setting-container">
                <div className="account-setting-section">
                    <button className="account-setting-section-button" onClick={handleCouponStatus}>
                        <p>혜택 쿠폰함</p>
                        <img src={arrowForwardIcon} alt="arrow-forward" />
                    </button>
                    <div className="account-setting-divider" />
                    <button className="account-setting-section-button" onClick={handleReferralStatus}>
                        <p>추천인 현황</p>
                        <img src={arrowForwardIcon} alt="arrow-forward" />
                    </button>
                    <div className="account-setting-divider" />
                    {!user?.ci_verified && (
                        <>
                            <button className="account-setting-section-button" onClick={handleIdentityVerification}>
                                <p>본인인증</p>
                                <img src={arrowForwardIcon} alt="arrow-forward" />
                            </button>
                            <div className="account-setting-divider" />
                        </>
                    )}
                    <button className="account-setting-section-button" onClick={handleEditProfile}>
                        <p>회원정보 수정</p>
                        <img src={arrowForwardIcon} alt="arrow-forward" />
                    </button>
                    <div className="account-setting-divider" />
                    <button className="account-setting-section-button" onClick={handleChangePassword}>
                        <p>비밀번호 변경</p>
                        <img src={arrowForwardIcon} alt="arrow-forward" />
                    </button>
                    <div className="account-setting-divider" />
                    <button className="account-setting-section-button" onClick={handleLogout}>
                        <p>로그아웃</p>
                        <img src={arrowForwardIcon} alt="arrow-forward" />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default AccountSetting;