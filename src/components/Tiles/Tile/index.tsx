import React, { useRef, useEffect, useState } from "react";
import "./Tile.css";

interface TileProps {
    subTitle: string;
    title: string;
    backgroundImage?: string;
    aspectRatio?: string;
    aspectRatioDesktop?: string;
    backgroundColor?: string;
    subTitleColor?: string;
    titleColor?: string;
    isClickable?: boolean;
    onClick: () => void;
    className?: string;
}

const Tile: React.FC<TileProps> = ({
    subTitle,
    title,
    backgroundImage,
    aspectRatio,
    aspectRatioDesktop,
    backgroundColor,
    subTitleColor,
    titleColor,
    isClickable = true,
    onClick,
    className = ""
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [bgSize, setBgSize] = useState<string>('60px 30px');
    const [bgPosition, setBgPosition] = useState<string>('150% 90%');
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        const updateBackground = () => {
            if (containerRef.current && backgroundImage) {
                const rect = containerRef.current.getBoundingClientRect();
                const height = rect.height;
                
                const bgHeight = height * 1;
                const bgWidth = height * 2.0;
                
                const rightOffset = isDesktop ? height * 1 : height * 1.2;
                const bottomOffset = isDesktop ? height * 0.05 : height * 0.1;
                
                setBgSize(`${bgWidth}px ${bgHeight}px`);
                setBgPosition(`calc(100% + ${rightOffset}px) calc(100% + ${bottomOffset}px)`);
            }
        };
        updateBackground();
        
        const resizeObserver = new ResizeObserver(updateBackground);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, [backgroundImage, isDesktop]);

    const containerStyle = {
        ...(backgroundImage && { '--tile-bg-image': `url(${backgroundImage})` }),
        ...(backgroundColor && { backgroundColor }),
        ...(subTitleColor && { '--tile-sub-title-color': subTitleColor }),
        ...(titleColor && { '--tile-title-color': titleColor }),
        ...(aspectRatio && { '--tile-aspect-ratio': aspectRatio }),
        ...(aspectRatioDesktop && { '--tile-aspect-ratio-desktop': aspectRatioDesktop }),
        ...(backgroundImage && { '--tile-bg-size': bgSize }),
        ...(backgroundImage && { '--tile-bg-position': bgPosition })
    } as React.CSSProperties;

    return (
        <div 
            ref={containerRef}
            className={`tile-container ${className}`}
            style={containerStyle}
        >
            <button 
                onClick={isClickable ? onClick : undefined}
                disabled={!isClickable}
                className={!isClickable ? 'disabled' : ''}
            >
                <div className="tile-container-top">
                    <p className="tile-container-sub-title">{subTitle}</p>
                    <p className="tile-container-title">{title.length > 15 ? title.substring(0, 15) + '...' : title}</p>
                </div>
            </button>
        </div>
    );
};

export default Tile;
