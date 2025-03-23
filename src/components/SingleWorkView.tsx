import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import SingleWorkBox from '../components/SingleWorkBox';

import loadingIcon from '../assets/loading-large.png';
import heartIcon from '../assets/heart.png';
import viewIcon from '../assets/view.png';
import heartFillIcon from '../assets/heart-fill.png';



const BestSingleWorkBox = styled.div`
    margin-top: 40px;
    width: 1200px;

    display: flex;
    flex-direction: column;
    
    border-radius: 15px;

    position: relative;

    cursor: pointer;

    &:hover > div { 
        opacity: 1; 
    }

    @media (max-width: 1400px) {
        width: calc((6 / 7) * 100% - 90px);
    }

    @media (max-width: 480px) {
        width: calc((6 / 7) * 100%);
    }
`

const BestSingleWork = styled.img`
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;

    border-radius: 15px;
`

const BestSingleWorkInfo = styled.div`
    width: 100%;
    height: 80px;

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
    margin-left: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const BestSingleWorkUserImage = styled.img`
    width: 40px;
    height: 40px;

    border-radius: 10px;
`

const BestSingleWorkUserNickname = styled.div`
    font-size: 20px;
    
    color: white;
`

const BestSingleWorkHitBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const BestSingleWorkLikeBox = styled.div`
    margin-right: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;
`

const BestSingleWorkLikeIcon = styled.img`
    width: 32px;
    height: 32px;
`

const BestSingleWorkLike = styled.div`
    font-size: 20px;
    font-weight: 700;
    
    color: white;
`

const BestSingleWorkViewBox = styled.div`
    margin-right: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;
`

const BestSingleWorkViewIcon = styled.img`
    width: 32px;
    height: 32px;
`

const BestSingleWorkView = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: white;
`

const Line = styled.div`
    flex-shrink: 0;
    margin-top: 20px;
    width: 1200px;
    height: 2px;

    background-color: rgba(0, 0, 0, 0.2);

    @media (max-width: 1400px) {
        width: calc((6 / 7) * 100%  - 90px);
    }

    @media (max-width: 480px) {
        width: calc((6 / 7) * 100%);
    }
`

const SingleWorkBoxes = styled.div`
    margin-top: 50px;
    margin-bottom: 100px;
    width: 1200px;
    
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    gap: 14px;

    @media (max-width: 1400px) {
        width: calc((6 / 7) * 100%  - 90px);
    }

    @media (max-width: 480px) {
        width: calc((6 / 7) * 100%);
    }
`

const SingleWorkColumn = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 14px;
`

const LoadingBox = styled.div`
    margin-top: 20%;
    margin-bottom: 20%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled.img`
    width: 50px;
    height: 50px;

    animation: ${rotate} 1.2s ease-in-out infinite;
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

interface SearchSingleWorkData {
    content: SingleWorkData[];
    pageable: {
        pageNumber: number;
    }
    last: boolean;
}

interface SingleWorkViewProps {
    handleOpenSingleWorkDetail: (singleWorkId?: number) => void;
    popularSingleWorkLoading: boolean;
    popularSingleWorkData: SingleWorkData;
    singleWorkDataPageLoading: boolean;
    singleWorkDataPage: SearchSingleWorkData;
    singleWorkDataStatusCode: number;
}



const SingleWorkView: React.FC<SingleWorkViewProps> = (props) => {
    const { handleOpenSingleWorkDetail, popularSingleWorkLoading, popularSingleWorkData, singleWorkDataPageLoading, singleWorkDataPage, singleWorkDataStatusCode } = props;
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth <= 768);
    const popularSingleWorkId = popularSingleWorkData ? popularSingleWorkData.id : null;
    const [notFound, setNotFound] = useState<boolean>(false);

    const [singleWorks, setSingleWorks] = useState<SingleWorkData[]>([]);

    useEffect(function isCompletedLoading() {
        if (!singleWorkDataPageLoading && singleWorkDataPage) {
            if (singleWorkDataPage.pageable.pageNumber === 0) {
                setSingleWorks(singleWorkDataPage.content);
            } else {
                setSingleWorks((prev) => [...prev, ...singleWorkDataPage.content])
            }
        }
    }, [singleWorkDataPageLoading])

    // 404가 나왔다면 검색결과가 아예 없으므로 검색결과 없다는 표시필요
    useEffect(function isNotFound() {
        if (singleWorkDataStatusCode == 200) {
            setNotFound(false);
        }

        if (singleWorkDataStatusCode == 404) {
            setNotFound(true);
        }

    }, [singleWorkDataStatusCode])


    // 사이즈 감지 이벤트 리스너 등록 useEffect
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 검색단일 작품 fetch요청이 끝났으면 배열 업데이트

    return (
        <>
            {popularSingleWorkLoading &&
                <LoadingBox>
                    <LoadingIcon src={loadingIcon} />
                </LoadingBox>
            }
            {!popularSingleWorkLoading && popularSingleWorkData &&
                <BestSingleWorkBox onClick={() => handleOpenSingleWorkDetail(popularSingleWorkId)}>

                    <BestSingleWorkInfo>

                        <BestSingleWorkWriterBox>
                            <BestSingleWorkUserImage src={popularSingleWorkData.writer.profileImage} alt='Best Single Work'></BestSingleWorkUserImage>
                            <BestSingleWorkUserNickname>{popularSingleWorkData.writer.nickname}</BestSingleWorkUserNickname>
                        </BestSingleWorkWriterBox>

                        <BestSingleWorkHitBox>
                            <BestSingleWorkLikeBox>
                                <BestSingleWorkLikeIcon src={popularSingleWorkData.isLiked ? heartFillIcon : heartIcon} alt='like'></BestSingleWorkLikeIcon>
                                <BestSingleWorkLike>{popularSingleWorkData.likeCount}</BestSingleWorkLike>
                            </BestSingleWorkLikeBox>

                            <BestSingleWorkViewBox>
                                <BestSingleWorkViewIcon src={viewIcon} alt='view'></BestSingleWorkViewIcon>
                                <BestSingleWorkView>{popularSingleWorkData.viewCount}</BestSingleWorkView>
                            </BestSingleWorkViewBox>

                        </BestSingleWorkHitBox>

                    </BestSingleWorkInfo>

                    <BestSingleWork src={popularSingleWorkData.image}></BestSingleWork>
                </BestSingleWorkBox>
            }




            <Line />

            <SingleWorkBoxes>
                {notFound && <>
                    검색결과가 없습니다</>}


                {!notFound && !isSmallScreen &&
                    <>
                        <SingleWorkColumn>
                            {singleWorks.map((singleWork, index) => (
                                <>
                                    {index % 3 == 0 &&
                                        <SingleWorkBox
                                            key={singleWork.id}
                                            singleWorkData={singleWork}
                                            handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}
                                        />
                                    }
                                </>
                            ))}

                        </SingleWorkColumn>
                        <SingleWorkColumn>
                            {singleWorks.map((singleWork, index) => (
                                <>
                                    {index % 3 == 1 &&
                                        <SingleWorkBox
                                            key={singleWork.id}
                                            singleWorkData={singleWork}
                                            handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}
                                        />
                                    }
                                </>
                            ))}
                        </SingleWorkColumn>
                        <SingleWorkColumn>
                            {singleWorks.map((singleWork, index) => (
                                <>
                                    {index % 3 == 2 &&
                                        <SingleWorkBox
                                            key={singleWork.id}
                                            singleWorkData={singleWork}
                                            handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}
                                        />
                                    }
                                </>
                            ))}
                        </SingleWorkColumn>
                    </>
                }
                {!notFound && isSmallScreen &&
                    <SingleWorkColumn>
                        {singleWorks.map((singleWork, index) => (
                            <SingleWorkBox
                                key={singleWork.id}
                                singleWorkData={singleWork}
                                handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}
                            />
                        ))}
                    </SingleWorkColumn>
                }

            </SingleWorkBoxes>
        </>
    )
}

export default SingleWorkView;