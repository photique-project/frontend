import styled from 'styled-components';

const Container = styled.div<{ marginTop: number }>`
    width: 350px;  
    margin-top: ${({ marginTop }) => `${marginTop}px`};

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

interface SNSLineProps {
    text: string;
    marginTop: number;
}

const SNSLine: React.FC<SNSLineProps> = (props) => {
    const { text, marginTop } = props;

    return (
        <Container marginTop={marginTop}>
            <Line />
            {text}
            <Line />
        </Container>
    );
}

export default SNSLine;