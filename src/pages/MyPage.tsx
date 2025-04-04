import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";

import useAuthStore from '../zustand/store';

import Header from '../components/Header';
import UserDetailsView from '../components/UserDetailsView';

import imageIcon from '../assets/image.png';
import bookmarkIcon from '../assets/bookmark-small.png';
import userIcon from '../assets/users-small.png';
import settingsIcon from '../assets/settings-small.png';
import likeImageIcon from '../assets/like-black.png';
import imageWhiteIcon from '../assets/image-w.png';
import bookmarkWhiteIcon from '../assets/bookmark-w.png';
import userWhiteIcon from '../assets/user-w.png';
import settingsWhiteIcon from '../assets/settings-w.png';
import likeImageWhiteIcon from '../assets/like-w.png';
import FollowView from '../components/FollowView';
import BookmarkView from '../components/BookmarkView';
import LikeView from '../components/LikeView';
import MyPostView from '../components/MyPostView';

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
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100% - 80px);
`

const SideBar = styled.div`
    width: 300px;
    height: 100%;

    display: flex;
    flex-direction: column;

    box-shadow: 1px 2px 4px -1px rgba(0, 0, 0, 0.25);

    background-color: white;
`

const UserDetailsBox = styled.div`
    width:100%;
    aspect-ratio: 1/1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    margin-bottom: 20px;

    border-radius: 10px;
`

const Nickname = styled.div`
    font-size: 20px;
    font-weight: 700;
`

const Introduction = styled.div`
    margin-top: 5px;

    font-size: 16px;
    color: rgba(0, 0, 0, 0.4);
`

const SideBarMenuBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const MenuBox = styled.div`
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 7px;
    padding-right: 7px;
    width: calc(100% - 14px);
    height: calc(70px - 14px);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

const MenuItemBox = styled.div<{ selected: boolean }>`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;
    color:  ${({ selected }) => (selected ? 'white' : 'black')};
    background-color: ${({ selected }) => (selected ? 'black' : 'white')};
    border-radius: 7px;
    
    &:hover {
        background-color: ${({ selected }) => (selected ? 'black' : 'rgba(0,0,0,0.07)')};
    }    

    transition: all 0.2s ease-in-out;
`

const MenuIcon = styled.img`
    width: 40px;
    height: 40px;
    margin-left: 5%;
    `

const MenuText = styled.div`
    font-size: 16px;
    font-weight: 700;
`

const MainBox = styled.div`
    width: calc(100% - 300px);
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

type Menu = 'my' | 'like' | 'bookmark' | 'follow' | 'settings';

interface User {
    id: number | null;
    email: string | null;
    nickname: string | null;
    profileImage: string | null;
    introduction: string | null;
    singleWork: number | null;
    exhibition: number | null;
    follower: number | null;
    following: number | null;
    createdAt: string | null;
}

const MyPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user: User = useAuthStore.getState().user;
    const menu = location.state && location.state.menu ? location.state.menu : "my";

    const [selectedMenu, setSelectedMenu] = useState<Menu>(menu);

    useEffect(function authCheck() {
        if (!user.id) {
            navigate('/home');
        }
    }, [user]);

    const handleSelectedMenu = (menu: Menu) => {
        setSelectedMenu(menu);
    }



    return (
        <Container>
            <Header />

            <Body>

                <SideBar>
                    <UserDetailsBox>
                        <ProfileImage src={user.profileImage} />
                        <Nickname>{user.nickname}</Nickname>
                        <Introduction>{user.introduction ? user.introduction : '소개없음'}</Introduction>
                    </UserDetailsBox>

                    <SideBarMenuBox>
                        <MenuBox>
                            <MenuItemBox
                                onClick={() => handleSelectedMenu('my')}
                                selected={selectedMenu === 'my'}
                            >
                                <MenuIcon src={selectedMenu === 'my' ? imageWhiteIcon : imageIcon} />
                                <MenuText>내 작품</MenuText>

                            </MenuItemBox>

                        </MenuBox>
                        <MenuBox>
                            <MenuItemBox
                                onClick={() => handleSelectedMenu('like')}
                                selected={selectedMenu === 'like'}
                            >
                                <MenuIcon src={selectedMenu === 'like' ? likeImageWhiteIcon : likeImageIcon} />
                                <MenuText>좋아요 작품</MenuText>

                            </MenuItemBox>
                        </MenuBox>
                        <MenuBox>
                            <MenuItemBox
                                onClick={() => handleSelectedMenu('bookmark')}
                                selected={selectedMenu === 'bookmark'}
                            >
                                <MenuIcon src={selectedMenu === 'bookmark' ? bookmarkWhiteIcon : bookmarkIcon} />
                                <MenuText>저장된 전시회</MenuText>

                            </MenuItemBox>
                        </MenuBox>
                        <MenuBox>
                            <MenuItemBox
                                onClick={() => handleSelectedMenu('follow')}
                                selected={selectedMenu === 'follow'}
                            >
                                <MenuIcon src={selectedMenu === 'follow' ? userWhiteIcon : userIcon} />
                                <MenuText>팔로우 관리</MenuText>

                            </MenuItemBox>
                        </MenuBox>

                        <MenuBox>
                            <MenuItemBox
                                onClick={() => handleSelectedMenu('settings')}
                                selected={selectedMenu === 'settings'}
                            >
                                <MenuIcon src={selectedMenu === 'settings' ? settingsWhiteIcon : settingsIcon} />
                                <MenuText>계정설정</MenuText>

                            </MenuItemBox>
                        </MenuBox>
                    </SideBarMenuBox>



                </SideBar>

                <MainBox>
                    {selectedMenu === 'settings' &&
                        <UserDetailsView />
                    }
                    {selectedMenu === 'follow' &&
                        <FollowView />
                    }
                    {selectedMenu === 'bookmark' &&
                        <BookmarkView />
                    }
                    {selectedMenu === 'like' &&
                        <LikeView />
                    }
                    {selectedMenu === 'my' &&
                        <MyPostView />
                    }

                </MainBox>

            </Body>

        </Container>
    )
}

export default MyPage;