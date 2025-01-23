import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Comment from './Comment';

import closeIcon from '../assets/white-close.png';
import leftIcon from '../assets/arrow-left.png';
import rightIcon from '../assets/arrow-right.png';
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
import ex1 from '../assets/ex21.jpg';


const Container = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: row;

    position:fixed;

    background-color: rgba(0, 0, 0, 0.7);

    z-index: 999;
`

const CloseIcon = styled.img`
    width: 50px;
    height: 50px;

    top: 20px;
    right: 40px;

    position: fixed;
    
    cursor: pointer;

    @media (max-width: 768px) {
        width: 30px;
        height: 30px;

        top: 5px;
        right: 10px;
    }
`;

const BodyBox = styled.div`
    margin-top:20px;
    width: calc(100%- 260px);
    height: calc(100% - 20px);

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media (max-width: 768px) {
        padding: 10px;
        width: calc(100% - 20px);
        justify-content: center;

        margin-top:30px;
        height: calc(100% - 30px);
    }
`

const SideBarBox = styled.div`
    padding: 40px;  

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


    @media (max-width: 768px) {
        display: none;
    }
`;

const MoveIcon = styled.img`
    width: 50px;
    height: 50px;

    cursor: pointer;

    @media (max-width: 768px) {
        display: none;
    }
`

const MainBox = styled.div`
    width: calc(100% - 80px);
    padding: 40px;

    display: flex;
    flex-direction: column;

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none; 
    }

    background-color: #F9FBFF;

    @media (max-width: 768px) {
        width: calc(100% - 20px);
        padding: 10px;
    }
`

const ImageBox = styled.div`
    width: 100%;
    aspect-ratio: 3/2;

    display: flex;
    flex-direction: column;

    position: relative;

    border-radius: 10px;

    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
`

const ImageHeader = styled.div`
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

const Image = styled.img`
    width: 100%;
    height: 100%;

    position: absolute;

    border-radius: 10px;
    object-fit: contain; 
`

const InfoHeaderBox = styled.div`
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

const PhotographerInfoBox = styled.div`
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

const ImageInfoBodyBox = styled.div`
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

const ImageInfo = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;

    gap: 10px;

    @media (max-width: 768px) {
        width: 100%;
        gap: 7px;
    }
`;

const ImageInfoItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;

    @media (max-width: 768px) {
        gap: 7px;
    }
`;

const ImageInfoItemIcon = styled.img`
    width: 26px;
    height: 26px;

    @media (max-width: 768px) {
        width: 18px;
        height: 18px;
    }
`

const ImageInfoItemText = styled.div`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const ImageInfoItemValue = styled.div`
    font-size: 18px;
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`

const ImageInfoItemTagBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    gap: 10px;

    @media (max-width: 768px) {
        gap: 7px;
    }
`

const ImageInfoItemTag = styled.div`
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

const ImageInfoTagBox = styled.div`
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





const ImageInfoFooter = styled.div`
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

const DescriptionBox = styled.div`
    padding: 40px;
    width: calc((100% - 30px) / 2 - 80px);
    

    display: flex;
    flex-direction: column;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    background-color: white;

    @media (max-width: 1100px) {
        width: calc(100% - 80px);
    }

    @media (max-width: 480px) {
        width: calc(100% - 40px);
        padding: 20px;
    }
`

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`

const Description = styled.div`
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

const CommentBox = styled.div`
    padding: 40px;
    width: calc((100% - 15px) / 2 - 80px);
    

    display: flex;
    flex-direction: column;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    background-color: white;

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
        width: 0px;
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

    &:hover {
        &::-webkit-scrollbar {
            width: 3px; 
        }
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




interface SingleWorkProps {
    singleWorkId: string;
    close: (singleWorkId?: string) => void;
}

const SingleWork: React.FC<SingleWorkProps> = (props) => {
    const { singleWorkId, close } = props;

    const handleClose = () => {
        close();
    }

    return (
        <Container>
            <CloseIcon src={closeIcon} onClick={handleClose} />


            <BodyBox>
                <SideBarBox>
                    <MoveIcon src={leftIcon} />
                </SideBarBox>

                <MainBox>
                    <ImageBox>
                        <ImageHeader>
                            <ImageHitBox>
                                <ImageLikeBox>
                                    <ImageLikeIcon src={heartIcon} />
                                    <ImageLikeValue>605.7K</ImageLikeValue>
                                </ImageLikeBox>

                                <ImageViewBox>
                                    <ImageViewIcon src={viewIcon} />
                                    <ImageViewValue>23K</ImageViewValue>
                                </ImageViewBox>

                            </ImageHitBox>

                            <ImageMenuBox>
                                <ImageMenuIcon src={menuIcon}></ImageMenuIcon>
                            </ImageMenuBox>
                        </ImageHeader>

                        <Image src={ex1} />

                    </ImageBox>


                    <InfoHeaderBox>

                        <PhotographerInfoBox>
                            <PhotographerProfileImage src={ex1} />

                            <PhotographerProfile>
                                <PhotographerNickname>뚱이</PhotographerNickname>
                                <PhotographerIntro>Professional Photographer</PhotographerIntro>
                            </PhotographerProfile>

                            <FollowButton>팔로우</FollowButton>
                        </PhotographerInfoBox>

                        <PostDateBox>
                            <PostDateIcon src={clockIcon} />
                            <PostDate>게시일: 2024-01-15 13:45</PostDate>
                        </PostDateBox>

                    </InfoHeaderBox>



                    <ImageInfoBodyBox>
                        <ImageInfo>
                            <ImageInfoItem>
                                <ImageInfoItemIcon src={cameraGrayIcon} />
                                <ImageInfoItemText>카메라</ImageInfoItemText>
                            </ImageInfoItem>

                            <ImageInfoItemValue>Sony A7C</ImageInfoItemValue>
                        </ImageInfo>

                        <ImageInfo>
                            <ImageInfoItem>
                                <ImageInfoItemIcon src={lensGrayIcon} />
                                <ImageInfoItemText>렌즈</ImageInfoItemText>
                            </ImageInfoItem>

                            <ImageInfoItemValue>Sony FE 24-70mm f/2.8 GM</ImageInfoItemValue>
                        </ImageInfo>

                        <ImageInfo>
                            <ImageInfoItem>
                                <ImageInfoItemIcon src={settingsGrayIcon} />
                                <ImageInfoItemText>설정값</ImageInfoItemText>
                            </ImageInfoItem>

                            <ImageInfoItemTagBox>
                                <ImageInfoItemTag>f/2.8</ImageInfoItemTag>
                                <ImageInfoItemTag>1/1000s</ImageInfoItemTag>
                                <ImageInfoItemTag>ISO 100</ImageInfoItemTag>
                            </ImageInfoItemTagBox>
                        </ImageInfo>

                        <ImageInfo>
                            <ImageInfoItem>
                                <ImageInfoItemIcon src={locationGrayIcon} />
                                <ImageInfoItemText>위치</ImageInfoItemText>
                            </ImageInfoItem>

                            <ImageInfoItemValue>Seoul, South Korea</ImageInfoItemValue>
                        </ImageInfo>


                        <ImageInfo>
                            <ImageInfoItem>
                                <ImageInfoItemIcon src={calendarGrayIcon} />
                                <ImageInfoItemText>날짜</ImageInfoItemText>
                            </ImageInfoItem>

                            <ImageInfoItemValue>2024-01-15</ImageInfoItemValue>
                        </ImageInfo>

                    </ImageInfoBodyBox>


                    <ImageInfoTagBox>
                        <ImageInfoItem>
                            <ImageInfoItemIcon src={tagGrayIcon} />
                            <ImageInfoItemText>태그</ImageInfoItemText>
                        </ImageInfoItem>

                        <ImageInfoItemTagBox>
                            <ImageInfoItemTag>흑백</ImageInfoItemTag>
                            <ImageInfoItemTag>바퀴</ImageInfoItemTag>
                            <ImageInfoItemTag>을지로</ImageInfoItemTag>
                        </ImageInfoItemTagBox>

                    </ImageInfoTagBox>


                    <ImageInfoFooter>
                        <DescriptionBox>
                            <Title>도시의 흔적</Title>
                            <Description>
                                오래된 자전거 타이어에 새겨진 도시의 흔적들을 담아보았습니다.
                                매일 같은 길을 달리며 쌓인 시간의 흔적이 타이어의 패턴 속에 고스란히 남아있는 모습이 인상적이었습니다. 도시의 일상적인 풍경 속에서 발견한 특별한 순간입니다.
                            </Description>
                        </DescriptionBox>

                        <CommentBox>
                            <CommentListBox>
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                            </CommentListBox>

                            <CommentInputBox>
                                <CommentWriterProfileImage src={ex1} />
                                <CommentInput />
                            </CommentInputBox>

                            <CommentInputCompleteButtonBox>
                                <CommentInputCompleteButton>
                                    <CommentInputCompleteButtonIcon src={sendIcon} />
                                    <CommentInputCompleteButtonText>댓글작성</CommentInputCompleteButtonText>
                                </CommentInputCompleteButton>
                            </CommentInputCompleteButtonBox>

                        </CommentBox>
                    </ImageInfoFooter>






                </MainBox>

                <SideBarBox>
                    <MoveIcon src={rightIcon} />
                </SideBarBox>
            </BodyBox>

        </Container>
    )
}

export default SingleWork;