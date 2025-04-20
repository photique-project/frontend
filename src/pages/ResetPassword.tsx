import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Header from '../components/Header';
import CheckInput from '../components/input/CheckInput';
import EmailAuthModal from '../components/EmailAuthModal';
import PasswordInput from '../components/input/PasswordInput';
import LongButton from '../components/button/LongButton';
import useFetch from '../hooks/useFetch';
import { FetchRequestOptions } from '../types/http';
import ENDPOINTS from '../api/endpoints';
import HelperText from '../components/HelperText';
import ToastMessage from '../components/ToastMessage';
import Loader from '../components/Loader';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;

    background-color: #F9FBFF;
`;

const BodyBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    width: 100%; 
    overflow-y: scroll;
    
    &::-webkit-scrollbar {
        width: 7px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px; 
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

const Maintext = styled.div`
    margin-top: 20px;
    font-size: 20px;
    line-height: 20px;
    color: rgba(0,0,0, 0.6);

    @media (max-width: 520px) {
        font-size: 16px;
        line-height: 17px;
        padding-left: 20px;
        padding-right: 20px;
    }
`;

const FormBox = styled.div`
    margin-top: 20px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 40px;
    width: 300px;
    
    margin-bottom: 50px;

    flex-shrink: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    @media (max-width: 450px) {
        width: 66%;
        padding-left: 30px;
        padding-right: 30px;
    }
`;

const LoadingBox = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    background-color: rgba(0, 0, 0, 0.5);

    position: absolute;

    z-index: 999;
`




const ResetPassword = () => {
    const navigate = useNavigate();

    const {
        loading: emailLoading,
        statusCode: emailStatusCode,
        data: emailData,
        fetchRequest: emailFetchRequest
    } = useFetch<void>();

    const [emailAuthModalDisplay, setEmailAuthModalDisplay] = useState<'flex' | null>(null);

    const [validEmail, setValidEmail] = useState<boolean | null>(null);
    const [email, setEmail] = useState<string>('');
    const [emailHelperText, setEmailHelperText] = useState<string>('');
    const [emailHelperTextColor, setEmailHelperTextColor] = useState<'red' | 'green'>('red');
    const [emailHelperTextVisibility, setEmailHelperTextVisibility] = useState<'visible' | 'hidden'>('hidden');
    const [emailDisabled, setEmailDisalbled] = useState<boolean>(false);

    const [validPassword, setValidPassword] = useState<boolean | null>(null);
    const [password, setPassword] = useState<string>('');
    const [passwordHelperText, setPasswordHelperText] = useState<string>('');
    const [passwordHelperTextColor, setPasswordHelperTextColor] = useState<'red' | 'green'>('red');
    const [passwordHelperTextVisibility, setPasswordHelperTextVisibility] = useState<'visible' | 'hidden'>('hidden');
    const [passwordDisabled, setPasswordDisalbled] = useState<boolean>(false);

    const [validRepassword, setValidRepassword] = useState<boolean | null>(null);
    const [repassword, setRepassword] = useState<string>('');
    const [repasswordHelperText, setRepasswordHelperText] = useState<string>('');
    const [repasswordHelperTextColor, setRepasswordHelperTextColor] = useState<'red' | 'green'>('red');
    const [repasswordHelperTextVisibility, setRepasswordHelperTextVisibility] = useState<'visible' | 'hidden'>('hidden');
    const [repasswordDisabled, setRepasswordDisalbled] = useState<boolean>(false);

    const [toastMessageDisplay, setToastMessageDisplay] = useState<'flex' | null>(null);
    const [toastMessageFirstText, setToastMessageFirstText] = useState<string>('');
    const [toastMessageSecondText, setToastMessageSecondText] = useState<string>('');
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState<boolean>(true);

    const handleResetPasswordMailRequest = () => {
        const method = ENDPOINTS.AUTH.SEND_PASSWORD_MAIL.METHOD;
        const url = ENDPOINTS.AUTH.SEND_PASSWORD_MAIL.URL;

        const requestBody = {
            email: email,
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

        emailFetchRequest(options);
    }


    const showEmailAuthModal = () => {
        if (emailAuthModalDisplay === 'flex') {
            setEmailAuthModalDisplay(null);
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailHelperText('*유효하지 않은 이메일 형식입니다');
            setEmailHelperTextColor('red')
            setEmailHelperTextVisibility('visible');
            return;
        }

        setEmailHelperTextVisibility('hidden');
        handleResetPasswordMailRequest();
    }

    useEffect(function handleResetPasswordMailResponse() {
        if (emailStatusCode === 201) {
            setEmailAuthModalDisplay('flex');
            setEmailHelperTextVisibility('hidden');
            return;
        }

        if (emailStatusCode === 404) {
            setEmailHelperText('*존재하지 않는 이메일 계정입니다');
            setEmailHelperTextColor('red');
            setEmailHelperTextVisibility('visible');
            return;
        }

        if (emailStatusCode === 500) {
            setEmailHelperText('*서버 에러');
            setEmailHelperTextColor('red');
            setEmailHelperTextVisibility('visible');
        }
    }, [emailStatusCode])

    useEffect(function closeEmailInput() {
        if (validEmail) {
            setEmailHelperText('*이메일 인증이 완료되었습니다');
            setEmailHelperTextColor('green');
            setEmailHelperTextVisibility('visible');
            setEmailDisalbled(true);
        }
    }, [validEmail])

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleRepasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepassword(e.target.value);
    };

    useEffect(function validatePassword() {
        if (password !== '') {
            if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/.test(password)) {
                setValidPassword(false);
                setPasswordHelperText('*비밀번호는 최소 8자 이상이어야 하며, 최소 한 개의 영문자, 숫자, 특수문자를 포함해야 합니다');
                setPasswordHelperTextColor('red');
                setPasswordHelperTextVisibility('visible');
                return;
            }

            setValidPassword(true);
            setPasswordHelperText('*사용 가능한 비밀번호입니다');
            setPasswordHelperTextColor('green');
            setPasswordHelperTextVisibility('visible');
            return;
        }

        setValidPassword(false);
        setPasswordHelperTextVisibility('hidden');

    }, [password])

    useEffect(function validateRepassword() {
        if (repassword !== '') {
            if (password !== repassword) {
                setValidRepassword(false);
                setRepasswordHelperText('*비밀번호가 일치하지 않습니다');
                setRepasswordHelperTextColor('red');
                setRepasswordHelperTextVisibility('visible');
                return;
            }

            setValidRepassword(true);
            setRepasswordHelperText('*비밀번호가 일치합니다');
            setRepasswordHelperTextColor('green');
            setRepasswordHelperTextVisibility('visible');
            return;
        }

        setValidRepassword(false);
        setRepasswordHelperTextVisibility('hidden');
    }, [repassword])

    const {
        loading: passwordResetLoading,
        statusCode: passwordResetStatusCode,
        fetchRequest: passwordUpdateFetchRequest
    } = useFetch<void>();

    const handleResetPasswordRequest = () => {
        const method = ENDPOINTS.USER.RESET_PASSWORD.METHOD;
        const url = ENDPOINTS.USER.RESET_PASSWORD.URL;

        const body = {
            email: email,
            password: password,
        }

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
            body: body,
        };

        passwordUpdateFetchRequest(options)
    }

    useEffect(function handleResetPasswordResponse() {
        if (passwordResetStatusCode === 204) {
            setToastMessageFirstText('비밀번호 재설정 성공 !')
            setToastMessageSecondText('메인 페이지로 이동합니다')
            setResetPasswordSuccess(true);
            setToastMessageDisplay('flex');

            setTimeout(() => {
                navigate('/home');
            }, 3000);
            return;
            return;
        }

        if (passwordResetStatusCode === 400) {
            setToastMessageFirstText('회원가입 실패 !')
            setToastMessageSecondText('입력값을 확인해주세요')
            setResetPasswordSuccess(false);
            setToastMessageDisplay('flex');

            setTimeout(() => {
                setToastMessageDisplay(null);
            }, 3000);
            return;
        }

        if (passwordResetStatusCode === 401) {
            return;
        }

        if (passwordResetStatusCode === 404) {
            return;
        }

        if (passwordResetStatusCode === 410) {
            return;
        }

        if (passwordResetStatusCode === 500) {
            setToastMessageFirstText('비밀번호 재설정 실패 !')
            setToastMessageSecondText('서버에러: 잠시 후 다시 시도해 주세요')
            setResetPasswordSuccess(false);
            setToastMessageDisplay('flex');

            setTimeout(() => {
                setToastMessageDisplay(null);
            }, 3000);
            return;
        }

    }, [passwordResetStatusCode])

    const handleResetPassword = () => {
        if (!validEmail) {
            setEmailHelperText('*이메일 인증을 완료 해주세요');
            setEmailHelperTextColor('red');
            setEmailHelperTextVisibility('visible');
            return;
        }

        if (!validPassword) {
            setPasswordHelperText('*유효한 비밀번호를 입력 해주세요')
            setPasswordHelperTextColor('red');
            setPasswordHelperTextVisibility('visible');
            return;
        }

        if (!validRepassword) {
            setRepasswordHelperText('*비밀번호 재입력 해주세요')
            setRepasswordHelperTextColor('red');
            setRepasswordHelperTextVisibility('visible');
            return;
        }

        handleResetPasswordRequest();
    }

    return (
        <Container>
            {passwordResetLoading &&
                <LoadingBox>
                    <Loader fontColor='white' />
                </LoadingBox>
            }
            <Header />
            <BodyBox>
                <Maintext>이메일 인증을 완료하고 비밀번호를 재설정해주세요 !</Maintext>
                <FormBox>
                    <CheckInput placeHolder='이메일' marginTop={40} action={showEmailAuthModal} text={email} handleChange={handleEmailChange} setValidText={setValidEmail} loading={emailLoading} inputDisabled={emailDisabled} />
                    <HelperText text={emailHelperText} visibility={emailHelperTextVisibility} color={emailHelperTextColor} />

                    <PasswordInput placeHolder='새 비밀번호' marginTop={15} text={password} handleChange={handlePasswordChange} inputDisabled={passwordDisabled} />
                    <HelperText text={passwordHelperText} visibility={passwordHelperTextVisibility} color={passwordHelperTextColor} />

                    <PasswordInput placeHolder='비밀번호 확인' marginTop={15} text={repassword} handleChange={handleRepasswordChange} inputDisabled={repasswordDisabled} />
                    <HelperText text={repasswordHelperText} visibility={repasswordHelperTextVisibility} color={repasswordHelperTextColor} />

                    <LongButton text='재설정하기' type='black' marginTop={40} onClick={handleResetPassword} />

                </FormBox>

            </BodyBox>
            {emailAuthModalDisplay && <EmailAuthModal email={email} closeModal={showEmailAuthModal} validEmail={validEmail} setValidEmail={setValidEmail} />}

            {toastMessageDisplay && <ToastMessage firstText={toastMessageFirstText} secondText={toastMessageSecondText} isSuccess={resetPasswordSuccess} />}
        </Container>
    )
}

export default ResetPassword;