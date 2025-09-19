import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/light/logo.png";
import ToggleButton from "../Button";
import "./Header.css";

const Header: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const navigate = useNavigate();

    const handleTabClick = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };

    const tabOptions = ['KOR', 'ENG'];

    return (
        <div className="header">
            <div className="header-container">
                <div className="header-logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <img src={logoImage} alt="React Baseline Logo" className="logo" />
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