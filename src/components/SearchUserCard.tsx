import { useState } from "react";
import styled, { keyframes } from "styled-components";

import useAuthStore from "../zustand/store";
import SearchUserDetailsModal from "./SearchUserDetailsModal";

import moveIcon from '../assets/move-black.png';
import userPlusIcon from '../assets/user-plus.png';
import userCheckIcon from '../assets/user-check.png';



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

const FollowButton = styled.button`
    padding-left: 20px;
    padding-right: 20px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    font-size: 16px;
    font-weight: 700;

    color: white;

    border: none;
    border-radius: 10px;
    background-color: black;

    &:hover {
        background-color: rgba(0, 0, 0, 0.5);
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
    const { searchUser } = props;

    // 유저상세조회
    const [searchUserDetailsDisplay, setSearchUserDetailsDisplay] = useState<boolean>(false);

    const handleSearchUserDetailsDisplay = () => {
        setSearchUserDetailsDisplay(!searchUserDetailsDisplay);
    }

    return (
        <Container>
            <SearchUserInfo>
                <SearchUserProfileImage src={searchUser.profileImage} />
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

                <FollowButton>
                    <FollowIcon src={userPlusIcon} />
                    팔로우
                </FollowButton>

            </SearchUserButtonBox>



            {searchUserDetailsDisplay &&
                <ModalBackground>
                    <SearchUserDetailsModal
                        handleClose={handleSearchUserDetailsDisplay}
                        userId={2}
                        isFollowing={false}
                    />
                </ModalBackground>
            }

        </Container>
    )
}

export default SearchUserCard;