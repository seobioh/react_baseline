import React from 'react';
import './Body.css';

interface BodyProps {
    children: React.ReactNode;
    className?: string;
}

const Body: React.FC<BodyProps> = ({children}) => {
    return (
        <main className="body">
            <div className="body-container">
                {children}
            </div>
        </main>
    );
};

export default Body;