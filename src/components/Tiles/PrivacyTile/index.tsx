import React from "react";
import "./PrivacyTile.css";

interface PrivacyTileProps {
    title: string;
    detail: string;
}

const PrivacyTile : React.FC<PrivacyTileProps> = ({ title, detail }) => {
    return (
        <div className="privacy-tile">
            <div className="privacy-tile-container">
                <div className="privacy-tile-title">{title}</div>
                <div className="privacy-tile-detail">{detail}</div>
            </div>
        </div>
    );
};

export default PrivacyTile;