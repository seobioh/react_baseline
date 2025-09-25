import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAccountStore } from '../../../stores/accountStore';
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium } from '../../../components/Space';

const GooglePage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { googleLogin } = useAccountStore();

    useEffect(() => {
        const handleGoogleLogin = async () => {
            try {
                const code = searchParams.get('code');
                if (!code) {
                    throw new Error('인증 코드가 없습니다.');
                }
                const encodedCode = encodeURIComponent(code);
                await googleLogin({ code: encodedCode });
                window.location.href = '/accounts';
            } catch (error) {
                console.error('구글 로그인 실패:', error);
                alert('구글 로그인에 실패했습니다.');
                window.location.href = '/accounts';
            }
        };

        handleGoogleLogin();
    }, [searchParams, googleLogin]);

    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle> 구글 로그인 </MainTitle>
            <SubTitle> 구글 로그인 진행 중 </SubTitle> 
            <SpaceMedium />
        </div>
    )
}

export default GooglePage;