import React from 'react'
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium } from '../../../components/Space';

const FAQPage: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle> FAQ </MainTitle>
            <SubTitle> 자주 묻는 질문을 확인해보세요. </SubTitle> 
            <SpaceMedium />
        </div>
      )
    };

export default FAQPage;