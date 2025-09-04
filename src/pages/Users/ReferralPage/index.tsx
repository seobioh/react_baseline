import React from 'react'
import { SpaceMedium, SpaceXLarge, SpaceXXLarge } from '../../../components/Space';
import { MainTitle } from '../../../components/Text';
import Referral from '../../../components/Users/Referral';

const ReferralPage: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle> 추천인 현황 </MainTitle>
            <SpaceXLarge />
            <Referral />
            <SpaceXXLarge />
        </div>
    )
}

export default ReferralPage;