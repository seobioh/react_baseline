import React, { useState, useEffect, useRef } from "react";
import "./SliderTile.css";

interface SliderData {
    container: React.ReactNode;
    onClick?: () => void;
    isClickable?: boolean;
}

interface SliderTileProps {
    slides: SliderData[];
    autoSlide?: boolean;
    slideInterval?: number;
    className?: string;
    showDots?: boolean;
    dotColor?: string;
    activeDotColor?: string;
}

const SliderTile: React.FC<SliderTileProps> = ({
    slides,
    autoSlide = true,
    slideInterval = 3000,
    className = "",
    showDots = true,
    dotColor = "rgba(255, 255, 255, 0.5)",
    activeDotColor = "rgba(255, 255, 255, 0.9)"
}) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [hasDragged, setHasDragged] = useState(false);
    const [slideWidth, setSlideWidth] = useState(100);
    const containerRef = useRef<HTMLDivElement>(null);
    const totalSlides = slides.length;

    useEffect(() => {
        if (!autoSlide || totalSlides <= 1 || isDragging) return;
        const interval = setInterval(() => {
            setCurrentSlideIndex((prevIndex) => 
                (prevIndex + 1) % totalSlides
            );
        }, slideInterval);
        return () => clearInterval(interval);
    }, [autoSlide, slideInterval, totalSlides, isDragging]);

    useEffect(() => {
        const updateSlideWidth = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const gap = 16;
                const newSlideWidth = (containerWidth + gap) / containerWidth * 100;
                setSlideWidth(newSlideWidth);
            }
        };

        updateSlideWidth();
        window.addEventListener('resize', updateSlideWidth);
        return () => window.removeEventListener('resize', updateSlideWidth);
    }, []);

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
                setCurrentSlideIndex((prevIndex) => 
                    prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
                );
            } else {
                setCurrentSlideIndex((prevIndex) => 
                    (prevIndex + 1) % totalSlides
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


    if (totalSlides === 0) return null;

    return (
        <div 
            ref={containerRef}
            className={`slider-tile ${className}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <div 
                className="slider-tile-slider"
                style={{
                    transform: `translateX(calc(-${currentSlideIndex * slideWidth}% + ${dragOffset}px))`,
                    transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
                }}
            >
                {slides.map((slide, index) => (
                    <div 
                        key={index}
                        className="slider-tile-container"
                    >
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                
                                if (isDragging || hasDragged) {
                                    return;
                                }
                                
                                if (slide.isClickable !== false && slide.onClick) {
                                    slide.onClick();
                                }
                            }}
                            className={`slider-tile-button ${slide.isClickable === false ? 'disabled' : ''}`}
                        >
                            {slide.container}
                        </button>
                    </div>
                ))}
            </div>
            
            {showDots && totalSlides > 1 && (
                <div className="slider-tile-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`slider-tile-dot ${index === currentSlideIndex ? 'active' : ''}`}
                            style={{
                                backgroundColor: index === currentSlideIndex ? activeDotColor : dotColor
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentSlideIndex(index);
                            }}
                            aria-label={`슬라이드 ${index + 1}로 이동`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SliderTile;