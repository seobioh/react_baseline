import React, { useEffect } from 'react'
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium, SpaceXXXLarge } from '../../../components/Space';
import TermTile from '../../../components/Tiles/TermTile';
import { useServiceStore } from '../../../stores/serviceStore';
import './TermPage.css';

const TermPage: React.FC = () => {
    const { terms, getTerms, isLoading } = useServiceStore();

    useEffect(() => {
        getTerms();
    }, []);

    return (
        <div style={{width: '100%'}} className="term-page">
            <SpaceMedium />
            <MainTitle> 이용약관 </MainTitle>
            <SubTitle> 이용약관을 확인해보세요. </SubTitle>

            <SpaceMedium />
            {isLoading ? (
                <div className="term-page-tile-list-empty">로딩 중...</div>
            ) : terms.filter(term => term.is_active).length > 0 ? (
                terms
                    .filter(term => term.is_active)
                    .sort((a, b) => a.order - b.order)
                    .map((term) => (
                        <TermTile 
                            key={term.id}
                            title={term.subject} 
                            detail={term.detail} 
                        />
                    ))
            ) : (
                <div className="term-page-tile-list-empty">
                    등록된 이용약관이 없습니다.
                </div>
            )}
            <SpaceXXXLarge />

            <SpaceMedium />
        </div>
      )
    };

export default TermPage;