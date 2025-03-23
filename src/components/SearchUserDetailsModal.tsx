import styled, { keyframes } from "styled-components";

import ENDPOINTS from '../api/endpoints';
import { FetchRequestOptions } from "../types/http";
import useFetch from "../hooks/useFetch";

import closeIcon from '../assets/close-large.png'
import useAuthStore from "../zustand/store";



const Container = styled.div`
    padding: 40px;
    width: 500px;

    background-color: white;
`

const Header = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.h1`
    margin: 0;
`

const CloseIcon = styled.img`
    width: 40px;
    height: 40px;
    cursor: pointer;
`

const Body = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
`

const ProfileImage = styled.img`
    
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
}

interface SearchUserDetailsModalProps {
    handleClose: () => void;
    userId: number;
    isFollowing: boolean;
}



const SearchUserDetailsModal: React.FC<SearchUserDetailsModalProps> = (props) => {
    const { handleClose, userId, isFollowing } = props;
    const user = useAuthStore.getState().user;

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
    }

    return (
        <Container>
            <Header>
                <Title>작가 정보</Title>
                <CloseIcon src={closeIcon} alt='user modal close' onClick={handleClose} />
            </Header>

            <Body>
                <ProfileImage />
            </Body>

        </Container>
    )
}

export default SearchUserDetailsModal;