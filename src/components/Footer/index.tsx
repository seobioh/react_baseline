import React from 'react';
import logoImage from '../../assets/images/light/logo.png';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="logo-container">
                    <img src={logoImage} alt="VAHANA Logo" className="logo" />
                </div>

                <div className="footer-spacer"></div>
                <p>비티오랩 주식회사</p>
                <p>사업자등록번호 | 123-45-67890</p>
                <p>유선번호 | 010-1234-5678</p>
                <p>대표문의 | info@vahana.com</p>
                <p>주소 | 서울특별시 강남구 테헤란로 123-123</p>
                <p>Copyright &copy; 2024 비티오랩 주식회사. All rights reserved.</p>
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
