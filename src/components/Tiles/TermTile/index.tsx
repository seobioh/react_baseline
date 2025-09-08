import React from "react";
import "./TermTile.css";

interface TermTileProps {
    title: string;
    detail: string;
}

const TermTile : React.FC<TermTileProps> = ({ title, detail }) => {
    return (
        <div className="term-tile">
            <div className="term-tile-container">
                <div className="term-tile-title">{title}</div>
                <div className="term-tile-detail">{detail}</div>
            </div>
        </div>
    );
};

export default TermTile;