import { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";

import useFetch from '../hooks/useFetch';
import useAuthStore from "../zustand/store";
import ENDPOINTS from '../api/endpoints';
import { FetchRequestOptions } from '../types/http';
import ExhibitionCard from './ExhibitionCard';

import seachIcon from '../assets/search-white.png';
import loadingIcon from '../assets/loading-large.png';
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

const PageNavBox = styled.div`
    margin-top: 40px;
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




type SearchOptionType = 'recent' | 'last';

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



const BookmarkView = () => {
    const [selectedSearchOption, setSelectedSearchOption] = useState<SearchOptionType>('recent');
    const user = useAuthStore.getState().user;


    // 북마크전시회
    const [exhibitions, setExhibitions] = useState<ExhibitionData[]>([]);
    const [exhibitionTotalPage, setExhibitionTotalPage] = useState<number>(0);
    const [exhibitionCurrentPage, setExhibitionCurrentPage] = useState<number>(0);
    const [exhibitionPageGroup, setExhibitionPageGroup] = useState<number>(0);


    const handleSelectedSearchOption = (searchOption: SearchOptionType) => {
        setSelectedSearchOption(searchOption);
    }

    useEffect(function handleSearchBookmarkDataPageRequest() {
        handleSearchBookmarkDatePageRequest();
    }, [selectedSearchOption])

    // 저장된 전시회 검색
    const {
        loading: searchBookmarkDataPageLoading,
        statusCode: searchBookmarkDataPageStatusCode,
        data: searchBookmarkDataPage,
        fetchRequest: searchBookmarkDataPageRequest
    } = useFetch<ExhibitionDataPage>();

    const handleSearchBookmarkDatePageRequest = async (page: number = 0) => {
        const sort = selectedSearchOption === 'recent' ? 'createdAt,desc' : 'createdAt,asc'
        const method = ENDPOINTS.EXHIBITION.GET_BOOKMARK.METHOD;
        const url = ENDPOINTS.EXHIBITION.GET_BOOKMARK.URL(user.id, sort, page, 30);

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        await searchBookmarkDataPageRequest(options);
    }

    useEffect(function handleSearchBookmarkDatePageResponse() {
        if (searchBookmarkDataPageStatusCode == 200 && searchBookmarkDataPage) {
            setExhibitions(searchBookmarkDataPage.content)
            setExhibitionTotalPage(searchBookmarkDataPage.totalPages);
            setExhibitionCurrentPage(searchBookmarkDataPage.pageable.pageNumber);
            setExhibitionPageGroup(Math.floor(searchBookmarkDataPage.pageable.pageNumber / 5));
            return;
        }

        if (searchBookmarkDataPageStatusCode == 404) {
            setExhibitions([]);
            return;
        }

    }, [searchBookmarkDataPageStatusCode, searchBookmarkDataPage]);

    useEffect(function handleSearchBookmarkDatePageInitRequest() {
        handleSearchBookmarkDatePageRequest(0);
    }, [])


    return (
        <>
            <Container>
                <FollowViewHeader>

                    <Title>저장된 전시회</Title>




                    <SearchOptionBox>
                        <SearchOption
                            isSelected={selectedSearchOption === 'recent'}
                            onClick={() => handleSelectedSearchOption('recent')}
                        >
                            최신순
                        </SearchOption>

                        <SearchOption
                            isSelected={selectedSearchOption === 'last'}
                            onClick={() => handleSelectedSearchOption('last')}
                        >
                            오래된순
                        </SearchOption>

                    </SearchOptionBox>


                </FollowViewHeader>

                <Body>
                    {exhibitions.map((exhibition, index) => (
                        <ExhibitionCard
                            key={exhibition.id}
                            exhibitionData={exhibition}
                        />

                    ))}
                </Body>

                {exhibitionTotalPage > 0 &&
                    <PageNavBox>

                        <PageBox>
                            <Page
                                onClick={
                                    () => {
                                        // 현재 페이지가 첫번째 페이지 이후 페이지라면
                                        if (exhibitionTotalPage > 0) {
                                            handleSearchBookmarkDatePageRequest(exhibitionCurrentPage - 1)
                                        }
                                    }
                                }
                            >
                                <PrevPageIcon src={leftBlackIcon} />
                            </Page>

                            {Array.from({ length: exhibitionTotalPage }, (_, index) => (
                                <>
                                    {exhibitionPageGroup === Math.floor(index / 5) &&
                                        <Page
                                            key={index + 1}
                                            isSelected={index + 1 == exhibitionCurrentPage + 1}
                                            onClick={() => handleSearchBookmarkDatePageRequest(index)}
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
                                        if (exhibitionCurrentPage < exhibitionTotalPage - 1) {
                                            handleSearchBookmarkDatePageRequest(exhibitionCurrentPage + 1)
                                        }
                                    }
                                }>
                                <NextPageIcon src={rightBlackIcon} />
                            </Page>

                        </PageBox>

                        <QuickPageBox>
                            <FirstPage
                                onClick={() => { handleSearchBookmarkDatePageRequest(0) }}
                            >
                                시작 페이지
                            </FirstPage>
                            <LastPage
                                onClick={() => { handleSearchBookmarkDatePageRequest(exhibitionTotalPage - 1) }}
                            >

                                마지막 페이지
                            </LastPage>
                        </QuickPageBox>
                    </PageNavBox>}

            </Container>
        </>
    )

}

export default BookmarkView;