import React from 'react'
import { SpaceMedium, SpaceXLarge, SpaceXXLarge } from '../../../components/Space';
import { MainTitle } from '../../../components/Text';
import ResetPassword from '../../../components/Accounts/ResetPassword';

const ResetPasswordPage: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle> 비밀번호 찾기 </MainTitle>
            <SpaceXLarge />
            <ResetPassword />
            <SpaceXXLarge />
        </div>
    )
}

export default ResetPasswordPage;