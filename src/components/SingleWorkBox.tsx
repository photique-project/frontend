import styled from 'styled-components';
import heartIcon from '../assets/heart.png';
import viewIcon from '../assets/view.png';
import ex1 from '../assets/ex1.jpg';

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
`

const SingleWorkLikeBox = styled.div`
    margin-right: 7px;
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 5px;
`

const SingleWorkLikeIcon = styled.img`
    width: 24px;
    height: 24px;
`

const SingleWorkLike = styled.div`
    font-size: 16px;
    
    color: white;
`

const SingleWorkViewBox = styled.div`
    margin-right: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 5px;
`

const SingleWorkViewIcon = styled.img`
    width: 24px;
    height: 24px;
`

const SingleWorkView = styled.div`
    font-size: 16px;
    color: white;
`

interface SingleWorkBoxProps {
    src: string;
    handleOpenSingleWorkDetail: (singleWorkId: string) => void;
}

const SingleWorkBox: React.FC<SingleWorkBoxProps> = (props) => {
    // 여기서 아이디 가지고 있다가 열기
    const { src, handleOpenSingleWorkDetail } = props;
    const id = "1";

    const handleOpenDetail = () => {
        handleOpenSingleWorkDetail(id);
    }

    return (
        <Container onClick={handleOpenDetail}>
            <SingleWorkInfo>

                <BestSingleWorkWriterBox>
                    <SingleWorkUserImage src={ex1} alt='Best Single Work'></SingleWorkUserImage>
                    <SingleWorkUserNickname>닉네임</SingleWorkUserNickname>
                </BestSingleWorkWriterBox>

                <SingleWorkHitBox>
                    <SingleWorkLikeBox>
                        <SingleWorkLikeIcon src={heartIcon} alt='like'></SingleWorkLikeIcon>
                        <SingleWorkLike>831</SingleWorkLike>
                    </SingleWorkLikeBox>

                    <SingleWorkViewBox>
                        <SingleWorkViewIcon src={viewIcon} alt='view'></SingleWorkViewIcon>
                        <SingleWorkView>1.3k</SingleWorkView>
                    </SingleWorkViewBox>

                </SingleWorkHitBox>

            </SingleWorkInfo>
            <SingleWork src={src} />
        </Container>
    );
}

export default SingleWorkBox;