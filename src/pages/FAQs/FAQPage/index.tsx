import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceSmall, SpaceMedium, SpaceXXXLarge } from '../../../components/Space';
import FAQTile from '../../../components/Tiles/FAQTile';
import { useServiceStore } from '../../../stores/serviceStore';
import './FAQPage.css';

const FAQPage: React.FC = () => {
    const navigate = useNavigate();
    const { faqs, getFAQs, isLoading } = useServiceStore();

    useEffect(() => {
        getFAQs();
    }, []);

    return (
        <div style={{width: '100%'}} className="faq-page">
            <SpaceMedium />
            <MainTitle> FAQ </MainTitle>
            <SubTitle> 자주 묻는 질문을 확인해보세요. </SubTitle> 

            <SpaceMedium />
            {isLoading ? (
                <div className="faq-page-tile-list-empty">로딩 중...</div>
            ) : faqs.filter(faq => faq.is_active).length > 0 ? (
                faqs
                    .filter(faq => faq.is_active)
                    .sort((a, b) => a.order - b.order)
                    .map((faq) => (
                        <FAQTile 
                            key={faq.id}
                            question={faq.question} 
                            answer={faq.answer} 
                        />
                    ))
            ) : (
                <div className="faq-page-tile-list-empty">
                    등록된 FAQ가 없습니다.
                </div>
            )}
            <SpaceXXXLarge />

            <SpaceMedium />
            <MainTitle> 이용약관 </MainTitle>
            <SubTitle> 이용약관을 확인해보세요. </SubTitle> 
            <SpaceSmall />
            <button onClick={() => navigate('/terms')}>
                <div className="faq-page-button-text"> 이용약관 </div>
                <div className="faq-page-button-arrow"> → </div>
            </button>
            <SpaceXXXLarge />

            <SpaceMedium />
            <MainTitle> 더 궁금한 점이 있으신가요? </MainTitle>
            <SubTitle> 문의 주시면 빠르게 답변드려요. </SubTitle> 
            <SpaceSmall />
            <a href="/garages">
                <SubTitle style={{ color: 'black' }}> 문의하기 → </SubTitle>
            </a>
            <SpaceXXXLarge />

            <SpaceMedium />
        </div>
      )
    };

export default FAQPage;