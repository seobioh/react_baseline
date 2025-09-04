import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAccountStore } from '../../../stores/accountStore';
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium } from '../../../components/Space';

const KakaoPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { kakaoLogin } = useAccountStore();

    useEffect(() => {
        const handleKakaoLogin = async () => {
            try {
                const code = searchParams.get('code');
                const state = searchParams.get('state');
                if (!code) {
                    throw new Error('인증 코드가 없습니다.');
                }
                await kakaoLogin({ code, state: state || undefined });
                window.location.href = '/accounts';
            } catch (error) {
                console.error('카카오 로그인 실패:', error);
                alert('카카오 로그인에 실패했습니다.');
                window.location.href = '/accounts';
            }
        };

        handleKakaoLogin();
    }, [searchParams, kakaoLogin]);

    return (
        <div>
            <SpaceMedium />
            <MainTitle> 카카오 로그인 </MainTitle>
            <SubTitle> 카카오 로그인 진행 중 </SubTitle> 
            <SpaceMedium />
        </div>
    )
}

export default KakaoPage;