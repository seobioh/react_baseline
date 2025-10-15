import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAccountStore } from '../../../stores/accountStore';
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium } from '../../../components/Space';

const PaymentPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { user, token, isAuthenticated } = useAccountStore();
    const navigate = useNavigate();

    useEffect(() => {
        const requestPayment = async (productId: number, paymentData: any) => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}/order`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token?.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });
            const result = await response.json();
            if (response.status >= 200 && response.status < 300 && result.data) {
                return result.data;
            } else {
                throw new Error(result.message || '결제에 실패했습니다.');
            }
        };

        const handlePaymentSuccess = async () => {
            try {
                const productId = searchParams.get('id');
                const month = searchParams.get('month');
                const couponId = searchParams.get('couponId');
                const pointAmount = searchParams.get('pointAmount');
                const startDate = searchParams.get('startDate');
                const customerKey = searchParams.get('customerKey');
                const authKey = searchParams.get('authKey');

                if (!productId || !month) {
                    throw new Error('필수 파라미터가 누락되었습니다.');
                }

                if (!isAuthenticated || !token || !user) {
                    throw new Error('로그인이 필요합니다.');
                }

                const paymentData = {
                    month: parseInt(month),
                    coupon_id: couponId ? parseInt(couponId) : undefined,
                    point_amount: pointAmount ? parseInt(pointAmount) : undefined,
                    start_date: startDate || undefined,
                    auth_key: authKey || undefined,
                    customer_key: customerKey || undefined,
                };

                await requestPayment(parseInt(productId), paymentData);
                navigate('/orders/success');

            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
                navigate(`/orders/fail?error=${encodeURIComponent(errorMessage)}`);
            }
        };

        handlePaymentSuccess();
    }, [searchParams, isAuthenticated, token, user, navigate]);

    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle> 결제 진행중 </MainTitle>
            <SubTitle> 결제를 처리하고 있습니다... </SubTitle> 
            <SpaceMedium />
        </div>
    )
}

export default PaymentPage;