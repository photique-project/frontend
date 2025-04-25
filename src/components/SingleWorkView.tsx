import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import SingleWorkBox from '../components/SingleWorkBox';
import Loader from './Loader';



const Container = styled.div`
    margin-top: 40px;
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
    margin-bottom: 100px;
    width: 100%;
    height: 100vh; // 브라우저 높이 크기이지만, 상위에서 레이아웃 배치 규칙에 따라 남은 전체크기를 차지한 상태
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    font-weight: 700;
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

interface SingleWorkViewProps {
    handleOpenSingleWorkDetail: (singleWorkId?: number) => void;
    singleWorkDataPageLoading: boolean;
    singleWorkDataStatusCode: number;
    singleWorks: SingleWorkData[];
}



const SingleWorkView: React.FC<SingleWorkViewProps> = (props) => {
    const { handleOpenSingleWorkDetail, singleWorkDataPageLoading, singleWorks, singleWorkDataStatusCode } = props;
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth <= 768);

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
            {singleWorks &&
                <Container>
                    {!isSmallScreen &&
                        <>
                            <SingleWorkColumn>
                                {singleWorks.map((singleWork, index) => (

                                    (index % 3 === 0 &&
                                        <SingleWorkBox
                                            key={singleWork.id}
                                            singleWorkData={singleWork}
                                            handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}
                                        />
                                    )

                                ))}

                            </SingleWorkColumn>
                            <SingleWorkColumn>
                                {singleWorks.map((singleWork, index) => (

                                    (index % 3 === 1 &&
                                        <SingleWorkBox
                                            key={singleWork.id}
                                            singleWorkData={singleWork}
                                            handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}
                                        />
                                    )

                                ))}
                            </SingleWorkColumn>
                            <SingleWorkColumn>
                                {singleWorks.map((singleWork, index) => (
                                    index % 3 === 2 &&
                                    <SingleWorkBox
                                        key={singleWork.id}
                                        singleWorkData={singleWork}
                                        handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}
                                    />
                                ))}
                            </SingleWorkColumn>
                        </>
                    }


                    {isSmallScreen &&
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


                </Container>
            }
            {singleWorkDataPageLoading &&
                <LoadingBox>
                    <Loader fontColor='black' />
                </LoadingBox>
            }
        </>
    )
}

export default SingleWorkView;