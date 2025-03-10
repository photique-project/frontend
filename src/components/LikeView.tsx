import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SingleWorkBox from '../components/SingleWorkBox';
import ExhibitionCard from '../components/ExhibitionCard';


const TabBox = styled.div`
    margin-top: 40px;
    width: 1200px;

    @media (max-width: 1400px) {
        width: calc((6 / 7) * 100%  - 90px);
    }

    @media (max-width: 480px) {
        width: calc((6 / 7) * 100%);
    }
`;

const Tab = styled.div`
    width: 176px;
    height: 40px;  

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.04);

    gap: 4px;
`;

const SingleWorkButton = styled.button<{ viewMode: boolean }>`
    width: 82px;
    height: 32px;
    
    font-size: 16px;
    line-height: 17px;

    border: none;
    border-radius: 5px;

    background-color: ${({ viewMode }) => (viewMode ? 'white' : 'none')};

    transition: all 0.3s ease;

    cursor: pointer;
`

const ExhibitionButton = styled.button<{ viewMode: boolean }>`
    width: 82px;
    height: 32px;

    font-size: 16px;
    line-height: 17px;

    border: none;
    border-radius: 5px;

    background-color: ${({ viewMode }) => (viewMode ? 'white' : 'none')};

    transition: all 0.3s ease;

    cursor: pointer;
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

const ExhibitionView = styled.div`
    margin-top: 50px;
    margin-bottom: 100px;
    width: 1200px;
    
    display: flex;
    justify-content: center;

    flex-direction: row;
    flex-wrap: wrap;

    gap: 30px;

    @media (max-width: 1400px) {
        width: calc((6 / 7) * 100%  - 90px);
    }

    @media (max-width: 480px) {
        width: calc((6 / 7) * 100%);
    }
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

interface LikeViewProps {
    handleOpenSingleWorkDetail: (singleWorkId?: number) => void;
    searchSingleLoading: boolean;
    searchSingleWorkData: SearchSingleWorkData
}

const LikeView: React.FC<LikeViewProps> = (props) => {
    const { handleOpenSingleWorkDetail, searchSingleLoading, searchSingleWorkData } = props;
    const [singleWorkView, setSingleWorkView] = useState<boolean>(true);
    const [exhibitionView, setExhibitionView] = useState<boolean>(false);
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth <= 768);

    const [singleWorks, setSingleWorks] = useState<SingleWorkData[]>([]);

    // 검색한 단일작품 배열 할당
    useEffect(function isCompletedLoading() {
        if (!searchSingleLoading && searchSingleWorkData) {
            setSingleWorks((prev) => [...prev, ...searchSingleWorkData.content])
        }
    }, [searchSingleLoading])

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleView = (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = (event.currentTarget as HTMLElement).id;


        if (id === 'single-work') {
            setSingleWorkView(true);
            setExhibitionView(false);

            return;
        }

        setExhibitionView(true);
        setSingleWorkView(false);
    }


    return (
        <>
            <TabBox>
                <Tab>
                    <SingleWorkButton id='single-work' viewMode={singleWorkView} onClick={handleView}>
                        단일작품
                    </SingleWorkButton>
                    <ExhibitionButton id='exhibition' viewMode={exhibitionView} onClick={handleView}>
                        전시회
                    </ExhibitionButton>

                </Tab>
            </TabBox>

            {singleWorkView &&
                <SingleWorkBoxes>
                    {!isSmallScreen &&
                        <>
                            <SingleWorkColumn>
                                {singleWorks.map((singleWork, index) => (
                                    <>
                                        {index % 3 == 0 &&
                                            <SingleWorkBox
                                                key={index}
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
                                                key={index}
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
                                                key={index}
                                                singleWorkData={singleWork}
                                                handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}
                                            />
                                        }
                                    </>
                                ))}
                            </SingleWorkColumn>
                        </>
                    }
                    {isSmallScreen &&
                        <SingleWorkColumn>
                            {singleWorks.map((singleWork, index) => (
                                <SingleWorkBox
                                    key={index}
                                    singleWorkData={singleWork}
                                    handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}
                                />
                            ))}
                        </SingleWorkColumn>
                    }
                </SingleWorkBoxes>}
            {exhibitionView &&
                <ExhibitionView>



                </ExhibitionView>
            }
        </>
    )
}

export default LikeView;