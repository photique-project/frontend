import styled from 'styled-components';

import commentMenuIcon from '../assets/comment-menu.png';
import profileImage from '../assets/ex1.jpg';
import blackHeartIcon from '../assets/black-heart.png';


const Container = styled.div`
    width: 100%;
    
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const CommentWriterProfileImage = styled.img`
    width: 40px;
    height: 40px;

    border-radius: 7px;

    @media (max-width: 768px) {
            width: 30px;
            height: 30px;
    }
`

const CommentBodyBox = styled.div`
    width: calc(100% - 40px);
    display: flex;
    flex-direction: column;
    gap: 5px;

    @media (max-width: 768px) {
        width: calc(100% - 30px);
    }
`

const CommentBodyHeaderBox = styled.div`
    width: 100%;

    position: relative;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const CommentNicknameBox = styled.div`
    font-size: 16px;
    font-weight: 700;
`

const CommentBodyHeaderRightBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const CommentTime = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.4);
`;

const CommentMenuIcon = styled.img`
    width: 24px;
    height: 24px;
`

const CommentText = styled.div`
    font-size: 14px;
    line-height: 20px;

    color: rgba(0, 0, 0, 0.6);

    white-space: pre-wrap;
`

const CommentLikeBox = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 5px;
`

const CommentLikeIcon = styled.img`
width: 16px;
height: 16px;
`

const CommentLikeValue = styled.div`
font-size: 14px;
`


const Comment = () => {
    return (
        <Container>

            <CommentWriterProfileImage src={profileImage} />

            <CommentBodyBox>

                <CommentBodyHeaderBox>
                    <CommentNicknameBox>닉네임</CommentNicknameBox>
                    <CommentBodyHeaderRightBox>
                        <CommentTime>방금 전</CommentTime>
                        <CommentMenuIcon src={commentMenuIcon} />
                    </CommentBodyHeaderRightBox>
                </CommentBodyHeaderBox>
                <CommentText>정말 인상적인 작품이네요. 흑백으로 표현된 질감이 너무 아름답습니다. 정말 인상적인 작품이네요. 흑백으로 표현된 질감이 너무 아름답습니다.</CommentText>
                <CommentLikeBox>
                    <CommentLikeIcon src={blackHeartIcon} />
                    <CommentLikeValue>23</CommentLikeValue>
                </CommentLikeBox>

            </CommentBodyBox>

        </Container>
    )
}

export default Comment;