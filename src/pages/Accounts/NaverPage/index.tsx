import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAccountStore } from '../../../stores/accountStore';
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium } from '../../../components/Space';

const NaverPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { naverLogin } = useAccountStore();

    useEffect(() => {
        const handleNaverLogin = async () => {
            try {
                const code = searchParams.get('code');
                const state = searchParams.get('state');
                if (!code) {
                    throw new Error('인증 코드가 없습니다.');
                }
                await naverLogin({ code, state: state || undefined });
                navigate('/accounts');
            } catch (error) {
                console.error('네이버 로그인 실패:', error);
                alert('네이버 로그인에 실패했습니다.');
                navigate('/accounts');
            }
        };

        handleNaverLogin();
    }, [searchParams, naverLogin, navigate]);

    return (
        <div>
            <SpaceMedium />
            <MainTitle> 네이버 로그인 </MainTitle>
            <SubTitle> 네이버 로그인 진행 중 </SubTitle> 
            <SpaceMedium />
        </div>
    )
}

export default NaverPage;