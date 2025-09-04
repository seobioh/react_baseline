import React from 'react'
import { MainTitle } from '../../../components/Text';
import { SpaceMedium, SpaceXLarge, SpaceXXLarge } from '../../../components/Space';
import Login from '../../../components/Accounts/Login';

const LoginPage: React.FC = () => {
    return (
        <div style={{ width: '100%' }}>
            <SpaceMedium />
            <MainTitle> 로그인 </MainTitle>
            <SpaceXLarge />
            <Login />
            <SpaceXXLarge />
        </div>
      )
    };

export default LoginPage; 