import styled from 'styled-components';

const Button = styled.button<{ type: "white" | "black" | "none" }>`
    width: 90px;
    height: 40px;
    border-radius: 5px;
    font-size:16px;
    cursor: pointer;

    background-color: ${({ type }) =>
        type === "white" || type === "none" ? "#F9FBFF" : "rgba(0, 0, 0, 0.7)"};

    color: ${({ type }) =>
        type === "white" || type === "none" ? "#000000" : "#FFFFFF"};

    border: ${({ type }) =>
        type === "white" || type === "black" ? "1px solid rgba(0, 0, 0, 0.2)" : "none"};

    &:hover {
        background-color: ${({ type }) =>
        type === "white" || type === "none" ? "rgba(0, 0, 0, 0.07)" : "black"};
    }

    @media (max-width: 768px) {
        width: 80px;
        height: 40px;
        font-size: 14px;
    }

    @media (max-width: 480px) {
        width: 100%;
        font-size: 14px;
    }
`;

interface ShortButtonProps {
    text: string;
    type: "white" | "black" | "none";
    action: () => void;
}

const ShortButton: React.FC<ShortButtonProps> = (props) => {
    const { text, type, action } = props;

    return (
        <Button type={type} onClick={action}>
            {text}
        </Button>
    )
}

export default ShortButton;