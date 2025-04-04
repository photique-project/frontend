import styled, { keyframes } from "styled-components";

import successIcon from "../assets/success.png";
import failIcon from "../assets/fail.png";



const Container = styled.div<{ isSuccess: boolean }>`
    width: 320px;
    height: 92px;
    
    background-color: ${({ isSuccess }) => (isSuccess ? '#78db6f' : '#fc4949')};
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.25);
    
    display: flex;
    flex-direction: column;
    
    top: 20px;
    right: 20px;
    position: fixed;

    border-radius: 7px;

    z-index: 999;

    @media (max-width: 450px) {
            width: 70%;
            height: 70px;
    }

`;

const slideAnimation = keyframes`
    0% {
        width: 0%;
    }
    100% {
        width: 100%;
    }
`;

const LoadingBar = styled.div<{ isSuccess: boolean }>`
  height: 7px;
  background-color: rgba(0, 0, 0, 0.4);
  animation: ${slideAnimation} 3s ease-in-out forwards;
  border-radius: 7px;
`;

const ContentBox = styled.div`
    width: 100%;
    height: 85px;
    
    display: flex;
    flex-direction: row;

    @media (max-width: 450px) {
        height: 62px;
    }
`;

const IconBox = styled.div`
    width: 25%;
    height: 85px;
    

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 450px) {
        height: 62px;
    }
`;

const Icon = styled.img`
    width: 40px;
    height: 40px;

    @media (max-width: 450px) {
        width: 25px;
        height: 25px;
    }
`;

const TextBox = styled.div`
    width: 75%;
    height: 85px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 450px) {
        height: 62px;
    }
    
`;

const FirstText = styled.div`
    font-size: 16px;
    line-height: 17px;
    font-weight: 700;
    color: white;
`;

const SecondText = styled.div`
    margin-top: 10px;
    font-size: 16px;
    line-height: 17px;
    color: white;
`;



interface ToastMessageProps {
    firstText: string;
    secondText: string;
    isSuccess: boolean;
}



const ToastMessage: React.FC<ToastMessageProps> = (props) => {
    const { firstText, secondText, isSuccess } = props;
    // isSuccess에 따라서 색과 아이콘 변경

    return (
        <Container isSuccess={isSuccess}>
            <ContentBox>

                <IconBox>
                    <Icon src={isSuccess ? successIcon : failIcon} alt={isSuccess ? '성공' : '실패'} />
                </IconBox>

                <TextBox>
                    <FirstText>{firstText}</FirstText>
                    <SecondText>{secondText}</SecondText>

                </TextBox>

            </ContentBox>
            <LoadingBar isSuccess={isSuccess} />
        </Container>
    );
};

export default ToastMessage;
