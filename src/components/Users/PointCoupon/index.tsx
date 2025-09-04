import React, { useState } from 'react';
import { useUserStore } from '../../../stores/userStore';
import { useAccountStore } from '../../../stores/accountStore';
import closeIcon from '../../../assets/icons/light/close.svg';
import './PointCoupon.css';

interface PointRedeemProps {
  isOpen: boolean;
  onClose: () => void;
}

const PointRedeem: React.FC<PointRedeemProps> = ({ isOpen, onClose }) => {
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const { addPointCoupon, isLoading } = useUserStore();
  const { getAccountInfo } = useAccountStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!couponCode.trim()) {
      setMessage('쿠폰 코드를 입력해주세요.');
      setMessageType('error');
      return;
    }

    try {
      await addPointCoupon(couponCode.trim());
      setMessage('쿠폰이 성공적으로 사용되었습니다!');
      setMessageType('success');
      setCouponCode('');
      
      await getAccountInfo();
      
      setTimeout(() => {
        onClose();
        setMessage('');
        setMessageType('');
      }, 2000);
    } catch (error: any) {
      setMessage(error.message || '쿠폰 사용에 실패했습니다.');
      setMessageType('error');
    }
  };

  const handleClose = () => {
    setCouponCode('');
    setMessage('');
    setMessageType('');
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="point-redeem-overlay" onClick={handleClose}>
      <div className="point-redeem-modal" onClick={(e) => e.stopPropagation()}>
        <div className="point-redeem-header">
          <h3>포인트 교환</h3>
          <button className="point-redeem-close" onClick={handleClose}>
            <img src={closeIcon} alt="close" />
          </button>
        </div>
        
        <div className="point-redeem-content">
          <h3>쿠폰 코드</h3>
          <div className="point-redeem-space" />
          <p>쿠폰 코드를 입력하시면 포인트로 교환됩니다.</p>
          <div className="point-redeem-space" />

          <form onSubmit={handleSubmit} className="point-redeem-form">
            <div className="point-redeem-input">
              <input
                type="text"
                id="couponCode"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="쿠폰 코드를 입력하세요"
                disabled={isLoading}
              />
            </div>
            
            {message && (
              <div className={`point-redeem-message ${messageType}`}>
                {message}
              </div>
            )}
            
            <div className="point-redeem-space" />
            <div className="point-redeem-actions">
              <button
                type="button"
                onClick={handleClose}
                className="point-redeem-cancel"
                disabled={isLoading}
              >
                취소
              </button>
              <button
                type="submit"
                className="point-redeem-submit"
                disabled={isLoading || !couponCode.trim()}
              >
                {isLoading ? '처리 중...' : '교환하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PointRedeem;
