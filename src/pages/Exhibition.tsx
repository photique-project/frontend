import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import ExhibitionChatMessage from '../components/ExhibitionChatMessage';
import ExhibitionComment from '../components/ExhibitionComment';

import ex1 from '../assets/ex1.jpg';
import exitIcon from '../assets/exit.png';
import userIcon from '../assets/user-white.png';
import heartIcon from '../assets/heart.png';
import bookmarkIcon from '../assets/bookmark-white.png';
import chatIcon from '../assets/chat.png';
import notebookIcon from '../assets/notebook.png';
import leftIcon from '../assets/arrow-left.png';
import rightIcon from '../assets/arrow-right.png';
import closeIcon from '../assets/close-white.png';
import sendIcon from '../assets/send.png';

const Image = styled.img`
    height: 100%;
    width: 100%;

    object-fit: contain;

    position: absolute;
`;

const Header = styled.div`
    padding: 40px;
    width: calc(100% - 80px);

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

const HeaderLeftBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap:32px;
`

const IconBox = styled.div`
    width:50px;
    height: 50px;
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
    width:32px;
    height:32px;
`

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;

    gap: 5px;
`

const Title = styled.div`
    color: white;

    font-size: 24px;
    font-weight: 700;
`

const Description = styled.div`
    color: rgba(255, 255, 255, 0.7);

    font-size: 16px;
`

const HeaderRightBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    gap: 20px; 
`;

const ActiveUserBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 10px;
`

const ActiveUserIcon = styled.img`
    width: 32px;
    height: 32px;
`;

const ActiveUser = styled.div`
    font-size: 20px;
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

const Footer = styled.div`
    padding: 40px;
    width: calc(100% - 80px);

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

const FooterLeftBox = styled.div`
    display: flex;
    flex-direction: column;

    gap: 5px;
`

const ImageTitle = styled.div`
    color: white;

    font-size: 20px;
    font-weight: 700;
`

const ImageDescription = styled.div`
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
`

const FooterRightBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 15px;
`

const WriterProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 5px;

    cursor: pointer;
`

const WriterNickname = styled.div`
    font-size: 20px;
    color: white;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
    
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;

    background-color: rgba(27, 27, 27, 1);

    &:has(${Header}:hover),&:has(${Footer}:hover){
        & ${Header},
        & ${Footer}{
            opacity: 1;
        }
    }

    &:has(${RightMoveIconBox}:hover),&:has(${LeftMoveIconBox}:hover) {
        & ${RightMoveIconBox},
        & ${LeftMoveIconBox} {
            opacity: 1;
        }
    }
`;

const ChatBox = styled.div`
    width: calc(500px - 40px);
    height: calc(100% - 40px);
    padding: 20px;

    display: flex;
    flex-direction: column;

    position: absolute;
    left: 0;

    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(20px);

    z-index: 999;
`

const ChatHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const ChatTitle = styled.div`
    color: white;
    padding: 18px;
    font-size: 17px;
    font-weight: 700;
`

const ChatList = styled.div`
    width: 100%;
    margin-top: 20px;
    height: 100%;

    display: flex;
    flex-direction: column;

    overflow-y: scroll;

    gap: 15px;

    &::-webkit-scrollbar {
        width: 7px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 10px; 
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    
`

const ChatInputBox = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 50px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`


const SendIconBox = styled.div`
    width:50px;
    height: 46.67px;
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

const ChatInput = styled.textarea`
    padding: 12px;
    width: calc(100% - 50px - 15px - 24px);
    height: calc(44px - 24px);

    
    
    resize: none;
    
    font-size: 16px;
    line-height: 20px;
    color: white;

    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;

    background-color: rgba(255, 255, 255, 0.1);
    
    &::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }
    
    &:focus {
        outline: none; 
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.9);
    }

    &::-webkit-scrollbar {
        width: 7px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 10px; 
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`





const CommentBox = styled.div`
    width: calc(500px - 40px);
    height: calc(100% - 40px);
    padding: 20px;

    display: flex;
    flex-direction: column;

    position: absolute;
    right: 0;

    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(20px);

    z-index: 999;
`

const CommentHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const CommentTitle = styled.div`
    color: white;
    padding: 18px;
    font-size: 17px;
    font-weight: 700;
`

const CommentList = styled.div`
    width: 100%;
    margin-top: 20px;
    height: 100%;

    display: flex;
    flex-direction: column;

    overflow-y: scroll;

    gap: 15px;

    &::-webkit-scrollbar {
        width: 7px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 10px; 
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`


const CommentInputBox = styled.div`
    margin-top: 20px;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 10px;
`

const CommentInput = styled.textarea`
    padding: 12px;
    width: calc(100% - 24px);
    height: 200px;

    resize: none;
    
    font-size: 16px;
    line-height: 20px;
    color: white;

    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;

    background-color: rgba(255, 255, 255, 0.1);
    
    &::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }
    
    &:focus {
        outline: none; 
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.9);
    }

    &::-webkit-scrollbar {
        width: 7px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 10px; 
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`

const CommentInputButton = styled.button`
    width: 100%;
    height: 50px;

    border: none;
    border-radius: 6px;

    color: white;
    background-color: rgba(255, 255, 255, 0.1);

    &:hover {
        background-color: rgba(255, 255, 255, 0.5);
    }
`





const Exhibition = () => {
    const { exhibitionId } = useParams();

    return (
        <>
            <Container>

                <Image src={ex1} />

                <Header>
                    <HeaderLeftBox>
                        <IconBox>
                            <Icon src={exitIcon} />
                        </IconBox>

                        <InfoBox>
                            <Title>전시회 제목</Title>
                            <Description>전시회 설명</Description>
                        </InfoBox>

                    </HeaderLeftBox>

                    <HeaderRightBox>
                        <ActiveUserBox>
                            <ActiveUserIcon src={userIcon} />
                            <ActiveUser>100명 관람중</ActiveUser>
                        </ActiveUserBox>

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

                    </HeaderRightBox>
                </Header>

                <LeftMoveIconBox>
                    <IconBox>
                        <Icon src={leftIcon} />
                    </IconBox>
                </LeftMoveIconBox>

                <RightMoveIconBox>
                    <IconBox>
                        <Icon src={rightIcon} />
                    </IconBox>
                </RightMoveIconBox>

                <Footer>
                    <FooterLeftBox>
                        <ImageTitle>사진 제목</ImageTitle>
                        <ImageDescription>사진 설명</ImageDescription>
                    </FooterLeftBox>

                    <FooterRightBox>
                        <WriterProfileImage src={ex1} />
                        <WriterNickname>작가이름</WriterNickname>
                    </FooterRightBox>

                </Footer>


                {/* 채팅창 방명록 추가 */}
                {/* 채팅창이 열려있을 땐 방명록, 푸터헤더 불가능 */}
                {/* 방명록이 열려있을 땐 채팅창, 푸터헤더 불가능 */}
                <ChatBox>
                    <ChatHeader>

                        <ChatTitle>실시간 채팅</ChatTitle>


                        <IconBox>
                            <Icon src={closeIcon} />
                        </IconBox>
                    </ChatHeader>

                    <ChatList>
                        <ExhibitionChatMessage />
                        <ExhibitionChatMessage />
                        <ExhibitionChatMessage />
                        <ExhibitionChatMessage />
                        <ExhibitionChatMessage />
                        <ExhibitionChatMessage />
                        <ExhibitionChatMessage />
                        <ExhibitionChatMessage />
                        <ExhibitionChatMessage />
                        <ExhibitionChatMessage />
                        <ExhibitionChatMessage />
                        <ExhibitionChatMessage />
                        <ExhibitionChatMessage />


                    </ChatList>

                    <ChatInputBox>
                        <ChatInput
                            placeholder='메시지를 입력하세요'
                        />
                        <SendIconBox>
                            <Icon src={sendIcon} />
                        </SendIconBox>

                    </ChatInputBox>


                </ChatBox>

                <CommentBox>
                    <CommentHeader>
                        <IconBox>
                            <Icon src={closeIcon} />
                        </IconBox>
                        <CommentTitle>전시회 감상평</CommentTitle>
                    </CommentHeader>

                    <CommentList>
                        <ExhibitionComment></ExhibitionComment>
                        <ExhibitionComment></ExhibitionComment>
                        <ExhibitionComment></ExhibitionComment>
                        <ExhibitionComment></ExhibitionComment>
                        <ExhibitionComment></ExhibitionComment>
                        <ExhibitionComment></ExhibitionComment>
                        <ExhibitionComment></ExhibitionComment>
                        <ExhibitionComment></ExhibitionComment>
                        <ExhibitionComment></ExhibitionComment>
                        <ExhibitionComment></ExhibitionComment>


                    </CommentList>

                    <CommentInputBox>
                        <CommentInput
                            placeholder='전시회 감사평을 남겨주세요 (200자 이내)'
                        />

                        <CommentInputButton>감상평 남기기</CommentInputButton>
                    </CommentInputBox>




                </CommentBox>

            </Container>
        </>
    )
}

export default Exhibition;
// 채팅창 헤더높이 맞추고
// 방명록 레이아웃 만들고 편지작성하고 
// 내일 네트워크공부 ㄱ