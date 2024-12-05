import styled from 'styled-components';

const Button = styled.button<{ type: "white" | "black" | "none" }>`
    width: 90px;
    height: 40px;
    border-radius: 5px;
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

    /* 태블릿 */
    @media (max-width: 768px) {
        width: 80px;
        height: 40px;
        font-size: 14px;
    }

    /* 휴대폰 */
    @media (max-width: 480px) {
        width: 100%;
        font-size: 14px;
    }
`;

interface ShortButtonProps {
    text: string;
    type: "white" | "black" | "none";
}

const ShortButton: React.FC<ShortButtonProps> = (props) => {
    const { text, type } = props;

    return (
        <Button type={type}>
            {text}
        </Button>
    )
}

export default ShortButton;