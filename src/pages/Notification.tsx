import { useEffect, useState, useRef } from 'react';
import styled from "styled-components";

import Header from "../components/Header";
import NotificationCard from "../components/NotificationCard";
import { FetchRequestOptions } from '../types/http';
import useFetch from '../hooks/useFetch';
import useAuthStore from "../zustand/store";
import ENDPOINTS from '../api/endpoints';
import Loader from '../components/Loader';

import leftBlackIcon from '../assets/left-black.png';
import rightBlackIcon from '../assets/right-black.png';



const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;

    background-color: #F9FBFF;

    overflow: none;
`;

const Body = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 7px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px; 
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`

const NotificationPageBox = styled.div`
    width: 1200px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: 15px;
    
`

const PageBoxHeader = styled.div`
    margin-top: 40px;
    width: 100%;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const PageTitle = styled.h1`
    
`

const ReadAllButton = styled.button`
    padding: 15px;

    font-size: 16px;
    font-weight: 700;

    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    color: rgba(0, 0, 0, 0.7);

    background-color: #F9FBFF;

    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`

const PageNavBox = styled.div`
    margin-top: 40px;
    margin-bottom: 40px;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    border-radius: 1px solid #000000;
`

const PageBox = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;

    gap: 10px;

    justify-content: center;
`

const PrevPageIcon = styled.img`
    width: 20px;
    height: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const NextPageIcon = styled.img`
    width: 20px;
    height: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-weight: 700;
`

const Page = styled.div<{ isSelected?: boolean }>`
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

   
    background-color: ${({ isSelected }) => (isSelected ? "black" : "white")};
    color: ${({ isSelected }) => (isSelected ? "white" : "black")};

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? "black" : "rgba(0, 0, 0, 0.07)")};
    }
`

const QuickPageBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;   
    gap: 15px;

    justify-content: center;
`

const FirstPage = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);

    cursor: pointer;
    &:hover {
        color: black;
    }
`

const LastPage = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);

    cursor: pointer;

    &:hover {
        color: black;
    }
`

const LoadingBox = styled.div`
    width: 100%;
    aspect-ratio: 2/1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`




type NotificationType = 'follow' | 'single_work_comment' | 'exhibition_comment' | 'single_work_like' | 'exhibition_like' | 'exhibition_bookmark' | 'following_single_work' | 'following_exhibition' | 'follow';

interface NotificationData {
    id: number;
    type: NotificationType;
    targetId: number;
    isRead: boolean;
    createdAt: string;
}

interface NotificationDataPage {
    content: NotificationData[];
    pageable: {
        pageNumber: number;
    }
    totalPages: number;
}

const Notification = () => {
    const user = useAuthStore.getState().user;

    // 바디 스크롤
    const bodyRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        if (bodyRef.current) {
            bodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // 페이징
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageGroup, setPageGroup] = useState<number>(0);

    // 알림 데이터
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    const {
        loading: notificationPageLoading,
        statusCode: notificationPageStatusCode,
        data: notificationPage,
        fetchRequest: notificationDataPageRequest
    } = useFetch<NotificationDataPage>();

    const handleNotificationPageRequest = async (page: number = 0) => {
        const method = ENDPOINTS.NOTIFICATION.GET_PAGE.METHOD;
        const url = ENDPOINTS.NOTIFICATION.GET_PAGE.URL(user.id, page, 20);

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        notificationDataPageRequest(options);
    }

    useEffect(function handleNotificationPageInitRequest() {
        handleNotificationPageRequest(0);
    }, [])

    useEffect(function handleNotificationPageResponse() {
        if (notificationPageStatusCode === 200 && notificationPage) {
            setNotifications(notificationPage.content)
            setTotalPage(notificationPage.totalPages);
            setCurrentPage(notificationPage.pageable.pageNumber);
            setPageGroup(Math.floor(notificationPage.pageable.pageNumber / 5));
            return;
        }

        if (notificationPageStatusCode === 404) {
            setNotifications([]);
            return;
        }

    }, [notificationPageStatusCode, notificationPage]);


    // 전체 읽음 처리
    const {
        loading: markAllLoading,
        statusCode: markAllStatusCode,
        fetchRequest: markAllRequest
    } = useFetch<void>();

    const handleMarkAllRequest = () => {
        const method = ENDPOINTS.NOTIFICATION.MARK_ALL.METHOD;
        const url = ENDPOINTS.NOTIFICATION.MARK_ALL.URL(user.id);

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        markAllRequest(options);
    }

    useEffect(function handleMarkResponse() {
        if (markAllStatusCode === 204) {
            setNotifications([]);
            handleNotificationPageRequest(currentPage);
            return;
        }
    }, [markAllStatusCode])



    return (
        <Container>
            <Header />

            <Body ref={bodyRef}>
                <NotificationPageBox>
                    <PageBoxHeader>
                        <PageTitle>알림</PageTitle>
                        <ReadAllButton
                            onClick={handleMarkAllRequest}
                        >모두 읽음 처리</ReadAllButton>

                    </PageBoxHeader>

                    {notificationPageLoading &&
                        <LoadingBox>
                            <Loader fontColor='black' />
                        </LoadingBox>
                    }
                    {!notificationPageLoading && notifications.map((notification, index) => (
                        <NotificationCard
                            notification={notification}

                        />
                    ))}


                    {totalPage > 0 &&
                        <PageNavBox>

                            <PageBox>
                                <Page
                                    onClick={
                                        () => {
                                            // 현재 페이지가 첫번째 페이지 이후 페이지라면
                                            if (totalPage > 0) {
                                                handleNotificationPageRequest(currentPage - 1)
                                                scrollToTop();
                                            }
                                        }
                                    }
                                >
                                    <PrevPageIcon src={leftBlackIcon} />
                                </Page>

                                {Array.from({ length: totalPage }, (_, index) => (
                                    <>
                                        {pageGroup === Math.floor(index / 5) &&
                                            <Page
                                                key={index + 1}
                                                isSelected={index + 1 == currentPage + 1}
                                                onClick={() => {
                                                    handleNotificationPageRequest(index);
                                                    scrollToTop();
                                                }}
                                            >
                                                {index + 1}
                                            </Page>
                                        }
                                    </>
                                ))}

                                <Page
                                    onClick={
                                        () => {
                                            // 현재 페이지가 마지막 페이지보다 이전 페이지라면
                                            if (currentPage < totalPage - 1) {
                                                handleNotificationPageRequest(currentPage + 1)
                                                scrollToTop()
                                            }
                                        }
                                    }>
                                    <NextPageIcon src={rightBlackIcon} />
                                </Page>

                            </PageBox>

                            <QuickPageBox>
                                <FirstPage
                                    onClick={() => {
                                        handleNotificationPageRequest(0)
                                        scrollToTop()
                                    }}
                                >
                                    시작 페이지
                                </FirstPage>
                                <LastPage
                                    onClick={() => {
                                        handleNotificationPageRequest(totalPage - 1);
                                        scrollToTop();
                                    }}
                                >

                                    마지막 페이지
                                </LastPage>
                            </QuickPageBox>
                        </PageNavBox>}


                </NotificationPageBox>
            </Body>


        </Container>
    )
}

export default Notification;