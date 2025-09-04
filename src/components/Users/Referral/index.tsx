import React, { useEffect, useState } from 'react';
import { useUserStore, type ReferralStatus } from '../../../stores/userStore';
import { useAccountStore } from '../../../stores/accountStore';
import ReferralCode from '../ReferralCode';
import './Referral.css';

const Referral: React.FC = () => {
    const [referralsData, setReferralsData] = useState<ReferralStatus | null>(null);
    const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
    const referralsGiven = referralsData?.referrals_given || [];
    const referralsReceived = referralsData?.referrals_received || [];

    const { getReferralStatus } = useUserStore();
    const { token } = useAccountStore();

    useEffect(() => {
        loadReferralsData();
    }, []);

    const loadReferralsData = async () => {
        try {
            const data = await getReferralStatus();
            setReferralsData(data);
        } catch (err: any) {
            alert('Error loading referrals:' + err.message);
        }
    };

    
    if (!token) {
        return null;
    }

    return (
        <div className="referral">
            <div className="referral-container">
                <div className="referral-space"></div>  
                <h3>내가 추천한 사람</h3>
                <div className="referral-space"></div>
                {referralsGiven.length > 0 ? (
                    <>
                        <p>내가 추천한 사람을 확인할 수 있습니다.</p>
                        <div className="referral-space"></div>
                        <table>
                            <thead>
                                <tr>
                                    <th>내가 추천한 사용자</th>
                                    <th>추천일</th>
                                </tr>
                            </thead>
                            <div className="referral-divider"></div>
                            <div className="referral-space-small"></div>
                            <tbody>
                                {referralsGiven.map((referral, index) => (
                                    <tr key={index}>
                                        <td>{referral.referree_username || '사용자'}</td>
                                        <td>{new Date(referral.created_at).toLocaleDateString('ko-KR')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="referral-space"></div>
                    </>
                ) : (
                    <>
                        <p>추천한 사람이 없습니다.</p>
                        <div className="referral-space"></div>
                       <button onClick={() => setIsReferralModalOpen(true)}>추천인 등록</button>
                    </>
                )}
            </div>

            <div className="referral-container">
                <div className="referral-space"></div>  
                <h3>나를 추천한 사람</h3>
                <div className="referral-space"></div>
                {referralsReceived.length > 0 ? (
                    <>
                        <p>나를 추천한 사람을 확인할 수 있습니다.</p>
                        <div className="referral-space"></div>
                        <table>
                            <thead>
                                <tr>
                                    <th>나를 추천한 사용자</th>
                                    <th>추천일</th>
                                </tr>
                            </thead>
                            <div className="referral-divider"></div>
                            <div className="referral-space-small"></div>
                            <tbody>
                                {referralsReceived.map((referral, index) => (
                                    <tr key={index}>
                                        <td>{referral.referrer_username || '사용자'}</td>
                                        <td>{new Date(referral.created_at).toLocaleDateString('ko-KR')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="referral-space"></div>
                    </>
                ) : (
                    <>
                        <p>나를 추천한 사람이 없습니다.</p>
                        <div className="point-transaction-space"></div>
                    </>
                )}
            </div>
            
            <ReferralCode 
                isOpen={isReferralModalOpen} 
                onClose={() => {
                    setIsReferralModalOpen(false);
                    loadReferralsData();
                }} 
            />
        </div>
    );
}

export default Referral;