import { useEffect, useState, useRef } from 'react';

import styled from 'styled-components';

import imageIcon from '../assets/image.png';
import bookmarkIcon from '../assets/bookmark-small.png';
import userIcon from '../assets/users-small.png';
import settingsIcon from '../assets/settings-small.png';
import logoutIcon from '../assets/logout-small.png';

const Container = styled.div`
    width: 300px;
    top: 50px;

    display: flex;
    flex-direction: column;

    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);

    position: absolute;

    background-color: white;
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

interface UserDetailsPanelProps {
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
    handleDisplay: () => void;
}

const UserDetailsPanel: React.FC<UserDetailsPanelProps> = (props) => {
    const { id, nickname, profileImage, introduction, singleWork, exhibition, follower, following, handleDisplay } = props;

    const userDetailsPanelRef = useRef<HTMLDivElement | null>(null);

    // 패널 외부 클릭 감지 후 닫기
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userDetailsPanelRef.current && !userDetailsPanelRef.current.contains(event.target as Node)) {
                handleDisplay();
            }
        }

        // 이벤트 리스너 등록
        document.addEventListener("mousedown", handleClickOutside);

        // 클린업 함수에서 이벤트 리스너 해제
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Container ref={userDetailsPanelRef}>
            <UserProfileBox>
                <ProfileImage src={profileImage} />
                <NicknameBox>
                    {nickname}
                </NicknameBox>

            </UserProfileBox>

            <UserStatBox>
                <StatBox>
                    <StatName>단일작품</StatName>
                    <StatValue>{singleWork}</StatValue>
                </StatBox>

                <StatBox>
                    <StatName>전시회</StatName>
                    <StatValue>{exhibition}</StatValue>
                </StatBox>

                <StatBox>
                    <StatName>팔로워</StatName>
                    <StatValue>{follower}</StatValue>
                </StatBox>

                <StatBox>
                    <StatName>팔로잉</StatName>
                    <StatValue>{following}</StatValue>
                </StatBox>

            </UserStatBox>

            <ItemBox>
                <Item>
                    <ItemIcon src={imageIcon} />
                    <ItemText>내 게시물</ItemText>
                </Item>

                <Item>
                    <ItemIcon src={bookmarkIcon} />
                    <ItemText>저장된 전시회</ItemText>
                </Item>
            </ItemBox>

            <ItemBox>
                <Item>
                    <ItemIcon src={userIcon} />
                    <ItemText>팔로우 관리</ItemText>
                </Item>
            </ItemBox>

            <ItemBox>
                <Item>
                    <ItemIcon src={settingsIcon} />
                    <ItemText>계정설정</ItemText>
                </Item>
            </ItemBox>

            <ItemBox>
                <Item>
                    <ItemIcon src={logoutIcon} />
                    <ItemText style={{ color: '#f50000' }}>로그아웃</ItemText>
                </Item>
            </ItemBox>

        </Container>
    )
};

export default UserDetailsPanel;