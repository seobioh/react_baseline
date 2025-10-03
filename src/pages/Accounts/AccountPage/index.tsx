import React, { useState } from 'react';
import { SpaceMedium, SpaceXXXLarge } from "../../../components/Space";
import AccountInfo from '../../../components/Accounts/AccountInfo';
import AccountSetting from '../../../components/Accounts/AccountSetting';
import SliderTile from '../../../components/Tiles/SliderTile';
import sampleImage from '../../../assets/images/light/sample_img_1.png';
import './AccountPage.css';

const AccountPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<string>('subscriptions');

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
                <div className="account-page-right-section">
                    <div className="account-page-subscription">
                        <div className="account-page-subscription-button" >
                            <button 
                                className={selectedTab === 'subscriptions' ? 'active' : ''}
                                onClick={() => setSelectedTab('subscriptions')}
                            >
                                구독중 (1)
                            </button>
                            <button 
                                className={selectedTab === 'requests' ? 'active' : ''}
                                onClick={() => setSelectedTab('requests')}
                            >
                                신청됨 (2)
                            </button>
                        </div>
                        <div className="account-page-subscription-space"></div>

                        {selectedTab === 'subscriptions' && (
                            <SliderTile
                                slides={
                                    [
                                        {
                                            container: (
                                                <div className="account-page-subscription-info">
                                                    <div className="account-page-subscription-info-top">
                                                        <div className="account-page-subscription-info-top-left">
                                                            <h4>BMW</h4>
                                                            <h3>
                                                                528i
                                                            </h3>
                                                        </div>
                                                        <button>해지하기</button>
                                                    </div>
                                                    <img src={sampleImage} alt="528i" />
                                                    <p className="account-page-subscription-info-date">2025.01.01~2025.01.01</p>
                                                    <h3 className="account-page-subscription-info-date" style={{ color: '#6dd400' }}>
                                                        100일 남음
                                                    </h3>
                                                </div>
                                            ),
                                            isClickable: false
                                        },
                                        {
                                            container: (
                                                <div className="account-page-subscription-info">
                                                    <div className="account-page-subscription-info-top">
                                                        <div className="account-page-subscription-info-top-left">
                                                            <h4>BMW</h4>
                                                            <h3>
                                                                528i
                                                            </h3>
                                                        </div>
                                                        <button>해지하기</button>
                                                    </div>
                                                    <img src={sampleImage} alt="528i" />
                                                    <p className="account-page-subscription-info-date">2025.01.01~2025.01.01</p>
                                                    <h3 className="account-page-subscription-info-date" style={{ color: '#6dd400' }}>
                                                        100일 남음
                                                    </h3>
                                                </div>
                                            ),
                                            isClickable: false
                                        }
                                    ]
                                }
                                autoSlide={false}
                                showDots={true}
                                dotColor="rgba(0, 0, 0, 0.2)"
                                activeDotColor="#00c851"
                            />
                        )}

                        {selectedTab === 'requests' && (
                            <SliderTile
                                slides={
                                    [
                                        {
                                            container: (
                                                <div className="account-page-subscription-info">
                                                    <div className="account-page-subscription-info-top">
                                                        <div className="account-page-subscription-info-top-left">
                                                            <h4>BMW</h4>
                                                            <h3>
                                                                528i
                                                            </h3>
                                                        </div>
                                                        <button>취소하기</button>
                                                    </div>
                                                    <img src={sampleImage} alt="528i" />
                                                    <p className="account-page-subscription-info-date">2025.01.01~2025.01.01</p>
                                                    <h3 className="account-page-subscription-info-date" style={{ color: '#6dd400' }}>
                                                        100일 남음
                                                    </h3>
                                                </div>
                                            ),
                                            isClickable: false
                                        },
                                        {
                                            container: (
                                                <div className="account-page-subscription-info">
                                                    <div className="account-page-subscription-info-top">
                                                        <div className="account-page-subscription-info-top-left">
                                                            <h4>BMW</h4>
                                                            <h3>
                                                                528i
                                                            </h3>
                                                        </div>
                                                        <button>취소하기</button>
                                                    </div>
                                                    <img src={sampleImage} alt="528i" />
                                                    <p className="account-page-subscription-info-date">2025.01.01~2025.01.01</p>
                                                    <h3 className="account-page-subscription-info-date" style={{ color: '#6dd400' }}>
                                                        100일 남음
                                                    </h3>
                                                </div>
                                            ),
                                            isClickable: false
                                        }
                                    ]
                                }
                                autoSlide={false}
                                showDots={true}
                                dotColor="rgba(0, 0, 0, 0.2)"
                                activeDotColor="#00c851"
                            />
                        )}
                    </div>
                </div>
            </div>
            <SpaceXXXLarge/>
            <SpaceMedium />
        </>
    );
};

export default AccountPage; 