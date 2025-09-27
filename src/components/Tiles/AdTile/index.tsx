import React, { useState, useEffect, useRef } from "react";
import "./AdTile.css";

interface AdData {
    subTitle?: string;
    title?: string;
    subTitleColor?: string;
    titleColor?: string;
    backgroundImage?: string;
    imageDesktop: string;
    imageMobile: string;
    aspectRatioMobile?: string;
    aspectRatioDesktop?: string;
    borderRadiusMobile?: string;
    borderRadiusDesktop?: string;
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
    const [slideWidth, setSlideWidth] = useState(100);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const currentAd = ads[currentAdIndex];

    useEffect(() => {
        const updateContainerInfo = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                setIsDesktop(width >= 768);
            }
        };

        updateContainerInfo();
        window.addEventListener('resize', updateContainerInfo);
        return () => window.removeEventListener('resize', updateContainerInfo);
    }, []);

    useEffect(() => {
        const updateSlideWidth = () => {
            if (containerRef.current) {
                setSlideWidth(100);
            }
        };

        updateSlideWidth();
        window.addEventListener('resize', updateSlideWidth);
        return () => window.removeEventListener('resize', updateSlideWidth);
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

    const handleTouchEnd = () => {
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

    const mainContainerStyle = {
        ...(isDesktop && currentAd.borderRadiusDesktop && { borderRadius: currentAd.borderRadiusDesktop }),
        ...(!isDesktop && currentAd.borderRadiusMobile && { borderRadius: currentAd.borderRadiusMobile })
    } as React.CSSProperties;

    return (
        <div 
            ref={containerRef}
            className={`ad-tile ${className}`}
            style={mainContainerStyle}
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
                    transform: `translateX(calc(-${currentAdIndex * slideWidth}% + ${dragOffset}px))`,
                    transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
                }}
            >
                {ads.map((ad, index) => {
                    const getBackgroundImageValue = (bgImage?: string) => {
                        if (!bgImage) return undefined;
                        if (bgImage.startsWith('url(') || bgImage.startsWith('linear-gradient') || bgImage.startsWith('radial-gradient') || bgImage.startsWith('#') || bgImage.startsWith('rgb') || bgImage.startsWith('rgba')) {
                            return bgImage;
                        }
                        return `url(${bgImage})`;
                    };

                    const adTileStyle = {
                        ...(ad.subTitleColor && { '--ad-tile-subtitle-color': ad.subTitleColor }),
                        ...(ad.titleColor && { '--ad-tile-title-color': ad.titleColor }),
                        ...(ad.backgroundImage && { '--ad-tile-background-image': getBackgroundImageValue(ad.backgroundImage) }),
                        ...(isDesktop && ad.aspectRatioDesktop && { '--ad-tile-aspect-ratio': ad.aspectRatioDesktop }),
                        ...(!isDesktop && ad.aspectRatioMobile && { '--ad-tile-aspect-ratio': ad.aspectRatioMobile }),
                        ...(isDesktop && ad.borderRadiusDesktop && { '--ad-tile-radius-desktop': ad.borderRadiusDesktop }),
                        ...(!isDesktop && ad.borderRadiusMobile && { '--ad-tile-radius-mobile': ad.borderRadiusMobile })
                    } as React.CSSProperties;

                    return (
                        <button 
                            key={index}
                            className={`ad-tile-button ${ad.isClickable === false ? 'disabled' : ''}`}
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
                        >
                            <div 
                                className="ad-tile-container"
                                style={adTileStyle}
                            >
                                <div className="ad-tile-frame">
                                    <div className="ad-tile-image" style={{
                                        backgroundImage: `url(${getImageUrl(ad)})`,
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}></div>
                                    
                                    <div className="ad-tile-content">
                                        <p className="ad-tile-subtitle">{ad.subTitle}</p>
                                        <p className="ad-tile-title">{ad.title}</p>
                                    </div>
                                </div>
                            </div>
                        </button>
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