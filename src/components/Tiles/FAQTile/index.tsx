import React, { useState } from "react";
import "./FAQTile.css";

interface FAQTileProps {
    question: string;
    answer: string;
}

const FAQTile: React.FC<FAQTileProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="faq-tile">
            <div className="faq-tile-container" onClick={toggleOpen}>
                <button>
                    <div className="faq-tile-question-text">{question}</div>
                    <div className={`faq-tile-arrow ${isOpen ? 'open' : ''}`}>
                        ▼
                    </div>
                </button>
                
                {isOpen && (    
                    <div className="faq-tile-answer">
                        <div className="faq-tile-answer-text">
                            {answer}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQTile;