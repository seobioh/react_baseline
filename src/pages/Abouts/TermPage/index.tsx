import React from 'react'
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium } from '../../../components/Space';

const TermPage: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle> 이용약관 </MainTitle>
            <SubTitle> 이용약관을 확인해보세요. </SubTitle> 
            <SpaceMedium />
        </div>
      )
    };

export default TermPage;