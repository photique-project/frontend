import { useState, useEffect } from 'react';
import styled from 'styled-components';

import ExhibitionCard from './ExhibitionCard';
import Loader from './Loader';



const Container = styled.div`
    margin-top: 40px;
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

const LoadingBox = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    font-weight: 700;
`



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

interface ExhibitionViewProps {
    exhibitionDataPageLoading: boolean;
    exhibitionDataPage: ExhibitionDataPage;
    exhibitionDataPageStatusCode: number;
}



const ExhibitionView: React.FC<ExhibitionViewProps> = (props) => {
    const { exhibitionDataPageLoading, exhibitionDataPage, exhibitionDataPageStatusCode } = props;

    const [exhibitions, setExhibitions] = useState<ExhibitionData[]>([]);
    const [notFound, setNotFound] = useState<boolean>(false);

    // 검색한 전시회 배열 할당
    useEffect(function isCompletedLoading() {
        if (!exhibitionDataPageLoading && exhibitionDataPage) {
            if (exhibitionDataPage.pageable.pageNumber === 0) {
                setExhibitions(exhibitionDataPage.content)
            } else {
                setExhibitions((prev) => [...prev, ...exhibitionDataPage.content])
            }
        }
    }, [exhibitionDataPageLoading])

    // 404가 나왔다면 검색결과가 아예 없으므로 검색결과 없다는 표시필요
    useEffect(function isNotFound() {
        if (exhibitionDataPageStatusCode == 200) {
            setNotFound(false);
        }

        if (exhibitionDataPageStatusCode == 404) {
            setNotFound(true);
        }

    }, [exhibitionDataPageStatusCode])


    return (
        <>
            {exhibitionDataPageLoading &&
                <LoadingBox>
                    <Loader fontColor='black' />
                </LoadingBox>
            }
            {!exhibitionDataPageLoading && notFound &&
                <>
                    <LoadingBox>
                        검색결과가 없습니다
                    </LoadingBox>
                </>
            }
            {!exhibitionDataPageLoading && !notFound &&
                <Container>
                    {exhibitions.map((exhibition, index) => (
                        <ExhibitionCard
                            key={exhibition.id}
                            exhibitionData={exhibition}
                        />

                    ))}

                </Container>
            }
        </>
    )
}

export default ExhibitionView;