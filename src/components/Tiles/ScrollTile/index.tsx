import React, { useState, useEffect } from 'react'
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium } from '../../../components/Space';
import './ScrollTile.css';

interface Section {
    title: string;
    subtitle: string;
    bgColor?: string;
    backgroundImage?: string;
}

interface ScrollTileProps {
    sections: Section[];
}

const ScrollTile: React.FC<ScrollTileProps> = ({ sections }) => {
    const [currentSection, setCurrentSection] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const sectionIndex = Math.floor(scrollY / windowHeight);
            setCurrentSection(Math.min(sectionIndex, sections.length - 1));
        };

        window.scrollTo(0, 0);
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections.length]);

    return (
        <div className='scroll-tile-container'>
            {sections.map((section, index) => (
                <div 
                    key={index}
                    className={`scroll-section ${currentSection === index ? 'active' : ''}`}
                    style={{ 
                        backgroundColor: section.bgColor,
                        backgroundImage: section.backgroundImage ? `url(${section.backgroundImage})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className='section-content'>
                        <SpaceMedium />
                        <MainTitle>{section.title}</MainTitle>
                        <SubTitle>{section.subtitle}</SubTitle>
                        <SpaceMedium />
                    </div>
                </div>
            ))}
        </div>
      )
    };

export default ScrollTile;