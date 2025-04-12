import { useState, useEffect } from "react";
import styled from "styled-components";

import { FetchRequestOptions } from "../types/http";
import ENDPOINTS from "../api/endpoints";
import useFetch from "../hooks/useFetch";
import useAuthStore from "../zustand/store";
import SearchUserDetailsModal from "./SearchUserDetailsModal";

import moveIcon from '../assets/move-black.png';
import userPlusIcon from '../assets/user-plus.png';
import userCheckIcon from '../assets/user-check.png';
import DEFAULT from "../api/default";



const Container = styled.div`
    padding: 20px;
    width: calc(100% - 40px);

    display: flex;
    flex-direction: row;

    position: relative;

    justify-content: space-between;

    border-radius: 10px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.03);
    }
`

const SearchUserInfo = styled.div`
    display: flex;
    flex-direction: row;

    gap: 15px;
`

const SearchUserProfileImage = styled.img`
    width: 60px;
    height: 60px;

    border-radius: 7px;
`

const SearchUserTextBox = styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 7px;
`

const SearchUserNickname = styled.div`
    font-size: 20px;
    font-weight: 700;
`

const SearchUserIntroduction = styled.div`
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
`

const SearchUserButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
`

const OpenDatailsButton = styled.button`
    padding-left: 20px;
    padding-right: 20px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    font-size: 16px;
    font-weight: 700;

    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: white;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`

const OpenDetailsIcon = styled.img`
    width: 24px;
    height: 24px;
`

const FollowButton = styled.button<{ isFollowing: boolean }>`
    padding-left: 20px;
    padding-right: 20px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

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

const ModalBackground = styled.div`
    width: 100vw;
    height: 100vh;

    position: fixed;
    left: 0;
    top: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    z-index: 999;

    background-color: rgba(0, 0, 0, 0.7);
`



interface SearchUser {
    id: number;
    nickname: string;
    introduction: string;
    profileImage: string;
    isFollowing: boolean;
}

interface SearchUserCardProps {
    searchUser: SearchUser;
}



const SearchUserCard: React.FC<SearchUserCardProps> = (props) => {
    const [searchUser, setSearchUser] = useState<SearchUser>(props.searchUser);
    const user = useAuthStore.getState().user;

    // 외부에 전달할 때 index값이 바뀌지 않아서 이전 그대로 렌더링해버림
    // 그래서 동기화 코드 삽입
    useEffect(() => {
        setSearchUser(props.searchUser);
    }, [props.searchUser]);

    // 유저상세조회
    const [searchUserDetailsDisplay, setSearchUserDetailsDisplay] = useState<boolean>(false);

    const handleSearchUserDetailsDisplay = () => {
        setSearchUserDetailsDisplay(!searchUserDetailsDisplay);
    }

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
        const method = searchUser.isFollowing ? 'DELETE' : 'POST';
        const request = searchUser.isFollowing ? unfollowRequest : followRequest;

        const requestBody = {
            followingId: searchUser.id,
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
                setSearchUser(prev => ({
                    ...prev,
                    isFollowing: true,
                }));
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
                setSearchUser(prev => ({
                    ...prev,
                    isFollowing: false,
                }));
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

    const handleSearchUserCardFollow = (isFollowing: boolean) => {
        setSearchUser(prev => ({
            ...prev,
            isFollowing: isFollowing,
        }));
    }


    return (
        <Container>
            <SearchUserInfo>
                <SearchUserProfileImage src={searchUser.profileImage ? searchUser.profileImage : DEFAULT.profileImage} />
                <SearchUserTextBox>
                    <SearchUserNickname>{searchUser.nickname}</SearchUserNickname>
                    <SearchUserIntroduction>{searchUser.introduction}</SearchUserIntroduction>
                </SearchUserTextBox>

            </SearchUserInfo>

            <SearchUserButtonBox>
                <OpenDatailsButton onClick={handleSearchUserDetailsDisplay}>
                    <OpenDetailsIcon src={moveIcon} />
                    상세보기
                </OpenDatailsButton>

                <FollowButton
                    onClick={handleFollowRequest}
                    isFollowing={searchUser.isFollowing}
                >
                    <FollowIcon src={searchUser.isFollowing ? userCheckIcon : userPlusIcon} alt='follow' />
                    팔로우
                </FollowButton>

            </SearchUserButtonBox>


            {searchUserDetailsDisplay &&
                <ModalBackground>
                    <SearchUserDetailsModal
                        handleClose={handleSearchUserDetailsDisplay}
                        userId={searchUser.id}
                        handleSearchUserCardFollow={handleSearchUserCardFollow}
                    />
                </ModalBackground>
            }

        </Container>
    )
}

export default SearchUserCard;