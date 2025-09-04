import React, { useState } from 'react';
import { useUserStore } from '../../../stores/userStore';
import { useAccountStore } from '../../../stores/accountStore';
import closeIcon from '../../../assets/icons/light/close.svg';
import './ReferralCode.css';

interface ReferralCodeProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferralCode: React.FC<ReferralCodeProps> = ({ isOpen, onClose }) => {
  const { addReferralCode, isLoading } = useUserStore();
  const { getAccountInfo } = useAccountStore();
  const [referralCode, setReferralCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!referralCode.trim()) {
      setMessage('추천인 코드를 입력해주세요.');
      setMessageType('error');
      return;
    }

    try {
      await addReferralCode(referralCode.trim());
      setMessage('추천인 코드가 성공적으로 등록되었습니다!');
      setMessageType('success');
      setReferralCode('');
      
      await getAccountInfo();
      
      setTimeout(() => {
        onClose();
        setMessage('');
        setMessageType('');
      }, 2000);
    } catch (error: any) {
      setMessage(error.message || '추천인 코드 등록에 실패했습니다.');
      setMessageType('error');
    }
  };

  const handleClose = () => {
    setReferralCode('');
    setMessage('');
    setMessageType('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="referral-code-overlay" onClick={handleClose}>
      <div className="referral-code-modal" onClick={(e) => e.stopPropagation()}>
        <div className="referral-code-header">
          <h3>추천인 등록</h3>
          <button className="referral-code-close" onClick={handleClose}>
            <img src={closeIcon} alt="close" />
          </button>
        </div>
        
        <div className="referral-code-content">
          <h3>추천인 코드</h3>
          <div className="referral-code-space" />
          <p>추천인 코드를 입력하시면 추천인으로 등록됩니다.</p>
          <div className="referral-code-space" />

          <form onSubmit={handleSubmit} className="referral-code-form">
            <div className="referral-code-input">
              <input
                type="text"
                id="referralCode"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                placeholder="추천인 코드를 입력하세요"
                disabled={isLoading}
              />
            </div>
            
            {message && (
              <div className={`referral-code-message ${messageType}`}>
                {message}
              </div>
            )}
            
            <div className="referral-code-space" />
            <div className="referral-code-actions">
              <button
                type="button"
                onClick={handleClose}
                className="referral-code-cancel"
                disabled={isLoading}
              >
                취소
              </button>
              <button
                type="submit"
                className="referral-code-submit"
                disabled={isLoading || !referralCode.trim()}
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

export default ReferralCode;
