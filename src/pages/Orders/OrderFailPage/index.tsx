import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SpaceMedium, SpaceXLarge, SpaceXXXLarge } from '../../../components/Space';
import { MainTitle, SubTitle } from '../../../components/Text';
import checkIcon from '../../../assets/icons/light/fail.svg';
import './OrderFailPage.css';

const OrderFailPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [countdown, setCountdown] = useState(240);
    
    const error = searchParams.get('error') || '알 수 없는 오류가 발생했습니다.';

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="order-fail-page">
            <SpaceXLarge />
            <MainTitle> 주문 실패 </MainTitle>
            <SubTitle> 주문에 실패하였습니다. {error}</SubTitle>

            <SpaceXXXLarge />
            <img src={checkIcon} alt="check" />
            <SpaceXXXLarge />

            <button onClick={() => navigate('/')}>확인</button>
            <SpaceMedium />
            <SubTitle>{countdown}초 뒤 자동으로 메인화면으로 복귀합니다</SubTitle>
            <SpaceXXXLarge />
        </div>
    );
};

export default OrderFailPage;