import React from 'react'
import { SpaceMedium, SpaceXLarge, SpaceXXLarge } from '../../../components/Space';
import { MainTitle } from '../../../components/Text';
import Coupon from '../../../components/Users/Coupon';

const CouponPage: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle> 혜택 쿠폰함 </MainTitle>
            <SpaceXLarge />
            <Coupon />
            <SpaceXXLarge />
        </div>
    )
}

export default CouponPage;