import React from 'react';
import './Body.css';

interface BodyProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Body: React.FC<BodyProps> = ({children, style}) => {
    return (
        <main className="body">
            <div className="body-container" style={style}>
                {children}
            </div>
        </main>
    );
};

export default Body;