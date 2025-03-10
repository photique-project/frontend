import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/environment';
import ENDPOINTS from '../api/endpoints';

import styled from 'styled-components';

import useFetch from '../hooks/useFetch';

import Header from '../components/Header';
import OAuthIcons from '../components/OAuthIcons';
import SNSLine from '../components/SNSLine';
import ImageInput from '../components/input/ImageInput';
import CheckInput from '../components/input/CheckInput';
import EmailAuthModal from '../components/EmailAuthModal';
import PasswordInput from '../components/input/PasswordInput';
import LongButton from '../components/button/LongButton';
import HelperText from '../components/HelperText';
import ToastMessage from '../components/ToastMessage';

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

const JoinFormBox = styled.div`
    margin-top: 20px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 30px;
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

const ProfileImageInputText = styled.div`
    margin-top: 40px;
    font-size: 16px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.6);
`;

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface FetchRequestOptions {
    url: string;
    method: Method
    headers?: Record<string, string>;
    credentials: 'include' | 'same-origin';
    contentType: 'application/json' | 'multipart/form-data';
    body?: Record<string, any> | FormData | null;
}


const Join = () => {
    const navigate = useNavigate();

    const {
        loading: emailLoading,
        statusCode: emailStatusCode,
        data: emailData,
        fetchRequest: emailFetchRequest
    } = useFetch<void>();

    const {
        loading: nicknameLoading,
        statusCode: nicknameStatusCode,
        data: nicknameData,
        fetchRequest: nicknameFetchRequest
    } = useFetch<void>();

    const {
        loading: joinLoading,
        statusCode: joinStatusCode,
        data: joinData,
        fetchRequest: joinFetchRequest
    } = useFetch<void>();


    const [emailAuthModalDisplay, setEmailAuthModalDisplay] = useState<'flex' | null>(null);

    const [validProfileImage, setValidProfileImage] = useState<boolean | null>(null);
    const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
    const [profileImageHelperTextVisibility, setProfileImageHelperTextVisibility] = useState<'visible' | 'hidden'>('hidden');
    const [profileImageDisabled, setProfileImageDisabled] = useState<boolean>(false);

    const [validEmail, setValidEmail] = useState<boolean | null>(null);
    const [email, setEmail] = useState<string>('');
    const [emailHelperText, setEmailHelperText] = useState<string>('');
    const [emailHelperTextColor, setEmailHelperTextColor] = useState<'red' | 'green'>('red');
    const [emailHelperTextVisibility, setEmailHelperTextVisibility] = useState<'visible' | 'hidden'>('hidden');
    const [emailDisabled, setEmailDisalbled] = useState<boolean>(false);

    const [validNickname, setValidNickname] = useState<boolean | null>(null);
    const [nickname, setNickname] = useState<string>('');
    const [nicknameHelperText, setNicknameHelperText] = useState<string>('');
    const [nicknameHelperTextColor, setNicknameHelperTextColor] = useState<'red' | 'green'>('red');
    const [nicknameHelperTextVisibility, setNicknameHelperTextVisibility] = useState<'visible' | 'hidden'>('hidden');
    const [nicknameDisabled, setNicknameDisalbled] = useState<boolean>(false);

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
    const [joinSuccess, setJoinSuccess] = useState<boolean>(true);

    useEffect(function validateProfileImage() {
        if (validProfileImage != null) {

            if (validProfileImage) {
                setProfileImageHelperTextVisibility('hidden')
                return;
            }

            setProfileImageHelperTextVisibility('visible')
        }
    }, [validProfileImage])


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

        const method: Method = 'POST'
        const headers = {
            'Content-Type': 'application/json',
        }

        const requestBody = {
            email: email,
            type: "JOIN"
        }

        const options: FetchRequestOptions = {
            url: `${API_BASE_URL}${ENDPOINTS.AUTH.SEND_MAIL}`,
            method: method,
            headers: headers,
            credentials: 'include',
            contentType: 'application/json',
            body: requestBody
        }

        emailFetchRequest(options);
    }

    useEffect(function validateEmailFetch() {
        if (emailStatusCode === 201) {
            setEmailAuthModalDisplay('flex');
            setEmailHelperTextVisibility('hidden');
            return;
        }

        if (emailStatusCode === 409) {
            setEmailHelperText('*이미 가입된 이메일입니다');
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
            setEmailHelperText('*사용 가능한 이메일입니다');
            setEmailHelperTextColor('green');
            setEmailHelperTextVisibility('visible');
            setEmailDisalbled(true);
        }
    }, [validEmail])

    const validateNickname = () => {
        if (!/^[^\s]{1,11}$/.test(nickname)) {
            setValidNickname(false);
            setNicknameHelperText('*공백없이 1글자 이상 11글자 이하의 닉네임만 가능합니다');
            setNicknameHelperTextColor('red');
            setNicknameHelperTextVisibility('visible');
            return;
        }

        const method: Method = 'GET'
        const headers = {
            'Content-Type': 'application/json',
        }

        const options: FetchRequestOptions = {
            url: `${API_BASE_URL}${ENDPOINTS.USER.VALIDATE_NICKNAME}?nickname=${nickname}`,
            method: method,
            headers: headers,
            credentials: 'include',
            contentType: 'application/json'
        }

        nicknameFetchRequest(options);
    }

    useEffect(function closeNickname() {
        if (nicknameStatusCode === 204) {
            setValidNickname(true);
            setNicknameHelperText('*사용 가능한 닉네임입니다');
            setNicknameHelperTextColor('green');
            setNicknameHelperTextVisibility('visible');
            return;
        }

        if (nicknameStatusCode === 400) {
            setValidNickname(false);
            setNicknameHelperText('*공백없이 1글자 이상 11글자 이하의 닉네임만 가능합니다');
            setNicknameHelperTextColor('red');
            setNicknameHelperTextVisibility('visible');
            return;
        }

        if (nicknameStatusCode === 409) {
            setValidNickname(false);
            setNicknameHelperText('*이미 사용중인 닉네임입니다');
            setNicknameHelperTextColor('red');
            setNicknameHelperTextVisibility('visible');
            return;
        }

        if (nicknameStatusCode === 500) {
            setValidNickname(false);
            setNicknameHelperText('*서버 에러');
            setNicknameHelperTextColor('red');
            setNicknameHelperTextVisibility('visible');
        }

    }, [nicknameStatusCode])

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
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

    const handleJoin = () => {
        if (!validEmail) {
            setEmailHelperText('*이메일 인증을 완료 해주세요');
            setEmailHelperTextColor('red');
            setEmailHelperTextVisibility('visible');
            return;
        }

        if (!validNickname) {
            setNicknameHelperText('*유효한 닉네임을 입력 해주세요')
            setNicknameHelperTextColor('red');
            setNicknameHelperTextVisibility('visible');
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

        const method: Method = 'POST';
        const formData = new FormData();

        if (profileImage !== undefined) {
            formData.append('profileImage', profileImage);
        }

        formData.append('email', email);
        formData.append('nickname', nickname);
        formData.append('password', password);

        const options: FetchRequestOptions = {
            url: `${API_BASE_URL}${ENDPOINTS.USER.DEFAULT}`,
            method: method,
            credentials: 'include',
            contentType: 'multipart/form-data',
            body: formData,
        };

        joinFetchRequest(options)
    }

    useEffect(function loadJoinFetchRequest() {
        if (joinLoading) {
            setProfileImageDisabled(true);
            setEmailDisalbled(true);
            setNicknameDisalbled(true);
            setPasswordDisalbled(true);
            setRepasswordDisalbled(true);

            return;
        }

        setProfileImageDisabled(false);
        setEmailDisalbled(false);
        setNicknameDisalbled(false);
        setPasswordDisalbled(false);
        setRepasswordDisalbled(false);

    }, [joinLoading])

    useEffect(function handleJoinResult() {
        if (joinStatusCode !== null) {
            setToastMessageDisplay('flex');

            if (joinStatusCode === 201) {
                setToastMessageFirstText('회원가입 성공 !')
                setToastMessageSecondText('메인 페이지로 이동합니다')
                setJoinSuccess(true);

                setTimeout(() => {
                    navigate('/home');
                }, 3000);
                return;
            }

            if (joinStatusCode === 400) {
                setToastMessageFirstText('회원가입 실패 !')
                setToastMessageSecondText('입력값을 확인해주세요')
                setJoinSuccess(false);
                setTimeout(() => {
                    setToastMessageDisplay(null);
                }, 3000);
                return;
            }

            if (joinStatusCode === 409) {
                setToastMessageFirstText('회원가입 실패 !')
                setToastMessageSecondText('입력값을 확인해주세요')
                setJoinSuccess(false);
                setTimeout(() => {
                    setToastMessageDisplay(null);
                }, 3000);
                return;
            }

            if (joinStatusCode === 500) {
                setToastMessageFirstText('회원가입 실패 !')
                setToastMessageSecondText('서버에러: 잠시 후 다시 시도해 주세요')
                setJoinSuccess(false);
                setTimeout(() => {
                    setToastMessageDisplay(null);
                }, 3000);
                return;
            }
        }

    }, [joinStatusCode])



    return (
        <Container>
            <Header />
            <BodyBox>

                <OAuthIcons marginTop={20} />
                <SNSLine text='간편 회원가입' marginTop={15} />

                <JoinFormBox>
                    <ProfileImageInputText>프로필 이미지</ProfileImageInputText>
                    <ImageInput width={'100%'} ratio={'1/1'} marginTop={5} image={profileImage} setImage={setProfileImage} setValidImage={setValidProfileImage} inputDisabled={profileImageDisabled} />
                    <HelperText text='*PNG, JPG 파일만 가능하며, 최대 크기는 5MB입니다' visibility={profileImageHelperTextVisibility} color='red' />

                    <CheckInput placeHolder='이메일' marginTop={30} action={showEmailAuthModal} text={email} handleChange={handleEmailChange} loading={emailLoading} inputDisabled={emailDisabled} />
                    <HelperText text={emailHelperText} visibility={emailHelperTextVisibility} color={emailHelperTextColor} />

                    <CheckInput placeHolder='닉네임' marginTop={15} action={validateNickname} text={nickname} handleChange={handleNicknameChange} loading={nicknameLoading} inputDisabled={nicknameDisabled} />
                    <HelperText text={nicknameHelperText} visibility={nicknameHelperTextVisibility} color={nicknameHelperTextColor} />

                    <PasswordInput placeHolder='비밀번호' marginTop={15} text={password} handleChange={handlePasswordChange} inputDisabled={passwordDisabled} />
                    <HelperText text={passwordHelperText} visibility={passwordHelperTextVisibility} color={passwordHelperTextColor} />

                    <PasswordInput placeHolder='비밀번호 확인' marginTop={15} text={repassword} handleChange={handleRepasswordChange} inputDisabled={repasswordDisabled} />
                    <HelperText text={repasswordHelperText} visibility={repasswordHelperTextVisibility} color={repasswordHelperTextColor} />

                    <LongButton text='가입하기' type='black' marginTop={40} onClick={handleJoin} />
                </JoinFormBox>

            </BodyBox>
            {/* 
                인증모달을 작성해놓고 리렌더링만 시키면, 모달을 닫았다가 열었을 때 리렌더링이므로 상태 변수 값이 초기화되지않음
                이를 위해서 열고 닫는 방식을 마운트 언마운트로 수정해야함
            */}
            {emailAuthModalDisplay && <EmailAuthModal email={email} closeModal={showEmailAuthModal} validEmail={validEmail} setValidEmail={setValidEmail} />}

            {toastMessageDisplay && <ToastMessage firstText={toastMessageFirstText} secondText={toastMessageSecondText} isSuccess={joinSuccess} />}
        </Container>

    )
}

export default Join;