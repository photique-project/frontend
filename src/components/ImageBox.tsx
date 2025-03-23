import { useState, useEffect } from 'react';

import styled from 'styled-components';

import upIcon from '../assets/up.png';
import downIcon from '../assets/d.png';
import closeIcon from '../assets/close-large.png';



const Container = styled.div`
    padding: 20px;
    width: calc(100% - 40px);

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    gap: 20px;

    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    @media (max-width: 480px) {
        padding: 10px;
        width: calc(100% - 20px);
    }
`

const SmallHeaderBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;  

    @media (max-width: 480px) {
        gap: 10px;
    }
`;

const ImageIconBoxes = styled.div`
    display: flex;
    flex-direction: column;
`

const ImageIconBox = styled.div`
    width:40px;
    height: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 5px;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    @media (max-width: 480px) {
        width:30px;
        height: 30px;
    }
`

const ImageIcon = styled.img`
    width:24px;
    height:24px;
`

const Image = styled.img`
    width: 100px;
    height: 100px;

    object-fit: contain; 

    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
`

const ImageInfoBox = styled.div`
    width: calc(100% - 80px - 100px - 60px);

    display: flex;
    flex-direction: column;
    gap:10px;

    @media (max-width: 768px) {
        width: 100%;
    }
`

const ExhibitionImageTitle = styled.input`
    padding-left: 12px;
    padding-right: 12px;
    width: calc(100% - 24px);
    height: 40px;

    font-size: 16px;

    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    
    &::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }
    
    &:focus {
        outline: none; 
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`

const ExhibitionImageDescription = styled.textarea`
    padding: 12px;
    width: calc(100% - 24px);
    height: 80px;
    
    resize: none;

    font-size: 16px;

    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    
    &::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }
    
    &:focus {
        outline: none; 
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`



interface Work {
    image: File;
    previewImage: string;
    title: string;
    description: string;
}

interface ImageBoxProps {
    index: number;
    work: Work
    handleTitleInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    handleDescriptionInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void;
    handleRemove: (id: number) => void;
    handleMoveUp: (index: number) => void;
    handleMoveDown: (index: number) => void;
}



const ImageBox: React.FC<ImageBoxProps> = (props) => {
    const { index, work, handleTitleInputChange, handleDescriptionInputChange, handleRemove, handleMoveUp, handleMoveDown } = props;


    // 사이즈 감지
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <Container>
            {!isMobile && <>
                <ImageIconBoxes>
                    <ImageIconBox onClick={() => handleMoveUp(index)}>
                        <ImageIcon src={upIcon} />
                    </ImageIconBox>
                    <ImageIconBox onClick={() => handleMoveDown(index)}>
                        <ImageIcon src={downIcon} />
                    </ImageIconBox>

                </ImageIconBoxes>

                <Image src={work.previewImage} />

                <ImageInfoBox>
                    <ExhibitionImageTitle
                        placeholder='제목'
                        value={work.title}
                        onChange={(e) => handleTitleInputChange(e, index)}
                    />
                    <ExhibitionImageDescription
                        placeholder='설명'
                        value={work.description}
                        onChange={(e) => handleDescriptionInputChange(e, index)}
                    />
                </ImageInfoBox>
                <ImageIconBox onClick={() => handleRemove(index)}>
                    <ImageIcon src={closeIcon} />

                </ImageIconBox>
            </>}
            {isMobile && <>
                <SmallHeaderBox>

                    <ImageIconBoxes>
                        <ImageIconBox onClick={() => handleMoveUp(index)}>
                            <ImageIcon src={upIcon} />
                        </ImageIconBox>
                        <ImageIconBox onClick={() => handleMoveDown(index)}>
                            <ImageIcon src={downIcon} />
                        </ImageIconBox>
                    </ImageIconBoxes>

                    <Image src={work.previewImage} />

                    <ImageIconBox onClick={() => handleRemove(index)}>
                        <ImageIcon src={closeIcon} />
                    </ImageIconBox>

                </SmallHeaderBox>

                <ImageInfoBox>
                    <ExhibitionImageTitle
                        placeholder='제목'
                        value={work.title}
                        onChange={(e) => handleTitleInputChange(e, index)}
                    />
                    <ExhibitionImageDescription
                        placeholder='설명'
                        value={work.description}
                        onChange={(e) => handleDescriptionInputChange(e, index)}
                    />

                </ImageInfoBox>
            </>}

        </Container >

    )
}

export default ImageBox;