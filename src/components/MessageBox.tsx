import styled from 'styled-components';

const Container = styled.div<{ left: string, right: string, top: string, bottom: string }>`
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    border-radius: 10px;
    color: white;

    position: absolute;
    left: ${({ left }) => left};
    right: ${({ right }) => right};
    top: ${({ top }) => top};
    bottom: ${({ bottom }) => bottom};

    background-color: rgba(0, 0, 0, 0.3);

    opacity: 1;
    transition: opacity 0.3s ease-in-out;
 
`

interface MessageBoxProps {
    left: string;
    right: string;
    top: string;
    bottom: string;
    message: string;
}


const MessageBox: React.FC<MessageBoxProps> = (props) => {
    const { left, right, top, bottom, message } = props;
    // {singleWork.isFollowing ? '현재 팔로우하고 있는 작가입니다' : '팔로우 요청하고 작가의 소식을 받아보세요 !'}

    return (
        <Container
            left={left}
            right={right}
            top={top}
            bottom={bottom}
        >
            {message}
        </Container>
    )
}

export default MessageBox;