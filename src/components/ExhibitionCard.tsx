import styled from 'styled-components';
import ex3 from '../assets/ex3.jpg';
import bookmarkIcon from '../assets/bookmark.png';
import calendarIcon from '../assets/calendar.png';
import usersIcon from '../assets/users.png';
import heartIcon from '../assets/heart.png';
import viewIcon from '../assets/view.png';

const Container = styled.div`
    width: 380px;

    display: flex;
    flex-direction: column;

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
    background-color: #AF3D3D;
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

const ParticipantBox = styled.div`
margin-top: 10px;

display: flex;
flex-direction: row;
align-items: center;
`;

const ParticipantIcon = styled.img`
width: 20px;
height: 20px;
`;

const Participant = styled.div`
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



const ExhibitionCard = () => {
    return (
        <Container>
            <ExhibitionCardColor>
                <HitBox>

                    <LikeBox>
                        <LikeIcon src={heartIcon} />
                        <Like>605.7K</Like>
                    </LikeBox>

                    <ViewBox>
                        <ViewIcon src={viewIcon} />
                        <View>23K</View>
                    </ViewBox>

                </HitBox>
            </ExhibitionCardColor>

            <ExhibitionCardInfo>
                <InfoHeader>
                    <PhotographerProfile>
                        <PhotographerProfileImage src={ex3} alt='profile image'></PhotographerProfileImage>
                        <PhotographerInfo>
                            <PhotographerNickname>뚱이</PhotographerNickname>
                            <PhotographerIntro>아마추어 사진작가</PhotographerIntro>
                        </PhotographerInfo>
                    </PhotographerProfile>
                    <BookmarkIcon src={bookmarkIcon} />
                </InfoHeader>

                <Title>도시의 빛과 그림자</Title>
                <Description>현대 도시의 일상적 순간들을 포착한 흑백 사진전</Description>

                <DateBox>
                    <DataIcon src={calendarIcon} />
                    <Data>2024-01-25</Data>
                </DateBox>

                <ParticipantBox>
                    <ParticipantIcon src={usersIcon} />
                    <Participant>참여작가 10명</Participant>
                </ParticipantBox>

                <TagBox>
                    <Tag>고양이</Tag>
                    <Tag>살쾡이</Tag>
                    <Tag>바다코끼리</Tag>
                </TagBox>

            </ExhibitionCardInfo>

        </Container>
    )
}

export default ExhibitionCard;