import styled from 'styled-components';
import naverIcon from '../assets/naver.png';
import googleIcon from '../assets/google.png';
import kakaoIcon from '../assets/kakao.png';

const Container = styled.div`
    width: 300px;
    margin-top: 12px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    gap: 20px;

    @media (max-width: 420px) {
        gap: 10px;
    }
`;

const Icon = styled.img`
    cursor: pointer;
`;

const OAuthIcons = () => {
    return (
        <Container>
            <Icon src={naverIcon} />
            <Icon src={googleIcon} />
            <Icon src={kakaoIcon} />
        </Container>
    );
}

export default OAuthIcons;