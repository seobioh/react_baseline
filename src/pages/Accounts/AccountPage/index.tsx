import React from 'react';
import { MainTitle } from "../../../components/Text";
import { SpaceMedium, SpaceLarge, SpaceXLarge } from "../../../components/Space";
import AccountInfo from '../../../components/Accounts/AccountInfo';
import AccountSetting from '../../../components/Accounts/AccountAction';

const AccountPage: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle>계정 정보</MainTitle>
            <SpaceLarge />
            <AccountInfo />
            <SpaceMedium />
            <AccountSetting />
            <SpaceXLarge />
        </div>
      )
    };

export default AccountPage; 