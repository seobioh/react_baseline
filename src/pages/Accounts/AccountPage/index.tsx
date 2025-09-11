import React from 'react';
import { MainTitle } from "../../../components/Text";
import { SpaceMedium, SpaceLarge, SpaceXLarge, SpaceXXXLarge } from "../../../components/Space";
import AccountInfo from '../../../components/Accounts/AccountInfo';
import AccountSetting from '../../../components/Accounts/AccountAction';
import './AccountPage.css';

const AccountPage: React.FC = () => {
    return (
        <>
            <div className="account-page">
                <div className="account-left-section">
                    <AccountInfo />
                    <div className="account-setting-mobile">
                        <SpaceMedium />
                        <AccountSetting />
                    </div>
                </div>
                <div className="account-space"></div>
                <div className="account-divider"></div>
                <div className="account-space"></div>
                <div className="account-right-section">
                    <div className="account-setting-desktop">
                        <AccountSetting />
                        <SpaceXXXLarge/>
                        <SpaceMedium />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountPage; 