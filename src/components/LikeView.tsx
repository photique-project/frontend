import { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";

import SingleWorkBox from './SingleWorkBox';
import SingleWork from './SingleWork';
import useFetch from '../hooks/useFetch';
import useAuthStore from "../zustand/store";
import ENDPOINTS from '../api/endpoints';
import { FetchRequestOptions } from '../types/http';
import ExhibitionCard from './ExhibitionCard';
import Loader from './Loader';

import leftBlackIcon from '../assets/left-black.png';
import rightBlackIcon from '../assets/right-black.png';



const Container = styled.div`
    width: 60%;
    height: 100%;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const FollowViewHeader = styled.div`
    margin-top: 40px;
    padding: 40px;
    width: calc(100% - 80px);

    display: flex;
    flex-direction: column;
    
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: white;

    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
`

const Title = styled.div`
    width: 100%;

    font-size: 24px;
    font-weight: 700;
`

const SearchOptionBox = styled.div`
    margin-top: 15px;
    padding: 4px;

    display: flex;
    flex-direction: row;

    border-radius: 5px;
    gap: 4px;
`

const SearchOption = styled.div<{ isSelected: boolean }>`
    width: 80px;
    height: 30px;

    display: flex;
    
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 7px;
    font-size: 16px;

    color: ${({ isSelected }) => (isSelected ? 'white' : 'black')};
    background-color: ${({ isSelected }) => (isSelected ? 'black' : 'white')};

    transition: all 0.2s ease-in-out;

    cursor: pointer;
`

const Body = styled.div`
    margin-top: 40px;
    width: 100%;

    display: flex;
    justify-content: center;
    
    flex-direction: row;

    flex-wrap: wrap;

    gap: 30px;
`

const SingleWorkColumn = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 14px;
`


const PageNavBox = styled.div`
    margin-top: 60px;
    padding-bottom: 100px;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    border-radius: 1px solid #000000;
`

const PageBox = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;

    gap: 10px;

    justify-content: center;
`

const PrevPageIcon = styled.img`
    width: 20px;
    height: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const NextPageIcon = styled.img`
    width: 20px;
    height: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-weight: 700;
`

const Page = styled.div<{ isSelected?: boolean }>`
    width: 40px;
    height: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    font-weight: 700;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;

   
    background-color: ${({ isSelected }) => (isSelected ? "black" : "white")};
    color: ${({ isSelected }) => (isSelected ? "white" : "black")};

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? "black" : "rgba(0, 0, 0, 0.07)")};
    }
`

const QuickPageBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;   
    gap: 15px;

    justify-content: center;
`

const FirstPage = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);

    cursor: pointer;
    &:hover {
        color: black;
    }
`

const LastPage = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);

    cursor: pointer;

    &:hover {
        color: black;
    }
`

const LoadingBox = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const NotFound = styled.div`
    width: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    font-weight: 700;
`




type Target = 'singlework' | 'exhibition';
type Order = 'recent' | 'last';

interface Tag {
    name: string;
}

interface ExhibitionData {
    id: number;
    writer: {
        id: number;
        nickname: string;
        profileImage: string;
        introduction: string;
    }
    title: string;
    description: string;
    cardColor: string;
    likeCount: number;
    viewCount: number;
    tags: Tag[];
    createdAt: string;
    isLiked: boolean;
    isBookmarked: boolean;
}

interface ExhibitionDataPage {
    content: ExhibitionData[];
    pageable: {
        pageNumber: number;
    }
    totalPages: number;
}

interface SingleWorkData {
    id: number;
    writer: {
        id: number;
        nickname: string;
        profileImage: string;
    };
    image: string;
    likeCount: number;
    viewCount: number;
    isLiked: boolean;
}

interface SingleWorkDataPage {
    content: SingleWorkData[];
    pageable: {
        pageNumber: number;
    }
    totalPages: number;
}




const LikeView = () => {
    const [selectedTarget, setSelectedTarget] = useState<Target>('singlework');
    const [selectedOrder, setSelectedOrder] = useState<Order>('recent');
    const user = useAuthStore.getState().user;

    const handleSelectedTarget = (target: Target) => {
        setSelectedTarget(target);
    }

    const handleSelectedOrder = (order: Order) => {
        setSelectedOrder(order);
    }

    // 페이징
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageGroup, setPageGroup] = useState<number>(0);

    // 단일작품 
    const [singleWorks, setSingleWorks] = useState<SingleWorkData[]>([]);
    const [openSingleWorkDetail, setOpenSingleWorkDetail] = useState<boolean>(false);
    const [selectedSingleWorkId, setSelectedSingleWorkId] = useState<number | null>(null);

    // 전시회
    const [exhibitions, setExhibitions] = useState<ExhibitionData[]>([]);

    const handleOpenSingleWorkDetail = (singleWorkId?: number) => {
        if (openSingleWorkDetail) {
            setOpenSingleWorkDetail(false);

            return;
        }

        setOpenSingleWorkDetail(true);
        setSelectedSingleWorkId(singleWorkId);
    };

    const {
        loading: singleWorkPageLoading,
        statusCode: singleWorkPageStatusCode,
        data: singleWorkPage,
        fetchRequest: singleWorkDataPageRequest
    } = useFetch<SingleWorkDataPage>();

    const {
        loading: exhibitionPageLoading,
        statusCode: exhibitionPageStatusCode,
        data: exhibitionPage,
        fetchRequest: exhibitionDataPageRequest
    } = useFetch<ExhibitionDataPage>();

    const handlePageRequest = async (page: number = 0) => {
        const sort = selectedOrder === 'recent' ? 'createdAt,desc' : 'createdAt,asc'
        const method = selectedTarget === 'singlework' ? ENDPOINTS.SINGLE_WORK.GET_LIKE.METHOD : ENDPOINTS.EXHIBITION.GET_LIKE.METHOD;
        const url = selectedTarget === 'singlework' ? ENDPOINTS.SINGLE_WORK.GET_LIKE.URL(user.id, sort, page, 30) : ENDPOINTS.EXHIBITION.GET_LIKE.URL(user.id, sort, page, 30);
        const request = selectedTarget === 'singlework' ? singleWorkDataPageRequest : exhibitionDataPageRequest;

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        request(options);
    }

    useEffect(function handleSingleWorkPageInitRequest() {
        handlePageRequest(0);
    }, [])

    useEffect(function singleWorkPageRequest() {
        handlePageRequest(0);
    }, [selectedTarget, selectedOrder])



    useEffect(function handleExhibitionPageResponse() {
        if (exhibitionPageStatusCode === 200 && exhibitionPage) {
            setExhibitions(exhibitionPage.content)
            setTotalPage(exhibitionPage.totalPages);
            setCurrentPage(exhibitionPage.pageable.pageNumber);
            setPageGroup(Math.floor(exhibitionPage.pageable.pageNumber / 5));
            return;
        }

        if (exhibitionPageStatusCode === 404) {
            setExhibitions([]);
            return;
        }

    }, [exhibitionPageStatusCode, exhibitionPage])

    useEffect(function handleExhibitionPageResponse() {
        if (singleWorkPageStatusCode === 200 && singleWorkPage) {
            setSingleWorks(singleWorkPage.content)
            setTotalPage(singleWorkPage.totalPages);
            setCurrentPage(singleWorkPage.pageable.pageNumber);
            setPageGroup(Math.floor(singleWorkPage.pageable.pageNumber / 5));
            return;
        }

        if (singleWorkPageStatusCode === 404 && singleWorkPage) {
            setSingleWorks([]);
            return;
        }

    }, [singleWorkPageStatusCode, singleWorkPage])

    return (
        <>
            <Container>
                <FollowViewHeader>

                    <Title>좋아요 작품</Title>

                    <SearchOptionBox>
                        <SearchOption
                            isSelected={selectedTarget === 'singlework'}
                            onClick={() => handleSelectedTarget('singlework')}
                        >
                            단일작품
                        </SearchOption>

                        <SearchOption
                            isSelected={selectedTarget === 'exhibition'}
                            onClick={() => handleSelectedTarget('exhibition')}
                        >
                            전시회
                        </SearchOption>
                    </SearchOptionBox>

                    <SearchOptionBox style={{ marginTop: '5px' }}>
                        <SearchOption
                            isSelected={selectedOrder === 'recent'}
                            onClick={() => handleSelectedOrder('recent')}
                        >
                            최신순
                        </SearchOption>

                        <SearchOption
                            isSelected={selectedOrder === 'last'}
                            onClick={() => handleSelectedOrder('last')}
                        >
                            오래된순
                        </SearchOption>
                    </SearchOptionBox>


                </FollowViewHeader>

                <Body style={{
                    flexWrap: selectedTarget === 'singlework' ? 'nowrap' : 'wrap',
                    justifyContent: selectedTarget === 'singlework' ? 'space-around' : 'center',
                }}>

                    {selectedTarget === 'singlework' &&
                        <>
                            {singleWorkPageLoading &&
                                <LoadingBox>
                                    <Loader fontColor='black' />
                                </LoadingBox>
                            }
                            {!singleWorkPageLoading && singleWorks.length === 0 &&
                                <NotFound>
                                    나의 작품이 존재하지 않습니다
                                </NotFound>
                            }
                            {!singleWorkPageLoading && singleWorks.length !== 0 &&
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
                        </>}

                    {selectedTarget === 'exhibition' &&
                        <>
                            {exhibitionPageLoading &&
                                <LoadingBox>
                                    <Loader fontColor='black' />
                                </LoadingBox>
                            }
                            {!exhibitionPageLoading && exhibitions.length === 0 &&
                                <NotFound>
                                    나의 작품이 존재하지 않습니다
                                </NotFound>
                            }
                            {!exhibitionPageLoading && exhibitions.length !== 0 &&
                                exhibitions.map((exhibition, index) => (
                                    <ExhibitionCard
                                        key={exhibition.id}
                                        exhibitionData={exhibition}
                                    />

                                ))
                            }
                        </>
                    }
                </Body>

                {totalPage > 0 &&
                    <PageNavBox>

                        <PageBox>
                            <Page
                                onClick={
                                    () => {
                                        // 현재 페이지가 첫번째 페이지 이후 페이지라면
                                        if (totalPage > 0) {
                                            handlePageRequest(currentPage - 1)
                                        }
                                    }
                                }
                            >
                                <PrevPageIcon src={leftBlackIcon} />
                            </Page>

                            {Array.from({ length: totalPage }, (_, index) => (
                                <>
                                    {pageGroup === Math.floor(index / 5) &&
                                        <Page
                                            key={index + 1}
                                            isSelected={index + 1 == currentPage + 1}
                                            onClick={() => handlePageRequest(index)}
                                        >
                                            {index + 1}
                                        </Page>
                                    }
                                </>
                            ))}

                            <Page
                                onClick={
                                    () => {
                                        // 현재 페이지가 마지막 페이지보다 이전 페이지라면
                                        if (currentPage < totalPage - 1) {
                                            handlePageRequest(currentPage + 1)
                                        }
                                    }
                                }>
                                <NextPageIcon src={rightBlackIcon} />
                            </Page>

                        </PageBox>

                        <QuickPageBox>
                            <FirstPage
                                onClick={() => { handlePageRequest(0) }}
                            >
                                시작 페이지
                            </FirstPage>
                            <LastPage
                                onClick={() => { handlePageRequest(totalPage - 1) }}
                            >

                                마지막 페이지
                            </LastPage>
                        </QuickPageBox>
                    </PageNavBox>}

                {openSingleWorkDetail && <SingleWork singleWorkId={selectedSingleWorkId} close={handleOpenSingleWorkDetail}></SingleWork>}
            </Container>
        </>
    )
}

export default LikeView;