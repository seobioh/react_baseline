import React from 'react';
import { SpaceMedium, SpaceXXXLarge } from "../../../components/Space";
import AccountInfo from '../../../components/Accounts/AccountInfo';
import AccountSetting from '../../../components/Accounts/AccountAction';
import './AccountPage.css';

const AccountPage: React.FC = () => {
    return (
        <>
            <div className="account-page">
                <div className="account-page-left-section">
                    <AccountInfo />
                    <div className="account-page-setting-desktop">
                        <SpaceMedium />
                        <AccountSetting />
                    </div>
                </div>
                <div className="account-page-space"></div>
                <div className="account-page-divider"></div>
                <div className="account-page-space"></div>
                <div className="account-page-right-section">
                    <div className="account-page-setting-mobile">
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