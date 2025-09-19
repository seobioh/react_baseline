import React, { useState } from 'react';
import { useAccountStore } from '../../../stores/accountStore';
import closeIcon from '../../../assets/icons/light/close.svg';
import './CouponCode.css';

interface CouponCodeProps {
  isOpen: boolean;
  onClose: () => void;
}

const CouponCode: React.FC<CouponCodeProps> = ({ isOpen, onClose }) => {
  const { getAccountInfo } = useAccountStore();
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const isLoading = false; // 연동 필요

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!couponCode.trim()) {
      setMessage('쿠폰 코드를 입력해주세요.');
      setMessageType('error');
      return;
    }

    try {
      setMessage('쿠폰 코드가 성공적으로 등록되었습니다!');
      setMessageType('success');
      setCouponCode('');
      
      await getAccountInfo();
      
      setTimeout(() => {
        onClose();
        setMessage('');
        setMessageType('');
      }, 2000);
    } catch (error: any) {
      console.error('Coupon registration error:', error);
      const errorMessage = error.message || error.errors || '쿠폰 코드 등록에 실패했습니다.';
      setMessage(errorMessage);
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
    <div className="coupon-code-overlay" onClick={handleClose}>
      <div className="coupon-code-modal" onClick={(e) => e.stopPropagation()}>
        <div className="coupon-code-header">
          <h3>쿠폰 등록</h3>
          <button className="coupon-code-close" onClick={handleClose}>
            <img src={closeIcon} alt="close" />
          </button>
        </div>
        
        <div className="coupon-code-content">
          <h3>쿠폰 코드</h3>
          <div className="coupon-code-space" />
          <p>쿠폰 코드를 입력하시면 쿠폰으로 등록됩니다.</p>
          <div className="coupon-code-space" />

          <form onSubmit={handleSubmit} className="coupon-code-form">
            <div className="coupon-code-input">
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
              <div className={`coupon-code-message ${messageType}`}>
                {message}
              </div>
            )}
            
            <div className="coupon-code-space" />
            <div className="coupon-code-actions">
              <button
                type="button"
                onClick={handleClose}
                className="coupon-code-cancel"
                disabled={isLoading}
              >
                취소
              </button>
              <button
                type="submit"
                className="coupon-code-submit"
                disabled={isLoading || !couponCode.trim()}
              >
                {isLoading ? '처리 중...' : '등록하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CouponCode;
