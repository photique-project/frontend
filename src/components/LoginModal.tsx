import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { FetchRequestOptions } from '../types/http';
import ENDPOINTS from '../api/endpoints';
import useFetch from '../hooks/useFetch';
import useAuthStore from '../zustand/store';

import ShortNormalInput from '../components/input/ShortNormalInput';
import LongButton from '../components/button/LongButton';
import LoginModalNav from '../components/LoginModalNav';
import SNSLine from '../components/SNSLine';
import HelperText from '../components/HelperText';
import PasswordInput from '../components/input/PasswordInput';
import OAuthIcons from '../components/OAuthIcons';

import logoIcon from '../assets/logo.png';
import closeIcon from '../assets/close.png';
import loadingIcon from '../assets/loading.png';




const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: fixed;

    background-color: rgba(0, 0, 0, 0.6);

    z-index: 9999;
`;

const LoginModalBox = styled.div`
    width: calc(450px - 60px);
    padding: 30px;

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

    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`;

const LogoIcon = styled.img`
    margin-top: 5px;
    width: 150px;

    @media (max-width: 420px) {
        width: 100px;
    }
`;

const HelperTextBox = styled.div`
    width: 100%;
    height: 12px;
`;

const CheckBox = styled.div`
    width: 100%;
    margin-top: 5px;

    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 420px) {
        width:100%;
    }
`

const CheckBoxLabel = styled.label`
    display: flex;
    flex-direction: row;
    align-items: center;

    font-size: 14px;
    line-height: 14px;
`;

const Box = styled.input`
    
`;

const rotate = keyframes`
  from {
      transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
    `;

const Loading = styled.img`
    width: 40px;
    animation: ${rotate} 1.2s ease-in-out infinite;
`;

const LoadingBox = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.2);

    position: absolute;
`


interface LoginModalProps {
    closeModal: () => void;
}



const LoginModal: React.FC<LoginModalProps> = (props) => {
    const { closeModal } = props;
    const [email, setEmail] = useState<string>('');
    const [emailDisabled, setEmailDisabled] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [passwordDisabled, setPasswordDisalbled] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');
    const [helperTextVisibility, setHelperTextVisibility] = useState<'visible' | 'hidden'>('hidden');

    // 자동 로그인 체크
    const [autoLogin, setAutoLogin] = useState<boolean>(false);

    const handleAutoLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAutoLogin(e.target.checked);
    };

    const {
        loading: loginLoading,
        statusCode: loginStatusCode,
        data: loginData,
        fetchRequest: loginFetchRequest
    } = useFetch<void>();


    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        if (!email) {
            setHelperText('*이메일을 입력해주세요');
            setHelperTextVisibility('visible');
            return;
        }

        if (!password) {
            setHelperText('*비밀번호 입력해주세요');
            setHelperTextVisibility('visible');
            return;
        }

        setHelperTextVisibility('hidden');

        const method = ENDPOINTS.AUTH.LOGIN.METHOD;
        const url = ENDPOINTS.AUTH.LOGIN.URL(autoLogin);

        const requestBody = {
            email: email,
            password: password
        }

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
            body: requestBody
        }

        loginFetchRequest(options);
    }

    useEffect(function loadLoginFetchRequest() {
        if (loginLoading) {
            setEmailDisabled(true);
            setPasswordDisalbled(true);

            return;
        }

        setEmailDisabled(false);
        setPasswordDisalbled(false);

    }, [loginLoading])

    useEffect(function handleLogin() {
        const temp = async () => {
            if (loginStatusCode === 201) {
                setHelperTextVisibility('hidden');
                const login = useAuthStore.getState().login;
                await login(); // 로그인 요청으로 받은 토큰으로 유저아이디 값을 전역 저장소에 세팅
                closeModal();
                return;
            }

            if (loginStatusCode === 500) {
                setHelperText('*서버 에러');
                setHelperTextVisibility('visible');
                return;
            }

            if (loginStatusCode === 401 || loginStatusCode == 404) {
                setHelperText('*이메일과 비밀번호를 확인해주세요');
                setHelperTextVisibility('visible');
            }
        }

        temp();
    }, [loginStatusCode])

    return (
        <Container onClick={handleContainerClick}>
            <LoginModalBox>

                <CloseButtonBox>
                    <CloseIcon src={closeIcon} onClick={closeModal} />
                </CloseButtonBox>

                <LogoIcon src={logoIcon} />
                <ShortNormalInput placeHolder='이메일' marginTop={30} text={email} handleChange={handleEmailChange} inputDisabled={emailDisabled} />
                <PasswordInput placeHolder='비밀번호' marginTop={10} text={password} handleChange={handlePasswordChange} inputDisabled={passwordDisabled} />

                <CheckBox>
                    <CheckBoxLabel>
                        <Box type='checkbox' checked={autoLogin} onChange={handleAutoLoginChange} />
                        자동 로그인
                    </CheckBoxLabel>
                </CheckBox>

                <HelperTextBox>
                    <HelperText text={helperText} visibility={helperTextVisibility} color={'red'} />
                </HelperTextBox>

                <LongButton
                    text='로그인'
                    type='black'
                    marginTop={15}
                    onClick={handleLogin}
                />

                <LoginModalNav />

                <SNSLine text='간편 로그인' marginTop={30} />
                <OAuthIcons marginTop={12} />

            </LoginModalBox>

            {loginLoading &&
                <LoadingBox>
                    <Loading src={loadingIcon} />
                </LoadingBox>
            }

        </Container >
    );
}

export default LoginModal;