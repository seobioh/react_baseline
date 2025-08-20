import React from "react";
import "./Button.css";

interface ToggleButtonProps {
    options: string[];
    activeValue: number;
    onToggle: (value: number) => void;
    className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ 
    options, 
    activeValue, 
    onToggle, 
    className = "" 
}) => {
    return (
        <div className={`toggle-button-container ${className}`}>
            {options.map((option, index) => (
                <button
                    key={index}
                    className={`toggle-button ${activeValue === index ? 'active' : ''}`}
                    onClick={() => onToggle(index)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default ToggleButton;
