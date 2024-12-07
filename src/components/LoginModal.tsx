import styled from 'styled-components';

import ShortNormalInput from '../components/ShortNormalInput';
import LongButton from '../components/LongButton';
import CheckBox from '../components/CheckBox';
import LoginModalNav from '../components/LoginModalNav';
import LoginModalLine from '../components/LoginModalLine';

import logoIcon from '../assets/logo.png';
import closeIcon from '../assets/close.png';
import PasswordInput from './PasswordInput';
import OAuthIcons from './OAuthIcons';

const Container = styled.div<{ display: boolean }>`
    width: 100%;
    height: 100%;

    display: flex;
    display: ${({ display }) => display ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: fixed;

    background-color: rgba(0, 0, 0, 0.6);
`;

const LoginModalBox = styled.div`
    width: 340px;
    height: 412px;
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
    display: boolean;
    closeModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = (props) => {
    const { display, closeModal } = props;

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <Container display={display} onClick={handleContainerClick}>
            <LoginModalBox>

                <CloseButtonBox>
                    <CloseIcon src={closeIcon} onClick={closeModal} />
                </CloseButtonBox>

                <LogoIcon src={logoIcon} />
                <ShortNormalInput placeHolder='이메일' marginTop={20} />
                <PasswordInput placeHolder='비밀번호' marginTop={5} />
                <CheckBox text='자동 로그인' marginTop={5} />
                <LongButton text='로그인' type='black' marginTop={10} />
                <LoginModalNav />
                <LoginModalLine />
                <OAuthIcons />

            </LoginModalBox>
        </Container >
    );
}

export default LoginModal;