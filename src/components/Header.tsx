import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import ShortButton from '../components/ShortButton';
import LoginModal from '../components/LoginModal';

import useFetch from '../hooks/useFetch';

import logo from '../assets/logo.png';
import menuIcon from '../assets/menu.png';

import useAuthStore from '../zustand/store';
import { API_BASE_URL } from '../config/environment';
import ENDPOINTS from '../api/endpoints';

import activeUserIcon from '../assets/active-user.png';
import bellIcon from '../assets/bell.png';
import bellDotIcon from '../assets/bell-dot.png';

const Container = styled.header`
    width: 100%;
    height: 80px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
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

const ActiveUserBox = styled.div`
    width: 90px;
    height: 40px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
`;

const ActiveUserIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const ActiveUserNumber = styled.div`
    font-size: 14px;
    font-weight: 700;

    color: rgba(0, 0, 0, 0.5);
`;

const UserProfileImageBox = styled.div`
    width: 50px;
    height: 40px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;


    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
`;

const UserProfileImage = styled.img`
    width: 40px;
    height: 40px;

    cursor: pointer;

    transition: transform 0.2s ease-in-out; 

    &:hover {
        transform: scale(1.1); 
    }
`

const NotificationIcon = styled.img`
    width: 32px;
    height: 32px;

    transition: transform 0.2s ease-in-out; 

    &:hover {
        transform: scale(1.1); 
    }
`



type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface FetchRequestOptions {
    url: string;
    method: Method
    headers?: Record<string, string>;
    credentials: 'include' | 'same-origin';
    contentType: 'application/json' | 'multipart/form-data';
    body?: Record<string, any> | FormData | null;
}

interface UserInfo {
    data: {
        id: number,
        email: string,
        nickname: string,
        profileImage: string,
        coin: number,
        createdAt: string
    }
}

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [loginModalDisplay, setLoginModalDisplay] = useState<boolean>(false);
    const [loginStatus, setLoginStatus] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const {
        loading: userInfoLoading,
        statusCode: userInfoStatusCode,
        data: userInfoData,
        fetchRequest: userInfoFetchRequest
    } = useFetch<UserInfo>();

    const isLoggedIn = useAuthStore.getState().isLoggedIn;
    const isComplete = useAuthStore.getState().isComplete;

    useEffect(function checkAuth() {
        if (isLoggedIn) {
            setLoginStatus(true);
            return;
        }

        setLoginStatus(false);
    }, [isComplete])

    useEffect(function getUserInfo() {
        if (loginStatus) {
            const method: Method = 'GET'
            const headers = {
                'Content-Type': 'application/json',
            }

            const options: FetchRequestOptions = {
                url: `${API_BASE_URL}${ENDPOINTS.USER.DEFAULT}/${useAuthStore.getState().userId}`,
                method: method,
                headers: headers,
                credentials: 'include',
                contentType: 'application/json',
            }

            userInfoFetchRequest(options);
        }

    }, [loginStatus])

    useEffect(function checkUserInfo() {
        if (userInfoStatusCode == 200 && userInfoData !== null) {
            setUserInfo(userInfoData);
        }

    }, [userInfoData])

    const navigateToJoinPage = () => {
        navigate('/join');
    };

    const navigateToIntroPage = () => {
        navigate('/');
    };

    const navigateToHomePage = () => {
        navigate('/home');
    };

    const openMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const showLoginModal = () => {
        if (loginModalDisplay) {
            setLoginModalDisplay(false);
            window.location.reload();

            return;
        }

        setLoginModalDisplay(true);
    }


    return (
        <>
            <Container>
                <Logo src={logo} onClick={navigateToHomePage}></Logo>

                <HeaderButtonBox>
                    {!userInfo && <ShortButton text="로그인" type="white" action={showLoginModal}></ShortButton>}
                    {!userInfo && <ShortButton text="회원가입" type="black" action={navigateToJoinPage}></ShortButton>}
                    {userInfo &&
                        <ActiveUserBox>
                            <ActiveUserIcon src={activeUserIcon} alt='접속유저' />
                            <ActiveUserNumber>164</ActiveUserNumber>
                        </ActiveUserBox>
                    }
                    {userInfo &&
                        <UserProfileImageBox>
                            <UserProfileImage src={userInfo.data.profileImage} />
                        </UserProfileImageBox>
                    }
                    {userInfo &&
                        <UserProfileImageBox>
                            <NotificationIcon src={bellIcon} alt='알림' />
                        </UserProfileImageBox>
                    }

                    <ShortButton text="About" type="none" action={navigateToIntroPage}></ShortButton>
                    <ShortButton text="고객센터" type="none" action={showLoginModal}></ShortButton>
                </HeaderButtonBox>

                <HeaderMenuButtonBox onClick={openMenu}>
                    <HeaderMenuIcon src={menuIcon} />
                </HeaderMenuButtonBox>

            </Container>

            <HeaderMenu isOpen={isMenuOpen}>
                <MenuButton onClick={showLoginModal}>로그인</MenuButton>
                <MenuButton onClick={navigateToJoinPage}>회원가입</MenuButton>
                <MenuButton onClick={navigateToIntroPage}>About</MenuButton>
                <MenuButton>고객센터</MenuButton>
            </HeaderMenu>

            {loginModalDisplay && <LoginModal closeModal={showLoginModal} />}
        </>
    );
}

export default Header;