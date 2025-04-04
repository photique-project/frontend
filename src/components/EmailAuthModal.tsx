import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styled, { keyframes } from 'styled-components';

import { FetchRequestOptions } from '../types/http';
import ENDPOINTS from '../api/endpoints';
import useFetch from '../hooks/useFetch';

import HelperText from './HelperText';
import CheckInput from './input/CheckInput';

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
`;

const ModalBox = styled.div`
    width: 300px;
    padding: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 7px;
    
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
    width: 32px;
    height: 32px;

    cursor: pointer;

    transition: transform 0.2s ease-in-out; 

    &:hover {
        transform: scale(1.1);
    }
`;

const MainText = styled.div`
    margin-top: 10px;
    font-size: 20px;
    line-height: 20px;
`;

const ResendButton = styled.button`
    margin-top: 10px;
    width: 60px;
    height: 30px;

    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);

    font-size: 12px;
    line-height: 12px;
    color: rgba(0, 0, 0, 0.7);  

    background-color: white;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`;

const CompleteButton = styled.button`
    margin-top: 20px;
    width: 100%;
    height: 40px;

    border-radius: 7px;

    color: white;
    background-color: rgba(0, 0, 0, 0.7);

    cursor: pointer;

    &:hover {
        background-color: black;
    }
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
    width: 20px;
    animation: ${rotate} 1.2s ease-in-out infinite;
`;



interface EmailAuthModalProps {
    email: string,
    closeModal: () => void;
    validEmail: boolean | null;
    setValidEmail: Dispatch<SetStateAction<boolean>>;
}



const EmailAuthModal: React.FC<EmailAuthModalProps> = (props) => {
    const {
        loading: authCodeLoading,
        statusCode: authCodeStatusCode,
        fetchRequest: authCodeFetchRequest
    } = useFetch<void>();

    const {
        loading: resendLoading,
        statusCode: resendStatusCode,
        fetchRequest: resendFetchRequest
    } = useFetch<void>();

    const { email, closeModal, validEmail, setValidEmail } = props;

    const [helperText, setHelperText] = useState<string>('*입력한 이메일로 발송된 인증번호를 입력해주세요');
    const [helperTextVisibility, setHelperTextVisibility] = useState<'visible' | 'hidden'>('visible');
    const [helperTextColor, setHelperTextColor] = useState<'red' | 'blue' | 'green'>('blue');
    const [code, setCode] = useState<string>('');
    const [timeLimit, setTimeLimit] = useState<number | null>(180);

    const [authCodeDisabled, setAuthCodeDisabled] = useState<boolean>(false)
    const [resendDisabled, setResendDisabled] = useState<boolean>(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLimit((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLimit]);

    const validateAuthcode = async () => {
        // 입력한 인증코드 인증요청 fetch
        // 결과에따른 useEffect작성
        if (code === '') {
            setHelperText('*인증코드를 입력해주세요');
            setHelperTextColor('red');
            setHelperTextVisibility('visible');
            return;
        }

        const method = ENDPOINTS.AUTH.VALIDATE_CODE.METHOD;
        const url = ENDPOINTS.AUTH.VALIDATE_CODE.URL;

        const requestBody = {
            email: email,
            code: code
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

        await authCodeFetchRequest(options);
    }

    useEffect(function validateEmailFetch() {
        if (authCodeStatusCode === 204) {
            setHelperText('*인증 성공 !');
            setHelperTextColor('green');
            setHelperTextVisibility('visible');
            setValidEmail(true);
            return;
        }

        if (authCodeStatusCode === 400) {
            setHelperText('*유효하지 않은 이메일 형식입니다');
            setHelperTextColor('red');
            setHelperTextVisibility('visible');
            setValidEmail(false);
            return;
        }

        if (authCodeStatusCode === 401) {
            setHelperText('*인증 코드가 올바르지 않습니다');
            setHelperTextColor('red');
            setHelperTextVisibility('visible');
            setValidEmail(false);
        }

        if (authCodeStatusCode === 410) {
            setHelperText('*인증 코드가 만료되었습니다');
            setHelperTextColor('red');
            setHelperTextVisibility('visible');
            setValidEmail(false);
        }

        if (authCodeStatusCode === 500) {
            setHelperText('*서버 에러');
            setHelperTextColor('red');
            setHelperTextVisibility('visible');
            setValidEmail(false);
        }
    }, [authCodeStatusCode])

    const handleAuthComplete = () => {
        if (!validEmail) {
            setHelperText('*이메일 인증을 진행해주세요');
            setHelperTextColor('red');
            setHelperTextVisibility('visible');
            return;
        }

        closeModal();
    }

    useEffect(function closeAuthCodeInput() {
        if (helperTextColor === 'green') {
            setAuthCodeDisabled(true);
            setResendDisabled(true);
        }

    }, [helperTextColor])

    const handleResend = async () => {
        const method = ENDPOINTS.AUTH.SEND_JOIN_MAIL.METHOD;
        const url = ENDPOINTS.AUTH.SEND_JOIN_MAIL.URL;

        const requestBody = {
            email: email,
            type: "JOIN"
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

        await resendFetchRequest(options);
    }

    useEffect(function validateEmailFetch() {
        if (resendStatusCode === 201) {
            setHelperText('*인증코드가 재전송되었습니다');
            setHelperTextColor('blue');
            setHelperTextVisibility('visible');
            setTimeLimit(180);
            return;
        }

        if (resendStatusCode === 409) {
            setHelperText('*이미 가입된 이메일입니다');
            setHelperTextColor('red');
            setHelperTextVisibility('visible');
            return;
        }

        if (resendStatusCode === 500) {
            setHelperText('*서버 에러');
            setHelperTextColor('red');
            setHelperTextVisibility('visible');
        }
    }, [resendStatusCode])

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    return (
        <Container>
            <ModalBox>

                <CloseButtonBox>
                    <CloseIcon src={closeIcon} onClick={closeModal} />
                </CloseButtonBox>

                <MainText>이메일 인증</MainText>

                <CheckInput placeHolder={timeLimit} marginTop={20} action={validateAuthcode} text={code} handleChange={handleCodeChange} loading={authCodeLoading} inputDisabled={authCodeDisabled} />
                <HelperText text={helperText} visibility={helperTextVisibility} color={helperTextColor} />

                <ResendButton disabled={resendDisabled} onClick={handleResend}>{resendLoading ? <Loading src={loadingIcon} alt="로딩" /> : "재전송"}</ResendButton>

                <CompleteButton onClick={handleAuthComplete}>완료</CompleteButton>

            </ModalBox>
        </Container>
    );
}

export default EmailAuthModal;