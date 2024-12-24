import styled from 'styled-components';

const Container = styled.div<{ visibility: 'visible' | 'hidden', color: 'red' | 'blue' | 'green' }>`
    margin-top: 5px;
    width: 100%;
    height: 12px;

    font-size: 12px;
    line-height: 12px;

    color: ${({ color }) => color};

    visibility: ${({ visibility }) => visibility};
`;

interface HelperTextProps {
    text: string;
    visibility: 'visible' | 'hidden';
    color: 'red' | 'blue' | 'green';
}

const HelperText: React.FC<HelperTextProps> = (props) => {
    const { text, visibility, color } = props;

    return (
        <Container visibility={visibility} color={color}>{text}</Container>
    );
}

export default HelperText;