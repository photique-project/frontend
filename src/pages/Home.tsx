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
import helpActiveIcon from '../assets/help-active.png';
import helpNonactiveIcon from '../assets/help-nonactive.png';
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
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    

    background-color: black;

    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.3);
    z-index: 1;
`

const SearchBoxMainText = styled.div<{ isScrolled: boolean }>`
    margin-top: ${({ isScrolled }) => (isScrolled ? '0' : '70px')};
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
    margin-top: ${({ isScrolled }) => (isScrolled ? '0' : '15px')};
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
    height: 65px;
    

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 15px;

    border-radius: 35px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2);

    background-color: white;

    @media (max-width: 480px) {
        margin-top: 80px;
        width: 180px;
        height: 45px;
    }
`;

const TabIconBox = styled.div<{ viewMode: boolean }>`
    width: 55px;
    height: 55px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    border-radius: 27.5px;

    background-color: ${({ viewMode }) => (viewMode ? 'black' : 'white')};
    transition: background-color 0.3s ease-in-out;

    cursor: pointer;

    &:hover {
        background-color: ${({ viewMode }) => (viewMode ? 'black' : 'rgba(0, 0, 0, 0.08)')};
    }

    @media (max-width: 480px) {
        width: 35px;
        height: 35px;
    }
`;

const GridIcon = styled.img`
    width: 32px;
    height: 32px;

    @media (max-width: 480px) {
        width: 24px;
        height: 24px;
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

const HistoryPanelIconBox = styled.div`
    width: 50px;
    height: 50px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    position: fixed;
    top: calc(50% - 25px);
    right: 0;


    @media (max-width: 480px) {
        display: none;
    }
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
    pageable: {
        pageNumber: number;
    }
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
    pageable: {
        pageNumber: number;
    }
    last: boolean;
}

const Home = () => {

    const user = useAuthStore.getState().user;
    const categoryMap: { [key: string]: string } = {
        "풍경": "landscape",
        "인물": "portrait",
        "동물": "animal",
        "식물": "plant",
        "건축": "architecture",
        "여행": "travel",
        "음식": "food",
        "스포츠": "sports",
        "흑백": "blackAndWhite",
        "야경": "nightscape",
        "길거리": "street",
        "추상": "abstract",
        "이벤트": "event",
        "패션": "fashion"
    };

    useEffect(function clearLocationState() {
        // 업데이트 페이지에서 홈으로 넘어왔을 떄 useLocation을 활용해서 state를 넘기는데
        // 새로고침하면 해당 state가 유지되는 문제가 발생하여 추가한 useEffect
        if (location.state) {
            navigate(location.pathname, { replace: true, state: null });
        }
    }, []);

    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = useAuthStore.getState().isLoggedIn;

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
    const [openSingleWorkDetail, setOpenSingleWorkDetail] = useState<boolean>(location.state?.singleWorkId !== undefined ? true : false);
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

    // 세 가지 뷰
    const [singleWorkView, setSingleWorkView] = useState<boolean>(true);
    const [exhibitionView, setExhibitionView] = useState<boolean>(false);

    // 현재 검색페이지
    const [page, setPage] = useState<number>(0);

    // 단일작품 페이지 useFetch
    const {
        loading: singleWorkDataPageLoading,
        statusCode: singleWorkDataPageStatusCode,
        data: singleWorkDataPage,
        fetchRequest: singleWorkDataPageRequest
    } = useFetch<SingleWorkDataPage>();

    const handleSingleWorkDataPageRequest = (page: number) => {
        const method = ENDPOINTS.SINGLE_WORK.SEARCH.METHOD;
        const url = ENDPOINTS.SINGLE_WORK.SEARCH.URL;

        const options: FetchRequestOptions = {
            url: `${url(searchTarget, inputValue, categoryQueryParam, `${sortingTarget},${sortingOrder}`, page, 30, user.id ? user.id : 0)}`,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        singleWorkDataPageRequest(options);
    }

    // 홈페이지 마운트하면 단일작품 첫 페이지 요청
    useEffect(function requestSearchSingleWork() {
        handleSingleWorkDataPageRequest(0);
    }, []);



    // 인기 단일작품 가져오는 useFetch
    const {
        loading: popularSingleWorkLoading,
        statusCode: popularSingleWorkStatusCode,
        data: popularSingleWorkData,
        fetchRequest: popularSingleWorkRequest
    } = useFetch<SingleWorkData>();

    // 홈페이지 마운트하면 인기 단일작품 요청
    useEffect(function requestPopularSingleWorkRequest() {
        const method = ENDPOINTS.SINGLE_WORK.GET_POPULAR.METHOD;
        const url = ENDPOINTS.SINGLE_WORK.GET_POPULAR.URL;

        const options: FetchRequestOptions = {
            url: `${url(user.id ? user.id : 0)}`,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        popularSingleWorkRequest(options);
    }, []);



    // 스크롤 상단으로 이동 함수
    const scrollToTop = () => {
        if (scrollBoxRef.current) {
            scrollBoxRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // 전시회 페이지 useFetch
    const {
        loading: exhibitionDataPageLoading,
        statusCode: exhibitionDataPageStatusCode,
        data: exhibitionDataPage,
        fetchRequest: exhibitionDataPageRequest
    } = useFetch<ExhibitionDataPage>();

    const handleExhibitionDataPageRequest = (page: number) => {
        const method = ENDPOINTS.EXHIBITION.SEARCH.METHOD;
        const url = ENDPOINTS.EXHIBITION.SEARCH.URL;

        const options: FetchRequestOptions = {
            url: `${url(searchTarget, inputValue, `${sortingTarget},${sortingOrder}`, page, 30, user.id ? user.id : 0)}`,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            contentType: 'application/json',
        }

        exhibitionDataPageRequest(options);
    }

    // 정상응답이 왔다면 현재 페이지 값으로 할당
    useEffect(function incrementSingleWorkPage() {
        if (singleWorkDataPage) {
            setPage(singleWorkDataPage.pageable.pageNumber);
        }

        if (exhibitionDataPage) {
            setPage(exhibitionDataPage.pageable.pageNumber);
        }

    }, [singleWorkDataPage, exhibitionDataPage]);

    // 스크롤 상태감지 함수
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollBox = e.currentTarget;
        const { scrollTop, scrollHeight, clientHeight } = scrollBox;
        const threshold = (scrollHeight - clientHeight) * (4 / 5);

        // 스크롤 페이지를 2/3 이상 넘었고 마지막페이지가 아니라면 다음 페이지 요청
        if (singleWorkView) {
            if (scrollTop >= threshold && !singleWorkDataPageLoading && singleWorkDataPage && !singleWorkDataPage.last) {
                handleSingleWorkDataPageRequest(page + 1);
            }

            setIsScrolled(scrollTop > 0);
        } else {
            if (scrollTop >= threshold && !exhibitionDataPageLoading && exhibitionDataPage && !exhibitionDataPage.last) {
                handleExhibitionDataPageRequest(page + 1);
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
        const array = categories.map((category) => categoryMap[category]);
        setCategoryQueryParam(array.join(','));
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

        if (id === 'single-work') {
            setSingleWorkView(true);
            setExhibitionView(false);
            handleSingleWorkDataPageRequest(0);

            return;
        }

        if (id === 'exhibition') {
            setExhibitionView(true);
            setSingleWorkView(false);
            handleExhibitionDataPageRequest(0);

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
    const handleOpenSingleWorkDetail = (singleWorkId?: number) => {
        // 받은 아이디로 열기
        if (openSingleWorkDetail) {
            setOpenSingleWorkDetail(false);

            return;
        }

        setOpenSingleWorkDetail(true);
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
        if (singleWorkView) {
            handleSingleWorkDataPageRequest(0);
        } else {
            handleExhibitionDataPageRequest(0);
        }
    }

    // 디스코드 초대
    const handleInviteDiscordServer = () => {
        const width = 500;
        const height = 700;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        window.open(
            ' https://discord.gg/Q5SNJaCC',  // 여기에 디스코드 초대 링크 입력
            '_blank',
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );

    }


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


            <ScrollBox ref={scrollBoxRef} onScroll={handleScroll}>

                <Tab>
                    <TabIconBox id='single-work' viewMode={singleWorkView} onClick={handleView}>
                        <GridIcon src={singleWorkView ? gridWhiteIcon : gridBlackIcon} alt='단일작품' />
                    </TabIconBox>
                    <TabIconBox id='exhibition' viewMode={exhibitionView} onClick={handleView}>
                        <GridIcon src={exhibitionView ? exhibitionWhiteIcon : exhibitionBlackIcon} alt='전시회' />
                    </TabIconBox>
                </Tab>

                {singleWorkView &&
                    <SingleWorkView
                        handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}
                        popularSingleWorkLoading={popularSingleWorkLoading}
                        popularSingleWorkData={popularSingleWorkData}
                        singleWorkDataPageLoading={singleWorkDataPageLoading}
                        singleWorkDataPage={singleWorkDataPage}
                        singleWorkDataStatusCode={singleWorkDataPageStatusCode}
                    />
                }

                {exhibitionView && <ExhibitionView
                    exhibitionDataPageLoading={exhibitionDataPageLoading}
                    exhibitionDataPage={exhibitionDataPage}
                    exhibitionDataPageStatusCode={exhibitionDataPageStatusCode}
                />}

            </ScrollBox>


            <ActionBox>
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


                <ActionIconBox>
                    <ActionIcon src={upNonactiveIcon} activeSrc={upActiveIcon} onClick={scrollToTop} />
                </ActionIconBox>
                <ActionIconBox>
                    <ActionIcon src={helpNonactiveIcon} activeSrc={helpActiveIcon} />
                </ActionIconBox>
                <ActionIconBox onClick={handleInviteDiscordServer}>
                    <ActionIcon src={discordNonactiveIcon} activeSrc={discordActiveIcon} />
                </ActionIconBox>
            </ActionBox>

            {openSingleWorkDetail && <SingleWork singleWorkId={selectedSingleWorkId} close={handleOpenSingleWorkDetail}></SingleWork>}

        </Container>
    )
}

export default Home;