import { useState, useRef } from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import ImageInput from '../components/input/ImageInput';
import CheckInput from '../components/input/CheckInput';
import LongButton from '../components/LongButton';
import EmailAuthModal from '../components/EmailAuthModal';
import HelperText from '../components/HelperText';
import useFetch from '../hooks/useFetch';


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

    @media (max-width: 520px) {
        font-size: 16px;
        line-height: 17px;
        padding-left: 20px;
        padding-right: 20px;
    }
`;

const JoinFormBox = styled.div`
    margin-top: 20px;
    padding-left: 50px;
    padding-right: 50px;
    width: 300px;
    height: 650px;
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
    color: rgba(0, 0, 0, 0.5);
`;

const SNSJoin = () => {
    const {
        loading: emailLoading,
        statusCode: emailStatusCode,
        data: emailData,
        fetchRequest: emailFetchRequest
    } = useFetch<void>();

    const [emailAuthModalDisplay, setEmailAuthModalDisplay] = useState<'flex' | null>(null);

    const [validProfileImage, setValidProfileImage] = useState<boolean | null>(null);
    const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
    const [profileImageHelperTextVisibility, setProfileImageHelperTextVisibility] = useState<'visible' | 'hidden'>('hidden');
    const [profileImageDisabled, setProfileImageDisalbled] = useState<boolean>(false);

    const [validEmail, setValidEmail] = useState<boolean | null>(null);
    const [email, setEmail] = useState<string>('');
    const [emailDisabled, setEmailDisalbled] = useState<boolean>(true);

    const [nickname, setNickname] = useState<string>('');

    const showEmailAuthModal = () => {
        if (emailAuthModalDisplay === 'flex') {
            setEmailAuthModalDisplay(null);
            return;
        }

        setEmailAuthModalDisplay('flex');
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handleJoin = () => {

    }

    return (
        <Container>
            <Header />

            <BodyBox>
                <Maintext><strong>프로필 이미지</strong>와 <strong>닉네임</strong>을 설정하고 Photique를 시작하세요</Maintext>

                <JoinFormBox>
                    <ProfileImageInputText>프로필 이미지</ProfileImageInputText>
                    <ImageInput marginTop={5} image={profileImage} setImage={setProfileImage} setValidImage={setValidProfileImage} inputDisabled={profileImageDisabled} />
                    <HelperText text='*PNG, JPG 파일만 가능하며, 최대 크기는 5MB입니다.' visibility={profileImageHelperTextVisibility} color='red' />
                    <CheckInput placeHolder='이메일' marginTop={20} action={showEmailAuthModal} text={email} handleChange={handleEmailChange} setValidText={setValidEmail} loading={emailLoading} inputDisabled={emailDisabled} />
                    <CheckInput placeHolder='닉네임' marginTop={20} action={() => null} text={email} handleChange={handleNicknameChange} setValidText={setValidEmail} loading={emailLoading} inputDisabled={emailDisabled} />
                    <LongButton text='가입하기' type='black' marginTop={40} onClick={handleJoin} />
                </JoinFormBox>

            </BodyBox>
            {emailAuthModalDisplay && <EmailAuthModal email={email} closeModal={showEmailAuthModal} validEmail={validEmail} setValidEmail={setValidEmail} />}

        </Container>
    );
}

export default SNSJoin;