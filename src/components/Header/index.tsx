import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ToggleButton } from "../Button";
import { Space8px } from "../Space";
import logoImage from "../../assets/images/light/logo.png";
import "./Header.css";
import "./Header2.css";

const menuItems = [
    { id: 1, href: "/about", label: "소개" },
    { id: 2, href: "/products", label: "제품" },
    { id: 3, href: "/events", label: "이벤트" },
    { id: 4, href: "/faqs", label: "FAQ" },
    { id: 5, href: "/accounts", label: "계정" },
    ];
  
interface NavLinksProps {
    currentPath: string;
    onNavigate: (href: string) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ currentPath, onNavigate }) => (
<div className="nav-link">
    {menuItems.map((item) => (
    <Link
        key={item.id}
        to={item.href}
        className={currentPath.startsWith(item.href) ? "nav-item selected" : "nav-item"}
        onClick={() => onNavigate(item.href)}
    >
        {item.label}
    </Link>
    ))}
</div>
);

const Header: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = (href: string) => {
        if (location.pathname !== href) {
          navigate(href);
        }
      };
    
    const handleTabClick = (tabIndex: number) => {
        setActiveTab(tabIndex);
        if (tabIndex === 1) {
            setActiveTab(0);
            window.location.href = 'https://en.rerev.kr';
        }
    };

    const tabOptions = ['KOR', 'ENG'];

    return (
        <>
            <div className="header">
                <div className="header-container">
                    <div className="header-logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <img src={logoImage} alt="REREV Logo" className="logo" />
                    </div>
                    <ToggleButton
                        options={tabOptions}
                        activeValue={activeTab}
                        onToggle={handleTabClick}
                        className="tab-toggle"
                    />
                </div>
            </div>
            <nav className="navbar">
                <div className="navbar-container">
                    <NavLinks currentPath={location.pathname} onNavigate={handleNavigate} />
                </div>
            </nav>
            <Space8px />
        </>

    )
}

const NavLinks2: React.FC<NavLinksProps> = ({ currentPath, onNavigate }) => (
    <div className="nav-link-2">
        {menuItems.map((item) => (
        <Link
            key={item.id}
            to={item.href}
            className={currentPath.startsWith(item.href) ? "nav-item-2 selected" : "nav-item-2"}
            onClick={() => onNavigate(item.href)}
        >
            {item.label}
        </Link>
        ))}
    </div>
);
      
const Header2: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = (href: string) => {
        if (location.pathname !== href) {
          navigate(href);
        }
        setIsMenuOpen(false);
      };
    
    const handleTabClick = (tabIndex: number) => {
        setActiveTab(tabIndex);
        if (tabIndex === 1) {
            setActiveTab(0);
            window.location.href = 'https://en.rerev.kr';
        }
    };

    const tabOptions = ['KOR', 'ENG'];

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
      setIsMenuOpen(false);
    };

    React.useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (isMenuOpen) {
                const target = event.target as HTMLElement;
                if (!target.closest('.navbar-2-hamburger-btn') && !target.closest('.navbar-2-sidebar')) {
                    closeMenu();
                }
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMenuOpen]);
  
    return (
        <div className="header-2">
            <div className="header-2-container">
                <div className="header-2-container-left">
                    <div className="header-2-logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <img src={logoImage} alt="REREV Logo" className="logo" />
                    </div>
                    <div className="header-2-desktop">
                        <NavLinks2 currentPath={location.pathname} onNavigate={handleNavigate} />
                    </div>
                </div>
                <div className="header-2-container-right">
                    <nav className="navbar-2">
                        <div className="navbar-2-container">
                            <div className="header-2-mobile">
                                <button className="navbar-2-hamburger-btn" onClick={toggleMenu} aria-label="메뉴 열기/닫기">
                                    <div className={`navbar-2-hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
                                    <div className={`navbar-2-hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
                                    <div className={`navbar-2-hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
                                </button>
                            </div>
                            <div className="header-2-desktop">
                                <ToggleButton
                                    options={tabOptions}
                                    activeValue={activeTab}
                                    onToggle={handleTabClick}
                                    className="tab-toggle"
                                />
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="header-2-mobile">
                    <div className={`navbar-2-sidebar ${isMenuOpen ? 'open' : ''}`}>
                        <div className="navbar-2-sidebar-content">
                            <ToggleButton
                                options={tabOptions}
                                activeValue={activeTab}
                                onToggle={handleTabClick}
                                className="tab-toggle"
                            />
                            <NavLinks2 currentPath={location.pathname} onNavigate={handleNavigate} />
                        </div>
                        <div className="navbar-2-sidebar-overlay" onClick={closeMenu}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Header, Header2 };