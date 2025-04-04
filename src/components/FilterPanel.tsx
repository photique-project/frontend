import { useRef, useEffect } from 'react';
import styled from 'styled-components';

import ShortButton from './button/ShortButton';



const Container = styled.div`
    width: 770px;
    padding: 15px;

    display: flex;
    flex-direction: column;

    top: 50px;

    position: absolute;

    box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.25);

    border-radius: 10px;

    background-color: white;
    
    z-index: 1;

    @media (max-width: 900px) {
        width: calc(100% - 30px);
    }
`;

const SearchTargetText = styled.div`
    font-size: 16px;
    line-height: 17px;
    font-weight: 700;
`;

const SortingTargetText = styled.div`
    margin-top: 20px;
    font-size: 16px;
    line-height: 17px;
    font-weight: 700;
`;

const CategoryTargetText = styled.div`
    margin-top: 20px;
    font-size: 16px;
    line-height: 17px;
    font-weight: 700;
`;

const CheckboxInputBox = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const CheckboxInput = styled.input`
    accent-color: black;
`;

const CategoryCardBox = styled.div`
    margin-top:10px;
    width: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;

    gap: 5px;
`;

const CategoryCard = styled.div<{ checked: boolean }>`
    width: 104px;
    height: 35px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 3px;
    background-color: white;

    background-color: ${({ checked }) => (checked ? 'rgba(0, 0, 0, 0.1)' : 'white')};

    cursor: pointer;


    &:hover {
        background-color: ${({ checked }) => (checked ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)')};
    }
`;

const ButtonBox = styled.div`
    margin-top: 20px;
    width: 100%;
    
    display: flex;
    flex-direction: row;
    justify-content: right;

    gap: 10px;
`;



type SearchTarget = 'work' | 'writer';
type SortingTarget = 'createdAt' | 'likeCount' | 'viewCount' | 'commentCount';
type SortOrder = 'asc' | 'desc'

interface FilterPanelProps {
    searchTarget: SearchTarget;
    handleSearchTarget: (searchTarget: SearchTarget) => void;
    sortingTarget: SortingTarget;
    handleSortingTarget: (sortTarget: SortingTarget, sortOrder: SortOrder) => void;
    sortingOrder: SortOrder;
    categories: string[];
    handleCategoryTarget: (category: string) => void;
    handleReset: () => void;
    closePanel: () => void;
}



const FilterPanel: React.FC<FilterPanelProps> = (props) => {
    const {
        searchTarget,
        handleSearchTarget,
        sortingTarget,
        handleSortingTarget,
        sortingOrder,
        categories,
        handleCategoryTarget,
        handleReset,
        closePanel
    } = props;

    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(function handleClosePanel() {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (target.id === 'sortIcon') {
                return;
            }

            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                closePanel();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closePanel]);

    return (
        <Container ref={panelRef}>
            <SearchTargetText>검색대상</SearchTargetText>
            <CheckboxInputBox>
                <CheckboxLabel>
                    <CheckboxInput
                        type="checkbox"
                        value="work"
                        checked={searchTarget === 'work'}
                        onChange={() => handleSearchTarget('work')}
                    /> 작품
                </CheckboxLabel>
                <CheckboxLabel>
                    <CheckboxInput
                        type="checkbox"
                        value="writer"
                        checked={searchTarget === 'writer'}
                        onChange={() => handleSearchTarget('writer')}
                    /> 작가
                </CheckboxLabel>
            </CheckboxInputBox>

            <SortingTargetText>정렬</SortingTargetText>
            <CheckboxInputBox>
                <CheckboxLabel>
                    <CheckboxInput
                        type="checkbox"
                        value="createdAt"
                        checked={sortingTarget === 'createdAt' && sortingOrder === 'desc'}
                        onChange={() => handleSortingTarget('createdAt', 'desc')}
                    /> 최신순
                </CheckboxLabel>
                <CheckboxLabel>
                    <CheckboxInput
                        type="checkbox"
                        value="createdAt"
                        checked={sortingTarget === 'createdAt' && sortingOrder === 'asc'}
                        onChange={() => handleSortingTarget('createdAt', 'asc')}
                    /> 과거순
                </CheckboxLabel>
                <CheckboxLabel>
                    <CheckboxInput
                        type="checkbox"
                        value='like'
                        checked={sortingTarget === 'likeCount'}
                        onChange={() => handleSortingTarget('likeCount', sortingOrder === 'asc' ? 'desc' : 'asc')}
                    /> 좋아요 {sortingOrder === 'asc' ? '⬆️' : '⬇️'}
                </CheckboxLabel>
                <CheckboxLabel>
                    <CheckboxInput
                        type="checkbox"
                        value="view"
                        checked={sortingTarget === 'viewCount'}
                        onChange={() => handleSortingTarget('viewCount', sortingOrder === 'asc' ? 'desc' : 'asc')}
                    /> 조회수 {sortingOrder === 'asc' ? '⬆️' : '⬇️'}
                </CheckboxLabel>
                <CheckboxLabel>
                    <CheckboxInput
                        type="checkbox"
                        value="comment"
                        checked={sortingTarget === 'commentCount'}
                        onChange={() => handleSortingTarget('commentCount', sortingOrder === 'asc' ? 'desc' : 'asc')}
                    /> 댓글수 {sortingOrder === 'asc' ? '⬆️' : '⬇️'}
                </CheckboxLabel>
            </CheckboxInputBox>

            <CategoryTargetText>카테고리</CategoryTargetText>
            <CategoryCardBox>
                <CategoryCard
                    checked={categories.includes('landscape')}
                    onClick={() => handleCategoryTarget('landscape')}
                >풍경</CategoryCard>
                <CategoryCard
                    checked={categories.includes('portrait')}
                    onClick={() => handleCategoryTarget('portrait')}
                >인물</CategoryCard>
                <CategoryCard
                    checked={categories.includes('animal')}
                    onClick={() => handleCategoryTarget('animal')}
                >동물</CategoryCard>
                <CategoryCard
                    checked={categories.includes('plant')}
                    onClick={() => handleCategoryTarget('plant')}
                >식물</CategoryCard>
                <CategoryCard
                    checked={categories.includes('architecture')}
                    onClick={() => handleCategoryTarget('architecture')}
                >건축</CategoryCard>
                <CategoryCard
                    checked={categories.includes('travel')}
                    onClick={() => handleCategoryTarget('travel')}
                >여행</CategoryCard>
                <CategoryCard
                    checked={categories.includes('food')}
                    onClick={() => handleCategoryTarget('food')}
                >음식</CategoryCard>
                <CategoryCard
                    checked={categories.includes('sports')}
                    onClick={() => handleCategoryTarget('sports')}
                >스포츠</CategoryCard>
                <CategoryCard
                    checked={categories.includes('bw')}
                    onClick={() => handleCategoryTarget('bw')}
                >흑백</CategoryCard>
                <CategoryCard
                    checked={categories.includes('nightscape')}
                    onClick={() => handleCategoryTarget('nightscape')}
                >야경</CategoryCard>
                <CategoryCard
                    checked={categories.includes('street')}
                    onClick={() => handleCategoryTarget('street')}
                >길거리</CategoryCard>
                <CategoryCard
                    checked={categories.includes('abstraction')}
                    onClick={() => handleCategoryTarget('abstraction')}
                >추상</CategoryCard>
                <CategoryCard
                    checked={categories.includes('event')}
                    onClick={() => handleCategoryTarget('event')}
                >이벤트</CategoryCard>
                <CategoryCard
                    checked={categories.includes('fashion')}
                    onClick={() => handleCategoryTarget('fashion')}
                >패션</CategoryCard>
            </CategoryCardBox>

            <ButtonBox>
                <ShortButton text={'적용하기'} type={'white'} action={closePanel} />
                <ShortButton text={'초기화'} type={'black'} action={handleReset} />
            </ButtonBox>

        </Container>
    )
}

export default FilterPanel;