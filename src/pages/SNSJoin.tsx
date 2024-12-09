import { useState } from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import ProfileImageInput from '../components/input/ProfileImageInput';
import CheckInput from '../components/input/CheckInput';
import LongButton from '../components/LongButton';
import EmailAuthModal from '../components/EmailAuthModal';


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
                <Maintext><strong>프로필 이미지</strong>와 <strong>닉네임</strong>을 설정하고 Photique를 시작하세요</Maintext>

                <JoinFormBox>
                    <ProfileImageInputText>프로필 이미지</ProfileImageInputText>
                    <ProfileImageInput marginTop={5} />
                    <CheckInput placeHolder='이메일' marginTop={20} action={showEmailAuthModal} />
                    <CheckInput placeHolder='닉네임' marginTop={20} action={() => null} />
                    <LongButton text='가입하기' type='black' marginTop={40} />
                </JoinFormBox>

            </BodyBox>
            {emailAuthModalDisplay && <EmailAuthModal display={emailAuthModalDisplay} closeModal={showEmailAuthModal} />}

        </Container>
    );
}

export default SNSJoin;