import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { FetchRequestOptions } from '../types/http';
import useAuthStore from '../zustand/store';
import useFetch from '../hooks/useFetch';
import ENDPOINTS from '../api/endpoints';

import LoginModal from '../components/LoginModal';
import UserDetailsPanel from './UserDetailsPanel';
import ShortButton from './button/ShortButton';

import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png';
import bellIcon from '../assets/bell.png';
import bellDotIcon from '../assets/bell-dot.png';
import DEFAULT from '../api/default';



const Container = styled.header`
    width: 100%;
    height: 80px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
    background-color: #F9FBFF;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;

    @media (max-width: 768px) {
        height: 60px;
    }

    @media (max-width: 480px) {
        height: 50px;
    }

    z-index: 99;
`;

const Logo = styled.img`
    margin-left: 20px;
    height: 35px;

    @media (max-width: 480px) {
        margin-left: 10px;
        height: 30px; 
    }
`;

const HeaderButtonBox = styled.div`
    height: 80px;
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap:10px;

    @media (max-width: 768px) {
        display: none;
    }
`;

const HeaderMenuButtonBox = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 10px;
    
    display: none;

    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }

    @media (max-width: 768px) {
        display: flex;
    }
`;

const HeaderMenuIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const HeaderMenu = styled.div<{ isOpen: boolean }>`
    width: 240px;
    height: 100%;
    margin-top: 60px;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};

    position: fixed;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); 

    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')}); 
    transition: transform 0.3s ease-in-out; 

    z-index: 999;

    @media (max-width: 240px) {
        width: 100%;
        margin-top: 50px;
    }

    @media (max-width: 480px) {
        margin-top: 50px;
    }

    @media (min-width: 769px) {
        visibility: hidden;
    }
`;

const MenuButton = styled.div`
    margin-top: 10px;
    width: 95%;
    height: 40px;

    display: flex;
    flex-direction: column;

    color: white;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    line-height: 14px;

    border-radius: 5px;

    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

const UserProfileImageBox = styled.div`
    width: 50px;
    height: 50px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    position: relative;

    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
`;

const UserProfileImage = styled.img`
    width: 40px;
    height: 40px;

    border-radius: 5px;

    cursor: pointer;

    transition: transform 0.2s ease-in-out; 

    &:hover {
        transform: scale(1.1); 
    }
`

const IconBox = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    position: relative;

    border-radius: 5px;
    
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`

const NotificationIcon = styled.img`
    width: 32px;
    height: 32px;

    transition: transform 0.2s ease-in-out; 
`

const MessageBox = styled.div`
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    border-radius: 10px;
    color: white;

    position: absolute;
    top: 100%;
    
    font-size: 16px;
    font-weight: 700;

    background-color: rgba(0, 0, 0, 0.3);

    animation: fadeInOut 3s ease-in-out forwards;

    @keyframes fadeInOut {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        10% {
            opacity: 1;
            transform: translateY(0);
        }
        90% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(10px);
        }
    }
`

interface CountUnread {
    unreadCount: number;
}


interface HeaderProps {
    display?: 'none' | 'flex'
}



const Header: React.FC<HeaderProps> = (props) => {
    const { display = 'flex' } = props;
    const navigate = useNavigate();
    const user = useAuthStore.getState().user;
    const login = useAuthStore.getState().login;

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [loginModalDisplay, setLoginModalDisplay] = useState<boolean>(false);
    const [userDetailsPanelDisplay, setUserDetailsPanelDisplay] = useState<boolean>(false);
    const eventSourceRef = useRef<EventSource>(null);

    // 읽지 않은 알림 개수
    const [countUnreadNotifications, setCountUnreadNotification] = useState<number>(0);

    // 알림 메시지
    const [displayNotificationMessage, setDisplayNotificationMessage] = useState<boolean>();

    const {
        loading: countUnreadNotificationsLoading,
        statusCode: countUnreadNotificationsStatusCode,
        data: countUnreadNotificationsData,
        fetchRequest: countUnreadNorificationsFetchRequest
    } = useFetch<CountUnread>();

    const handleCountUnreadNotificationsRequest = () => {
        const method = ENDPOINTS.NOTIFICATION.COUNT_UNREAD.METHOD;
        const url = ENDPOINTS.NOTIFICATION.COUNT_UNREAD.URL(user.id);

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        countUnreadNorificationsFetchRequest(options);
    }

    useEffect(function handleCountUnreadNotificationsResponse() {
        if (countUnreadNotificationsStatusCode === 200 && countUnreadNotificationsData) {
            setCountUnreadNotification(countUnreadNotificationsData.unreadCount);
            return;
        }

    }, [countUnreadNotificationsStatusCode, countUnreadNotificationsData]);

    const {
        loading: logoutLoading,
        statusCode: logoutStatusCode,
        fetchRequest: logoutFetchRequest
    } = useFetch<void>();

    const isLoggedIn = useAuthStore.getState().isLoggedIn;
    const isComplete = useAuthStore.getState().isComplete;
    const userDetails = useAuthStore.getState().user;
    const logout = useAuthStore.getState().logout;

    useEffect(function cleanUp() {
        return () => {

            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, [])

    useEffect(function checkAuth() {
        if (isLoggedIn) { // 로그인된 상태라면 로그인 상태관리 변수 업데이트
            // 현재 실제 로그인 상태인지 확인 필요
            login();

            if (!userDetails.id) {
                logout();
                return;
            }

            return;
        }

        logout();
    }, [isComplete]) // 인증요청 완료됐을 때 해당 이펙트 실행

    useEffect(function requestNotificationService() {
        function connectSSE() {
            const eventSource = new EventSource(ENDPOINTS.NOTIFICATION.CONNECTION(userDetails.id));

            eventSource.onopen = function () { };

            eventSource.onmessage = function (event) {
                if (event.data === 'new') {
                    handleCountUnreadNotificationsRequest();
                    setDisplayNotificationMessage(true);

                    setTimeout(() => {
                        setDisplayNotificationMessage(false);
                    }, 3000);
                }
            };

            eventSource.onerror = function (event) {
                eventSource.close();
                setTimeout(() => {
                    connectSSE(); // 다시 연결 시도
                }, 1000)
            }

            eventSourceRef.current = eventSource;
        }

        if (isLoggedIn) {
            connectSSE();
            handleCountUnreadNotificationsRequest();
        }

    }, [isLoggedIn]); // 로그인이 완료되면 알림 서비스를 위한 SSE 요청




    const navigateToJoinPage = () => {
        navigate('/join');
    };

    const navigateToIntroPage = () => {
        navigate('/');
    };

    const navigateToHomePage = () => {
        navigate('/home');
    };

    const navigateToNotificationPage = () => {
        navigate('/notification');
    };

    const openMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const showLoginModal = () => {
        if (loginModalDisplay) {
            setLoginModalDisplay(false);

            return;
        }

        setLoginModalDisplay(true);
    }

    const handleNavigateToMyPage = (menu: string) => {
        navigate("/mypage", { state: { menu: menu } });
    }

    const handleLogout = () => {
        const method = ENDPOINTS.AUTH.LOGOUT.METHOD;
        const url = ENDPOINTS.AUTH.LOGOUT.URL;

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        logoutFetchRequest(options);
        logout();
    }

    useEffect(function handleLogoutResponse() {
        if (logoutStatusCode) {
            if (logoutStatusCode === 204) {
                window.location.reload();
                return;
            }

            alert("로그아웃 실패\n잠시 후 다시 시도해주세요");
        }


    }, [logoutStatusCode])

    // 유저상세패널조작
    const handleUserDetailsPanelDisplay = () => {
        setUserDetailsPanelDisplay(!userDetailsPanelDisplay);
    }

    const userDetailsPanelRef = useRef<HTMLDivElement | null>(null);
    // 패널 외부 클릭 감지 후 닫기
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userDetailsPanelRef.current && !userDetailsPanelRef.current.contains(event.target as Node)) {
                // handleUserDetailsPanelDisplay();
                setUserDetailsPanelDisplay(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <Container style={{ display: display }}>
                <Logo src={logo} onClick={navigateToHomePage}></Logo>

                <HeaderButtonBox>
                    {!isLoggedIn && <ShortButton text="로그인" type="white" action={showLoginModal}></ShortButton>}
                    {!isLoggedIn && <ShortButton text="회원가입" type="black" action={navigateToJoinPage}></ShortButton>}
                    {isLoggedIn &&
                        <UserProfileImageBox
                            ref={userDetailsPanelRef}
                            onClick={handleUserDetailsPanelDisplay}
                        >
                            <UserProfileImage
                                src={userDetails.profileImage ? userDetails.profileImage : DEFAULT.profileImage}
                            />

                            {userDetailsPanelDisplay &&
                                <div
                                    style={{ position: 'absolute', top: '50px' }}
                                >
                                    <UserDetailsPanel
                                        id={userDetails.id}
                                        handleLogout={handleLogout}
                                    />
                                </div>
                            }



                        </UserProfileImageBox>
                    }
                    {isLoggedIn &&
                        <IconBox onClick={navigateToNotificationPage}>
                            <NotificationIcon src={countUnreadNotifications > 0 ? bellDotIcon : bellIcon} alt='알림' />
                            {displayNotificationMessage &&
                                <MessageBox>
                                    새 알림 도착
                                </MessageBox>}
                        </IconBox>
                    }
                    <ShortButton text="About" type="none" action={navigateToIntroPage}></ShortButton>
                </HeaderButtonBox>

                <HeaderMenuButtonBox onClick={openMenu}>
                    <HeaderMenuIcon src={menuIcon} />
                </HeaderMenuButtonBox>

            </Container>

            <HeaderMenu isOpen={isMenuOpen}>
                {!isLoggedIn && <MenuButton onClick={showLoginModal}>로그인</MenuButton>}
                {!isLoggedIn && <MenuButton onClick={navigateToJoinPage}>회원가입</MenuButton>}
                {isLoggedIn && <MenuButton onClick={() => handleNavigateToMyPage('my')}>내 정보</MenuButton>}
                {isLoggedIn && <MenuButton onClick={handleLogout}>로그아웃</MenuButton>}
                <MenuButton onClick={navigateToIntroPage}>About</MenuButton>
            </HeaderMenu>

            {loginModalDisplay && <LoginModal closeModal={showLoginModal} />}
        </>
    );
}

export default Header;