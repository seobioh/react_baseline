import React, { useState, useEffect, useRef } from "react";
import "./EventTile.css";

interface EventData {
    subTitle?: string;
    title?: string;
    subTitleColor?: string;
    titleColor?: string;
    imageDesktop: string;
    imageMobile: string;
    isClickable?: boolean;
    isExpired?: boolean;
    onClick: () => void;
}

interface EventTileProps {
    events: EventData[];
    className?: string;
}

const EventTile: React.FC<EventTileProps> = ({
    events,
    className = ""
}) => {
    const [isDesktop, setIsDesktop] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const getImageUrl = (event: EventData) => {
        if (isDesktop) {
            return event.imageDesktop;
        } else {
            return event.imageMobile;
        }
    };

    return (
        <div 
            ref={containerRef}
            className={`event-tile ${className}`}
        >
            <div className="event-tile-list">
                {events.map((event, index) => {
                    const eventTileStyle = {
                        ...(event.subTitleColor && { '--event-tile-subtitle-color': event.subTitleColor }),
                        ...(event.titleColor && { '--event-tile-title-color': event.titleColor })
                    } as React.CSSProperties;

                    return (
                        <div 
                            key={index}
                            className="event-tile-container"
                            style={eventTileStyle}
                        >
                            <div className={`event-tile-image ${event.isExpired ? 'expired' : ''}`} style={{
                                backgroundImage: `url(${getImageUrl(event)})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                borderRadius: '8px'
                            }}></div>

                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    
                                    if (event.isClickable !== false) {
                                        event.onClick();
                                    }
                                }}
                                disabled={event.isClickable === false}
                                className={`event-tile-button ${event.isClickable === false ? 'disabled' : ''}`}
                            >
                                <div className="event-tile-content">
                                    <p className="event-tile-subtitle">{event.subTitle}</p>
                                    <p className="event-tile-title">{event.title}</p>
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EventTile;
