import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import sortingIcon from '../assets/sorting.png';
import mainSearchIcon from '../assets/main-search.png';
import Tag from '../components/Tag';
import FilterPanel from '../components/FilterPanel';
import gridBlackIcon from '../assets/grid-black.png';
import gridWhiteIcon from '../assets/grid-white.png';
import exhibitionBlackIcon from '../assets/exhibition-black.png';
import exhibitionWhiteIcon from '../assets/exhibition-white.png';
import likeBlackIcon from '../assets/like-black.png';
import likeWhiteIcon from '../assets/like-white.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;

    background-color: #F9FBFF;
`;

const SearchBox = styled.div`
    width: 100%;
    height: 300px;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: black;

    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.3);
`

const SearchBoxMainText = styled.div`
    margin-top: 70px;

    font-size: 30px;
    line-height: 40px;
    font-weight: 700;
    color: white;
`

const SearchBoxSubText = styled.div`
    margin-top: 15px;
    font-size: 20px;
    line-height: 40px;
    color: #BCBFD2;
`

const SearchInputBox = styled.div`
    margin-top: 15px;
    width: 800px;
    height: 40px;

    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;

`

const SearchInput = styled.input<{ isTagMode: boolean }>`
  width: 700px;
  height: 40px;
  padding-left: 50px;
  padding-right: 50px;
  
  background-color: #333333;
  border-radius: 10px;

  font-size: 16px;
  line-height: 17px;
  color: ${({ isTagMode }) => (isTagMode ? '#BCBFD2' : 'white')};
  font-weight: ${({ isTagMode }) => (isTagMode ? '700' : '400')};
  
  position: absolute;
`;


const SortingIcon = styled.img`
    margin-left: 10px;
    width: 30px;

        
    cursor: pointer;
    z-index: 1;
`

const MainSearchIcon = styled.img`
    margin-right: 10px;
    width: 30px;
    
    cursor: pointer;
    z-index: 1;
`

const TagBox = styled.div`
    margin-top: 12px;
    width: 800px;
    height: 40px;

    display: flex;
    flex-direction: row;

    gap: 10px;
`;

const ScrollBox = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    border: 5px solid #000000;
    box-sizing: border-box;
`;


const Tab = styled.div`
    margin-top: 100px;
    width: 220px;
    height: 65px;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    border-radius: 35px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2);

    background-color: white;
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
`;

const GridIcon = styled.img`
    width: 32px;
    height: 32px;
`;

const Home = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [isTagMode, setIsTagMode] = useState<boolean>(false);
    const [searchTarget, setSearchTarget] = useState<'work' | 'photographer' | null>(null);
    const [sortingTarget, setSortingTarget] = useState<'like' | 'last' | 'comment' | 'view' | 'recent' | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [filterPanelDisplay, setFilterPanelDisplay] = useState<'flex' | null>(null);
    const [singleWorkView, setSingleWorkView] = useState<boolean>(true);
    const [exhibitionView, setExhibitionView] = useState<boolean>(false);
    const [likeView, setLikeView] = useState<boolean>(false);

    const handleSearchTarget = (searchTarget: 'work' | 'photographer' | null) => {
        setSearchTarget(searchTarget);
    };

    const handleSortingTarget = (sorting: 'like' | 'last' | 'comment' | 'view' | 'recent' | null) => {
        setSortingTarget(sorting);
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
        const value = e.target.value;
        setInputValue(value);

        if (value.startsWith('@') && !value.includes(' ')) {
            setIsTagMode(true);
            return;
        }

        setIsTagMode(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isTagMode) {
            if (tags.length >= 5) {
                alert('태그는 최대 5개까지만 추가할 수 있습니다.');
                return;
            }

            const newTag = inputValue.slice(1);

            if (newTag) {
                setTags([...tags, newTag]);
                setInputValue('');
                setIsTagMode(false);
            }
        }
    };

    const handleTagRemove = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
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


    return (
        <Container>

            <Header />

            <SearchBox >

                <SearchBoxMainText>마주친 빛을 기록하는 곳, Photique</SearchBoxMainText>
                <SearchBoxSubText>순간의 빛을 당신의 시선으로 담아내세요</SearchBoxSubText>

                <SearchInputBox>
                    <SortingIcon src={sortingIcon} alt='분류' onClick={showFilterPanel}></SortingIcon>
                    <MainSearchIcon src={mainSearchIcon} alt='검색'></MainSearchIcon>
                    <SearchInput
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="검색어를 입력하세요"
                        isTagMode={isTagMode}
                    />
                </SearchInputBox>

                <TagBox>
                    {tags.map((tag, index) => (
                        <Tag key={index} text={tag} handleTagRemove={() => handleTagRemove(tag)}></Tag>
                    ))}
                </TagBox>

            </SearchBox>

            {filterPanelDisplay && <FilterPanel
                searchTarget={searchTarget}
                handleSearchTarget={handleSearchTarget}
                sortingTarget={sortingTarget}
                handleSortingTarget={handleSortingTarget}
                categories={categories}
                handleCategoryTarget={handleCategoryTarget}
                handleReset={handleReset}
                closePanel={showFilterPanel}
            />}


            <ScrollBox>

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


            </ScrollBox>



        </Container>
    )
}

export default Home;