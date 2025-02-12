import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import SingleWorkView from '../components/SingleWorkView';
import LikeView from '../components/LikeView';
import Tag from '../components/Tag';
import FilterPanel from '../components/FilterPanel';
import ExhibitionView from '../components/ExhibitionView';

import sortingIcon from '../assets/sorting.png';
import mainSearchIcon from '../assets/main-search.png';
import gridBlackIcon from '../assets/grid-black.png';
import gridWhiteIcon from '../assets/grid-white.png';
import exhibitionBlackIcon from '../assets/exhibition-black.png';
import exhibitionWhiteIcon from '../assets/exhibition-white.png';
import likeBlackIcon from '../assets/like-black.png';
import likeWhiteIcon from '../assets/like-white.png';
import upActiveIcon from '../assets/up-active.png';
import upNonactiveIcon from '../assets/up-nonactive.png';
import writeActiveIcon from '../assets/write-active.png';
import writeNonactiveIcon from '../assets/write-nonactive.png'
import helpActiveIcon from '../assets/help-active.png';
import helpNonactiveIcon from '../assets/help-nonactive.png';
import discordActiveIcon from '../assets/discord-active.png';
import discordNonactiveIcon from '../assets/discord-nonactive.png';
import arrowLeftNonactiveIcon from '../assets/arrow-left-nonactive.png';
import arrowLeftActiveIcon from '../assets/arrow-left-active.png';
import arrowRightNonactiveIcon from '../assets/arrow-right-nonactive.png';
import arrowRightActiveIcon from '../assets/arrow-right-active.png';
import SingleWork from '../components/SingleWork';

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
    width: 220px;
    height: 65px;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

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

const HistoryPanelIcon = styled.img<{ activeSrc?: string }>`
    width: 36px;
    height: 36px;

    ${HistoryPanelIconBox}:hover & {
        content: url(${({ activeSrc }) => activeSrc});
    }
`


const Home = () => {
    const navigate = useNavigate();

    const scrollBoxRef = useRef<HTMLDivElement | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [openSingleWorkDetail, setOpenSingleWorkDetail] = useState<boolean>(false);
    const [selectedSingleWorkId, SetSelectedSingleWorkId] = useState<string>(null);

    const [searchTarget, setSearchTarget] = useState<'work' | 'writer'>('work');
    const [sortingTarget, setSortingTarget] = useState<'like' | 'last' | 'comment' | 'view' | 'recent'>('recent');
    const [sortingOrder, setSortingOrder] = useState<'asc' | 'desc'>('asc');
    const [categories, setCategories] = useState<string[]>([]);
    const [filterPanelDisplay, setFilterPanelDisplay] = useState<'flex' | null>(null);

    const [singleWorkView, setSingleWorkView] = useState<boolean>(true);
    const [exhibitionView, setExhibitionView] = useState<boolean>(false);
    const [likeView, setLikeView] = useState<boolean>(false);


    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollTop = e.currentTarget.scrollTop;
        setIsScrolled(scrollTop > 0);
    };

    const scrollToTop = () => {
        if (scrollBoxRef.current) {
            scrollBoxRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };


    const handleSearchTarget = (searchTarget: 'work' | 'writer') => {
        setSearchTarget(searchTarget);
    };

    const handleSortingTarget = (sorting: 'like' | 'last' | 'comment' | 'view' | 'recent') => {
        setSortingTarget(sorting);

        if (sorting === 'recent') {
            setSortingOrder('desc');
        }

        if (sorting === 'last') {
            setSortingOrder('asc');
        }

        if (sortingTarget === sorting) {
            if (sortingOrder === 'asc') {
                setSortingOrder('desc');

                return;
            }

            setSortingOrder('asc');
        }
    };





    const handleCategoryTarget = (category: string) => {
        if (!categories.includes(category)) {
            setCategories((prevCategories) => [...prevCategories, category]);
        } else {
            setCategories((prevCategories) => prevCategories.filter((cat) => cat !== category));
        }
    };

    const handleReset = () => {
        setSearchTarget(null);
        setSortingTarget(null);
        setCategories([]);
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.substring(0, 50);
        setInputValue(inputValue);
    };

    const showFilterPanel = () => {

        if (filterPanelDisplay === 'flex') {
            setFilterPanelDisplay(null);

            return;
        }

        setFilterPanelDisplay('flex');
    }

    const handleView = (event: React.MouseEvent<HTMLDivElement>) => {
        const id = (event.currentTarget as HTMLElement).id;

        if (id === 'single-work') {
            setSingleWorkView(true);
            setExhibitionView(false);
            setLikeView(false);

            return;
        }

        if (id === 'exhibition') {
            setExhibitionView(true);
            setSingleWorkView(false);
            setLikeView(false);

            return;
        }

        setLikeView(true);
        setExhibitionView(false);
        setSingleWorkView(false);
    }

    // 페이지 이동
    const navigateToNewPostPage = () => {
        if (singleWorkView || likeView) {
            navigate('/new-singlework');
            return;
        }

        navigate('/new-exhibition');
    };

    // single work 상세조회
    const handleOpenSingleWorkDetail = (singleWorkId?: string) => {
        // 받은 아이디로 열기
        if (openSingleWorkDetail) {
            setOpenSingleWorkDetail(false);

            return;
        }

        setOpenSingleWorkDetail(true);
        SetSelectedSingleWorkId(singleWorkId);
    };


    return (
        <Container>

            <Header />

            <SearchBox isScrolled={isScrolled}>

                <SearchBoxMainText isScrolled={isScrolled}>마주친 빛을 기록하는 곳, Photique</SearchBoxMainText>
                <SearchBoxSubText isScrolled={isScrolled}>순간의 빛을 당신의 시선으로 담아내세요</SearchBoxSubText>

                <SearchInputBox>
                    <SortingIcon id='sortIcon' src={sortingIcon} alt='분류' onClick={showFilterPanel}></SortingIcon>
                    <MainSearchIcon src={mainSearchIcon} alt='검색'></MainSearchIcon>
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
                    <TabIconBox id='like' viewMode={likeView} onClick={handleView}>
                        <GridIcon src={likeView ? likeWhiteIcon : likeBlackIcon} alt='좋아요 작품' />
                    </TabIconBox>
                </Tab>

                {singleWorkView && <SingleWorkView handleOpenSingleWorkDetail={handleOpenSingleWorkDetail} />}
                {exhibitionView && <ExhibitionView />}
                {likeView && <LikeView handleOpenSingleWorkDetail={handleOpenSingleWorkDetail} />}

            </ScrollBox>


            <ActionBox>
                <ActionIconBox>
                    <ActionIcon src={writeNonactiveIcon} activeSrc={writeActiveIcon} onClick={navigateToNewPostPage} />
                </ActionIconBox>
                <ActionIconBox>
                    <ActionIcon src={upNonactiveIcon} activeSrc={upActiveIcon} onClick={scrollToTop} />
                </ActionIconBox>
                <ActionIconBox>
                    <ActionIcon src={helpNonactiveIcon} activeSrc={helpActiveIcon} />
                </ActionIconBox>
                <ActionIconBox>
                    <ActionIcon src={discordNonactiveIcon} activeSrc={discordActiveIcon} />
                </ActionIconBox>
            </ActionBox>

            <HistoryPanelIconBox>
                <HistoryPanelIcon src={arrowLeftNonactiveIcon} activeSrc={arrowLeftActiveIcon} />
            </HistoryPanelIconBox>

            {openSingleWorkDetail && <SingleWork singleWorkId={selectedSingleWorkId} close={handleOpenSingleWorkDetail}></SingleWork>}

        </Container>
    )
}

export default Home;