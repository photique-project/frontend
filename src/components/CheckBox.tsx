import styled from 'styled-components';

const Container = styled.div<{ marginTop: number }>`
    width: 300px;
    margin-top: ${({ marginTop }) => `${marginTop}px`};

    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 420px) {
        width:100%;
    
    }
`;

const Label = styled.label`
    display: flex;
    flex-direction: row;
    align-items: center;

    font-size: 12px;
    line-height: 12px;
`;

const Box = styled.input`
    
`;

interface CheckBoxProps {
    text: string;
    marginTop: number;
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
    const { text, marginTop } = props;


    return (
        <Container marginTop={marginTop}>
            <Label>
                <Box type='checkbox' />
                {text}
            </Label>
        </Container>
    )
}

export default CheckBox;