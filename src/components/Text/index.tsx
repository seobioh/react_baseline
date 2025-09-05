import React from 'react';
import './Text.css';

interface TextProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const MainTitle: React.FC<TextProps> = ({ children, className = '', style }) => {
    return (
        <h1 className={`main-title ${className}`.trim()} style={style}>
            {children}
        </h1>
    );
};

const SubTitle: React.FC<TextProps> = ({ children, className = '', style }) => {
    return (
        <h2 className={`sub-title ${className}`.trim()} style={style}>
            {children}
        </h2>
    );
};

export { MainTitle, SubTitle }; 