import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from 'sockjs-client'

import { FetchRequestOptions } from '../types/http';
import useAuthStore from '../zustand/store';
import ENDPOINTS from '../api/endpoints';
import useFetch from '../hooks/useFetch';
import styled, { keyframes } from 'styled-components';

import ExhibitionChatMessage from '../components/ExhibitionChatMessage';
import ExhibitionComment from '../components/ExhibitionComment';
import ToastMessage from '../components/ToastMessage';

import heartIcon from '../assets/heart.png';
import heartFillIcon from '../assets/heart-fill.png';
import bookmarkIcon from '../assets/bookmark-white.png';
import bookmarkFillIcon from '../assets/bookmark-fill.png';
import exitIcon from '../assets/exit.png';
import userIcon from '../assets/user-white.png';
import chatIcon from '../assets/chat.png';
import notebookIcon from '../assets/notebook.png';
import leftIcon from '../assets/arrow-left.png';
import rightIcon from '../assets/arrow-right.png';
import closeIcon from '../assets/close-white.png';
import sendIcon from '../assets/send.png';
import exitGif from '../assets/exit.gif';
import leftBlackIcon from '../assets/left-black.png';
import rightBlackIcon from '../assets/right-black.png';
import trashIcon from '../assets/trash-red.png';
import alertIcon from '../assets/alert.png';
import loadingIcon from '../assets/loading-large.png';
import DEFAULT from '../api/default';



const Image = styled.img`
    height: 100%;
    width: 100%;

    object-fit: contain;

    position: absolute;
`;

const ExhibitionHeader = styled.div`
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

    &:has(${ExhibitionHeader}:hover),&:has(${Footer}:hover){
        & ${ExhibitionHeader},
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
    overflow-x: hidden;

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

const CommentInput = styled.textarea<{ commentUpdateMode: boolean }>`
    padding: 12px;
    width: calc(100% - 24px);
    height: 150px;

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
        box-shadow: ${({ commentUpdateMode }) =>
        commentUpdateMode ? "0 0 10px #a574c2" : "0 0 5px rgba(255, 255, 255, 0.9)"};
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

const ModalBackground = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;

    z-index: 999;
`

const ExitBox = styled.div`
    padding: 25px;

    display: flex;
    flex-direction: column;

    border-radius: 10px;
    background-color: white;
`

const ExitTitleBox = styled.div`
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;
    align-items: center;
    
    gap: 10px;
`

const ExitIcon = styled.img`
    width: 40px;
    height: 40px;
`

const ExitBoxTitle = styled.div`
    font-size: 20px;
    font-weight: 700;


    color: #f50000;
`

const ExitBoxContent = styled.div`
    font-size:16px;
    color: rgba(0, 0, 0, 0.6);
`

const ExitButtonBox = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: end;

    gap: 5px;

    cursor: pointer;
`

const ExitCancelButton = styled.button`
    width: 50px;
    height: 30px;

    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.01);

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

const ExitButton = styled.button`
    width: 70px;
    height: 30px;

    font-size: 16px;
    color: white;
    background-color: rgba(0, 0, 0, 0.4);

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    &:hover {
        background-color: rgba(0, 0, 0, 1);
    }
`

const CommentPageNavBox = styled.div`
    margin-top: 10px;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    border-radius: 1px solid #000000;
`

const CommentPageBox = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;

    gap: 10px;

    justify-content: center;
`

const CommentPrevPageIcon = styled.img`
    width: 20px;
    height: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const CommentNextPageIcon = styled.img`
    width: 20px;
    height: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-weight: 700;
`

const CommentPage = styled.div<{ isSelected?: boolean }>`
    width: 40px;
    height: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    font-weight: 700;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;

    background-color: ${({ isSelected }) => (isSelected ? "white" : "rgba(255,255,255,0.3)")};
    color: ${({ isSelected }) => (isSelected ? "black" : "white")};

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.7)")};
        
    }
`

const CommentQuickPageBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;   
    gap: 15px;

    justify-content: center;
`

const CommentFirstPage = styled.div`
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);

    cursor: pointer;
    &:hover {
        color: white;
    }
`

const CommentLastPage = styled.div`
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);

    cursor: pointer;
    &:hover {
        color: white;
    }
`

const CommentUpdateButtonBox = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    flex-direction: row;
    gap: 10px;

    
`

const CommentInputUpdateCancelButtonBox = styled.div`
    width: 50%;
    padding: 8px 10px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 10px;

    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;

    &:hover {
        background-color: rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 768px) {
        width: calc(100% - 16px);
    }
`

const CommentInputUpdateCancelButtonText = styled.div`
    font-size: 16px;
    color: white;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const CommentInputUpdateButtonBox = styled.div`
width: 50%;
    padding: 8px 10px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 10px;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    background-color: #a574c2;
    
    &:hover {
        background-color: #8836b7;
    }

    @media (max-width: 768px) {
        width: calc(100% - 16px);
    }
`

const CommentInputUpdateButtonText = styled.div`
    font-size: 16px;
    color: white;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`

const DeleteBox = styled.div`
    padding: 25px;

    display: flex;
    flex-direction: column;

    border-radius: 10px;
    background-color: white;
`

const DeleteBoxTitleBox = styled.div`
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;
    align-items: center;
    
    gap: 10px;
`

const AlertIcon = styled.img`
    width: 30px;
    height:30px;
`

const DeleteBoxTitle = styled.div`
    font-size: 20px;
    font-weight: 700;


    color: #f50000;
`

const DeleteBoxContent = styled.div`
    font-size:16px;
    color: rgba(0, 0, 0, 0.6);
`

const DeleteBoxInput = styled.input`
    padding-left: 12px;
    padding-right: 12px;
    margin-top: 10px;
    width: calc(100%-24px);
    height: 40px;


    font-size: 16px;
    line-height: 17px;
    
    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    
    &::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }
    
    &:focus {
        outline: none; 
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
    }

`

const DeleteBoxButtonBox = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: end;

    gap: 5px;

    cursor: pointer;
`

const DeleteBoxCancelButton = styled.button`
    width: 50px;
    height: 30px;

    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.01);

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

const DeleteBoxDeleteButton = styled.button`
    width: 50px;
    height: 30px;

    font-size: 16px;
    color: white;
    background-color: rgba(255, 0, 0, 0.4);

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    &:hover {
        background-color: rgba(255, 0, 0, 1);
    }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled.img`
    width: 50px;
    height: 50px;

    animation: ${rotate} 1.2s ease-in-out infinite;
`

interface Chat {
    type: 'JOIN' | 'LEAVE' | 'CHAT';
    me: boolean;
    userId: number;
    nickname: string;
    profileImage: string;
    content: string;
    createdAt: string;
}

interface Work {
    image: string;
    title: string;
    description: string;
}

interface ExhibitionData {
    id: number;
    writer: {
        id: number;
        nickname: string;
        profileImage: string;
        introduction: string;
    };
    title: string;
    description: string;
    works: Work[];
    isLiked: boolean;
    isBookmarked: boolean;
}

interface Writer {
    id: number;
    nickname: string;
    profileImage: string;
}

interface CommentData {
    id: number;
    writer: Writer;
    content: string;
    createdAt: string;
}

interface CommentPageData {
    content: CommentData[];
    pageable: {
        pageNumber: number;
    }
    totalPages: number;
}

interface Message {
    id: string;
    userId: number;
    nickname: string;
    profileImage: string;
    content: string;
    createdAt: string;
    activeUsers: number;
}


const Exhibition = () => {
    const { exhibitionId } = useParams();
    const user = useAuthStore.getState().user;
    const navigate = useNavigate();

    // 전시회 데이터
    const [exhibition, setExhibition] = useState<ExhibitionData | null>(null);
    const [curIndex, setCurIndex] = useState<number>(0);

    // 채팅
    const chatListRef = useRef<HTMLDivElement | null>(null);
    const [stompWs, setStompWs] = useState<CompatClient | null>(null);
    const [chatDisplay, setChatDisplay] = useState<boolean>(false);
    const [chatInput, setChatInput] = useState<string>('');
    const [chatList, setChatList] = useState<Chat[]>([]);

    // 감상평
    const [commentDisplay, setCommentDisplay] = useState<boolean>(false);
    const [commentCurrentPage, setCommentCurrentPage] = useState<number>(0);
    const [commentTotalPage, setCommentTotalPage] = useState<number>(0);
    const [commentPageGroup, setCommentPageGroup] = useState<number>(0);
    const [comments, setComments] = useState<CommentData[]>([]);
    const [commentInput, setCommentInput] = useState<string>('');
    const [commentUpdateMode, setCommentUpdateMode] = useState<boolean>(false);
    const [commentUpdateTargetId, setCommentUpdateTargetId] = useState<number | null>(null);
    const [isComposing, setIsComposing] = useState(false);

    // 나가기 모달
    const [exitModalDisplay, setExitModalDisplay] = useState<boolean>(false);

    // 삭제 모달
    const [deleteModalDisplay, setDeleteModalDisplay] = useState<boolean>(false);
    const [deleteModalInput, setDeleteModalInput] = useState<string>('');

    // 관람유저
    const [activeUsers, setActiveUsers] = useState<number | null>(null);

    // 토스트 메시지
    const [toastMessageDisplay, setToastMessageDisplay] = useState<boolean>(false);
    const [firstText, setFirstText] = useState<string>('');
    const [secondText, setSecondText] = useState<string>('');
    const [isSucess, setIsSucess] = useState<boolean>(false);

    const scrollToBottom = () => {
        if (chatListRef.current) {
            chatListRef.current.scrollTo({
                top: chatListRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    const handleCompositionStart = () => {
        setIsComposing(true); // 한글 입력 시작
    };

    const handleCompositionEnd = () => {
        setIsComposing(false); // 한글 입력 종료
    };

    const handleChatInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (isComposing) {
            return; // 한글 입력 중이면 이벤트 무시
        }

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendChat();
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatList]); // chatList 변경 시마다 실행

    const handleExitModal = () => {
        setExitModalDisplay(!exitModalDisplay);
    }

    const handleExit = () => {
        window.close();
    }

    const handleChatDisplay = () => {
        setChatDisplay(!chatDisplay);
    }

    const handleCommentDisplay = () => {
        setCommentDisplay(!commentDisplay);
    }

    // 전시회 사진 이동
    const handleMoveLeft = () => {
        if (curIndex === 0) {
            return;
        }

        setCurIndex(curIndex - 1);
    }

    const handleMoveRight = () => {
        const size = exhibitionData.works.length;

        if (curIndex === size - 1) {
            return;
        }

        setCurIndex(curIndex + 1);
    }



    // 전시회데이터 불러오기
    const {
        loading: exhibitionDataLoading,
        statusCode: exhibitionDataStatusCode,
        data: exhibitionData,
        fetchRequest: exhibitionDataRequest
    } = useFetch<ExhibitionData>();

    const handleExhibitionDataRequest = () => {
        const method = ENDPOINTS.EXHIBITION.GET_DETAILS.METHOD;
        const url = ENDPOINTS.EXHIBITION.GET_DETAILS.URL(exhibitionId, user.id ? user.id : 0);


        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        exhibitionDataRequest(options);
    }

    useEffect(function requestExhibitionData() {
        handleExhibitionDataRequest();
    }, []);

    useEffect(function handleExhibitionDataResponse() {
        if (exhibitionDataStatusCode === 200) {
            setExhibition(exhibitionData)
            return;
        }

        if (exhibitionDataStatusCode === 401) {
            return;
        }


        if (exhibitionDataStatusCode === 404) {
            return;
        }

        if (exhibitionDataStatusCode === 500) {
            return;
        }

    }, [exhibitionData]);


    const handleMessage = (message: Message) => {

        if (message.id === "JOIN") {
            setActiveUsers(message.activeUsers);

            const newMessage: Chat = {
                type: 'JOIN',
                me: false,
                userId: message.userId,
                nickname: message.nickname,
                profileImage: message.profileImage,
                content: '',
                createdAt: ''
            }

            setChatList((prevChats) => [...prevChats, newMessage]);
        }

        if (message.id === "CHAT") {

            const newMessage: Chat = {
                type: 'CHAT',
                me: user.id === message.userId,
                userId: message.userId,
                nickname: message.nickname,
                profileImage: message.profileImage,
                content: message.content,
                createdAt: message.createdAt
            }

            setChatList((prevChats) => [...prevChats, newMessage]);
        }

        if (message.id === "LEAVE") {

            setActiveUsers(message.activeUsers);

            const newMessage: Chat = {
                type: 'LEAVE',
                me: false,
                userId: message.userId,
                nickname: message.nickname,
                profileImage: message.profileImage,
                content: message.content,
                createdAt: message.createdAt
            }

            setChatList((prevChats) => [...prevChats, newMessage]);
        }
    }

    function connectStomp() {
        const sock = new SockJS(ENDPOINTS.CHAT.CONNECTION.URL);
        const stomp = Stomp.over(sock);

        stomp.onConnect = () => {
            stomp.subscribe(`${ENDPOINTS.CHAT.SUB(parseInt(exhibitionId))}`,
                (message) => {
                    const newMessage = JSON.parse(message.body);
                    handleMessage(newMessage)

                },
                {
                    userId: user.id.toString(),
                }
            );
        };

        stomp.onStompError = () => {
            if (stomp) {
                stomp.disconnect();
            }
            setTimeout(connectStomp, 1000); // 1초 후 재연결
        }

        stomp.onWebSocketClose = () => {
            if (stomp) {
                stomp.disconnect();
            }
            setTimeout(connectStomp, 1000); // 1초 후 재연결
        }

        stomp.activate();

        setStompWs(stomp);
    }

    useEffect(function requestChatConnection() {
        connectStomp();

        // 여기서 웹소켓 연결 구독해제 혹은 비활성화로 연결해제확인 && 서버에서 세션끊는지 확인해야함

        return () => {
            if (stompWs) {
                stompWs.deactivate();
            }
        }
    }, []);



    const handleChatInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setChatInput(value);
    };

    const sendChat = () => {
        const body = {
            id: 'CHAT',
            userId: user.id,
            content: chatInput,
        };

        stompWs.publish({
            destination: `${ENDPOINTS.CHAT.PUB(parseInt(exhibitionId))}`,
            body: JSON.stringify(body)
        });

        setChatInput('');
    }


    // 전시회 좋아요
    const {
        loading: likeLoading,
        statusCode: likeStatusCode,
        fetchRequest: likeRequest
    } = useFetch<void>();

    const {
        loading: dislikeLoading,
        statusCode: dislikeStatusCode,
        fetchRequest: dislikeRequest
    } = useFetch<void>();

    const handleLikeRequest = () => {
        const method = exhibition.isLiked ? 'DELETE' : 'POST';
        const request = exhibition.isLiked ? dislikeRequest : likeRequest;

        const requestBody = {
            userId: user.id,
        }

        const options: FetchRequestOptions = {
            url: ENDPOINTS.EXHIBITION.LIKE.URL(parseInt(exhibitionId)),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
            body: requestBody
        }

        request(options);
    }

    useEffect(function handleLikeResponse() {
        if (likeStatusCode) {
            if (likeStatusCode == 201) {
                setExhibition(prevState => ({
                    ...prevState,
                    isLiked: true,
                }));
                return;
            }

            if (likeStatusCode == 401) {
                setToastMessageDisplay(true);
                setFirstText('좋아요 추가실패 !');
                setSecondText('로그인 상태를 확인해주세요');
                setIsSucess(false);

                setTimeout(() => {
                    useAuthStore.getState().logout();
                    navigate('/home');
                }, 3000);
                return;

            }

            if (likeStatusCode == 403) {
                return;
            }

            if (likeStatusCode == 404) {
                return;
            }

            if (likeStatusCode == 409) {
                return;
            }

            if (likeStatusCode == 500) {
                return;
            }
        }
    }, [likeStatusCode])


    useEffect(function handleDislikeResponse() {
        if (dislikeStatusCode) {
            if (dislikeStatusCode == 204) {
                setExhibition(prevState => ({
                    ...prevState,
                    isLiked: false,
                }));
                return;
            }

            if (dislikeStatusCode == 401) {
                // 모달 띄우고 홈페이지로 리다이렉트
                setToastMessageDisplay(true);
                setFirstText('좋아요 삭제 실패 !');
                setSecondText('로그인 상태를 확인해주세요');
                setIsSucess(false);

                setTimeout(() => {
                    useAuthStore.getState().logout();
                    window.location.reload();
                }, 3000);
                return;
            }

            if (dislikeStatusCode == 403) {
                return;
            }

            if (dislikeStatusCode == 404) {
                return;
            }

            if (dislikeStatusCode == 500) {
                return;
            }
        }
    }, [dislikeStatusCode])


    // 북마크 요청
    const {
        loading: bookmarkLoading,
        statusCode: bookmarkStatusCode,
        fetchRequest: bookmarkRequest
    } = useFetch<void>();

    const {
        loading: unbookmarkLoading,
        statusCode: unbookmarkStatusCode,
        fetchRequest: unbookmarkRequest
    } = useFetch<void>();

    const handleBookmarkRequest = () => {
        const method = exhibition.isBookmarked ? 'DELETE' : 'POST';
        const request = exhibition.isBookmarked ? unbookmarkRequest : bookmarkRequest;

        const requestBody = {
            userId: user.id,
        }

        const options: FetchRequestOptions = {
            url: ENDPOINTS.EXHIBITION.BOOKMARK.URL(parseInt(exhibitionId)),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
            body: requestBody
        }

        request(options);
    }

    useEffect(function handleBookmarkResponse() {
        if (bookmarkStatusCode) {
            if (bookmarkStatusCode == 201) {
                setExhibition(prevState => ({
                    ...prevState,
                    isBookmarked: true,
                }));
                return;
            }

            if (bookmarkStatusCode == 401) {
                setToastMessageDisplay(true);
                setFirstText('북마크 추가실패 !');
                setSecondText('로그인 상태를 확인해주세요');
                setIsSucess(false);

                setTimeout(() => {
                    useAuthStore.getState().logout();
                    navigate('/home');
                }, 3000);
                return;

            }

            if (bookmarkStatusCode == 403) {
                return;
            }

            if (bookmarkStatusCode == 404) {
                return;
            }

            if (bookmarkStatusCode == 409) {
                return;
            }

            if (bookmarkStatusCode == 500) {
                return;
            }
        }
    }, [bookmarkStatusCode])


    useEffect(function handleUnbookmarkResponse() {
        if (unbookmarkStatusCode) {
            if (unbookmarkStatusCode == 204) {
                setExhibition(prevState => ({
                    ...prevState,
                    isBookmarked: false,
                }));
                return;
            }

            if (unbookmarkStatusCode == 401) {
                setToastMessageDisplay(true);
                setFirstText('북마크 삭제 실패 !');
                setSecondText('로그인 상태를 확인해주세요');
                setIsSucess(false);

                setTimeout(() => {
                    useAuthStore.getState().logout();
                    window.location.reload();
                }, 3000);
                return;
            }

            if (unbookmarkStatusCode == 403) {
                return;
            }

            if (unbookmarkStatusCode == 404) {
                return;
            }

            if (unbookmarkStatusCode == 500) {
                return;
            }
        }
    }, [unbookmarkStatusCode])



    // 감상평
    const {
        loading: commentPageLoading,
        statusCode: commentPageStatusCode,
        data: commentPageData,
        fetchRequest: commentPageRequest
    } = useFetch<CommentPageData>();

    const handleCommentPageRequest = (page = 0) => {
        const method = ENDPOINTS.EXHIBITION.GET_COMMENT_PAGE.METHOD;
        const url = ENDPOINTS.EXHIBITION.GET_COMMENT_PAGE.URL(exhibitionId, 'createdAt,desc', page, 5);

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        commentPageRequest(options);
    }

    useEffect(function readCommentPage() {
        handleCommentPageRequest();
    }, [])

    useEffect(function handleCommentPageResponse() {
        if (commentPageStatusCode === 200) {
            setCommentCurrentPage(commentPageData.pageable.pageNumber);
            setCommentPageGroup(Math.floor(commentPageData.pageable.pageNumber / 5));
            setCommentTotalPage(commentPageData.totalPages);
            setComments(commentPageData.content)
        }
    }, [commentPageData])

    const handleCommentupdateMode = (input?: string, commentId?: number) => {
        if (input) {
            setCommentInput(input);
            setCommentUpdateTargetId(commentId);
        } else {
            setCommentInput('');
        }
        setCommentUpdateMode(!commentUpdateMode);
    }

    const handleCommentInputChange = (e?: React.ChangeEvent<HTMLTextAreaElement>, value?: string) => {
        const input = e.target.value.substring(0, 200);
        setCommentInput(input);
    }

    const {
        loading: commentCreateLoading,
        statusCode: commentCreateStatusCode,
        fetchRequest: commentCreateRequest
    } = useFetch<void>();

    const handleCommentCreateRequest = () => {
        // 앞뒤 공백 제거했을 때 댓글 길이가 0일경우
        if (commentInput.trim().length < 1) {
            return;
        }

        const body = {
            writerId: user.id,
            content: commentInput.trim(),
        }

        const method = ENDPOINTS.EXHIBITION.WRITE_COMMENT.METHOD;
        const url = ENDPOINTS.EXHIBITION.WRITE_COMMENT.URL;

        const options: FetchRequestOptions = {
            url: url(exhibition.id),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
            body: body,
        }

        commentCreateRequest(options);
    }

    useEffect(function commentCreateResponse() {
        if (commentCreateStatusCode) {
            if (commentCreateStatusCode == 201) {
                handleCommentPageRequest();
                setCommentInput('')
                return;
            }

            if (commentCreateStatusCode == 400) {
                setToastMessageDisplay(true);
                setFirstText('감성평 작성 실패 !');
                setSecondText('입력값을 확인해주세요');
                setIsSucess(false);

                setTimeout(() => {
                    setToastMessageDisplay(false);
                }, 3000);

                return;
            }

            if (commentCreateStatusCode == 401) {
                setToastMessageDisplay(true);
                setFirstText('감상평 작성 실패 !');
                setSecondText('로그인 상태를 확인해주세요');
                setIsSucess(false);

                setTimeout(() => {
                    useAuthStore.getState().logout();
                    navigate('/home');
                }, 3000);
                return;
            }

            if (commentCreateStatusCode == 403) {
                return;
            }

            if (commentCreateStatusCode == 404) {
                return;
            }

            if (commentCreateStatusCode == 500) {
                return;
            }

        }
    }, [commentCreateStatusCode])

    const {
        loading: commentUpdateLoading,
        statusCode: commentUpdateStatusCode,
        fetchRequest: commentUpdateRequest
    } = useFetch<void>();

    const handleCommentUpdateRequest = () => {
        if (commentInput.trim().length < 1) {
            return;
        }

        const requestBody = {
            writerId: user.id,
            content: commentInput.trim()
        }

        const method = ENDPOINTS.EXHIBITION.UPDATE_COMMENT.METHOD;
        const url = ENDPOINTS.EXHIBITION.UPDATE_COMMENT.URL;

        const options: FetchRequestOptions = {
            url: url(exhibition.id, commentUpdateTargetId),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
            body: requestBody
        }

        commentUpdateRequest(options);
    }

    useEffect(function handleCommentUpdateResponse() {
        if (commentUpdateStatusCode === 204) {
            setToastMessageDisplay(true);
            setFirstText('감상평 수정완료 !');
            setSecondText('감상평을 다시 불러옵니다');
            setIsSucess(true);

            setTimeout(() => {
                setToastMessageDisplay(false);
                handleCommentupdateMode()
                handleCommentPageRequest();
            }, 3000);

            return;
        }

        if (commentUpdateStatusCode === 400) {
            setToastMessageDisplay(true);
            setFirstText('감상평 수정실패 !');
            setSecondText('입력값을 확인해주세요');
            setIsSucess(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);

            return;
        }

        if (commentUpdateStatusCode === 401) {
            setToastMessageDisplay(true);
            setFirstText('감상평 수정실패 !');
            setSecondText('로그인 상태를 확인해주세요');
            setIsSucess(false);

            setTimeout(() => {
                useAuthStore.getState().logout();
                navigate('/home')
            }, 3000);

            return;
        }

        if (commentUpdateStatusCode === 403) {
            return;
        }

        if (commentUpdateStatusCode === 404) {
            return;
        }

        if (commentUpdateStatusCode === 500) {
            return;
        }

    }, [commentUpdateStatusCode]);




    // 삭제
    const handleDeleteModalDisplay = () => {
        setDeleteModalDisplay(!deleteModalDisplay);
    }

    const handleDeleteModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteModalInput(e.target.value);
    }

    const {
        loading: exhibitionDeleteLoading,
        statusCode: exhibitionDeleteStatusCode,
        fetchRequest: exhibitionDeleteRequest
    } = useFetch<void>();

    const handleDeleteExhibition = () => {
        if (deleteModalInput !== '삭제') {
            return;
        }

        const method = ENDPOINTS.EXHIBITION.REMOVE.METHOD;
        const url = ENDPOINTS.EXHIBITION.REMOVE.URL;

        // 왜전시회 삭제? 댓글사제는? 그리고 여기 이펙트이름왜잉럼
        const options: FetchRequestOptions = {
            url: url(exhibition.id),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        exhibitionDeleteRequest(options);
    }

    useEffect(function exhibitionDeleteResponse() {
        if (exhibitionDeleteStatusCode === 204) {
            setToastMessageDisplay(true);
            setFirstText('전시회 삭제완료 !');
            setSecondText('홈페이지로 이동합니다');
            setIsSucess(true);
            setDeleteModalDisplay(false);

            setTimeout(() => {
                navigate('/home');
            }, 3000);
            return;
        }

        if (exhibitionDeleteStatusCode === 401) {
            setToastMessageDisplay(true);
            setFirstText('전시회 삭제실패 !');
            setSecondText('로그인 상태를 확인해주세요');
            setIsSucess(false);
            setDeleteModalDisplay(false);

            setTimeout(() => {
                useAuthStore.getState().logout();
                navigate('/home');
            }, 3000);
            return;
        }

        if (exhibitionDeleteStatusCode === 403) {
            setToastMessageDisplay(true);
            setFirstText('전시회 삭제실패 !');
            setSecondText('인가되지 않은 접근입니다');
            setIsSucess(false);
            setDeleteModalDisplay(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }

        if (exhibitionDeleteStatusCode === 404) {
            setToastMessageDisplay(true);
            setFirstText('전시회 삭제실패 !');
            setSecondText('해당 전시회 또는 작성자 데이터를 찾을 수 없습니다');
            setIsSucess(false);
            setDeleteModalDisplay(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }


        if (exhibitionDeleteStatusCode === 500) {
            setToastMessageDisplay(true);
            setFirstText('서버에러 !');
            setSecondText('잠시 후 다시 시도해주세요');
            setIsSucess(false);
            setDeleteModalDisplay(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
            }, 3000);
            return;
        }

    }, [exhibitionDeleteStatusCode]);



    return (
        <>
            <Container>
                {/* <Header display='none' /> */}
                {exhibition && <>
                    <Image src={exhibition.works[curIndex].image} />

                    <ExhibitionHeader>
                        <HeaderLeftBox>
                            <IconBox onClick={handleExitModal}>
                                <Icon src={exitIcon} />
                            </IconBox>

                            <InfoBox>
                                <Title>{exhibition.title}</Title>
                                <Description>{exhibition.description}</Description>
                            </InfoBox>

                        </HeaderLeftBox>

                        <HeaderRightBox>
                            <ActiveUserBox>
                                <ActiveUserIcon src={userIcon} />
                                <ActiveUser>{activeUsers}명 관람중</ActiveUser>
                            </ActiveUserBox>

                            <IconBox onClick={handleLikeRequest}>
                                <Icon src={exhibition.isLiked ? heartFillIcon : heartIcon} />
                            </IconBox>

                            <IconBox onClick={handleBookmarkRequest}>
                                <Icon src={exhibition.isBookmarked ? bookmarkFillIcon : bookmarkIcon} />
                            </IconBox>

                            <IconBox onClick={handleChatDisplay}>
                                <Icon src={chatIcon} />
                            </IconBox>

                            <IconBox onClick={handleCommentDisplay}>
                                <Icon src={notebookIcon} />
                            </IconBox>
                            {user.id === exhibition.writer.id &&
                                <IconBox onClick={handleDeleteModalDisplay}>
                                    <Icon src={trashIcon} />
                                </IconBox>
                            }

                        </HeaderRightBox>
                    </ExhibitionHeader>

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

                    <Footer>
                        <FooterLeftBox>
                            <ImageTitle>{exhibition.works[curIndex].title}</ImageTitle>
                            <ImageDescription>{exhibition.works[curIndex].description}</ImageDescription>
                        </FooterLeftBox>

                        <FooterRightBox>
                            <WriterProfileImage src={exhibition.writer.profileImage ? exhibition.writer.profileImage : DEFAULT.profileImage} />
                            <WriterNickname>{exhibition.writer.nickname}</WriterNickname>
                        </FooterRightBox>

                    </Footer>

                    {chatDisplay && <ChatBox>
                        <ChatHeader>

                            <ChatTitle>실시간 채팅</ChatTitle>


                            <IconBox onClick={handleChatDisplay}>
                                <Icon src={closeIcon} />
                            </IconBox>
                        </ChatHeader>

                        <ChatList ref={chatListRef}>
                            {chatList.map((chat, index) => (
                                <ExhibitionChatMessage
                                    key={index}
                                    chatData={chat}
                                />
                            ))}
                        </ChatList>

                        <ChatInputBox>
                            <ChatInput
                                placeholder='메시지를 입력하세요'
                                value={chatInput}
                                onChange={handleChatInputChange}
                                onKeyDown={handleChatInputKeyDown}
                                onCompositionStart={handleCompositionStart}
                                onCompositionEnd={handleCompositionEnd}
                            />
                            <SendIconBox onClick={sendChat}>
                                <Icon src={sendIcon} />
                            </SendIconBox>

                        </ChatInputBox>


                    </ChatBox>}

                    {commentDisplay && <CommentBox>
                        <CommentHeader>
                            <IconBox onClick={handleCommentDisplay}>
                                <Icon src={closeIcon} />
                            </IconBox>
                            <CommentTitle>전시회 감상평</CommentTitle>
                        </CommentHeader>

                        <CommentList>
                            {comments.map((comment, index) => (
                                <ExhibitionComment
                                    key={comment.id}
                                    data={comment}
                                    exhibitionId={Number(exhibitionId)}
                                    handleCommentPageRequest={handleCommentPageRequest}
                                    handleCommentupdateMode={handleCommentupdateMode}
                                />

                            ))}
                        </CommentList>

                        {commentTotalPage > 0 &&
                            <CommentPageNavBox>

                                <CommentPageBox>
                                    <CommentPage
                                        onClick={
                                            () => {
                                                // 현재 페이지가 첫번째 페이지 이후 페이지라면
                                                if (commentCurrentPage > 0) {
                                                    handleCommentPageRequest(commentCurrentPage - 1)
                                                }
                                            }
                                        }
                                    >
                                        <CommentPrevPageIcon src={leftBlackIcon} />
                                    </CommentPage>

                                    {Array.from({ length: commentTotalPage }, (_, index) => (
                                        <>
                                            {commentPageGroup === Math.floor(index / 5) &&
                                                <CommentPage
                                                    key={index + 1}
                                                    isSelected={index + 1 == commentCurrentPage + 1}
                                                    onClick={() => handleCommentPageRequest(index)}
                                                >
                                                    {index + 1}
                                                </CommentPage>
                                            }
                                        </>
                                    ))}

                                    <CommentPage
                                        onClick={
                                            () => {
                                                // 현재 페이지가 마지막 페이지보다 이전 페이지라면
                                                if (commentCurrentPage < commentTotalPage - 1) {
                                                    handleCommentPageRequest(commentCurrentPage + 1)
                                                }
                                            }
                                        }>
                                        <CommentNextPageIcon src={rightBlackIcon} />
                                    </CommentPage>

                                </CommentPageBox>

                                <CommentQuickPageBox>
                                    <CommentFirstPage
                                        onClick={() => { handleCommentPageRequest(0) }}
                                    >
                                        시작 페이지
                                    </CommentFirstPage>
                                    <CommentLastPage
                                        onClick={() => { handleCommentPageRequest(commentTotalPage - 1) }}
                                    >

                                        마지막 페이지
                                    </CommentLastPage>
                                </CommentQuickPageBox>
                            </CommentPageNavBox>}



                        <CommentInputBox>
                            <CommentInput
                                placeholder='전시회 감사평을 남겨주세요 (200자 이내)'
                                value={commentInput}
                                onChange={handleCommentInputChange}
                                commentUpdateMode={commentUpdateMode}
                            />

                            {commentUpdateMode &&

                                <CommentUpdateButtonBox>
                                    <CommentInputUpdateCancelButtonBox onClick={() => handleCommentupdateMode()}>
                                        <CommentInputUpdateCancelButtonText>취소</CommentInputUpdateCancelButtonText>
                                    </CommentInputUpdateCancelButtonBox>
                                    <CommentInputUpdateButtonBox onClick={handleCommentUpdateRequest}>
                                        <CommentInputUpdateButtonText>수정하기</CommentInputUpdateButtonText>
                                    </CommentInputUpdateButtonBox>
                                </CommentUpdateButtonBox>
                            }
                            {!commentUpdateMode &&
                                <CommentInputButton onClick={handleCommentCreateRequest}>감상평 남기기</CommentInputButton>
                            }
                        </CommentInputBox>




                    </CommentBox>}
                </>
                }

                {exitModalDisplay &&
                    <ModalBackground>
                        <ExitBox>
                            <ExitTitleBox>
                                <ExitIcon src={exitGif} />
                                <ExitBoxTitle>전시회 나가기</ExitBoxTitle>
                            </ExitTitleBox>

                            <ExitBoxContent>작품은 잘 감상하셨나요?</ExitBoxContent>
                            <ExitBoxContent>감상평을 통해 작품에 대한 생각과 느낌을 공유해주세요</ExitBoxContent>

                            <ExitButtonBox>
                                <ExitCancelButton onClick={handleExitModal}>취소</ExitCancelButton>
                                <ExitButton onClick={handleExit}>나가기</ExitButton>
                            </ExitButtonBox>

                        </ExitBox>
                    </ModalBackground>
                }
                {deleteModalDisplay &&
                    <ModalBackground>
                        {exhibitionDeleteLoading &&
                            <LoadingIcon src={loadingIcon} />
                        }
                        {!exhibitionDeleteLoading &&
                            <DeleteBox>
                                <DeleteBoxTitleBox>
                                    <AlertIcon src={alertIcon} />
                                    <DeleteBoxTitle>전시회 삭제 확인</DeleteBoxTitle>
                                </DeleteBoxTitleBox>

                                <DeleteBoxContent>이 작업은 되돌릴 수 없습니다.</DeleteBoxContent>
                                <DeleteBoxContent>전시회와 관련된 모든 데이터가 영구적으로 삭제됩니다.</DeleteBoxContent>

                                <DeleteBoxInput
                                    placeholder='"삭제"를 입력하세요'
                                    value={deleteModalInput}
                                    onChange={handleDeleteModalInputChange}
                                />

                                <DeleteBoxButtonBox>
                                    <DeleteBoxCancelButton onClick={handleDeleteModalDisplay}>취소</DeleteBoxCancelButton>
                                    <DeleteBoxDeleteButton onClick={handleDeleteExhibition}>삭제</DeleteBoxDeleteButton>
                                </DeleteBoxButtonBox>

                            </DeleteBox>
                        }
                    </ModalBackground>
                }

                {toastMessageDisplay &&
                    <ToastMessage
                        firstText={firstText}
                        secondText={secondText}
                        isSuccess={isSucess}
                    />}
            </Container>
        </>
    )
}

export default Exhibition;
// 채팅창 헤더높이 맞추고
// 방명록 레이아웃 만들고 편지작성하고 
// 내일 네트워크공부 ㄱ