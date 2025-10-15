import React from "react";
import "./DetailTile.css";
import "./DetailTile2.css";
import "./DetailTile3.css";

interface DetailTileProps {
    brand?: string;
    product: string;
    category?: string;
    description?: string;
    description2?: string;
    description3?: string;
    price: string;
    image?: string;
    backgroundColor?: string;
    brandColor?: string;
    productColor?: string;
    categoryColor?: string;
    descriptionColor?: string;
    priceColor?: string;
    isHot?: boolean;
    isNew?: boolean;
    isClickable?: boolean;
    onClick: () => void;
    className?: string;
}

const DetailTile: React.FC<DetailTileProps> = ({
    brand,
    product,
    category,
    description,
    price,
    image,
    backgroundColor,
    brandColor,
    productColor,
    categoryColor,
    descriptionColor,
    priceColor,
    isHot,
    isNew,
    isClickable = true,
    onClick,
    className = ""
}) => {
    const containerStyle = {
        ...(backgroundColor && { backgroundColor }),
        ...(brandColor && { '--detail-tile-brand-color': brandColor }),
        ...(productColor && { '--detail-tile-product-color': productColor }),
        ...(categoryColor && { '--detail-tile-category-color': categoryColor }),
        ...(descriptionColor && { '--detail-tile-description-color': descriptionColor }),
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
                        {brand && <p className="detail-tile-container-brand">{brand}</p>}
                        <p className="detail-tile-container-product">
                            {product ? (product.length > 15 ? product.substring(0, 15) + '...' : product) : '제품명 없음'}
                        </p>
                        {category && <p className="detail-tile-container-category">{category}</p>}
                        {description && <p className="detail-tile-container-description">{description}</p>}
                    </div>
                    <div className="detail-tile-top-section right">
                        <p className={`${isNew ? 'new' : isHot ? 'hot' : ''}`}>{isNew ? 'NEW' : isHot ? 'HOT' : ''}</p>
                    </div>
                </div>
                <div className="detail-tile-middle">
                    <img src={image} alt={product || 'Product image'} />
                </div>
                <div className="detail-tile-bottom">
                    <p className="detail-tile-container-price">{price}</p>
                </div>
            </button>
        </div>
    );
};


const DetailTile2: React.FC<DetailTileProps> = ({
    brand,
    product,
    category,
    description,
    description2,
    description3,
    price,
    image,
    backgroundColor,
    brandColor,
    productColor,
    categoryColor,
    descriptionColor,
    priceColor,
    isHot,
    isNew,
    isClickable = true,
    onClick,
    className = ""
}) => {
    const containerStyle = {
        ...(backgroundColor && { backgroundColor }),
        ...(brandColor && { '--detail-tile-2-brand-color': brandColor }),
        ...(productColor && { '--detail-tile-2-product-color': productColor }),
        ...(categoryColor && { '--detail-tile-2-category-color': categoryColor }),
        ...(descriptionColor && { '--detail-tile-2-description-color': descriptionColor }),
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
                        <img src={image} alt={product || 'Product image'} />
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
                        {brand && <p className="detail-tile-2-container-brand">{brand}</p>}
                        <p className="detail-tile-2-container-product">{product || '제품명 없음'}</p>
                        {category && <p className="detail-tile-2-container-category">{category}</p>}
                    </div>
                    <div className="detail-tile-2-container-text-section-middle">
                        {description && <p className="detail-tile-2-container-description">{description}</p>}
                        {description2 && <p className="detail-tile-2-container-description">{description2}</p>}
                        {description3 && <p className="detail-tile-2-container-description">{description3}</p>}
                    </div>
                    <div className="detail-tile-2-container-text-section-bottom">
                        {isHot && <p className="detail-tile-2-container-text-section-status-hot">HOT</p>}
                        {isNew && <p className="detail-tile-2-container-text-section-status-new">NEW</p>}
                    </div>
                </div>
            </button>
        </div>
    );
};

const DetailTile3: React.FC<DetailTileProps> = ({
    brand,
    product,
    category,
    description,
    price,
    image,
    backgroundColor,
    brandColor,
    productColor,
    categoryColor,
    descriptionColor,
    priceColor,
    isClickable = true,
    onClick,
    className = ""
}) => {
    const containerStyle = {
        ...(backgroundColor && { backgroundColor }),
        ...(brandColor && { '--detail-tile-3-brand-color': brandColor }),
        ...(productColor && { '--detail-tile-3-product-color': productColor }),
        ...(categoryColor && { '--detail-tile-3-category-color': categoryColor }),
        ...(descriptionColor && { '--detail-tile-3-description-color': descriptionColor }),
        ...(priceColor && { '--detail-tile-3-price-color': priceColor })
    } as React.CSSProperties;

    return (
        <div className={`detail-tile-3-container ${className}`} style={containerStyle}>
            <button 
                onClick={isClickable ? onClick : undefined}
                disabled={!isClickable}
                className={!isClickable ? 'disabled' : ''}
            >
                <div className="detail-tile-3-container-img-section">
                    {image ? (
                        <img src={image} alt={product || 'Product image'} />
                    ) : (
                        <div className="detail-tile-3-container-no-image">
                            <p>이미지가 없습니다</p>
                        </div>
                    )}
                </div>
                <div className="detail-tile-3-container-text-section">
                    <div className="detail-tile-3-container-text-section-top">
                        {brand && <p className="detail-tile-3-container-brand">{brand}</p>}
                        <p className="detail-tile-3-container-product">{product || '제품명 없음'}</p>
                        {category && <p className="detail-tile-3-container-category">{category}</p>}
                    </div>
                    <div className="detail-tile-3-container-text-section-bottom">
                        {description && <p className="detail-tile-3-container-description">{description}</p>}
                        {price && <p className="detail-tile-3-container-price">{price}</p>}
                    </div>
                </div>
            </button>
        </div>
    );
};

export { DetailTile, DetailTile2, DetailTile3 };