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
margin-bottom: 100px;
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

interface ExhibitionViewProps {
    exhibitionDataPageLoading: boolean;
    exhibitions: ExhibitionData[];
    exhibitionDataPageStatusCode: number;
}



const ExhibitionView: React.FC<ExhibitionViewProps> = (props) => {
    const { exhibitionDataPageLoading, exhibitions, exhibitionDataPageStatusCode } = props;

    return (
        <>
            {exhibitions &&
                <Container>
                    {exhibitions.map((exhibition, index) => (
                        <ExhibitionCard
                            key={exhibition.id}
                            exhibitionData={exhibition}
                        />

                    ))}

                </Container>
            }
            {exhibitionDataPageLoading &&
                <LoadingBox>
                    <Loader fontColor='black' />
                </LoadingBox>
            }
        </>
    )
}

export default ExhibitionView;