import { useState } from 'react';

import styled from 'styled-components';

import HelperText from './HelperText';

import CheckInput from './input/CheckInput';

import closeIcon from '../assets/close.png';


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

const ModalBox = styled.div`
    width: 300px;
    padding: 30px;

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
    width: 36px;
    height: 36px;

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
    margin-top: 5px;
    width: 60px;
    height: 17px;

    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);

    font-size: 10px;
    line-height: 11px;
    color: rgba(0, 0, 0, 0.7);  

    cursor: pointer;
`;

const CompleteButton = styled.button`
    margin-top: 20px;
    width: 100px;
    height: 30px;

    border-radius: 7px;

    color: white;
    background-color: black;

    cursor: pointer;
`;

interface EmailAuthModalProps {
    display: 'flex' | 'none';
    closeModal: () => void;
}

const EmailAuthModal: React.FC<EmailAuthModalProps> = (props) => {
    const { display, closeModal } = props;

    const [helperText, setHelperText] = useState<string>('*입력한 이메일로 발송된 인증번호를 입력해주세요');
    const [helperTextVisibility, setHelperTextVisibility] = useState<'visible' | 'hidden'>('visible');
    const [helperTextColor, setHelperTextColor] = useState<'red' | 'blue'>('blue');

    return (
        <Container display={display}>
            <ModalBox>

                <CloseButtonBox>
                    <CloseIcon src={closeIcon} onClick={closeModal} />
                </CloseButtonBox>

                <MainText>이메일 인증</MainText>
                <CheckInput placeHolder={null} marginTop={40} action={() => null} />
                <HelperText text={helperText} visibility={helperTextVisibility} color={helperTextColor} />
                <ResendButton>재전송</ResendButton>
                <CompleteButton>완료</CompleteButton>

            </ModalBox>
        </Container>
    );
}

export default EmailAuthModal;