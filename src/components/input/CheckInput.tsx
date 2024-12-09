import { useState, useEffect } from 'react';
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

const ValidateButton = styled.button`
    width: 30px;
    height: 20px;
    right: 12px;

    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);

    background-color: white;
    
    font-size: 8px;
    line-height: 8px;

    position: absolute;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`;

interface CheckInputProps {
    placeHolder: string | null;
    marginTop: number;
    action: () => void;
}

const CheckInput: React.FC<CheckInputProps> = (props) => {
    const { placeHolder, marginTop, action } = props;
    const [timeLimit, setTimeLimit] = useState<number | null>(placeHolder === null ? 180 : null); // 3분(180초)

    useEffect(() => {
        if (timeLimit === null) {
            return;
        }

        const timer = setInterval(() => {
            setTimeLimit((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLimit]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    };


    return (
        <Container marginTop={marginTop}>
            <Input placeholder={placeHolder === null ? (timeLimit !== null ? formatTime(timeLimit) : '') : placeHolder} />
            <ValidateButton onClick={action}>확인</ValidateButton>
        </Container>
    );
}

export default CheckInput;