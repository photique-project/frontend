import { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";

import useFetch from '../hooks/useFetch';
import useAuthStore from "../zustand/store";
import ENDPOINTS from '../api/endpoints';
import { FetchRequestOptions } from '../types/http';

import SearchUserCard from "./SearchUserCard";

import seachIcon from '../assets/search-white.png';
import loadingIcon from '../assets/loading-large.png';



const Container = styled.div`
    width: 60%;
    height: 100%;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const FollowViewHeader = styled.div`
    margin-top: 40px;
    padding: 40px;
    width: calc(100% - 80px);

    display: flex;
    flex-direction: column;
    
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: white;

    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
`

const Title = styled.div`
    width: 100%;

    font-size: 24px;
    font-weight: 700;
`

const UserSearchBox = styled.div`
    margin-top: 20px;
    width: 100%;

    display: flex;
    flex-direction: row;

    gap: 10px;
`

const UserSearchInputBox = styled.div`
    width: 100%;

    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const SearchIcon = styled.img`
    margin-left: 13px;
    width: 24px;
    height: 24px;

    position: absolute;
`

const SearchInput = styled.input`
    padding-left: 50px;
    padding-right: 12px;
    width: calc(100% - 62px);
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

const SearchButton = styled.button`
    width: 80px;
    height: 100%;

    font-size: 16px;
    font-weight: 700;
    color:white;

    border-radius: 7px;
    
    background-color: black;

    cursor: pointer;


    &:hover {
        background-color: rgba(0, 0, 0, 0.6);
    }
`

const SearchOptionBox = styled.div`
    margin-top: 5px;
    padding: 4px;

    display: flex;
    flex-direction: row;

    border-radius: 5px;
    gap: 4px;
`

const SearchOption = styled.div<{ isSelected: boolean }>`
    width: 80px;
    height: 30px;

    display: flex;
    
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 7px;
    font-size: 16px;

    color: ${({ isSelected }) => (isSelected ? 'white' : 'black')};
    background-color: ${({ isSelected }) => (isSelected ? 'black' : 'white')};

    transition: all 0.2s ease-in-out;

    cursor: pointer;
`

const UserListBox = styled.div`
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    margin-top: 20px;
    padding: 40px;
    width: calc(100% - 80px);

    display: flex;
    flex-direction: column;
    position: relative;

    background-color: white;

    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
`

const LoadingBox = styled.div`
    width: 100%;
    aspect-ratio: 1/1;

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


type SearchOptionType = 'all' | 'follower' | 'following';

interface SearchUserData {
    id: number;
    nickname: string;
    introduction: string;
    profileImage: string;
    isFollowing: boolean;
}

interface SearchUserDataPage {
    content: SearchUserData[];
    pageable: {
        pageNumber: number;
    }
    last: boolean;
}



const FollowView = () => {
    const [selectedSearchOption, setSelectedSearchOption] = useState<SearchOptionType>('all');
    const [searchUsers, setSearchUsers] = useState<SearchUserData[]>([]);
    const user = useAuthStore.getState().user;

    // 닉네임 검색
    const [nicknameInput, setNicknameInput] = useState<string>('');

    const handleNicknameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.substring(0, 11);
        setNicknameInput(input);
    }

    const handleSelectedSearchOption = (searchOption: SearchOptionType) => {
        setSelectedSearchOption(searchOption);
    }

    useEffect(function handleSearchUserDataPageRequest() {
        handleSearchUserDatePageRequest();
    }, [selectedSearchOption])

    // 유저검색
    const {
        loading: searchUserDataPageLoading,
        statusCode: searchUserDataPageStatusCode,
        data: searchUserDataPage,
        fetchRequest: searchUserDataPageRequest
    } = useFetch<SearchUserDataPage>();

    const handleSearchUserDatePageRequest = async (page: number = 0) => {
        const method = ENDPOINTS.USER.SEARCH.METHOD;
        const url = selectedSearchOption === 'all' ? ENDPOINTS.USER.SEARCH.URL(nicknameInput, `createdAt,desc`, page, 1000000, user.id ? user.id : 0) : selectedSearchOption === 'follower' ? ENDPOINTS.USER.GET_FOLLOWERS.URL(user.id) : ENDPOINTS.USER.GET_FOLLOWINGS.URL(user.id);

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        await searchUserDataPageRequest(options);
    }

    useEffect(function handleSearchUserDataPageResponse() {
        if (searchUserDataPageStatusCode == 200 && searchUserDataPage) {
            setSearchUsers(searchUserDataPage.content)
            return;
        }

        if (searchUserDataPageStatusCode == 404) {
            setSearchUsers([]);
            return;
        }

    }, [searchUserDataPageStatusCode, searchUserDataPage]);



    return (
        <Container>
            <FollowViewHeader>

                <Title>작가 검색</Title>

                <UserSearchBox>
                    <UserSearchInputBox>
                        <SearchIcon src={seachIcon} />
                        <SearchInput
                            placeholder="닉네임 검색"
                            value={nicknameInput}
                            onChange={handleNicknameInputChange}
                        />

                    </UserSearchInputBox>

                    <SearchButton onClick={() => handleSearchUserDatePageRequest()}>검색</SearchButton>
                </UserSearchBox>


                <SearchOptionBox>
                    <SearchOption
                        isSelected={selectedSearchOption === 'all'}
                        onClick={() => handleSelectedSearchOption('all')}
                    >
                        전체
                    </SearchOption>

                    <SearchOption
                        isSelected={selectedSearchOption === 'follower'}
                        onClick={() => handleSelectedSearchOption('follower')}
                    >
                        내 팔로워
                    </SearchOption>

                    <SearchOption
                        isSelected={selectedSearchOption === 'following'}
                        onClick={() => handleSelectedSearchOption('following')}
                    >
                        내 팔로잉
                    </SearchOption>
                </SearchOptionBox>


            </FollowViewHeader>

            <UserListBox>
                {/* 전체일 때 */}
                {!searchUserDataPageLoading && searchUserDataPageStatusCode !== 404 && searchUserDataPage &&
                    <>
                        {selectedSearchOption === 'all' &&
                            searchUsers.map((searchUser, index) => (
                                <SearchUserCard
                                    key={searchUser.id}
                                    searchUser={searchUser}
                                />
                            ))
                        }
                        {/* 내 팔로워 */}
                        {selectedSearchOption === 'follower' &&
                            searchUsers.map((searchUser, index) => (
                                <SearchUserCard
                                    key={searchUser.id}
                                    searchUser={searchUser}
                                />
                            ))
                        }
                        {/* 내 팔로잉 */}
                        {selectedSearchOption === 'following' &&
                            searchUsers.map((searchUser, index) => (
                                <SearchUserCard
                                    key={searchUser.id}
                                    searchUser={searchUser}
                                />
                            ))
                        }
                    </>
                }

                {/* Not Found처리랑 로딩 처리할 차례 */}
                {searchUserDataPageLoading &&
                    <LoadingBox>
                        <LoadingIcon src={loadingIcon} />
                    </LoadingBox>
                }
                {!searchUserDataPageLoading && searchUserDataPageStatusCode === 404 &&
                    <LoadingBox>
                        검색결과가 없습니다
                    </LoadingBox>
                }
            </UserListBox>

        </Container>
    )
}

export default FollowView;