import React from 'react'
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium } from '../../../components/Space';

const PrivacyPage: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle> 개인정보 처리방침 </MainTitle>
            <SubTitle> 개인정보 처리방침을 확인해보세요. </SubTitle> 
            <SpaceMedium />
        </div>
      )
    };

export default PrivacyPage;