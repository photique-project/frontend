import styled from 'styled-components';

import ex1 from '../assets/ex1.jpg';

const Container = styled.div`
    width: 100%;
    
    display: flex;
    flex-direction: row;

    gap: 10px;
`

const LeftBox = styled.div`
    display: flex;
    flex-direction: column;
`

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;

    border-radius: 5px;
`

const CenterBox = styled.div`
    display: flex;
    flex-direction: column;

    gap: 5px;
`

const Nickname = styled.div`
    font-size: 16px;
    color:white;
`

const Message = styled.div`
    // 최대넓이를 넘어가면 줄바꿈 해야함
    padding: 12px;

    display: flex;
    flex-direction: column;

    background-color: white;
    border-radius: 5px;
    font-size: 16px;
`



const RightBox = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: end;
`

const Time = styled.div`
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
`


const ExhibitionChatMessage = () => {
    return (
        <Container>
            <LeftBox>
                <ProfileImage src={ex1} />
            </LeftBox>

            <CenterBox>
                <Nickname>닉네임</Nickname>

                <Message>임시 메시지입니다.

                </Message>
            </CenterBox>

            <RightBox>
                <Time>오후 1:28</Time>
            </RightBox>
        </Container>
    )
}

export default ExhibitionChatMessage;