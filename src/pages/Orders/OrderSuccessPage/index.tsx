import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpaceMedium, SpaceXLarge, SpaceXXXLarge } from '../../../components/Space';
import { MainTitle, SubTitle } from '../../../components/Text';
import checkIcon from '../../../assets/icons/light/check.svg';
import './OrderSuccessPage.css';

const OrderSuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(240);

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
        <div className="order-success-page">
            <SpaceXLarge />
            <MainTitle> 주문 완료 </MainTitle>
            <SubTitle> 주문이 완료되었습니다. 담당자가 곧 연락드리겠습니다. </SubTitle>

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

export default OrderSuccessPage;