import React from "react";
import "./TileDetail.css";

interface TileDetailProps {
    subTitle: string;
    title: string;
    price: string;
    image?: string;
    backgroundColor?: string;
    subTitleColor?: string;
    titleColor?: string;
    priceColor?: string;
    isHot?: boolean;
    isNew?: boolean;
    isClickable?: boolean;
    onClick: () => void;
    className?: string;
}

const TileDetail: React.FC<TileDetailProps> = ({
    title,
    subTitle,
    price,
    image,
    backgroundColor,
    subTitleColor,
    titleColor,
    priceColor,
    isHot,
    isNew,
    isClickable = true,
    onClick,
    className = ""
}) => {
    const containerStyle = {
        ...(backgroundColor && { backgroundColor }),
        ...(subTitleColor && { '--tile-sub-title-color': subTitleColor }),
        ...(titleColor && { '--tile-title-color': titleColor }),
        ...(priceColor && { '--tile-price-color': priceColor })
    } as React.CSSProperties;

    return (
        <div className={`tile-detail-container ${className}`} style={containerStyle}>
            <button 
                onClick={isClickable ? onClick : undefined}
                disabled={!isClickable}
                className={!isClickable ? 'disabled' : ''}
            >
                <div className="tile-detail-top">
                    <div className="tile-detail-top-section">
                        <p className="tile-detail-container-sub-title">{subTitle}</p>
                        <p className="tile-detail-container-title">{title.length > 15 ? title.substring(0, 15) + '...' : title}</p>
                    </div>
                    <div className="tile-detail-top-section right">
                        <p className={`${isHot ? 'hot' : isNew ? 'new' : ''}`}>{isHot ? 'HOT' : isNew ? 'NEW' : ''}</p>
                    </div>
                </div>
                <div className="tile-detail-middle">
                    <img src={image} alt={title} />
                </div>
                <div className="tile-detail-bottom">
                    <p className="tile-detail-container-price">{price}</p>
                </div>
            </button>
        </div>
    );
};

export default TileDetail;