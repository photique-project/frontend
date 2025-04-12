import styled from 'styled-components';

import heartIcon from '../assets/heart.png';
import viewIcon from '../assets/view.png';
import menuIcon from '../assets/dot-menu.png';
import clockIcon from '../assets/clock.png';
import sendIcon from '../assets/send.png';
import cameraGrayIcon from '../assets/camera-gray.png';
import lensGrayIcon from '../assets/lens-gray.png';
import settingsGrayIcon from '../assets/settings-gray.png';
import locationGrayIcon from '../assets/location-gray.png';
import calendarGrayIcon from '../assets/calendar-gray.png';
import tagGrayIcon from '../assets/tag-gray.png';
import categoryGrayIcon from '../assets/category-gray.png';
import DEFAULT from '../api/default';



const Container = styled.div`
    margin-top: 40px;
    width: 100%;

    display: flex;
    flex-direction: column;

    @media (max-width: 480px) {
        margin-top: 30px;
    }
`

const ImageBox = styled.div`
    width: 100%;
    aspect-ratio: 3 / 2;

    display: flex;
    flex-direction: column;

    position: relative;

    border-radius: 10px;

    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
`

const ImageInfoBar = styled.div`
    margin-top: 20px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    position: absolute;

    opacity: 0;

    transition: all 0.3s ease;

    ${ImageBox}:hover & {
        opacity: 1;
    }

    z-index: 999;

    @media (max-width: 768px) {
        margin-top: 10px;
    }
`

const Image = styled.img`
    width: 100%;
    height: 100%;

    position: absolute;

    border-radius: 10px;
    object-fit: contain; 
`


const ImageHitBox = styled.div`
    margin-left: 20px;
    height: 50px;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.6);

    @media (max-width: 768px) {
        margin-left: 10px;
        height: 35px;
        gap: 5px;
    }
`
const ImageLikeBox = styled.div`
    margin-left: 20px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 8px;

    @media (max-width: 768px) {
        margin-left: 10px;
        gap: 5px;
    }
`;

const ImageLikeIcon = styled.img`
    width: 30px;
    height: 30px;

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`;

const ImageLikeValue = styled.div`
    font-size: 16px;
    color: white;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const ImageViewBox = styled.div`
    margin-right: 20px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 8px;

    @media (max-width: 768px) {
        margin-left: 10px;
        gap: 5px;
    }
`;

const ImageViewIcon = styled.img`
    width: 30px;
    height: 30px;

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`;

const ImageViewValue = styled.div`
    font-size: 16px;    
    color: white;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const ImageMenuBox = styled.div`
    margin-right: 20px;
    width: 50px;
    height: 50px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 25px;
    background-color: black;
    opacity: 0.6;

    @media (max-width: 768px) {
        margin-right: 10px;
        width: 35px;
        height: 35px;

        border-radius: 17.5px;
    }
`

const ImageMenuIcon = styled.img`
    width: 30px;
    height: 30px;

    cursor: pointer;

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`

const SingleWorkHeaderInfoBox = styled.div`
    margin-top: 50px;
    padding: 25px;
    width: calc(100%-50px);
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    background-color: white;

    @media (max-width: 950px) {
        flex-direction: column-reverse;
        align-items: flex-start;
        
        gap: 15px;
    }

    @media (max-width: 768px) {
        margin-top: 30px;
    }

    @media (max-width: 480px) {
        padding: 15px;
    }
`

const SingleWorkPhotographerInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 15px;

    @media (max-width: 768px) {
        gap: 7px;
    }

    @media (max-width: 550px) {
        flex-wrap: wrap;
    }
`

const PhotographerProfileImage = styled.img`
    width: 50px;
    height: 50px;

    border-radius: 7px;

    @media (max-width: 768px) {
        width: 35px;
        height: 35px;
    }
`

const PhotographerProfile = styled.div`
    display: flex;
    flex-direction: column;
    gap: 9px;

    @media (max-width: 768px) {
        gap: 5px;
    }
`

const PhotographerNickname = styled.div`
    font-size: 16px;
    line-height: 17px;
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 14px;
    }
`

const PhotographerIntro = styled.div`
    font-size: 16px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.6);

    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 14px;
    }
`

const FollowButton = styled.button`
    width: 80px;
    height: 45px;

    font-size: 16px;

    background-color: white;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        width: 60px;
        height: 35px;
        font-size: 14px;
    }

    @media (max-width: 550px) {
        width: 100%;
    }
`

const PostDateBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 5px;
`

const PostDateIcon = styled.img`
    width: 24px;
    height: 24px;

    @media (max-width: 950px) {
        width: 20px;
        height: 20px;
    }
`

const PostDate = styled.div`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);

    @media (max-width: 950px) {
        font-size: 14px;
    }
`

const SingleWorkImageInfoBox = styled.div`
    margin-top: 15px;
    padding: 25px;
    width: calc(100%-50px);
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 30px;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    background-color: white;

    @media (max-width: 768px) {
        margin-top: 10px;
        row-gap: 20px;
    }

    @media (max-width: 480px) {
        padding: 15px;
    }
`;

const SingleWorkImageInfo = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;

    gap: 10px;

    @media (max-width: 768px) {
        width: 100%;
        gap: 7px;
    }
`;

const SingleWorkItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;

    @media (max-width: 768px) {
        gap: 7px;
    }
`;

const SingleWorkItemIcon = styled.img`
    width: 26px;
    height: 26px;

    @media (max-width: 768px) {
        width: 18px;
        height: 18px;
    }
`

const SingleWorkItemText = styled.div`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
    

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const SingleWorkItemValue = styled.div`
    font-size: 18px;
    font-weight: 700;

    word-wrap: break-word;   
    overflow-wrap: break-word;
    white-space: normal;  
   

    @media (max-width: 768px) {
        font-size: 16px;
    }
`

const SingleWorkItemSettingsBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    gap: 10px;

    @media (max-width: 768px) {
        gap: 7px;
    }
`

const SingleWorkItemSettings = styled.div`
    padding: 6px 12px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 10px;

    background-color: rgba(0, 0, 0, 0.07);

    font-size: 18px;
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const SingleWorkTagBox = styled.div`
    margin-top: 15px;
    padding: 25px;
    width: calc(100%-50px);

    display: flex;
    flex-direction: column;

    gap: 10px;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    background-color: white;

    @media (max-width: 768px) {
        margin-top: 10px;
        gap: 7px;
    }

    @media (max-width: 480px) {
        padding: 15px;
    }
`

const SingleWorkFooterBox = styled.div`
    margin-top: 15px;
    margin-bottom: 40px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 1100px) {
        gap: 15px;
    }

    @media (max-width: 768px) {
        margin-top: 10px;
        gap: 10px;
    }
`

const SingleWorkDescriptionBox = styled.div`
    padding: 40px;
    width: calc((100% - 30px) / 2 - 80px);
    

    display: flex;
    flex-direction: column;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    @media (max-width: 1100px) {
        width: calc(100% - 80px);
    }

    @media (max-width: 480px) {
        width: calc(100% - 40px);
        padding: 20px;
    }
`

const SingleWorkTitle = styled.div`
    font-size: 20px;
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`

const SingleWorkDescription = styled.div`
    margin-top: 20px;

    font-size: 16px;
    line-height: 25px;
    color: rgba(0, 0, 0, 0.6);
    

    white-space: pre-wrap;

    @media (max-width: 768px) {
        margin-top: 10px;
        font-size: 14px;
        line-height: 20px;
    }
`

const SingleWorkCommentBox = styled.div`
    padding: 40px;
    width: calc((100% - 15px) / 2 - 80px);
    

    display: flex;
    flex-direction: column;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    @media (max-width: 1100px) {
        width: calc(100% - 80px);
    }

    @media (max-width: 480px) {
        width: calc(100% - 40px);
        padding: 20px;
    }
`

const CommentListBox = styled.div`
    margin-top: 20px;
    width: 100%;
    max-height: 400px;

    display: flex;
    flex-direction: column;
    gap: 15px;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px; 
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }

    @media (max-width: 768px) {
        margin-top: 15px;
        gap:10px;
    }
`

const CommentWriterProfileImage = styled.img`
    width: 40px;
    height: 40px;

    border-radius: 7px;

    @media (max-width: 768px) {
        width: 30px;
        height: 30px;
    }
`

const CommentInputBox = styled.div`
    margin-top:30px;
    width: 100%;

    display: flex;
    flex-direction: row;
    gap: 10px;
`

const CommentInput = styled.textarea`
    width: calc(100% - 20px - 10px - 20px);
    height: 80px;
    padding: 10px;

    resize: none;

    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);

    &::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }
    
    &:focus {
        outline: none; 
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
    }

    @media (max-width: 480px) {
        width: calc(100% - 40px);
        padding: 20px;
    }
`

const CommentInputCompleteButtonBox = styled.div`
    margin-top: 10px;
    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @media (max-width: 480px) {
        align-items: center;
    }
`;

const CommentInputCompleteButton = styled.div`
    padding: 8px 10px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 10px;


    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    background-color: rgba(0, 0, 0, 0.7);

    &:hover {
        background-color: black;
    }

    @media (max-width: 768px) {
        width: calc(100% - 16px);
    }
`

const CommentInputCompleteButtonIcon = styled.img`
    width: 16px;
    height: 16px;

    @media (max-width: 768px) {
        width: 12px;
        height: 12px;
    }
`

const CommentInputCompleteButtonText = styled.div`
    font-size: 16px;
    color: white;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`


interface Writer {
    id: number;
    nickname: string;
    introduction: string;
    profileImage: string;
}

interface SingleWork {
    writer: Writer;
    image: string;
    createdAt: string;
    camera: string;
    lens: string;
    aperture: string;
    shutterSpeed: string;
    iso: string;
    location: string;
    category: string;
    date: string;
    tags: string[];
    title: string;
    description: string;
}

interface SingleWorkCreatePreviewProps {
    singleWork: SingleWork;
}



const SingleWorkCreatePreview: React.FC<SingleWorkCreatePreviewProps> = (props) => {
    const { singleWork } = props;

    return (
        <Container>
            <ImageBox>

                <ImageInfoBar>
                    <ImageHitBox>

                        <ImageLikeBox>
                            <ImageLikeIcon src={heartIcon} />
                            <ImageLikeValue>0</ImageLikeValue>
                        </ImageLikeBox>

                        <ImageViewBox>
                            <ImageViewIcon src={viewIcon} />
                            <ImageViewValue>0</ImageViewValue>
                        </ImageViewBox>

                    </ImageHitBox>

                    <ImageMenuBox>
                        <ImageMenuIcon src={menuIcon}></ImageMenuIcon>
                    </ImageMenuBox>
                </ImageInfoBar>

                <Image src={singleWork.image} />
            </ImageBox>

            <SingleWorkHeaderInfoBox>

                <SingleWorkPhotographerInfo>
                    <PhotographerProfileImage src={singleWork.writer.profileImage ? singleWork.writer.profileImage : DEFAULT.profileImage}></PhotographerProfileImage>
                    <PhotographerProfile>
                        <PhotographerNickname>{singleWork.writer.nickname}</PhotographerNickname>
                        {singleWork.writer.introduction && <PhotographerIntro>{singleWork.writer.introduction}</PhotographerIntro>}
                    </PhotographerProfile>
                    <FollowButton>팔로우</FollowButton>
                </SingleWorkPhotographerInfo>

                <PostDateBox>
                    <PostDateIcon src={clockIcon} />
                    <PostDate>게시일: {singleWork.createdAt}</PostDate>
                </PostDateBox>


            </SingleWorkHeaderInfoBox>


            <SingleWorkImageInfoBox>

                <SingleWorkImageInfo>
                    <SingleWorkItem>
                        <SingleWorkItemIcon src={cameraGrayIcon} />
                        <SingleWorkItemText>카메라</SingleWorkItemText>
                    </SingleWorkItem>

                    <SingleWorkItemValue>
                        {singleWork.camera}
                    </SingleWorkItemValue>
                </SingleWorkImageInfo>


                <SingleWorkImageInfo>
                    <SingleWorkItem>
                        <SingleWorkItemIcon src={lensGrayIcon} />
                        <SingleWorkItemText>렌즈</SingleWorkItemText>
                    </SingleWorkItem>

                    <SingleWorkItemValue>
                        {singleWork.lens ? singleWork.lens : '미입력'}
                    </SingleWorkItemValue>
                </SingleWorkImageInfo>

                <SingleWorkImageInfo>
                    <SingleWorkItem>
                        <SingleWorkItemIcon src={settingsGrayIcon} />
                        <SingleWorkItemText>설정값</SingleWorkItemText>
                    </SingleWorkItem>

                    <SingleWorkItemSettingsBox>
                        <SingleWorkItemSettings>
                            {singleWork.aperture !== '미입력' ? singleWork.aperture : '미입력'}
                        </SingleWorkItemSettings>
                        <SingleWorkItemSettings>
                            {singleWork.shutterSpeed !== '미입력' ? `${singleWork.shutterSpeed}S` : '미입력'}
                        </SingleWorkItemSettings>
                        <SingleWorkItemSettings>
                            {singleWork.iso !== '미입력' ? `${singleWork.iso} ISO` : '미입력'}


                        </SingleWorkItemSettings>
                    </SingleWorkItemSettingsBox>
                </SingleWorkImageInfo>

                <SingleWorkImageInfo>
                    <SingleWorkItem>
                        <SingleWorkItemIcon src={locationGrayIcon} />
                        <SingleWorkItemText>위치</SingleWorkItemText>
                    </SingleWorkItem>

                    <SingleWorkItemValue>
                        {singleWork.location ? singleWork.location : '미입력'}
                    </SingleWorkItemValue>
                </SingleWorkImageInfo>

                <SingleWorkImageInfo>
                    <SingleWorkItem>
                        <SingleWorkItemIcon src={categoryGrayIcon} />
                        <SingleWorkItemText>카테고리</SingleWorkItemText>
                    </SingleWorkItem>

                    <SingleWorkItemSettingsBox>
                        <SingleWorkItemSettings>
                            {singleWork.category ? singleWork.category : ''}
                        </SingleWorkItemSettings>

                    </SingleWorkItemSettingsBox>
                </SingleWorkImageInfo>

                <SingleWorkImageInfo>
                    <SingleWorkItem>
                        <SingleWorkItemIcon src={calendarGrayIcon} />
                        <SingleWorkItemText>날짜</SingleWorkItemText>
                    </SingleWorkItem>

                    <SingleWorkItemValue>
                        {singleWork.date}
                    </SingleWorkItemValue>
                </SingleWorkImageInfo>


            </SingleWorkImageInfoBox>


            <SingleWorkTagBox>
                <SingleWorkItem>
                    <SingleWorkItemIcon src={tagGrayIcon} />
                    <SingleWorkItemText>태그</SingleWorkItemText>
                </SingleWorkItem>
                <SingleWorkItemSettingsBox>
                    {singleWork.tags.length > 0 && singleWork.tags.map((tag, index) => (
                        <SingleWorkItemSettings key={index} >{tag}</SingleWorkItemSettings>
                    ))}
                </SingleWorkItemSettingsBox>
            </SingleWorkTagBox>


            <SingleWorkFooterBox>

                <SingleWorkDescriptionBox>
                    <SingleWorkTitle>
                        {singleWork.title}
                    </SingleWorkTitle>
                    <SingleWorkDescription>
                        {singleWork.description}
                    </SingleWorkDescription>
                </SingleWorkDescriptionBox>


                <SingleWorkCommentBox>
                    <SingleWorkTitle>댓글</SingleWorkTitle>




                    <CommentInputBox>
                        <CommentWriterProfileImage src={singleWork.writer.profileImage} />
                        <CommentInput placeholder='댓글을 입력하세요' />
                    </CommentInputBox>

                    <CommentInputCompleteButtonBox>
                        <CommentInputCompleteButton>
                            <CommentInputCompleteButtonIcon src={sendIcon} />
                            <CommentInputCompleteButtonText>댓글 작성</CommentInputCompleteButtonText>
                        </CommentInputCompleteButton>
                    </CommentInputCompleteButtonBox>

                    <CommentListBox>



                    </CommentListBox>


                </SingleWorkCommentBox>


            </SingleWorkFooterBox>

        </Container>
    )
}

export default SingleWorkCreatePreview;