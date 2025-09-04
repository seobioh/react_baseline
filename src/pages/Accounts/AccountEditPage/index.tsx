import React from 'react';
import { MainTitle } from "../../../components/Text";
import { SpaceMedium, SpaceLarge, SpaceXLarge } from "../../../components/Space";
import AccountEdit from '../../../components/Accounts/AccountEdit';

const AccountEditPage: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle>계정 정보</MainTitle>
            <SpaceLarge />
            <AccountEdit />
            <SpaceXLarge />
        </div>
      )
    };

export default AccountEditPage; 