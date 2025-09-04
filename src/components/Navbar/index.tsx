import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const menuItems = [
  { id: 0, href: "/about", label: "서비스 소개" },
  { id: 1, href: "/menu1", label: "메뉴1" },
  { id: 2, href: "/menu2", label: "메뉴2" },
  { id: 3, href: "/menu3", label: "메뉴3" },
  { id: 4, href: "/accounts", label: "계정" },
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

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (href: string) => {
    if (location.pathname !== href) {
      navigate(href);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLinks currentPath={location.pathname} onNavigate={handleNavigate} />
      </div>
    </nav>
  );
};

export default Navbar;
