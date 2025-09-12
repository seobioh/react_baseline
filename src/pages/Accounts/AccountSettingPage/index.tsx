import React from 'react'
import { MainTitle } from '../../../components/Text';
import { SpaceMedium, SpaceXLarge, SpaceXXLarge } from '../../../components/Space';
import AccountSetting from '../../../components/Accounts/AccountSetting';

const AccountSettingPage: React.FC = () => {
    return (
        <div style={{ width: '100%' }}>
            <SpaceMedium />
            <MainTitle> 계정 설정 </MainTitle>
            <SpaceXLarge />
            <AccountSetting />
            <SpaceXXLarge />
        </div>
      )
    };

export default AccountSettingPage;