import { useState } from 'react';

import eyeIcon from '../../assets/eye.png';
import eyeOffIcon from '../../assets/eye-off.png';

import styled from 'styled-components';

const Container = styled.div<{ marginTop: number }>`
    width: 300px;
    height: 50px;
    margin-top: ${({ marginTop }) => `${marginTop}px`};

    display: flex;
    flex-direction: row;
    justify-content: center;

    align-items: center;

    position: relative;

    @media (max-width: 420px) {
        width:100%;
        height: 40px;
    }
`;

const Input = styled.input`
    width: 275px;
    height: 47px;
    padding-left: 12px;
    padding-right: 12px;

    font-size: 16px;
    line-height: 17px;


    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    
    &::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }
    
    &:focus {
        outline: none;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
    }

    @media (max-width: 420px) {
        width: calc(100% - 24px);
        height: 40px;
        font-size: 14px;
        line-height: 14px;
    }
`;

const ViewIcon = styled.img`
    width: 20px;
    right: 12px;

    position: absolute;

    cursor: pointer;
`;


interface PasswordInputProps {
    placeHolder: string;
    marginTop: number
}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
    const { placeHolder, marginTop } = props;

    const [isOpen, setOpen] = useState<boolean>(true);
    const [inputType, setInputType] = useState<'password' | 'text'>('password');

    const handleOpen = () => {
        if (isOpen) {
            setInputType('text');
            setOpen(false);
            return;
        }

        setInputType('password');
        setOpen(true);
    }

    return (
        <Container marginTop={marginTop}>
            <Input placeholder={placeHolder} type={inputType}></Input>
            <ViewIcon src={isOpen ? eyeIcon : eyeOffIcon} onClick={handleOpen}></ViewIcon>


        </Container>
    )
}

export default PasswordInput;