import React from 'react';
import './Body.css';

interface BodyProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    backgroundColor?: string;
}

const Body: React.FC<BodyProps> = ({children, style, backgroundColor}) => {
    return (
        <main className="body" style={backgroundColor ? { backgroundColor } : undefined}>
            <div className="body-container" style={style}>
                {children}
            </div>
        </main>
    );
};

export default Body;