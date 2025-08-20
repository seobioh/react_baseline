import React from 'react';
import './Text.css';

interface TextProps {
    children: React.ReactNode;
    className?: string;
}

const MainTitle: React.FC<TextProps> = ({ children, className = '' }) => {
    return (
        <h1 className={`main-title ${className}`.trim()}>
            {children}
        </h1>
    );
};

const SubTitle: React.FC<TextProps> = ({ children, className = '' }) => {
    return (
        <h2 className={`sub-title ${className}`.trim()}>
            {children}
        </h2>
    );
};

export { MainTitle, SubTitle }; 