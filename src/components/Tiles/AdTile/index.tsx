import React, { useState, useEffect, useRef } from "react";
import "./AdTile.css";

interface AdData {
    subTitle?: string;
    title?: string;
    subTitleColor?: string;
    titleColor?: string;
    imageDesktop: string;
    imageMobile: string;
    isClickable?: boolean;
    onClick: () => void;
}

interface AdTileProps {
    ads: AdData[];
    autoSlide?: boolean;
    slideInterval?: number;
    className?: string;
}

const AdTile: React.FC<AdTileProps> = ({
    ads,
    autoSlide = true,
    slideInterval = 3000,
    className = ""
}) => {
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [hasDragged, setHasDragged] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const currentAd = ads[currentAdIndex];

    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        if (!autoSlide || ads.length <= 1 || isDragging) return;
        const interval = setInterval(() => {
            setCurrentAdIndex((prevIndex) => 
                (prevIndex + 1) % ads.length
            );
        }, slideInterval);
        return () => clearInterval(interval);
    }, [autoSlide, slideInterval, ads.length, isDragging]);

    const getImageUrl = (ad: AdData) => {
        if (isDesktop) {
            return ad.imageDesktop;
        } else {
            return ad.imageMobile;
        }
    };

    const handleStart = (clientX: number) => {
        setIsDragging(true);
        setStartX(clientX);
        setCurrentX(clientX);
        setDragOffset(0);
        setHasDragged(false);
    };

    const handleMove = (clientX: number) => {
        if (!isDragging) return;
        const deltaX = clientX - startX;
        setCurrentX(clientX);
        setDragOffset(deltaX);
        if (Math.abs(deltaX) > 10) {
            setHasDragged(true);
        }
    };

    const handleEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        const deltaX = currentX - startX;
        const threshold = 50;
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                setCurrentAdIndex((prevIndex) => 
                    prevIndex === 0 ? ads.length - 1 : prevIndex - 1
                );
            } else {
                setCurrentAdIndex((prevIndex) => 
                    (prevIndex + 1) % ads.length
                );
            }
        }
        setDragOffset(0);
        setTimeout(() => {
            setHasDragged(false);
        }, 100);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        handleStart(touch.clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging) {
            e.preventDefault();
        }
        const touch = e.touches[0];
        handleMove(touch.clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        handleEnd();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        handleStart(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        e.preventDefault();
        handleMove(e.clientX);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        e.preventDefault();
        handleEnd();
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
        e.preventDefault();
        handleEnd();
    };


    if (!currentAd) return null;

    return (
        <div 
            ref={containerRef}
            className={`ad-tile ${className}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <div 
                className="ad-tile-slider"
                style={{
                    transform: `translateX(calc(-${currentAdIndex * 100}% + ${dragOffset}px))`,
                    transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
                }}
            >
                {ads.map((ad, index) => {
                    const adTileStyle = {
                        ...(ad.subTitleColor && { '--ad-tile-subtitle-color': ad.subTitleColor }),
                        ...(ad.titleColor && { '--ad-tile-title-color': ad.titleColor })
                    } as React.CSSProperties;

                    return (
                        <div 
                            key={index}
                            className="ad-tile-container"
                            style={adTileStyle}
                        >
                            <div className="ad-tile-image" style={{
                                backgroundImage: `url(${getImageUrl(ad)})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}></div>

                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    
                                    if (isDragging || hasDragged) {
                                        return;
                                    }
                                    
                                    if (ad.isClickable !== false) {
                                        ad.onClick();
                                    }
                                }}
                                className={`ad-tile-button ${ad.isClickable === false ? 'disabled' : ''}`}
                            >
                                <div className="ad-tile-content">
                                    <p className="ad-tile-subtitle">{ad.subTitle}</p>
                                    <p className="ad-tile-title">{ad.title}</p>
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>
            
            {ads.length > 1 && (
                <div className="ad-tile-ad-dots">
                    {ads.map((_, index) => (
                        <button
                            key={index}
                            className={`ad-tile-dot ${index === currentAdIndex ? 'active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentAdIndex(index);
                            }}
                            aria-label={`광고 ${index + 1}로 이동`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdTile;