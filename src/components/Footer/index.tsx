import React from 'react';
import logoImage from '../../assets/images/light/logo.png';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo-container">
                    <img src={logoImage} alt="REREV Logo" className="logo" />
                </div>

                <div className="footer-spacer"></div>
                <p>리레브</p>
                <p>대표자 | 배준연</p>
                <p>사업자등록번호 | 507-14-40140</p>
                <p>유선번호 | 010-4824-4562</p>
                <p>대표문의 | info@rerev.com</p>
                <p>주소 | 서울특별시 은평구 은평로 220, 131동 701호</p>
                <p>Copyright &copy; 2025 리레브. All rights reserved.</p>
                <div className="footer-spacer"></div>

                <div className="footer-links">
                    <nav>
                        <a href="/privacy">개인정보처리방침</a>
                        <a href="/terms">이용약관</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
