import React from 'react'
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium } from '../../../components/Space';

const AboutPage: React.FC = () => {
    return (
        <div style={{ width: '100%' }}>
            <SpaceMedium />
            <MainTitle> 서비스 소개 </MainTitle>
            <SubTitle> 서비스 소개. </SubTitle> 
            <SpaceMedium />
        </div>
      )
    };

export default AboutPage;