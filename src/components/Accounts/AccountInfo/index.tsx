import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountStore } from '../../../stores/accountStore';
import profileImage from '../../../assets/images/light/profile.png';
import checkIcon from '../../../assets/icons/light/check.svg';
import PointRedeem from '../../Users/PointCoupon';
import './AccountInfo.css';

const AccountInfo : React.FC = () => {
    const [isPointRedeemModalOpen, setIsPointRedeemModalOpen] = useState(false);

    const navigate = useNavigate();
    const { token, user, getAccountInfo } = useAccountStore();
    
    useEffect(() => {
        if (!token) {
            navigate('/accounts/login');
        } else {
            getAccountInfo();
        }
    }, [token, navigate, getAccountInfo]);
    
    const pointTransactionBox = () => {
        navigate('/users/point-transactions');
    };
    
    const handleCodeExchange = () => {
        setIsPointRedeemModalOpen(true);
    };

    
    if (!token) {
        return null;
    }
    
    return (
        <div className="account-info">
            <div className="account-info-container">
                <div className="account-info-section">
                    <img src={user?.profile_image || profileImage} alt="프로필 이미지" />
                    <div className="account-info-divider" />
                    <div className="account-info-content">
                        <div className="account-info-name">
                            <h3>{user?.username}</h3>
                            <img src={checkIcon} alt="인증됨" style={{ display: user?.ci_verified ? 'block' : 'none' }} />
                        </div>
                        <div className="account-info-extra">
                            <p>{user?.name}</p>
                            <p>{user?.email}</p>
                            <p>{user?.mobile}</p>
                        </div>
                    </div>
                </div>
                <div className="account-info-point-section" onClick={pointTransactionBox}>
                    <div className="account-info-point">
                        <p>{user?.point} 원</p>
                    </div>
                    <button className="account-info-code-exchange" onClick={(e) => {
                        e.stopPropagation();
                        handleCodeExchange();
                    }}>
                        코드 교환
                    </button>
                </div>
            </div>
            <PointRedeem 
                isOpen={isPointRedeemModalOpen}
                onClose={() => {
                    setIsPointRedeemModalOpen(false);
                    getAccountInfo();
                }}
            />
        </div>
    )
}

export default AccountInfo;