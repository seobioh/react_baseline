import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAccountStore } from '../../../stores/accountStore';
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium } from '../../../components/Space';

const PortOnePage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { portOneIdentity } = useAccountStore();

    useEffect(() => {
        const handlePortOneIdentity = async () => {
            try {
                const identity_code = searchParams.get('identityVerificationId');
                if (!identity_code) {
                    throw new Error('인증 코드가 없습니다.');
                }
                await portOneIdentity({ identity_code });
                window.location.href = '/accounts';
            } catch (error) {
                console.error('PortOne 본인인증 실패:', error);
                alert('본인인증에 실패했습니다.');
                window.location.href = '/accounts';
            }
        };

        handlePortOneIdentity();
    }, [searchParams, portOneIdentity]);

    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle> 본인인증 </MainTitle>
            <SubTitle> 본인인증 진행 중 </SubTitle> 
            <SpaceMedium />
        </div>
    )
}

export default PortOnePage;