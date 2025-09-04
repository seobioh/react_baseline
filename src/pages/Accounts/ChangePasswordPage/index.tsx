import React from 'react'
import { SpaceMedium, SpaceXLarge, SpaceXXLarge } from '../../../components/Space';
import { MainTitle } from '../../../components/Text';
import ChangePassword from '../../../components/Accounts/ChangePassword';

const ChangePasswordPage: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle> 비밀번호 변경 </MainTitle>
            <SpaceXLarge />
            <ChangePassword />
            <SpaceXXLarge />
        </div>
    )
}

export default ChangePasswordPage;