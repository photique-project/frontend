import styled from 'styled-components';

import removeIcon from '../assets/x.png'



const Container = styled.div`
    padding-left: 7px;
    padding-right: 7px;
    height: 40px;
    background-color: #BCBFD2;

    font-size: 16px;
    font-weight: 700;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    border-radius: 10px;

    gap: 6px;
`;

const RemoveIcon = styled.img`
    width: 16px;
    height: 16px;

    cursor: pointer;
`;



interface TagProps {
    text: string;
    handleTagRemove: () => void;
}



const Tag: React.FC<TagProps> = (props) => {
    const { text, handleTagRemove } = props;

    return (
        <Container>
            {text}
            <RemoveIcon src={removeIcon} onClick={handleTagRemove} />
        </Container>
    )
}

export default Tag;