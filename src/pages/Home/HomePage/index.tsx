import React from 'react'
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium } from '../../../components/Space';

const HomePage: React.FC = () => {
    return (
        <div style={{ width: '100%' }}>
            <SpaceMedium />
            <MainTitle> 홈 </MainTitle>
            <SubTitle> 홈 화면입니다. </SubTitle> 
            <SpaceMedium />
        </div>
      )
    };

export default HomePage;