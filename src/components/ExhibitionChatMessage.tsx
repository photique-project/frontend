import styled from 'styled-components';

import ex1 from '../assets/ex1.jpg';

const Container = styled.div<{ me: boolean }>`
    width: 100%;
    
    display: flex;
    flex-direction: row;
    justify-content: ${({ me }) => (me ? 'end' : 'start')};
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

const CenterBox = styled.div<{ me: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: ${({ me }) => (me ? 'flex-end' : 'flex-start')};
    
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

    white-space: pre-wrap;
    word-break: break-word;
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

const JoinMessage = styled.div`
    margin-top: 20px;
    width: 100%;

    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

interface Chat {
    type: 'JOIN' | 'LEAVE' | 'CHAT';
    me: boolean;
    userId: number;
    nickname: string;
    profileImage: string;
    content: string;
    createdAt: string;
}

interface ExhibitionChatMessageProps {
    chatData: Chat
}

const ExhibitionChatMessage: React.FC<ExhibitionChatMessageProps> = (props) => {
    const { chatData } = props;


    return (
        <>
            <Container me={chatData.me}>
                {chatData.type === 'CHAT' &&
                    <>
                        {!chatData.me ?
                            <>
                                <LeftBox>
                                    <ProfileImage src={ex1} />
                                </LeftBox>

                                <CenterBox me={chatData.me}>
                                    <Nickname>{chatData.nickname}</Nickname>
                                    <Message>{chatData.content}</Message>
                                </CenterBox>

                                <RightBox>
                                    <Time>{chatData.createdAt}</Time>
                                </RightBox>
                            </>
                            :
                            <>
                                <RightBox>
                                    <Time>{chatData.createdAt}</Time>
                                </RightBox>

                                <CenterBox me={chatData.me}>
                                    <Nickname>{chatData.nickname}</Nickname>
                                    <Message>{chatData.content}</Message>
                                </CenterBox>

                                <LeftBox>
                                    <ProfileImage src={ex1} />
                                </LeftBox>
                            </>
                        }

                    </>
                }
                {chatData.type === 'JOIN' &&

                    <JoinMessage>{chatData.nickname}님이 입장하셨습니다</JoinMessage>

                }

                {chatData.type === 'LEAVE' &&

                    <JoinMessage>{chatData.nickname}님이 퇴장하셨습니다</JoinMessage>

                }
            </Container>
        </>
    )
}

export default ExhibitionChatMessage;