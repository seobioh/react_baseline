import React from "react";
import "./DetailTile.css";

interface DetailTileProps {
    category: string;
    title: string;
    subTitle?: string;
    price: string;
    image?: string;
    backgroundColor?: string;
    categoryColor?: string;
    titleColor?: string;
    subTitleColor?: string;
    priceColor?: string;
    isHot?: boolean;
    isNew?: boolean;
    isClickable?: boolean;
    onClick: () => void;
    className?: string;
}

const DetailTile: React.FC<DetailTileProps> = ({
    category,
    title,
    subTitle,
    price,
    image,
    backgroundColor,
    categoryColor,
    titleColor,
    subTitleColor,
    priceColor,
    isHot,
    isNew,
    isClickable = true,
    onClick,
    className = ""
}) => {
    const containerStyle = {
        ...(backgroundColor && { backgroundColor }),
        ...(categoryColor && { '--detail-tile-category-color': categoryColor }),
        ...(titleColor && { '--detail-tile-title-color': titleColor }),
        ...(subTitleColor && { '--detail-tile-sub-title-color': subTitleColor }),
        ...(priceColor && { '--detail-tile-price-color': priceColor })
    } as React.CSSProperties;

    return (
        <div className={`detail-tile-container ${className}`} style={containerStyle}>
            <button 
                onClick={isClickable ? onClick : undefined}
                disabled={!isClickable}
                className={!isClickable ? 'disabled' : ''}
            >
                <div className="detail-tile-top">
                    <div className="detail-tile-top-section">
                        <p className="detail-tile-container-category">{category}</p>
                        <p className="detail-tile-container-title">{title.length > 15 ? title.substring(0, 15) + '...' : title}</p>
                        <p className="detail-tile-container-sub-title">{subTitle}</p>
                    </div>
                    <div className="detail-tile-top-section right">
                        <p className={`${isHot ? 'hot' : isNew ? 'new' : ''}`}>{isHot ? 'HOT' : isNew ? 'NEW' : ''}</p>
                    </div>
                </div>
                <div className="detail-tile-middle">
                    <img src={image} alt={title} />
                </div>
                <div className="detail-tile-bottom">
                    <p className="detail-tile-container-price">{price}</p>
                </div>
            </button>
        </div>
    );
};

export default DetailTile;