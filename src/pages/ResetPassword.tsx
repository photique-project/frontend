import { useState } from 'react';

import styled from 'styled-components';
import Header from '../components/Header';
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

const ResetPassword = () => {
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
                <Maintext>이메일 인증을 완료하고 비밀번호를 재설정해주세요 !</Maintext>
                <FormBox>
                    <CheckInput placeHolder='이메일' marginTop={40} action={showEmailAuthModal} />
                    <PasswordInput placeHolder='새 비밀번호' marginTop={25} />
                    <PasswordInput placeHolder='비밀번호 확인' marginTop={25} />
                    <LongButton text='재설정하기' type='black' marginTop={65} />

                </FormBox>

            </BodyBox>
            {emailAuthModalDisplay && <EmailAuthModal display={emailAuthModalDisplay} closeModal={showEmailAuthModal} />}
        </Container>
    )
}

export default ResetPassword;