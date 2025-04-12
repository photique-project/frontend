import styled, { keyframes } from "styled-components";
import { useState, useEffect } from 'react';


import ENDPOINTS from '../api/endpoints';
import { FetchRequestOptions } from "../types/http";
import useFetch from "../hooks/useFetch";
import useAuthStore from "../zustand/store";

import MessageBox from "./MessageBox";

import closeIcon from '../assets/close-large.png'
import userPlusIcon from '../assets/user-plus.png';
import userCheckIcon from '../assets/user-check.png';
import loadingIcon from '../assets/loading-large.png';
import DEFAULT from "../api/default";



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
    padding: 40px;
    width: 500px;

    background-color: white;
    border-radius: 15px;

    animation: ${slideFadeIn} 0.4s ease;
`

const Header = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.h2`
    margin: 0;
`

const CloseIcon = styled.img`
    width: 36px;
    height: 36px;
    cursor: pointer;
`

const Body = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const ProfileImage = styled.img`
    margin-top: 20px;
    width: 200px;
    height: 200px;   

    border-radius: 15px;
`

const Nickname = styled.strong`
    margin-top: 20px;
    font-size: 24px;
`

const Introduction = styled.p`
    color: rgba(0, 0, 0, 0.6);
`

const Stats = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
    border-top: 2px solid rgba(0, 0, 0, 0.1);
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`

const StatBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`

const Value = styled.strong`
    
`

const Text = styled.div`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.4);
    font-weight: 500;
`

const FollowButton = styled.button<{ isFollowing: boolean }>`
    margin-top: 40px;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    position: relative;

    font-size: 16px;
    font-weight: 700;

    border: none;
    border-radius: 10px;
    background-color: ${({ isFollowing }) => isFollowing ? "white" : "black"};
    color: ${({ isFollowing }) => isFollowing ? "black" : "white"};

    &:hover {
        background-color: ${({ isFollowing }) => isFollowing ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.7)"};
    }
`

const FollowIcon = styled.img`
    width: 24px;
    height: 24px;
`

const LoadingBox = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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




interface UserDetailsData {
    id: number,
    email: string;
    nickname: string;
    profileImage: string;
    introduction: string;
    singleWork: number;
    exhibition: number;
    follower: number;
    following: number;
    createdAt: string;
    isFollowing: boolean;
}

interface SearchUserDetailsModalProps {
    handleClose: () => void;
    userId: number;
    handleSearchUserCardFollow: (isFollowing: boolean) => void;
}



const SearchUserDetailsModal: React.FC<SearchUserDetailsModalProps> = (props) => {
    const { handleClose, userId, handleSearchUserCardFollow } = props;
    const user = useAuthStore.getState().user;

    const [userDetails, setUserDetails] = useState<UserDetailsData>(null);

    // 유저데이터
    const {
        loading: userDetailsLoading,
        statusCode: userDetailsStatusCode,
        data: userDetailsData,
        fetchRequest: userDetailsRequest
    } = useFetch<UserDetailsData>();

    const handleUserDetailsRequest = () => {
        const method = ENDPOINTS.USER.GET_DETAILS.METHOD;
        const url = ENDPOINTS.USER.GET_DETAILS.URL;

        const options: FetchRequestOptions = {
            url: url(userId, user.id),
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        userDetailsRequest(options);
    }

    useEffect(function handleInitUserDetailsRequest() {
        handleUserDetailsRequest();
    }, []);

    useEffect(function handleUserDetailsResponse() {
        if (userDetailsStatusCode == 200) {
            setUserDetails(userDetailsData);
            return;
        }

        if (userDetailsStatusCode == 401) {
            return;
        }

        if (userDetailsStatusCode == 404) {
            return;
        }

        if (userDetailsStatusCode == 500) {
            return;
        }
    }, [userDetailsData])

    // 팔로우 요청
    const {
        loading: followLoading,
        statusCode: followStatusCode,
        fetchRequest: followRequest
    } = useFetch<void>();

    const {
        loading: unfollowLoading,
        statusCode: unfollowStatusCode,
        fetchRequest: unfollowRequest
    } = useFetch<void>();

    const handleFollowRequest = () => {
        const method = userDetails.isFollowing ? 'DELETE' : 'POST';
        const request = userDetails.isFollowing ? unfollowRequest : followRequest;

        const requestBody = {
            followingId: userDetails.id,
        }

        const url = ENDPOINTS.USER.FOLLOW.URL;

        const options: FetchRequestOptions = {
            url: url(user.id),
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

    useEffect(function handleFollowResponse() {
        if (followStatusCode) {
            if (followStatusCode == 201) {
                handleSearchUserCardFollow(true);
                handleUserDetailsRequest();
                return;
            }

            if (followStatusCode == 401) {
                return;

            }

            if (followStatusCode == 403) {
                return;
            }

            if (followStatusCode == 404) {
                return;
            }

            if (followStatusCode == 409) {
                return;
            }

            if (followStatusCode == 500) {
                return;
            }
        }
    }, [followStatusCode])


    useEffect(function handleUnfollowResponse() {
        if (unfollowStatusCode) {
            if (unfollowStatusCode == 204) {
                handleSearchUserCardFollow(false);
                handleUserDetailsRequest();
                return;
            }

            if (unfollowStatusCode == 401) {

                return;
            }

            if (unfollowStatusCode == 403) {
                return;
            }

            if (unfollowStatusCode == 404) {
                return;
            }

            if (unfollowStatusCode == 500) {
                return;
            }
        }
    }, [unfollowStatusCode])


    return (
        <Container>
            <Header>
                <Title>작가 정보</Title>
                <CloseIcon src={closeIcon} alt='user modal close' onClick={handleClose} />
            </Header>

            <Body>
                {userDetailsLoading &&
                    <LoadingBox>
                        <LoadingIcon src={loadingIcon} />


                    </LoadingBox>
                }
                {userDetails &&
                    <>
                        <ProfileImage src={userDetails.profileImage ? userDetails.profileImage : DEFAULT.profileImage} />
                        <Nickname>{userDetails.nickname}</Nickname>
                        <Introduction>{userDetails.introduction}</Introduction>

                        <Stats>
                            <StatBox>
                                <Value>{userDetails.singleWork}</Value>
                                <Text>단일작품</Text>
                            </StatBox>

                            <StatBox>
                                <Value>{userDetails.exhibition}</Value>
                                <Text>전시회</Text>
                            </StatBox>

                            <StatBox>
                                <Value>{userDetails.follower}</Value>
                                <Text>팔로워</Text>
                            </StatBox>

                            <StatBox>
                                <Value>{userDetails.following}</Value>
                                <Text>팔로잉</Text>
                            </StatBox>
                        </Stats>

                        <FollowButton
                            onClick={handleFollowRequest}
                            isFollowing={userDetails.isFollowing}
                        >
                            <FollowIcon src={userDetails.isFollowing ? userCheckIcon : userPlusIcon} alt='follow' />

                            {userDetails.isFollowing ? '팔로잉' : '팔로우'}

                        </FollowButton>

                    </>
                }
            </Body>

        </Container>
    )
}

export default SearchUserDetailsModal;