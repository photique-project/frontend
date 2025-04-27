import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import useFetch from '../hooks/useFetch';
import { FetchRequestOptions } from '../types/http';
import Loader from './Loader';

import imageIcon from '../assets/image.png';
import bookmarkIcon from '../assets/bookmark-small.png';
import userIcon from '../assets/users-small.png';
import settingsIcon from '../assets/settings-small.png';
import logoutIcon from '../assets/logout-small.png';
import likeImageIcon from '../assets/like-black.png';
import ENDPOINTS from '../api/endpoints';
import DEFAULT from '../api/default';
import formatNumber from '../utils/converter';

const slideFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
    width: 300px;
    top: 50px;

    display: flex;
    flex-direction: column;

    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);

    /* position: absolute; */

    background-color: white;

    animation: ${slideFadeIn} 0.7s ease;
`
const UserProfileBox = styled.div`
    padding: 12px;
    width: calc(100%-24px);

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`;

const ProfileImage = styled.img`
    width: 60px;
    height: 60px;
    
    border-radius: 5px;
`;

const NicknameBox = styled.div`
    font-size: 20px;
    font-weight: 700;
`

const UserStatBox = styled.div`
    margin-top:10px;
    padding: 12px;
    width: calc(100%-24px);

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const StatBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap:5px;
`

const StatName = styled.div`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
`

const StatValue = styled.div`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
`

const ItemBox = styled.div`
    padding: 5px;
    width: calc(100% - 10px);

    border-top: 0.5px solid rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
`

const Item = styled.div`
    padding: 8px;
    width: calc(100% - 16px);
    height: calc(51px - 16px);

    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 3px;

    gap: 10px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

const ItemIcon = styled.img`
    width: 30px;
    height: 30px;
`

const ItemText = styled.div`

`

interface UserDetails {
    id: number,
    email: string,
    nickname: string,
    profileImage: string,
    introduction: string,
    singleWork: number,
    exhibition: number,
    follower: number,
    following: number,
    createdAt: string
}

interface UserDetailsPanelProps {
    id: number;
    handleLogout: () => void;
}

const UserDetailsPanel: React.FC<UserDetailsPanelProps> = (props) => {
    const { id, handleLogout } = props;
    const navigate = useNavigate();

    // 유저 상세 데이터
    const [userDetails, setUserDetails] = useState<UserDetails>();

    const {
        loading: userDetailsLoading,
        statusCode: userDetailsStatusCode,
        data: userDetailsData,
        fetchRequest: userDetailsFetchRequest
    } = useFetch<UserDetails>();

    const handleUserDetailsRequest = () => {
        const method = ENDPOINTS.USER.GET_DETAILS.METHOD;
        const url = ENDPOINTS.USER.GET_DETAILS.URL(id, 0);

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json'
        }

        userDetailsFetchRequest(options);
    }

    useEffect(function handleUserDetailsRequestEffect() {
        handleUserDetailsRequest();
    }, []);

    useEffect(function handleUserDetailsResponseEffect() {
        if (userDetailsStatusCode == 200 && userDetailsData) {
            setUserDetails(userDetailsData);
            return;
        }

        if (userDetailsStatusCode == 401) {
            handleLogout();
            return;
        }

        if (userDetailsStatusCode == 404) {
            return;
        }

        if (userDetailsStatusCode == 500) {
            return;
        }

    }, [userDetailsStatusCode, userDetailsData]);

    const handleNavigateToMyPage = (menu: string) => {
        navigate("/mypage", { state: { menu: menu } });
    }

    return (
        <Container>
            {userDetailsLoading &&
                <Loader fontColor='black' />
            }
            {!userDetailsLoading && userDetails &&
                <>
                    <UserProfileBox>
                        <ProfileImage src={userDetails.profileImage ? userDetails.profileImage : DEFAULT.profileImage} />
                        <NicknameBox>
                            {userDetails.nickname}
                        </NicknameBox>

                    </UserProfileBox>

                    <UserStatBox>
                        <StatBox>
                            <StatName>단일작품</StatName>
                            <StatValue>{formatNumber(userDetails.singleWork)}</StatValue>
                        </StatBox>

                        <StatBox>
                            <StatName>전시회</StatName>
                            <StatValue>{formatNumber(userDetails.exhibition)}</StatValue>
                        </StatBox>

                        <StatBox>
                            <StatName>팔로워</StatName>
                            <StatValue>{formatNumber(userDetails.follower)}</StatValue>
                        </StatBox>

                        <StatBox>
                            <StatName>팔로잉</StatName>
                            <StatValue>{formatNumber(userDetails.following)}</StatValue>
                        </StatBox>

                    </UserStatBox>

                    <ItemBox>
                        <Item onClick={() => handleNavigateToMyPage('my')}>
                            <ItemIcon src={imageIcon} />
                            <ItemText>내 작품</ItemText>
                        </Item>

                        <Item onClick={() => handleNavigateToMyPage('like')}>
                            <ItemIcon src={likeImageIcon} />
                            <ItemText>좋아요 작품</ItemText>
                        </Item>

                        <Item onClick={() => handleNavigateToMyPage('bookmark')}>
                            <ItemIcon src={bookmarkIcon} />
                            <ItemText>저장된 전시회</ItemText>
                        </Item>
                    </ItemBox>

                    <ItemBox>
                        <Item onClick={() => handleNavigateToMyPage('follow')}>
                            <ItemIcon src={userIcon} />
                            <ItemText>팔로우 관리</ItemText>
                        </Item>
                    </ItemBox>

                    <ItemBox>
                        <Item onClick={() => handleNavigateToMyPage('settings')}>
                            <ItemIcon src={settingsIcon} />
                            <ItemText>계정설정</ItemText>
                        </Item>
                    </ItemBox>

                    <ItemBox onClick={handleLogout}>
                        <Item>
                            <ItemIcon src={logoutIcon} />
                            <ItemText style={{ color: '#f50000' }}>로그아웃</ItemText>
                        </Item>
                    </ItemBox>
                </>
            }

        </Container>
    )
};

export default UserDetailsPanel;