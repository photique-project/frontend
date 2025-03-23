import { useState } from 'react';
import styled, { keyframes } from "styled-components";

import useAuthStore from "../zustand/store";

import SearchUserCard from "./SearchUserCard";

import seachIcon from '../assets/search-white.png';



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

    background-color: white;

    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
`



type SearchOptionType = 'all' | 'follower' | 'following';

interface SearchUser {
    id: number;
    nickname: string;
    introduction: string;
    profileImage: string;
    isFollowing: boolean;
}



const FollowView = () => {
    const [selectedSearchOption, setSelectedSearchOption] = useState<SearchOptionType>('all');

    const handleSelectedSearchOption = (searchOption: SearchOptionType) => {
        setSelectedSearchOption(searchOption);
    }

    const temp: SearchUser = {
        id: useAuthStore.getState().user.id,
        nickname: useAuthStore.getState().user.nickname,
        introduction: useAuthStore.getState().user.introduction,
        profileImage: useAuthStore.getState().user.profileImage,
        isFollowing: false,
    }

    return (
        <Container>
            <FollowViewHeader>

                <Title>작가 검색</Title>

                <UserSearchBox>
                    <UserSearchInputBox>
                        <SearchIcon src={seachIcon} />
                        <SearchInput placeholder="닉네임 검색" />

                    </UserSearchInputBox>

                    <SearchButton>검색</SearchButton>
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

                <SearchUserCard searchUser={
                    temp
                } />

            </UserListBox>

        </Container>
    )
}

export default FollowView;