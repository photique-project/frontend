import styled from 'styled-components';

const Card = styled.div`
    width: 500px;
    height: 250px;
    padding: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.25);

    background-color: white;

    @media (max-width: 768px) {
        width: 400px;
        height: 200px; 
    }

    @media (max-width: 480px) {
        width: 80%;
    }
`;

const IconBox = styled.div`
  width: 100%;  
`;

const Icon = styled.img`
    width: 60px;
    height: 60px;

    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
    }
`;

const MainText = styled.div`
    margin-top: 20px;
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;

    @media (max-width: 768px) {
        margin-top: 10px;
        font-size: 20px;
        line-height: 20px;
    }
`;

const SubText = styled.div`
    margin-top: 20px;

    font-size: 16px;
    font-weight: 700;
    line-height: 24px;

    color: rgba(0, 0, 0, 0.5);

    @media (max-width: 768px) {
        margin-top: 10px;
        font-size: 16px;
        line-height: 24px;
    }
`;

interface IntroCardProps {
    icon: string;
    mainText: string;
    subText: React.ReactNode;
}

const IntroCard: React.FC<IntroCardProps> = (props) => {
    const { icon, mainText, subText } = props;

    return (
        <Card>
            <IconBox>
                <Icon src={icon} />
            </IconBox>

            <MainText>{mainText}</MainText>
            <SubText>{subText}</SubText>
        </Card>
    );
}

export default IntroCard;