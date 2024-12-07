import styled from 'styled-components';

const Button = styled.button<{ type: "white" | "black" | "none", marginTop: number }>`
    width: 300px;
    height: 50px;
    margin-top: ${({ marginTop }) => `${marginTop}px`};

    border-radius: 7px;
    font-size:16px;
    cursor: pointer;

    background-color: ${({ type }) =>
        type === "white" || type === "none" ? "#F9FBFF" : "#000000"};

    color: ${({ type }) =>
        type === "white" || type === "none" ? "#000000" : "#FFFFFF"};

    border: ${({ type }) =>
        type === "white" || type === "black" ? "0.5px solid rgba(0, 0, 0, 0.2)" : "none"};

    &:hover {
        background-color: ${({ type }) =>
        type === "white" || type === "none" ? "rgba(0, 0, 0, 0.07)" : "rgba(0, 0, 0, 0.7)"};
    }

    @media (max-width: 420px) {
        width:100%;
        height: 30px;
        font-size: 14px;
    }
`;

interface LongButtonProps {
    text: string;
    type: "white" | "black" | "none";
    marginTop: number;
}

const LongButton: React.FC<LongButtonProps> = (props) => {
    const { text, type, marginTop } = props;

    return (
        <Button type={type} marginTop={marginTop}>
            {text}
        </Button>
    )
}

export default LongButton;