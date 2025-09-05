import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const menuItems = [
  { id: 0, href: "/about", label: "소개" },
  { id: 1, href: "/products", label: "제품" },
  { id: 2, href: "/events", label: "이벤트" },
  { id: 3, href: "/faqs", label: "FAQ" },
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
