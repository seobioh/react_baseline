import React from 'react'
import { SpaceMedium, SpaceXLarge, SpaceXXLarge } from '../../../components/Space';
import { MainTitle } from '../../../components/Text';
import SignUp from '../../../components/Accounts/Signup';

const SignupPage: React.FC = () => {
    return (
        <div style={{width: '100%'}}>
            <SpaceMedium />
            <MainTitle> 회원가입 </MainTitle>
            <SpaceXLarge />
            <SignUp />
            <SpaceXXLarge />
        </div>
    )
}

export default SignupPage;