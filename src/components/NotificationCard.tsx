import { useState, useEffect } from 'react';
import styled from "styled-components";

import { FetchRequestOptions } from '../types/http';
import useAuthStore from '../zustand/store';
import useFetch from '../hooks/useFetch';
import ENDPOINTS from '../api/endpoints';
import SingleWork from './SingleWork';


import userPlusIcon from '../assets/user-plus-b.png';
import commentIcon from '../assets/comment.png';
import heartIcon from '../assets/heart-b.png';
import bookmarkIcon from '../assets/album.png';
import listIcon from '../assets/list-plus.png';
import uncheckIcon from '../assets/readCircle.png';
import checkIcon from '../assets/readCircleCheck.png';


const Container = styled.div`
    padding: 20px;
    width: calc(100% - 40px);

    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    display: flex;
    flex-direction: row;
    gap: 20px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.03);
    }
`

const LeftBox = styled.div`
    display: flex;
    flex-direction: column;
    
`

const TypeIcon = styled.img`
    width: 30px;
    height: 30px;
`

const CenterBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 7px;
`

const Message = styled.div`
    font-size: 16px;
`

const Time = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.4);
`

const RightBox = styled.div`
    display: flex;
    flex-direction: column;
`

const CheckIcon = styled.img`
    width: 30px;
    height: 30px;
    
    cursor: pointer;
`

type NotificationType = 'follow' | 'single_work_comment' | 'exhibition_comment' | 'single_work_like' | 'exhibition_like' | 'exhibition_bookmark' | 'following_single_work' | 'following_exhibition';

interface NotificationData {
    id: number;
    type: NotificationType;
    targetId: number;
    isRead: boolean;
    createdAt: string;
}

interface NotificationCardProps {
    notification: NotificationData;
}


const NotificationCard: React.FC<NotificationCardProps> = (props) => {
    const user = useAuthStore.getState().user;
    const [notification, setNotification] = useState<NotificationData>(props.notification);

    const findIconByType = (type: NotificationType) => {
        switch (type) {
            case "follow":
                return userPlusIcon;
            case "single_work_comment":
            case "exhibition_comment":
                return commentIcon;
            case "single_work_like":
            case "exhibition_like":
                return heartIcon;
            case "exhibition_bookmark":
                return bookmarkIcon
            case "following_single_work":
            case "following_exhibition":
                return listIcon;
            default:
        }
    }


    // 타겟 데이터에서 닉네임 혹은 이름을 불러와야함 ㄷㄷ
    const createMessage = (type: NotificationType) => {
        switch (type) {
            case "follow":
                return '누군가 당신을 팔로우했어요 !';
            case "single_work_comment":
                return '누군가 당신의 단일작품에 댓글을 남겼습니다';
            case "exhibition_comment":
                return '누군가 당신의 전시회에 감상평을 남겼습니다';
            case "single_work_like":
                return '누군가 당신의 단일작품을 좋아합니다';
            case "exhibition_like":
                return '누군가 당신의 전시회를 좋아합니다';
            case "exhibition_bookmark":
                return '누군가 당신의 전시회를 북마크했습니다';
            case "following_single_work":
                return '팔로우 작가의 새 단일작품이 게시되었습니다';
            case "following_exhibition":
                return '팔로우 작가의 새 전시회가 개최되었습니다';
            default:
        }
    }

    // 단일작품
    const [openSingleWorkDetail, setOpenSingleWorkDetail] = useState<boolean>(false);
    const [selectedSingleWorkId, setSelectedSingleWorkId] = useState<number | null>(null);

    const handleOpenSingleWorkDetail = (singleWorkId?: number) => {
        if (openSingleWorkDetail) {
            setOpenSingleWorkDetail(false);

            return;
        }

        setOpenSingleWorkDetail(true);
        setSelectedSingleWorkId(singleWorkId);
    };


    // 전시회
    const handleOpenExhibitionDetails = () => {
        window.open(`/exhibitions/${notification.targetId}`, "_blank");
    }

    // 읽기 처리
    const {
        loading: markLoading,
        statusCode: markStatusCode,
        fetchRequest: markRequest
    } = useFetch<void>();

    const handleMarkRequest = () => {
        const method = ENDPOINTS.NOTIFICATION.MARK.METHOD;
        const url = ENDPOINTS.NOTIFICATION.MARK.URL(user.id, notification.id);

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        markRequest(options);
    }

    useEffect(function handleMarkResponse() {
        if (markStatusCode === 204) {
            setNotification((prev) => ({
                ...prev,
                isRead: true
            }));
            return;
        }
    }, [markStatusCode])

    const handleClickCard = () => {
        handleMarkRequest();

        if (notification.type === 'single_work_comment' || notification.type === 'single_work_like' || notification.type === 'following_single_work') {
            handleOpenSingleWorkDetail(notification.targetId)
            return;
        }

        if (notification.type === 'exhibition_comment' || notification.type === 'exhibition_like' || notification.type === 'exhibition_bookmark' || notification.type === 'following_exhibition') {
            handleOpenExhibitionDetails();
            return;
        }
    }


    return (
        <Container
            onClick={handleClickCard}
        >
            <LeftBox>
                <TypeIcon src={findIconByType(notification.type)} />
            </LeftBox>

            <CenterBox>
                <Message>{createMessage(notification.type)}</Message>
                <Time>{notification.createdAt}</Time>
            </CenterBox>

            <RightBox>
                <CheckIcon
                    src={notification.isRead ? checkIcon : uncheckIcon}
                />
            </RightBox>

            {openSingleWorkDetail && <SingleWork singleWorkId={selectedSingleWorkId} close={handleOpenSingleWorkDetail}></SingleWork>}
        </Container>
    )
}

export default NotificationCard;