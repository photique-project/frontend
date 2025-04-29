import styled, { keyframes } from "styled-components";

import heartIcon from '../assets/heart.png';
import viewIcon from '../assets/view.png';
import heartFillIcon from '../assets/heart-fill.png';
import DEFAULT from '../api/default';
import formatNumber from '../utils/converter';

const slideFadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    

    border-radius: 15px;

    position: relative;
    
    cursor: pointer;

    &:hover > div { 
        opacity: 1; 
    }

    animation: ${slideFadeIn} 0.7s ease;
`;

const SingleWork = styled.img`
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;

    border-radius: 15px;
`

const SingleWorkInfo = styled.div`
    width: 100%;
    height: 60px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;


    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    background: linear-gradient(to bottom, #000000 0%, rgba(51, 51, 51, 0.5) 75%, rgba(102, 102 , 102, 0) 100%);

    position: absolute;

    opacity: 0; 
    transition: opacity 0.3s ease; 
`

const BestSingleWorkWriterBox = styled.div`
    margin-left: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const SingleWorkUserImage = styled.img`
    width: 30px;
    height: 30px;

    border-radius: 10px;
`

const SingleWorkUserNickname = styled.div`
    font-size: 16px;
    
    color: white;
`

const SingleWorkHitBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7px;
`

const SingleWorkLikeBox = styled.div`
    margin-right: 7px;
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 7px;
`

const SingleWorkLikeIcon = styled.img`
    width: 24px;
    height: 24px;
`

const SingleWorkLike = styled.div`
    font-size: 16px;
    font-weight: 700;
    
    color: white;
`

const SingleWorkViewBox = styled.div`
    margin-right: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 7px;
`

const SingleWorkViewIcon = styled.img`
    width: 24px;
    height: 24px;
`

const SingleWorkView = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: white;
`



interface Writer {
    id: number;
    nickname: string;
    profileImage: string;
}

interface SingleWorkData {
    id: number;
    writer: Writer;
    image: string;
    likeCount: number;
    viewCount: number;
    isLiked: boolean;
}

interface SingleWorkBoxProps {
    singleWorkData: SingleWorkData;
    handleOpenSingleWorkDetail: (singleWorkId: number) => void;
}



const SingleWorkBox: React.FC<SingleWorkBoxProps> = (props) => {
    // 여기서 아이디 가지고 있다가 열기
    const { singleWorkData, handleOpenSingleWorkDetail } = props;
    const id = singleWorkData.id;

    const handleOpenDetail = () => {
        handleOpenSingleWorkDetail(id);
    }

    return (
        <Container onClick={handleOpenDetail}>
            <SingleWorkInfo>

                <BestSingleWorkWriterBox>
                    <SingleWorkUserImage src={singleWorkData.writer.profileImage ? singleWorkData.writer.profileImage : DEFAULT.profileImage} alt='Single Work'></SingleWorkUserImage>
                    <SingleWorkUserNickname>{singleWorkData.writer.nickname}</SingleWorkUserNickname>
                </BestSingleWorkWriterBox>

                <SingleWorkHitBox>
                    <SingleWorkLikeBox>
                        <SingleWorkLikeIcon src={singleWorkData.isLiked ? heartFillIcon : heartIcon} alt='like'></SingleWorkLikeIcon>
                        <SingleWorkLike>{formatNumber(singleWorkData.likeCount)}</SingleWorkLike>
                    </SingleWorkLikeBox>

                    <SingleWorkViewBox>
                        <SingleWorkViewIcon src={viewIcon} alt='view'></SingleWorkViewIcon>
                        <SingleWorkView>{formatNumber(singleWorkData.viewCount)}</SingleWorkView>
                    </SingleWorkViewBox>

                </SingleWorkHitBox>

            </SingleWorkInfo>
            <SingleWork src={singleWorkData.image} />
        </Container>
    );
}

export default SingleWorkBox;