import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import { FetchRequestOptions } from '../types/http';
import ENDPOINTS from '../api/endpoints';
import useAuthStore from '../zustand/store';
import useFetch from '../hooks/useFetch';

import ToastMessage from './ToastMessage';

import commentMenuIcon from '../assets/comment-menu.png';
import pencilIcon from '../assets/pencil.png'
import trashIcon from '../assets/trash-red.png';
import alertIcon from '../assets/alert.png';
import loadingIcon from '../assets/loading-large.png';



const Container = styled.div`
    width: 100%;
    
    position: relative;

    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const CommentWriterProfileImage = styled.img`
    width: 40px;
    height: 40px;

    border-radius: 7px;

    @media (max-width: 768px) {
            width: 30px;
            height: 30px;
    }
`

const CommentBodyBox = styled.div`
    width: calc(100% - 40px);
    display: flex;
    flex-direction: column;
    gap: 5px;

    @media (max-width: 768px) {
        width: calc(100% - 30px);
    }
`

const CommentBodyHeaderBox = styled.div`
    width: 100%;

    position: relative;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const CommentNicknameBox = styled.div`
    font-size: 16px;
    font-weight: 700;
`

const CommentBodyHeaderRightBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const CommentTime = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.4);
`;

const CommentMenuIconBox = styled.div`
    width: 30px;
    height: 30px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;

    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`

const CommentMenuIcon = styled.img`
    width: 24px;
    height: 24px;
`

const CommentText = styled.div`
    font-size: 14px;
    line-height: 17px;

    color: rgba(0, 0, 0, 0.6);

    white-space: pre-wrap;
    word-break: break-word;
`

const CommentOptionBox = styled.div`
    padding: 5px;
    top: 30px;
    right: 0;

    display: flex;
    flex-direction: column;

    border-radius: 5px;

    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
    
    position: absolute;
    background-color: white;

    z-index: 1;
`

const CommentOption = styled.div`
    padding: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;

    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

const CommentOptionIcon = styled.img`   
    width: 20px;
    height: 20px;
`

const CommentOptionText = styled.div`
    font-size: 16px;
    white-space: nowrap;
`

const DeleteBackground = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: fixed;
    top:0px;
    left: 0px;
    z-index: 999;

    background-color: rgba(0, 0, 0, 0.7);
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

interface CommentProps {
    data: CommentData;
    singleWorkId: number;
    handleCommentPageRequest: (page?: number) => void;
    handleCommentupdateMode: (input?: string, commentId?: number) => void;
}



const Comment: React.FC<CommentProps> = (props) => {
    const { data, singleWorkId, handleCommentPageRequest, handleCommentupdateMode } = props;
    const user = useAuthStore.getState().user;

    // 토스트 메시지 
    const [toastMessageDisplay, setToastMessageDisplay] = useState<boolean>(false);
    const [firstText, setFirstText] = useState<string>('');
    const [secondText, setSecondText] = useState<string>('');
    const [isSucess, setIsSucess] = useState<boolean>(null);

    // 옵션 모달
    const optionModalRef = useRef<HTMLDivElement>(null);
    const [optionModalDisplay, setOptionModalDisplay] = useState<boolean>(false);
    const [deleteModalDisplay, setDeleteModalDisplay] = useState<boolean>(false);

    const handleOptionModalDisplay = () => {
        setOptionModalDisplay(!optionModalDisplay);
    }

    const handleDeleteModalDisplay = () => {
        setDeleteModalDisplay(!deleteModalDisplay);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (optionModalRef.current && !optionModalRef.current.contains(event.target as Node)) {
                setOptionModalDisplay(false);
            }
        }

        if (optionModalDisplay) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [optionModalDisplay]);


    // 댓글삭제
    const {
        loading: commentDeleteLoading,
        statusCode: commentDeleteStatusCode,
        fetchRequest: commentDeleteRequest
    } = useFetch<void>();

    const handleDeleteComment = () => {
        const method = ENDPOINTS.SINGLE_WORK.REMOVE_COMMENT.METHOD;
        const url = ENDPOINTS.SINGLE_WORK.REMOVE_COMMENT.URL;

        const body = {
            writerId: user.id,
        }

        const options: FetchRequestOptions = {
            url: url(singleWorkId, data.id),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
            body: body,
        }

        commentDeleteRequest(options);
    }

    useEffect(function handleCommentDeleteRequest() {
        if (commentDeleteStatusCode == 204) {
            setToastMessageDisplay(true);
            setFirstText('댓글 삭제완료 !');
            setSecondText('댓글을 다시 불러옵니다');
            setIsSucess(true);
            setDeleteModalDisplay(false);

            setTimeout(() => {
                setToastMessageDisplay(false);
                handleCommentPageRequest();
            }, 3000);
            return
        }

        if (commentDeleteStatusCode == 400) {
            // 삭제완료 모달 띄우고 홈페이지로 리다이렉트
            setToastMessageDisplay(true);
            setFirstText('댓글 삭제실패 !');
            setSecondText('로그인 상태를 확인해주세요');
            setIsSucess(false);
            setDeleteModalDisplay(false);

            setTimeout(() => {
                useAuthStore.getState().logout();
                window.location.reload();
            }, 3000);
            return
        }

        if (commentDeleteStatusCode == 401) {
            return
        }

        if (commentDeleteStatusCode == 403) {
            return
        }

        if (commentDeleteStatusCode == 404) {
            return
        }

        if (commentDeleteStatusCode == 405) {
            return
        }

    }, [commentDeleteStatusCode])

    return (
        <Container>

            <CommentWriterProfileImage src={data.writer.profileImage} />

            <CommentBodyBox>

                <CommentBodyHeaderBox>
                    <CommentNicknameBox>{data.writer.nickname}</CommentNicknameBox>
                    <CommentBodyHeaderRightBox>
                        <CommentTime>{data.createdAt}</CommentTime>

                        {useAuthStore.getState().userId === data.writer.id &&
                            <CommentMenuIconBox
                                ref={optionModalRef}
                                onClick={handleOptionModalDisplay}
                            >
                                <CommentMenuIcon src={commentMenuIcon} />
                                {optionModalDisplay &&
                                    <CommentOptionBox>
                                        <CommentOption onClick={() => handleCommentupdateMode(data.content, data.id)}>
                                            <CommentOptionIcon src={pencilIcon} />
                                            <CommentOptionText>수정하기</CommentOptionText>
                                        </CommentOption>
                                        <CommentOption
                                            onClick={handleDeleteModalDisplay}
                                        >
                                            <CommentOptionIcon src={trashIcon} />
                                            <CommentOptionText style={{ color: '#f50000' }}>삭제하기</CommentOptionText>
                                        </CommentOption>
                                    </CommentOptionBox>
                                }
                            </CommentMenuIconBox>}
                    </CommentBodyHeaderRightBox>
                </CommentBodyHeaderBox>
                <CommentText>{data.content}</CommentText>

            </CommentBodyBox>

            {deleteModalDisplay &&
                <DeleteBackground>
                    {commentDeleteLoading &&
                        <LoadingIcon src={loadingIcon} />
                    }
                    {!commentDeleteLoading &&
                        <DeleteBox>
                            <DeleteBoxTitleBox>
                                <AlertIcon src={alertIcon} />
                                <DeleteBoxTitle>댓글 삭제 확인</DeleteBoxTitle>
                            </DeleteBoxTitleBox>

                            <DeleteBoxContent>이 작업은 되돌릴 수 없습니다.</DeleteBoxContent>
                            <DeleteBoxContent>해당 댓글은 영구적으로 삭제됩니다.</DeleteBoxContent>

                            <DeleteBoxButtonBox>
                                <DeleteBoxCancelButton onClick={handleDeleteModalDisplay}>취소</DeleteBoxCancelButton>
                                <DeleteBoxDeleteButton onClick={handleDeleteComment}>삭제</DeleteBoxDeleteButton>
                            </DeleteBoxButtonBox>

                        </DeleteBox>
                    }
                </DeleteBackground>
            }

            {toastMessageDisplay &&
                <ToastMessage
                    firstText={firstText}
                    secondText={secondText}
                    isSuccess={isSucess}
                />}
        </Container>
    )
}

export default Comment;