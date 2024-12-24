import { useState } from 'react';
import styled from 'styled-components';

import ShortNormalInput from './input/ShortNormalInput';
import LongButton from '../components/LongButton';
import CheckBox from '../components/CheckBox';
import LoginModalNav from '../components/LoginModalNav';
import SNSLine from '../components/SNSLine';

import logoIcon from '../assets/logo.png';
import closeIcon from '../assets/close.png';
import PasswordInput from './input/PasswordInput';
import OAuthIcons from './OAuthIcons';

const Container = styled.div<{ display: 'flex' | 'none' }>`
    width: 100%;
    height: 100%;

    display: flex;
    display: ${({ display }) => display};
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: fixed;

    background-color: rgba(0, 0, 0, 0.6);
`;

const LoginModalBox = styled.div`
    width: 360px;
    height: 452px;
    padding: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 15px;
    
    background-color: #F9FBFF;

    @media (max-width: 420px) {
        width: 70%;
    }
`;

const CloseButtonBox = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: right;
`;

const CloseIcon = styled.img`  
    width: 36px;
    height: 36px;

    cursor: pointer;

    transition: transform 0.2s ease-in-out; /* 지속시간 0.5초로 설정 */

    &:hover {
        transform: scale(1.1); /* 크기를 10% 키움 */
    }
`;

const LogoIcon = styled.img`
    margin-top: 5px;
    width: 130px;

    @media (max-width: 420px) {
        width: 100px;
    }
`;


interface LoginModalProps {
    display: 'flex' | 'none';
    closeModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = (props) => {
    const { display, closeModal } = props;
    const [password, setPassword] = useState<string>('');
    const [passwordDisabled, setPasswordDisalbled] = useState<boolean>(false);

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {

    }

    return (
        <Container display={display} onClick={handleContainerClick}>
            <LoginModalBox>

                <CloseButtonBox>
                    <CloseIcon src={closeIcon} onClick={closeModal} />
                </CloseButtonBox>

                <LogoIcon src={logoIcon} />
                <ShortNormalInput placeHolder='이메일' marginTop={30} />
                <PasswordInput placeHolder='비밀번호' marginTop={10} text={password} handleChange={handlePasswordChange} inputDisabled={passwordDisabled} />
                <CheckBox text='자동 로그인' marginTop={5} />
                <LongButton text='로그인' type='black' marginTop={20} onClick={handleLogin} />
                <LoginModalNav />
                <SNSLine text='간편 로그인' marginTop={30} />
                <OAuthIcons marginTop={12} />

            </LoginModalBox>
        </Container >
    );
}

export default LoginModal;