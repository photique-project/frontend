import { useState } from 'react';

import styled from 'styled-components';

import Header from '../components/Header';
import OAuthIcons from '../components/OAuthIcons';
import SNSLine from '../components/SNSLine';
import ProfileImageInput from '../components/input/ProfileImageInput';
import CheckInput from '../components/input/CheckInput';
import EmailAuthModal from '../components/EmailAuthModal';
import PasswordInput from '../components/input/PasswordInput';
import LongButton from '../components/LongButton';

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
    width: 300px;
    height: 827px;
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

const Join = () => {
    const [emailAuthModalDisplay, setEmailAuthModalDisplay] = useState<'flex' | null>(null);

    const showEmailAuthModal = () => {
        if (emailAuthModalDisplay === 'flex') {
            setEmailAuthModalDisplay(null);
            return;
        }

        setEmailAuthModalDisplay('flex');
    }

    return (

        <Container>
            <Header />
            <BodyBox>
                <OAuthIcons marginTop={20} />
                <SNSLine text='간편 회원가입' marginTop={15} />

                <JoinFormBox>
                    <ProfileImageInputText>프로필 이미지</ProfileImageInputText>
                    <ProfileImageInput marginTop={5} />
                    <CheckInput placeHolder='이메일' marginTop={30} action={showEmailAuthModal} />
                    <CheckInput placeHolder='닉네임' marginTop={25} action={() => null} />
                    <PasswordInput placeHolder='비밀번호' marginTop={25} />
                    <PasswordInput placeHolder='비밀번호 확인' marginTop={25} />
                    <LongButton text='가입하기' type='black' marginTop={65} />
                </JoinFormBox>

            </BodyBox>
            {/* 
                인증모달을 작성해놓고 리렌더링만 시키면, 모달을 닫았다가 열었을 때 리렌더링이므로 상태 변수 값이 초기화되지않음
                이를 위해서 열고 닫는 방식을 마운트 언마운트로 수정해야함
            */}
            {emailAuthModalDisplay && <EmailAuthModal display={emailAuthModalDisplay} closeModal={showEmailAuthModal} />}
        </Container>

    )
}

export default Join;