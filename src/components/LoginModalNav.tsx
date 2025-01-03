import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    width: 300px;
    margin-top: 10px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 12px;
`;

const Text = styled.div`
    font-size: 14px;
    line-height: 14px;

    color: rgba(0, 0, 0, 0.5);

    cursor: pointer;
`;


const LoginModalNav = () => {
    const navigate = useNavigate();

    const navigateToJoinPage = () => {
        navigate('/join');
    };

    return (
        <Container>
            <Text>비밀번호 찾기</Text>
            <Text onClick={navigateToJoinPage}>회원가입</Text>
        </Container>
    );
}

export default LoginModalNav;