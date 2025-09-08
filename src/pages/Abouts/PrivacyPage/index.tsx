import React, { useEffect } from 'react'
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium, SpaceXXXLarge } from '../../../components/Space';
import PrivacyTile from '../../../components/Tiles/PrivacyTile';
import { useServiceStore } from '../../../stores/serviceStore';
import './PrivacyPage.css';

const PrivacyPage: React.FC = () => {
    const { privacyPolicies, getPrivacyPolicies, isLoading } = useServiceStore();

    useEffect(() => {
        getPrivacyPolicies();
    }, []);
    return (
        <div style={{width: '100%'}} className="privacy-page">
            <SpaceMedium />
            <MainTitle> 개인정보 처리방침 </MainTitle>
            <SubTitle> 개인정보 처리방침을 확인해보세요. </SubTitle>

            <SpaceMedium />
            {isLoading ? (
                <div className="privacy-page-tile-list-empty">로딩 중...</div>
            ) : privacyPolicies.filter(policy => policy.is_active).length > 0 ? (
                privacyPolicies
                    .filter(policy => policy.is_active)
                    .sort((a, b) => a.order - b.order)
                    .map((policy) => (
                        <PrivacyTile 
                            key={policy.id}
                            title={policy.subject} 
                            detail={policy.detail} 
                        />
                    ))
            ) : (
                <div className="privacy-page-tile-list-empty">
                    등록된 개인정보처리방침이 없습니다.
                </div>
            )}
            <SpaceXXXLarge />

            <SpaceMedium />
        </div>
      )
    };

export default PrivacyPage;