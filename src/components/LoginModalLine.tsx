import styled from 'styled-components';

const Container = styled.div`
    width: 300px;  
    margin-top: 30px;

    font-size: 10px;
    color: rgba(0, 0, 0, 0.4);
    

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 5.5px;
`;

const Line = styled.div`
    width: 120px;
    height: 1px;

    background-color: rgba(0, 0, 0, 0.2);
`;

const LoginModalLine = () => {
    return (
        <Container>
            <Line />
            간편 로그인
            <Line />
        </Container>
    );
}

export default LoginModalLine;