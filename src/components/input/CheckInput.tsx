import { Dispatch, SetStateAction } from 'react';
import styled, { keyframes } from 'styled-components';

import loadingIcon from '../../assets/loading.png';



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


    border: 1.5px solid rgba(0, 0, 0, 0.2);
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
    width: 32px;
    height: 30px;
    right: 12px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);

    background-color: white;
    
    font-size: 10px;
    font-weight: 500;
    line-height: 11px;

    position: absolute;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
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



interface CheckInputProps {
    placeHolder: string | number;
    marginTop: number;
    action: () => void;
    text: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setValidText?: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    inputDisabled: boolean;
}



const CheckInput: React.FC<CheckInputProps> = (props) => {
    const { placeHolder, marginTop, action, text, handleChange, setValidText, loading, inputDisabled } = props;

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    };

    return (
        <Container marginTop={marginTop}>
            <Input
                placeholder={typeof placeHolder === 'number' ? formatTime(placeHolder) : placeHolder}
                value={text}
                onChange={handleChange}
                disabled={loading || inputDisabled}
            />
            <ValidateButton onClick={action} disabled={loading || inputDisabled}>
                {loading ? <Loading src={loadingIcon} alt="로딩" /> : "확인"}
            </ValidateButton>
        </Container>
    );
}

export default CheckInput;