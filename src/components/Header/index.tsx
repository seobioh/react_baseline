import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ToggleButton } from "../Button";
import logoImage from "../../assets/images/light/logo.png";
import userImage from "../../assets/icons/light/user.svg";
import faqImage from "../../assets/icons/light/faq.svg";
import megaphoneImage from "../../assets/icons/light/megaphone.svg";
import globeImage from "../../assets/icons/light/globe.svg";
import "./Header.css";

const menuItemsMobile = [
    { id: 1, href: "/about", label: "소개" },
    { id: 2, href: "/products", label: "제품" },
    { id: 3, href: "/events", label: "이벤트" },
    { id: 4, href: "/faqs", label: "FAQ" },
    { id: 5, href: "/accounts", label: "계정" },
  ];


const menuItemsDesktop = [
    { id: 1, href: "/about", label: "소개" },
    { id: 2, href: "/products", label: "제품" },
  ];


const HeaderMobile: React.FC = () => {
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
                if (!target.closest('.navbar-hamburger-btn') && !target.closest('.navbar-sidebar')) {
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
        <div className="header">
            <div className="header-container">
                <div className="header-container-left">
                    <div className="header-logo-container" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                        <img src={logoImage} alt="REREV Logo" className="logo" />
                    </div>
                </div>
                <div className="header-container-right">
                    <nav className="navbar">
                        <div className="navbar-container">
                            <button className="navbar-hamburger-btn" onClick={toggleMenu} aria-label="메뉴 열기/닫기">
                                <div className={`navbar-hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
                                <div className={`navbar-hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
                                <div className={`navbar-hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
                            </button>
                        </div>
                    </nav>
                </div>
                <div className={`navbar-sidebar ${isMenuOpen ? 'open' : ''}`}>
                    <div className="navbar-sidebar-content">
                        <ToggleButton
                            options={tabOptions}
                            activeValue={activeTab}
                            onToggle={handleTabClick}
                            className="tab-toggle"
                        />
                        <div className="nav-link">
                            {menuItemsMobile.map((item) => (
                            <Link
                                key={item.id}
                                to={item.href}
                                className={location.pathname.startsWith(item.href) ? "nav-item selected" : "nav-item"}
                                onClick={() => handleNavigate(item.href)}
                            >
                                {item.label}
                            </Link>
                            ))}
                        </div>
                    </div>
                    <div className="navbar-sidebar-overlay" onClick={closeMenu}></div>
                </div>
            </div>
        </div>
    )
}


const HeaderDesktop: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = (href: string) => {
        if (location.pathname !== href) {
          navigate(href);
        }
      };

      return (
        <div className="header">
            <div className="header-container">
                <div className="header-container-left">
                    <div className="header-logo-container" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                        <img src={logoImage} alt="REREV Logo" className="logo" />
                    </div>
                    <div className="nav-link">
                        {menuItemsDesktop.map((item) => (
                        <Link
                            key={item.id}
                            to={item.href}
                            className={location.pathname.startsWith(item.href) ? "nav-item selected" : "nav-item"}
                            onClick={() => handleNavigate(item.href)}
                        >
                            {item.label}
                        </Link>
                        ))}
                    </div>
                </div>
                <div className="header-container-right">
                    <div className="header-container-icon">
                        <button 
                            className={`header-icon active`}
                            onClick={() => navigate('/events')}
                        >
                            <img src={megaphoneImage} alt="Events" className="header-icon"/>
                        </button>
                        <button 
                            className={`header-icon active`}
                            onClick={() => navigate('/faqs')}
                        >
                            <img src={faqImage} alt="FAQ" className="header-icon circle"/>
                        </button>
                        <button 
                            className={`header-icon active`}
                        >
                            <img src={globeImage} alt="Globe" className="header-icon circle"/>
                        </button>
                        <button 
                            className={`header-icon active`}
                            onClick={() => navigate('/accounts')}
                        >
                            <img src={userImage} alt="User" className="header-icon"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Header: React.FC = () => {
    return (
        <>
            <div className="header-mobile">
                <HeaderMobile />
            </div>
            <div className="header-desktop">
                <HeaderDesktop />
            </div>
        </>
    )
}

export { Header };