import { useState, useEffect } from 'react';

import styled from 'styled-components';
import useAuthStore from '../zustand/store';

import exitIcon from '../assets/exit.png';
import userIcon from '../assets/user-white.png';
import heartIcon from '../assets/heart.png';
import bookmarkIcon from '../assets/bookmark-white.png';
import chatIcon from '../assets/chat.png';
import notebookIcon from '../assets/notebook.png';
import leftIcon from '../assets/arrow-left.png';
import rightIcon from '../assets/arrow-right.png';
import DEFAULT from '../api/default';



const PreviewContainer = styled.div`
    margin-top: 40px;
    width: 100%;

    display: flex;
    flex-direction: column;

    @media (max-width: 480px) {
        margin-top: 30px;
    }
`;

const ExhibitionPreviewImage = styled.img`
    width: 100%;
    height: 100%;

    object-fit: contain;

    position: absolute;
`;

const ExhibitionPreviewHeader = styled.div`
    padding: 20px;
    width: calc(100% - 40px);

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    position: absolute;
    top:0;

    z-index: 999;

    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 25%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.3) 75%, rgba(255, 255 , 255, 0) 100%);
    
    opacity: 0; 
    transition: opacity 0.3s ease; 
`

const ExhibitionPreviewHeaderLeftBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap:32px;
`

const IconBox = styled.div`
    width:40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 5px;

    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 480px) {
        width:30px;
        height: 30px;
    }
`;

const Icon = styled.img`
    width:24px;
    height:24px;
`

const ExhibitionPreviewInfoBox = styled.div`
    display: flex;
    flex-direction: column;

    gap: 5px;
`

const ExhibitionPreviewTitle = styled.div`
    color: white;

    font-size: 20px;
    font-weight: 700;
`

const ExhibitionPreviewDescription = styled.div`
    color: rgba(255, 255, 255, 0.7);

    font-size: 14px;
`

const ExhibitionPreviewHeaderRightBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    gap: 20px; 
`;

const ExhibitionPreviewActiveUserBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 10px;
`

const ActiveUserIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const ActiveUser = styled.div`
    font-size: 14px;
    color: white;
`


const LeftMoveIconBox = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 20px;

    opacity: 0;

    transition: opacity 0.3s ease; 
`;

const RightMoveIconBox = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    right: 20px;

    opacity: 0;

    transition: opacity 0.3s ease; 
`;

const ExhibitionPreviewFooter = styled.div`
    padding: 20px;
    width: calc(100% - 40px);

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    position: absolute;
    bottom:0;

    z-index: 999;

    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.7) 25%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.3) 75%, rgba(255, 255 , 255, 0) 100%);
    
    opacity: 0; 
    transition: opacity 0.3s ease; 
`

const ExhibitionPreviewImageInfoBox = styled.div`
    display: flex;
    flex-direction: column;

    gap: 5px;
`

const ExhibitionPreviewImageTitle = styled.div`
    color: white;

    font-size: 20px;
    font-weight: 700;
`

const ExhibitionPreviewImageDescription = styled.div`
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
`

const ExhibitionWriterBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 10px;
`

const WriterProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 5px;

    cursor: pointer;
`

const WriterNickname = styled.div`
    font-size: 16px;
    color: white;
`




const ExhibitionPreviewBox = styled.div`
    width: 100%;
    aspect-ratio: 3/2;
    
    display: flex;
    flex-direction: column;

    position: relative;

    background-color: rgba(0, 0, 0, 0.8);    
    
    &:has(${ExhibitionPreviewHeader}:hover),&:has(${ExhibitionPreviewFooter}:hover),&:has(${RightMoveIconBox}:hover),&:has(${LeftMoveIconBox}:hover) {
        & ${ExhibitionPreviewHeader},
        & ${ExhibitionPreviewFooter},
        & ${RightMoveIconBox},
        & ${LeftMoveIconBox} {
            opacity: 1;
        }
    }
`;



interface Work {
    image: File;
    previewImage: string;
    title: string;
    description: string;
}

interface ExhibitionData {
    writer: {
        id: number;
        nickname: string;
        introduction: string;
        profileImage: string;
    };
    title: string;
    description: string;
    tags: string[];
    cardColor: string;
    works: Work[];
}

interface ExhibitionCreatePreview {
    exhibitionData: ExhibitionData;
}



const ExhibitionCreatePreview: React.FC<ExhibitionCreatePreview> = (props) => {
    const { exhibitionData } = props;
    const user = useAuthStore.getState().user;

    const [currentIdx, setCurrentIndex] = useState<number>(0);

    const handleMoveLeft = () => {
        if (currentIdx === 0) {
            return;
        }

        setCurrentIndex(currentIdx - 1);
    }

    const handleMoveRight = () => {
        const size = exhibitionData.works.length;

        if (currentIdx === size - 1) {
            return;
        }

        setCurrentIndex(currentIdx + 1);
    }


    return (
        <PreviewContainer>
            <ExhibitionPreviewBox>

                <ExhibitionPreviewHeader >
                    <ExhibitionPreviewHeaderLeftBox>
                        <IconBox>
                            <Icon src={exitIcon} />
                        </IconBox>

                        <ExhibitionPreviewInfoBox>
                            <ExhibitionPreviewTitle>{exhibitionData.title}</ExhibitionPreviewTitle>
                            <ExhibitionPreviewDescription>{exhibitionData.description}</ExhibitionPreviewDescription>
                        </ExhibitionPreviewInfoBox>

                    </ExhibitionPreviewHeaderLeftBox>


                    <ExhibitionPreviewHeaderRightBox>
                        <ExhibitionPreviewActiveUserBox>
                            <ActiveUserIcon src={userIcon} />
                            <ActiveUser>0명 관람중</ActiveUser>
                        </ExhibitionPreviewActiveUserBox>

                        <IconBox>
                            <Icon src={heartIcon} />
                        </IconBox>
                        <IconBox>
                            <Icon src={bookmarkIcon} />
                        </IconBox>
                        <IconBox>
                            <Icon src={chatIcon} />
                        </IconBox>
                        <IconBox>
                            <Icon src={notebookIcon} />
                        </IconBox>
                    </ExhibitionPreviewHeaderRightBox>
                </ExhibitionPreviewHeader>


                <ExhibitionPreviewImage src={exhibitionData.works.length > 0 ? exhibitionData.works[currentIdx].previewImage : ''} />

                <LeftMoveIconBox>
                    <IconBox onClick={handleMoveLeft}>
                        <Icon src={leftIcon} />
                    </IconBox>
                </LeftMoveIconBox>

                <RightMoveIconBox>
                    <IconBox onClick={handleMoveRight}>
                        <Icon src={rightIcon} />
                    </IconBox>
                </RightMoveIconBox>

                <ExhibitionPreviewFooter>
                    <ExhibitionPreviewImageInfoBox>
                        <ExhibitionPreviewImageTitle>{exhibitionData.works.length > 0 ? exhibitionData.works[currentIdx].title : ''}</ExhibitionPreviewImageTitle>
                        <ExhibitionPreviewImageDescription>{exhibitionData.works.length > 0 ? exhibitionData.works[currentIdx].description : ''}</ExhibitionPreviewImageDescription>
                    </ExhibitionPreviewImageInfoBox>

                    <ExhibitionWriterBox>
                        <WriterProfileImage src={user.profileImage ? user.profileImage : DEFAULT.profileImage} />
                        <WriterNickname>{user.nickname}</WriterNickname>
                    </ExhibitionWriterBox>
                </ExhibitionPreviewFooter>

            </ExhibitionPreviewBox>
        </PreviewContainer>
    )
}

export default ExhibitionCreatePreview;