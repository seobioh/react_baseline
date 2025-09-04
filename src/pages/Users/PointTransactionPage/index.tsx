import React from 'react'
import { SpaceMedium, SpaceXLarge, SpaceXXLarge } from '../../../components/Space';
import { MainTitle } from '../../../components/Text';
import PointTransaction from '../../../components/Users/PointTransaction';

const PointTransactionPage: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle> 포인트 거래내역 </MainTitle>
            <SpaceXLarge />
            <PointTransaction />
            <SpaceXXLarge />
        </div>
    )
}

export default PointTransactionPage;