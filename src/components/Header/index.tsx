import React, { useState } from "react";
import logoImage from "../../assets/images/light/logo.png";
import ToggleButton from "../Button";
import "./Header.css";

const Header: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleTabClick = (tabIndex: number) => {
        setActiveTab(tabIndex);
        if (tabIndex === 0) {
            console.log('구독 탭 선택됨');
        } else if (tabIndex === 1) {
            console.log('의전 탭 선택됨');
        }
    };

    const tabOptions = ['선택1', '선택2', '선택3'];

    return (
        <div className="header">
            <div className="header-container">
                <div className="logo-container">
                    <img src={logoImage} alt="VAHANA Logo" className="logo" />
                </div>
                <ToggleButton
                    options={tabOptions}
                    activeValue={activeTab}
                    onToggle={handleTabClick}
                    className="tab-toggle"
                />
            </div>
        </div>
    )
}

export default Header;