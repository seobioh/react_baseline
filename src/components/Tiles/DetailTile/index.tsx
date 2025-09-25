import React from "react";
import "./DetailTile.css";
import "./DetailTile2.css";

interface DetailTileProps {
    category?: string;
    title: string;
    subTitle?: string;
    subText1?: string;
    subText2?: string;
    subText3?: string;
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
                        {category && <p className="detail-tile-container-category">{category}</p>}
                        <p className="detail-tile-container-title">{title.length > 15 ? title.substring(0, 15) + '...' : title}</p>
                        {subTitle && <p className="detail-tile-container-sub-title">{subTitle}</p>}
                    </div>
                    <div className="detail-tile-top-section right">
                        <p className={`${isNew ? 'new' : isHot ? 'hot' : ''}`}>{isNew ? 'NEW' : isHot ? 'HOT' : ''}</p>
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


const DetailTile2: React.FC<DetailTileProps> = ({
    category,
    title,
    subTitle,
    subText1,
    subText2,
    subText3,
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
        ...(categoryColor && { '--detail-tile-2-category-color': categoryColor }),
        ...(titleColor && { '--detail-tile-2-title-color': titleColor }),
        ...(subTitleColor && { '--detail-tile-2-sub-title-color': subTitleColor }),
        ...(priceColor && { '--detail-tile-2-price-color': priceColor })
    } as React.CSSProperties;

    return (
        <div className={`detail-tile-2-container ${className}`} style={containerStyle}>
            <button 
                onClick={isClickable ? onClick : undefined}
                disabled={!isClickable}
                className={!isClickable ? 'disabled' : ''}
            >
                <div className="detail-tile-2-container-img-section">
                    {image ? (
                        <img src={image} alt={title} />
                    ) : (
                        <div className="detail-tile-2-container-no-image">
                            <p>이미지가 없습니다</p>
                        </div>
                    )}
                    <div className="detail-tile-2-container-img-section-overlay">
                        {price}
                    </div>
                </div>
                <div className="detail-tile-2-container-text-section">
                    <div className="detail-tile-2-container-text-section-top">
                        {category && <p className="detail-tile-2-container-category">{category}</p>}
                        <p className="detail-tile-2-container-title">{title}</p>
                        {subTitle && <p className="detail-tile-2-container-sub-title">{subTitle}</p>}
                        <div></div>
                        {subText1 && <p className="detail-tile-2-container-sub-text">{subText1}</p>}
                        {subText2 && <p className="detail-tile-2-container-sub-text">{subText2}</p>}
                        {subText3 && <p className="detail-tile-2-container-sub-text">{subText3}</p>}
                    </div>
                    <div className="detail-tile-2-container-text-section-status">
                        {isHot && <p className="detail-tile-2-container-text-section-status-hot">HOT</p>}
                        {isNew && <p className="detail-tile-2-container-text-section-status-new">NEW</p>}
                    </div>
                </div>
            </button>
        </div>
    );
};

export { DetailTile, DetailTile2 };