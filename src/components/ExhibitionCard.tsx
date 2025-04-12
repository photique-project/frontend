import { useState } from 'react';
import { styled, keyframes } from 'styled-components';

import useAuthStore from '../zustand/store';

import bookmarkIcon from '../assets/bookmark.png';
import calendarIcon from '../assets/calendar.png';
import heartIcon from '../assets/heart.png';
import viewIcon from '../assets/view.png';
import heartFillIcon from '../assets/heart-fill.png';
import bookmarkFillIcon from '../assets/bookmark-fill.png';
import DEFAULT from '../api/default';



const Container = styled.div`
    width: 380px;

    display: flex;
    flex-direction: column;

    position: relative;

    border: 0.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    box-sizing: border-box;
    background-color: white;

    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);

    transition: all 0.3s ease;

    &:hover {
        scale: 1.05;
    }
`

const ExhibitionCardColor = styled.div`
    width: 100%;
    height: 235px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    

    position: relative;
`;

const HitBox = styled.div`
    height: 40px;

    display: flex;
    flex-direction: row;
    align-items: center;

    border-radius: 30px;

    background-color: rgba(0, 0, 0, 0.6);

    position: absolute;
    top: 10px;
    right: 10px;

    gap: 15px;

    opacity: 0;
    transition: all 0.3s ease;

    ${Container}:hover & {
        opacity: 1;
    }
`

const LikeBox = styled.div`
    margin-left: 14px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 7px;
`

const LikeIcon = styled.img`
    width: 24px;
    height: 24px;
    opacity: 1;
`

const Like = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;

    font-size: 16px;
`

const ViewBox = styled.div`
    margin-right: 14px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 7px;
`

const ViewIcon = styled.img`
    width: 24px;
    height: 24px;
`

const View = styled.div`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;

    font-size: 16px;
`

const ExhibitionCardInfo = styled.div`
    width: calc(100% - 40px);
    padding: 20px;

    display: flex;
    flex-direction: column;
`;

const InfoHeader = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const PhotographerProfile = styled.div`
    display: flex;
    flex-direction: row;
`

const PhotographerProfileImage = styled.img`
    width: 40px;
    height: 40px;

    border-radius: 10px;
`

const PhotographerInfo = styled.div`
margin-left: 5px;

display: flex;
flex-direction: column;
justify-content: center;

`

const PhotographerNickname = styled.div`
font-size: 16px;
`

const PhotographerIntro = styled.div`
font-size: 14px;
color: rgba(0, 0, 0, 0.5);
`


const BookmarkIcon = styled.img`
width: 36px;
height: 36px;
`

const Title = styled.div`
margin-top: 20px;

font-size: 20px;
font-weight: 700;
`;

const Description = styled.div`
    margin-top: 10px;

    font-size: 16px;
    color: rgba(0, 0, 0, 0.7);
`;

const DateBox = styled.div`
    margin-top: 20px;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

const DataIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const Data = styled.div`
margin-left: 5px;

font-size: 16px;
color: rgba(0, 0, 0, 0.6);
`;

const TagBox = styled.div`
    margin-top: 20px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
`

const Tag = styled.div`
    padding: 5px 10px;

    border-radius: 8px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 14px;
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0.07);
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const MessageBox = styled.div`
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    border-radius: 10px;
    color: white;

    position: absolute;
    bottom: 100%;
    right: 100%;

    background-color: rgba(0, 0, 0, 0.3);

    opacity: 0;
    animation: ${fadeIn} 0.3s ease-in-out forwards;
`



interface Tag {
    name: string;
}

interface ExhibitionData {
    id: number;
    writer: {
        id: number;
        nickname: string;
        profileImage: string;
        introduction: string;
    }
    title: string;
    description: string;
    cardColor: string;
    likeCount: number;
    viewCount: number;
    tags: Tag[];
    createdAt: string;
    isLiked: boolean;
    isBookmarked: boolean;
}

interface ExhibitionCardProps {
    exhibitionData: ExhibitionData;
}



const ExhibitionCard: React.FC<ExhibitionCardProps> = (props) => {
    const user = useAuthStore.getState().user;
    const { exhibitionData } = props
    const [authModalDisplay, setAuthModalDisplay] = useState<boolean>(false);



    const handleNavigateToExhibitionDetail = () => {
        if (!user.id) {
            setAuthModalDisplay(true);

            setTimeout(() => {
                setAuthModalDisplay(false);
            }, 3000);
        } else {
            window.open(`/exhibitions/${exhibitionData.id}`, "_blank");
        }
    }

    return (
        <Container onClick={handleNavigateToExhibitionDetail}>
            {authModalDisplay && <MessageBox>로그인이 필요합니다</MessageBox>}

            <ExhibitionCardColor style={{ backgroundColor: exhibitionData.cardColor }}>
                <HitBox>

                    <LikeBox>
                        <LikeIcon src={exhibitionData.isLiked ? heartFillIcon : heartIcon} alt='like' />
                        <Like>{exhibitionData.likeCount}</Like>
                    </LikeBox>

                    <ViewBox>
                        <ViewIcon src={viewIcon} alt='view' />
                        <View>{exhibitionData.viewCount}</View>
                    </ViewBox>

                </HitBox>
            </ExhibitionCardColor>

            <ExhibitionCardInfo>
                <InfoHeader>
                    <PhotographerProfile>
                        <PhotographerProfileImage src={exhibitionData.writer.profileImage ? exhibitionData.writer.profileImage : DEFAULT.profileImage} alt='profile image'></PhotographerProfileImage>
                        <PhotographerInfo>
                            <PhotographerNickname>{exhibitionData.writer.nickname}</PhotographerNickname>
                            <PhotographerIntro>{exhibitionData.writer.introduction}</PhotographerIntro>
                        </PhotographerInfo>
                    </PhotographerProfile>
                    <BookmarkIcon src={exhibitionData.isBookmarked ? bookmarkFillIcon : bookmarkIcon} alt='bookmark' />
                </InfoHeader>

                <Title>{exhibitionData.title}</Title>
                <Description>{exhibitionData.description}</Description>

                <DateBox>
                    <DataIcon src={calendarIcon} />
                    <Data>{exhibitionData.createdAt}</Data>
                </DateBox>

                <TagBox>
                    {exhibitionData.tags.map((tag, index) => (
                        <Tag
                            key={index}
                        >
                            {tag.name}
                        </Tag>
                    ))}
                </TagBox>

            </ExhibitionCardInfo>

        </Container>
    )
}

export default ExhibitionCard;