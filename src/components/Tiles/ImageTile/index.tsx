import React, { useState, useEffect, useRef } from "react";
import ArrowBackIcon from '../../../assets/icons/light/arrow_back.svg';
import ArrowForwardIcon from '../../../assets/icons/light/arrow_forward.svg';
import "./ImageTile.css";

interface ImageTileProps {
    images: string[];
    autoSlide?: boolean;
    slideInterval?: number;
    className?: string;
}

const ImageTile: React.FC<ImageTileProps> = ({
    images,
    autoSlide = true,
    slideInterval = 3000,
    className = ""
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const currentImage = images[currentImageIndex];

    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        if (!autoSlide || images.length <= 1 || isDragging) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex + 1) % images.length
            );
        }, slideInterval);
        return () => clearInterval(interval);
    }, [autoSlide, slideInterval, images.length, isDragging]);

    const getImageUrl = (image: string) => {
        if (isDesktop) {
            return image;
        } else {
            return image;
        }
    };

    const handleStart = (clientX: number) => {
        setIsDragging(true);
        setStartX(clientX);
        setCurrentX(clientX);
        setDragOffset(0);
    };

    const handleMove = (clientX: number) => {
        if (!isDragging) return;
        const deltaX = clientX - startX;
        setCurrentX(clientX);
        setDragOffset(deltaX);
    };

    const handleEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        const deltaX = currentX - startX;
        const threshold = 50;
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                setCurrentImageIndex((prevIndex) => 
                    prevIndex === 0 ? images.length - 1 : prevIndex - 1
                );
            } else {
                setCurrentImageIndex((prevIndex) => 
                    (prevIndex + 1) % images.length
                );
            }
        }
        setDragOffset(0);
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


    if (images.length === 0 || !currentImage) {
        return (
            <div className={`image-tile ${className}`}>
                <div className="image-tile-no-image">
                    <p>사진이 없습니다</p>
                </div>
            </div>
        );
    }

    return (
        <div 
            ref={containerRef}
            className={`image-tile ${className}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <div 
                className="image-tile-slider"
                style={{
                    transform: `translateX(calc(-${currentImageIndex * 100}% + ${dragOffset}px))`,
                    transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
                }}
            >
                {images.map((image, index) => {
                    return (
                        <div 
                            key={index}
                            className="image-tile-container"
                        >
                            <div className="image-tile-image" style={{
                                backgroundImage: `url(${getImageUrl(image)})`,
                            }}></div>
                        </div>
                    );
                })}
            </div>

            {images.length > 1 && (
                 <div className="image-tile-image-arrows">
                     <button 
                         className="image-tile-arrow"
                         onClick={(e) => {
                             e.stopPropagation();
                             setCurrentImageIndex((prevIndex) => 
                                 prevIndex === 0 ? images.length - 1 : prevIndex - 1
                             );
                         }}
                         aria-label="이전 이미지"
                     >
                         <img src={ArrowBackIcon} alt="Previous" className="image-tile-arrow"/>
                     </button>
                     <button 
                         className="image-tile-arrow"
                         onClick={(e) => {
                             e.stopPropagation();
                             setCurrentImageIndex((prevIndex) => 
                                 (prevIndex + 1) % images.length
                             );
                         }}
                         aria-label="다음 이미지"
                     >
                         <img src={ArrowForwardIcon} alt="Next" className="image-tile-arrow"/>
                     </button>
                 </div>
             )}

            {images.length > 1 && (
                <div className="image-tile-image-dots">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`image-tile-dot ${index === currentImageIndex ? 'active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(index);
                            }}
                            aria-label={`이미지 ${index + 1}로 이동`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageTile;