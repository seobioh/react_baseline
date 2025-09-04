import React from 'react'
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium } from '../../../components/Space';

const EventPage: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle> 이벤트 </MainTitle>
            <SubTitle> 이벤트를 확인해보세요. </SubTitle> 
            <SpaceMedium />
        </div>
      )
    };

export default EventPage;