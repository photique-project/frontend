import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from "styled-components";

import { FetchRequestOptions } from '../types/http';
import ENDPOINTS from '../api/endpoints';
import useFetch from '../hooks/useFetch';

import Header from '../components/Header';
import SingleWorkView from '../components/SingleWorkView';
import Tag from '../components/Tag';
import FilterPanel from '../components/FilterPanel';
import ExhibitionView from '../components/ExhibitionView';
import SingleWork from '../components/SingleWork';

import sortingIcon from '../assets/sorting.png';
import mainSearchIcon from '../assets/main-search.png';
import gridBlackIcon from '../assets/grid-black.png';
import gridWhiteIcon from '../assets/grid-white.png';
import exhibitionBlackIcon from '../assets/exhibition-black.png';
import exhibitionWhiteIcon from '../assets/exhibition-white.png';
import upActiveIcon from '../assets/up-active.png';
import upNonactiveIcon from '../assets/up-nonactive.png';
import writeActiveIcon from '../assets/write-active.png';
import writeNonactiveIcon from '../assets/write-nonactive.png'
import discordActiveIcon from '../assets/discord-active.png';
import discordNonactiveIcon from '../assets/discord-nonactive.png';
import singleWorkIcon from '../assets/singlework-new.png';
import exhibitionIcon from '../assets/exhibition-new.png';
import useAuthStore from '../zustand/store';



const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;

    background-color: #F9FBFF;

    overflow: none;
`;

const SearchBox = styled.div<{ isScrolled: boolean }>`
    padding-bottom: ${({ isScrolled }) => (isScrolled ? '0' : '20px')};
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    

    background-color: black;

    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.3);
    z-index: 1;
`

const SearchBoxMainText = styled.div<{ isScrolled: boolean }>`
    margin-top: ${({ isScrolled }) => (isScrolled ? '0' : '40px')};
    font-size: ${({ isScrolled }) => (isScrolled ? '0' : '30px')};
    line-height: ${({ isScrolled }) => (isScrolled ? '0' : '40px')};
    
    font-weight: 700;
    color: white;
    transition: all 0.3s ease;

    margin-left:10px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    @media (max-width: 480px) {
        font-size: 20px;
        line-height: 20px;
    }
`;

const SearchBoxSubText = styled.div<{ isScrolled: boolean }>`
    font-size: ${({ isScrolled }) => (isScrolled ? '0' : '20px')};
    line-height: ${({ isScrolled }) => (isScrolled ? '0' : '40px')};
    margin-left:10px;
    margin-right: 10px;

    color: #BCBFD2;
    transition: all 0.3s ease;

    @media (max-width: 480px) {
        font-size: 14px;
        line-height: 14px;
    }
`;

const SearchInputBox = styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
    width: 800px;
    height: 40px;

    display: flex;
    flex-direction: row;
    
    position: relative;

    justify-content: center;
    align-items: center;

    @media (max-width: 900px) {
        width: 80%;
    }
`

const SearchInput = styled.input`
    width: 700px;
    height: 40px;
    padding: 0 50px;
    
    background-color: #333333;
    border-radius: 10px;

    font-size: 16px;
    line-height: 17px;
    color: white;
    font-weight: 400;
    
    position: absolute;

    @media (max-width: 900px) {
        width: calc(100% - 80px);
        padding: 0 40px;
        font-size: 14px;
    }
`;


const SortingIcon = styled.img`
    width: 30px;
    left:10px;
    position: absolute;
        
    cursor: pointer;
    z-index: 1;

    @media (max-width: 900px) {
        width: 24px;
        left: 8px;
    }
`

const MainSearchIcon = styled.img`
    width: 30px;
    right:10px;

    position: absolute;
    
    cursor: pointer;
    z-index: 1;

    @media (max-width: 900px) {
        width: 24px;
        right: 8px;
    }
`

const ScrollBox = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-y: scroll;
    scrollbar-width: none; 
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
        display: none; 
    }
`;

const Tab = styled.div`
    flex-shrink: 0;
    margin-top: 80px;
    padding-left:10px;
    padding-right:10px;
    padding-top:5px;
    padding-bottom:5px;
    

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 15px;

    border-radius: 35px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2);

    background-color: white;

    @media (max-width: 480px) {
        margin-top: 40px;
    }
`;

const TabIconBox = styled.div<{ viewMode: boolean }>`
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    border-radius: 50%;

    background-color: ${({ viewMode }) => (viewMode ? 'black' : 'white')};
    transition: background-color 0.3s ease-in-out;

    cursor: pointer;

    &:hover {
        background-color: ${({ viewMode }) => (viewMode ? 'black' : 'rgba(0, 0, 0, 0.08)')};
    }

    @media (max-width: 480px) {
        padding: 10px;
    }
`;

const GridIcon = styled.img`
    width: 28px;
    height: 28px;

    @media (max-width: 480px) {
        width: 20px;
        height: 20px;
    }
`;

const ActionBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 10px;

    position: fixed;
    left: calc(50% + 600px + 20px);
    bottom: 20px; 
    
    transition: bottom 0.3s ease; 

    cursor: pointer;

    @media (max-width: 1400px) {
        left: calc(50% + (6 / 7) * 50%  - 50px + 20px);
    }
`;

const ActionIconBox = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 25px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;

    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);

    background-color: white;

    transition: all 0.3s ease;

    &:hover {
        border-radius: 7px;
    }

    @media (max-width: 480px) {
        width: 35px;
        height: 35px;
        border-radius: 17.5px;
    }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const MessageBox = styled.div`
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    border-radius: 10px;
    color: white;

    position: absolute;
    bottom: 100%;
    right: 100%;

    background-color: rgba(0, 0, 0, 0.3);

    opacity: 0;
    animation: ${fadeIn} 0.3s ease-in-out forwards;
`

const NewPostItemBox = styled.div`
    padding: 5px;
    right: 60px;
    bottom: 0;

    display: flex;
    flex-direction: column;

    border-radius: 5px;

    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
    
    position: absolute;
    background-color: white;

    position: absolute;
`

const NewPostItem = styled.div`
    padding: 10px;

    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;

    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

const NewPostItemIcon = styled.img`   
    width: 20px;
    height: 20px;
`

const NewPostItemText = styled.div`
    font-size: 16px;
    white-space: nowrap;
`


const ActionIcon = styled.img<{ activeSrc?: string }>`
    width: 36px;
    height: 36px;

    ${ActionIconBox}:hover & {
        content: url(${({ activeSrc }) => activeSrc});
    }


    @media (max-width: 480px) {
        width: 24px;
        height: 24px;
    }
`

const NotFoundBox = styled.div`
    margin-top: 10%;
    width: 100%;
    

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    font-weight: 700;

    color: black;
`



type SearchTarget = 'work' | 'writer';
type SortingTarget = 'createdAt' | 'likeCount' | 'viewCount' | 'commentCount';
type SortOrder = 'asc' | 'desc'

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

interface SingleWorkDataPage {
    content: SingleWorkData[];
    number: number;
    last: boolean;
}
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
    number: number;
    last: boolean;
}



const Home = () => {
    const user = useAuthStore.getState().user;
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = useAuthStore.getState().isLoggedIn;

    // 단일작품 업데이트 페이지에서 업데이트 완료 후 넘어왔을 때,
    // useLocation을 통해 state로 singleWorkId를 넘겨받고 바로 모달을 보여주는 동작을 함
    // 해당 state가 새로고침해도 유지되는 것을 방지하기 위한 이펙트
    useEffect(function clearLocationState() {
        if (location.state) {
            navigate(location.pathname, { replace: true, state: null });
        }
    }, []);

    // 로그인 필요 메시지 박스
    const [authMessageDisplay, setAuthMessageDisplay] = useState<boolean>(false);

    // 새 게시글 옵션 모달 display
    const [newPostOptionDisplay, setNewPostOptionDisplay] = useState<boolean>(false);
    const newPostOptionRef = useRef<HTMLDivElement>(null);

    // 스크롤 조작을 위한 ref
    const scrollBoxRef = useRef<HTMLDivElement | null>(null);

    // 검색창 입력 상태관리 변수
    const [inputValue, setInputValue] = useState<string>('');

    // 스크롤 하면 검색창 변화를 위한 상태관리변수
    const [isScrolled, setIsScrolled] = useState(false);

    // 단일작품 상세패널 
    const [openSingleWorkDetails, setOpenSingleWorkDetails] = useState<boolean>(location.state?.singleWorkId !== undefined ? true : false);

    // 선택한 단일작품 상세 패널 아이디
    const [selectedSingleWorkId, setSelectedSingleWorkId] = useState<number | null>(location.state?.singleWorkId !== undefined ? location.state?.singleWorkId : null);

    // 입력 조건 상태관리 변수
    const [searchTarget, setSearchTarget] = useState<SearchTarget>('work');
    const [sortingTarget, setSortingTarget] = useState<SortingTarget>('createdAt');
    const [sortingOrder, setSortingOrder] = useState<SortOrder>('desc');
    const [categories, setCategories] = useState<string[]>([]);
    const [categoryQueryParam, setCategoryQueryParam] = useState<string>('');

    // 입력 조건 설정 패널 display
    const [filterPanelDisplay, setFilterPanelDisplay] = useState<'flex' | null>(null);

    // 단일작품 페이지 뷰
    const [singleWorkView, setSingleWorkView] = useState<boolean>(true);
    const [singleWorks, setSingleWorks] = useState<SingleWorkData[]>([]);


    const [exhibitionView, setExhibitionView] = useState<boolean>(false);
    const [exhibitions, setExhibitions] = useState<ExhibitionData[]>([]);

    // 현재 검색페이지 (0부터 시작
    const nextPageRef = useRef<number>(0);

    // 검색 데이터 없음 변수
    const [notFound, setNotFound] = useState<boolean>(false);

    // 단일작품 페이지 useFetch
    const {
        loading: singleWorkPageLoading,
        statusCode: singleWorkPageStatusCode,
        data: singleWorkPage,
        fetchRequest: singleWorkPageRequest
    } = useFetch<SingleWorkDataPage>();

    const handleSingleWorkPageRequest = () => {
        const method = ENDPOINTS.SINGLE_WORK.SEARCH.METHOD;
        const url = ENDPOINTS.SINGLE_WORK.SEARCH.URL(searchTarget, inputValue, categoryQueryParam, `${sortingTarget},${sortingOrder}`, nextPageRef.current, 30, user.id ? user.id : 0);

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        singleWorkPageRequest(options);
    }

    // 홈페이지 마운트하면 단일작품 첫 페이지 요청
    useEffect(function handleSingleWorkPageInitRequest() {
        handleSingleWorkPageRequest();
    }, []);

    useEffect(function handleSingleWorkPageResponse() {
        // 이전 요청에 대한 값이 남아있을 수 있으므로 loading으로 상태변화 체크
        if (!singleWorkPageLoading) {
            if (singleWorkPageStatusCode === 200 && singleWorkPage) {
                setNotFound(false);
                if (nextPageRef.current === 0) { // 첫 페이지 요청이면 append가 아닌 재할당
                    setSingleWorks(singleWorkPage.content)
                } else {
                    setSingleWorks((prev) => [...prev, ...singleWorkPage.content])
                }

                // 다음 페이지 번호 갱신
                nextPageRef.current++;

                return;
            }

            if (singleWorkPageStatusCode === 404) {
                setSingleWorks([]);
                setNotFound(true);
                return;
            }

            if (singleWorkPageStatusCode === 500) {
                return;
            }
        }

    }, [singleWorkPageStatusCode, singleWorkPage, singleWorkPageLoading]);

    // 스크롤 상단으로 이동 함수
    const scrollToTop = () => {
        if (scrollBoxRef.current) {
            scrollBoxRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // 전시회 페이지 useFetch
    const {
        loading: exhibitionPageLoading,
        statusCode: exhibitionPageStatusCode,
        data: exhibitionPage,
        fetchRequest: exhibitionPageRequest
    } = useFetch<ExhibitionDataPage>();

    const handleExhibitionPageRequest = () => {
        const method = ENDPOINTS.EXHIBITION.SEARCH.METHOD;
        const url = ENDPOINTS.EXHIBITION.SEARCH.URL(searchTarget, inputValue, `${sortingTarget},${sortingOrder}`, nextPageRef.current, 30, user.id ? user.id : 0);

        const options: FetchRequestOptions = {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        exhibitionPageRequest(options);
    }

    useEffect(function handleSingleWorkPageResponse() {
        // 이전 요청에 대한 값이 남아있을 수 있으므로 loading으로 상태변화 체크
        if (!exhibitionPageLoading) {
            if (exhibitionPageStatusCode === 200 && exhibitionPage) {
                setNotFound(false);
                if (nextPageRef.current === 0) { // 첫 페이지 요청이면 append가 아닌 재할당
                    setExhibitions(exhibitionPage.content)
                } else {
                    setExhibitions((prev) => [...prev, ...exhibitionPage.content])
                }

                // 다음 페이지 번호 갱신
                nextPageRef.current++;

                return;
            }

            if (exhibitionPageStatusCode === 404) {
                setExhibitions([]);
                setNotFound(true);
                return;
            }

            if (exhibitionPageStatusCode === 500) {
                return;
            }
        }

    }, [exhibitionPageStatusCode, exhibitionPage, exhibitionPageLoading]);



    // 스크롤 상태감지 함수
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollBox = e.currentTarget;
        const { scrollTop, scrollHeight, clientHeight } = scrollBox;
        const isBottom = scrollTop + clientHeight >= scrollHeight - 1;

        // 스크롤이 바닥에 닿았을 때 다음 페이지 요청
        if (singleWorkView) {
            if (isBottom && !singleWorkPageLoading && singleWorkPage && !singleWorkPage.last) {
                handleSingleWorkPageRequest();
            }

            setIsScrolled(scrollTop > 0);
        } else {
            if (isBottom && !exhibitionPageLoading && exhibitionPage && !exhibitionPage.last) {
                handleExhibitionPageRequest();
            }

            setIsScrolled(scrollTop > 0);
        }
    };

    // 검색 타겟 설정 함수
    const handleSearchTarget = (searchTarget: SearchTarget) => {
        setSearchTarget(searchTarget);
    };

    // 검색 정렬 설정 함수
    const handleSortingTarget = (sortTarget: SortingTarget, sortOrder: SortOrder) => {
        setSortingTarget(sortTarget);
        setSortingOrder(sortOrder);
    };

    // 검색 카테고리 설정 함수
    const handleCategoryTarget = (category: string) => {
        if (!categories.includes(category)) {
            setCategories((prevCategories) => [...prevCategories, category]);
        } else {
            setCategories((prevCategories) => prevCategories.filter((cat) => cat !== category));
        }
    };
    // 선택한 카테고리를 쿼리파라미터형태로 변환 useEffect
    useEffect(function convertToQueryParam() {
        setCategoryQueryParam(categories.join(','));
    }, [categories]);

    // 검색 조건 초기화 함수
    const handleReset = () => {
        setSearchTarget('work');
        setSortingTarget('createdAt');
        setSortingOrder('desc');
        setCategories([]);
    };


    // 검색 입력값 관리 함수
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.substring(0, 50);
        setInputValue(inputValue);
    };

    // 필터패널 display관리 함수
    const showFilterPanel = () => {
        if (filterPanelDisplay === 'flex') {
            setFilterPanelDisplay(null);

            return;
        }

        setFilterPanelDisplay('flex');
    }

    // 뷰 조작 함수
    const handleView = (event: React.MouseEvent<HTMLDivElement>) => {
        const id = (event.currentTarget as HTMLElement).id;

        nextPageRef.current = 0;
        if (id === 'single-work') {
            setSingleWorkView(true);
            setExhibitionView(false);
            setSingleWorks([]);
            handleSingleWorkPageRequest();

            return;
        }

        if (id === 'exhibition') {
            setExhibitionView(true);
            setSingleWorkView(false);
            setExhibitions([])
            handleExhibitionPageRequest();

            return;
        }
    }

    // 새 게시글 옵션 모달
    const handleNewPostOption = () => {
        if (isLoggedIn) {
            setNewPostOptionDisplay(!newPostOptionDisplay)
        } else {
            setAuthMessageDisplay(true);

            setTimeout(() => {
                setAuthMessageDisplay(false);
            }, 3000);
        }
    };

    // 새 단일작품 작성 페이지로 이동
    const navigateNewSingleWorkPage = () => {
        navigate('/new-singlework');
    }

    // 새 전시회 작성 페이지로 이동
    const navigateNewExhibitionPage = () => {
        navigate('/new-exhibition');
    }

    // single work 상세조회
    const handleOpenSingleWorkDetails = (singleWorkId?: number) => {
        // 받은 아이디로 열기
        if (openSingleWorkDetails) {
            setOpenSingleWorkDetails(false);

            return;
        }

        setOpenSingleWorkDetails(true);
        setSelectedSingleWorkId(singleWorkId);
    };

    // 새 게시글 작성 옵션 모달 리스너 등록 effect
    useEffect(function addNewPostOptionCloseListner() {
        const handleClickOutside = (event: MouseEvent) => {
            if (newPostOptionRef.current && !newPostOptionRef.current.contains(event.target as Node)) {
                setNewPostOptionDisplay(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = () => {
        scrollToTop();
        nextPageRef.current = 0;

        if (singleWorkView) {
            setSingleWorks([]);
            handleSingleWorkPageRequest();
        } else {
            setExhibitions([]);
            handleExhibitionPageRequest();
        }
    }

    // 디스코드 초대
    const handleInviteDiscordServer = () => {
        const width = 500;
        const height = 700;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        window.open(
            ' https://discord.gg/ZXk4zCExDz',  // 여기에 디스코드 초대 링크 입력
            '_blank',
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
    }

    const [isComposing, setIsComposing] = useState(false);
    const handleCompositionStart = () => {
        setIsComposing(true); // 한글 입력 시작
    };

    const handleCompositionEnd = () => {
        setIsComposing(false); // 한글 입력 종료
    };

    return (
        <Container>

            <Header />

            <SearchBox isScrolled={isScrolled}>

                <SearchBoxMainText isScrolled={isScrolled}>마주친 빛을 기록하는 곳, Photique</SearchBoxMainText>
                <SearchBoxSubText isScrolled={isScrolled}>순간의 빛을 당신의 시선으로 담아내세요</SearchBoxSubText>

                <SearchInputBox>
                    <SortingIcon id='sortIcon' src={sortingIcon} alt='분류' onClick={showFilterPanel}></SortingIcon>
                    <MainSearchIcon src={mainSearchIcon} alt='검색' onClick={handleSearch}></MainSearchIcon>
                    <SearchInput
                        value={inputValue}
                        onChange={handleInputChange}
                        onCompositionStart={handleCompositionStart}
                        onCompositionEnd={handleCompositionEnd}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (isComposing) {
                                    return; // 한글 입력 중이면 이벤트 무시
                                }
                                handleSearch();
                            }
                        }}
                        placeholder="검색어를 입력하세요"
                    />

                    {filterPanelDisplay && <FilterPanel
                        searchTarget={searchTarget}
                        handleSearchTarget={handleSearchTarget}
                        sortingTarget={sortingTarget}
                        handleSortingTarget={handleSortingTarget}
                        sortingOrder={sortingOrder}
                        categories={categories}
                        handleCategoryTarget={handleCategoryTarget}
                        handleReset={handleReset}
                        closePanel={showFilterPanel}
                    />}
                </SearchInputBox>

            </SearchBox>


            <ScrollBox
                ref={scrollBoxRef}
                onScroll={handleScroll}
            >

                <Tab>
                    <TabIconBox id='single-work' viewMode={singleWorkView} onClick={handleView}>
                        <GridIcon src={singleWorkView ? gridWhiteIcon : gridBlackIcon} alt='단일작품' />
                    </TabIconBox>
                    <TabIconBox id='exhibition' viewMode={exhibitionView} onClick={handleView}>
                        <GridIcon src={exhibitionView ? exhibitionWhiteIcon : exhibitionBlackIcon} alt='전시회' />
                    </TabIconBox>
                </Tab>

                {/* 현재 초기 검색말고 탭으로 옮겼을 때 검색 로딩이 안뜸? 어떻게 동작할지 정의, 검색했을 떄도 로딩이 안뜸, 뜰때도 있고 안뜰대도 있음 not found뜨고 검색하면 또 로딩안뜸 */}
                {!singleWorkPageLoading && !exhibitionPageLoading && notFound &&
                    <NotFoundBox>검색결과가 없습니다</NotFoundBox>
                }

                {singleWorkView &&
                    <SingleWorkView
                        handleOpenSingleWorkDetail={handleOpenSingleWorkDetails}
                        singleWorkDataPageLoading={singleWorkPageLoading}
                        singleWorks={singleWorks}
                        singleWorkDataStatusCode={singleWorkPageStatusCode}

                    />
                }

                {exhibitionView &&
                    <ExhibitionView
                        exhibitionDataPageLoading={exhibitionPageLoading}
                        exhibitions={exhibitions}
                        exhibitionDataPageStatusCode={exhibitionPageStatusCode}
                    />}

            </ScrollBox>


            <ActionBox>
                <ActionIconBox>
                    <ActionIcon src={upNonactiveIcon} activeSrc={upActiveIcon} onClick={scrollToTop} />
                </ActionIconBox>
                <ActionIconBox
                    onClick={handleNewPostOption}
                    ref={newPostOptionRef}
                >
                    {authMessageDisplay && <MessageBox>로그인이 필요합니다</MessageBox>}
                    <ActionIcon src={writeNonactiveIcon} activeSrc={writeActiveIcon} />


                    {newPostOptionDisplay &&
                        <NewPostItemBox>
                            <NewPostItem onClick={navigateNewSingleWorkPage}>
                                <NewPostItemIcon src={singleWorkIcon} />
                                <NewPostItemText>단일작품 올리기</NewPostItemText>
                            </NewPostItem>

                            <NewPostItem onClick={navigateNewExhibitionPage}>
                                <NewPostItemIcon src={exhibitionIcon} />
                                <NewPostItemText>전시회 개최하기</NewPostItemText>
                            </NewPostItem>

                        </NewPostItemBox>
                    }
                </ActionIconBox>


                <ActionIconBox onClick={handleInviteDiscordServer}>
                    <ActionIcon src={discordNonactiveIcon} activeSrc={discordActiveIcon} />
                </ActionIconBox>
            </ActionBox>

            {openSingleWorkDetails && <SingleWork singleWorkId={selectedSingleWorkId} close={handleOpenSingleWorkDetails}></SingleWork>}

        </Container>
    )
}

export default Home;