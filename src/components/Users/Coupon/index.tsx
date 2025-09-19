import React, { useEffect, useState } from 'react';
import { useAccountStore } from '../../../stores/accountStore';
import CouponCode from '../CouponCode';
import './Coupon.css';

const Coupon: React.FC = () => {
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const { token } = useAccountStore();

    const isLoading = false; // 연동 필요
    const validCoupons = [];
    const invalidCoupons = [];

    useEffect(() => {
        loadCouponsData();
    }, []);

    const loadCouponsData = async () => {
        try {
        } catch (err: any) {
            alert('Error loading coupons:' + err.message);
        }
    };

    
    if (!token) {
        return null;
    }

    return (
        <div className="coupon">
            <div className="coupon-container">
                <div className="coupon-space"></div>  
                <h3>미사용 쿠폰</h3>
                <div className="coupon-space"></div>
                {isLoading ? (
                    <p>쿠폰을 불러오는 중...</p>
                ) : validCoupons.length > 0 ? (
                    <>
                        <p>사용 가능한 쿠폰을 확인할 수 있습니다.</p>
                        <div className="coupon-space"></div>
                        <table>
                            <thead>
                                <tr>
                                    <th>쿠폰명</th>
                                    <th>할인율</th>
                                    <th>최대금액</th>
                                    <th>유효기간</th>
                                </tr>
                            </thead>
                            <div className="coupon-divider"></div>
                            <div className="coupon-space-small"></div>
                            <tbody>
                                <td>쿠폰명</td>
                                <td>할인율</td>
                                <td>최대금액</td>
                                <td>유효기간</td>
                            </tbody>
                        </table>
                        <div className="coupon-space"></div>
                        <button onClick={() => setIsCouponModalOpen(true)}>쿠폰 교환</button>
                    </>
                ) : (
                    <>
                        <p>미사용 쿠폰이 없습니다.</p>
                        <div className="coupon-space"></div>
                        <button onClick={() => setIsCouponModalOpen(true)}>쿠폰 교환</button>
                    </>
                )}
            </div>

            <div className="coupon-container">
                <div className="coupon-space"></div>  
                <h3>만료된 쿠폰</h3>
                <div className="coupon-space"></div>
                {invalidCoupons.length > 0 ? (
                    <>
                        <p>사용한 쿠폰을 확인할 수 있습니다.</p>
                        <div className="coupon-space"></div>
                        <table>
                            <thead>
                                <tr>
                                    <th>쿠폰명</th>
                                    <th>할인율</th>
                                    <th>최대금액</th>
                                    <th>사용일</th>
                                </tr>
                            </thead>
                            <div className="coupon-divider"></div>
                            <div className="coupon-space-small"></div>
                            <tbody>
                                <td>쿠폰명</td>
                                <td>할인율</td>
                                <td>최대금액</td>
                                <td>사용일</td>
                            </tbody>
                        </table>
                        <div className="coupon-space"></div>
                    </>
                ) : (
                    <>
                        <p>사용한 쿠폰이 없습니다.</p>
                        <div className="coupon-space"></div>
                    </>
                )}
            </div>
            
            <CouponCode 
                isOpen={isCouponModalOpen} 
                onClose={() => {
                    setIsCouponModalOpen(false);
                    loadCouponsData();
                }} 
            />
        </div>
    );
}

export default Coupon;