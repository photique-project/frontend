import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SingleWorkBox from '../components/SingleWorkBox';
import ExhibitionCard from '../components/ExhibitionCard';
import ex1 from '../assets/ex1.jpg';
import ex2 from '../assets/ex2.jpg';
import ex3 from '../assets/ex3.jpg';
import ex4 from '../assets/ex4.jpg';
import ex5 from '../assets/ex5.jpg';
import ex6 from '../assets/ex6.jpg';
import ex7 from '../assets/ex7.jpg';
import ex8 from '../assets/ex8.jpg';
import ex9 from '../assets/ex9.jpeg';
import ex10 from '../assets/ex10.jpg';
import ex11 from '../assets/ex11.jpg';
import ex12 from '../assets/ex12.jpg';
import ex13 from '../assets/ex13.jpg';
import ex14 from '../assets/ex14.jpg';
import ex15 from '../assets/ex15.jpg';
import ex16 from '../assets/ex16.jpg';
import ex17 from '../assets/ex17.jpg';
import ex18 from '../assets/ex18.jpg';
import ex19 from '../assets/ex19.jpg';
import ex20 from '../assets/ex20.jpg';
import ex21 from '../assets/ex21.jpg';
import ex22 from '../assets/ex22.jpg';
import ex23 from '../assets/ex23.jpg';
import ex24 from '../assets/ex24.jpg';
import ex25 from '../assets/ex25.jpg';
import ex26 from '../assets/ex26.jpg';
import ex27 from '../assets/ex27.jpg';
import ex28 from '../assets/ex28.jpg';
import ex29 from '../assets/ex29.jpg';
import ex30 from '../assets/ex30.jpg';
import ex31 from '../assets/ex31.jpg';
import ex32 from '../assets/ex32.jpg';
import ex33 from '../assets/ex33.jpg';

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


const LikeView = () => {
    const [singleWorkView, setSingleWorkView] = useState<boolean>(true);
    const [exhibitionView, setExhibitionView] = useState<boolean>(false);
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth <= 768);

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
                                <SingleWorkBox src={ex1}></SingleWorkBox>
                                <SingleWorkBox src={ex4}></SingleWorkBox>
                                <SingleWorkBox src={ex7}></SingleWorkBox>
                                <SingleWorkBox src={ex10}></SingleWorkBox>
                                <SingleWorkBox src={ex13}></SingleWorkBox>
                                <SingleWorkBox src={ex16}></SingleWorkBox>
                                <SingleWorkBox src={ex19}></SingleWorkBox>
                                <SingleWorkBox src={ex22}></SingleWorkBox>
                                <SingleWorkBox src={ex25}></SingleWorkBox>
                                <SingleWorkBox src={ex28}></SingleWorkBox>
                                <SingleWorkBox src={ex31}></SingleWorkBox>
                            </SingleWorkColumn>
                            <SingleWorkColumn>
                                <SingleWorkBox src={ex2}></SingleWorkBox>
                                <SingleWorkBox src={ex5}></SingleWorkBox>
                                <SingleWorkBox src={ex8}></SingleWorkBox>
                                <SingleWorkBox src={ex11}></SingleWorkBox>
                                <SingleWorkBox src={ex14}></SingleWorkBox>
                                <SingleWorkBox src={ex17}></SingleWorkBox>
                                <SingleWorkBox src={ex20}></SingleWorkBox>
                                <SingleWorkBox src={ex23}></SingleWorkBox>
                                <SingleWorkBox src={ex26}></SingleWorkBox>
                                <SingleWorkBox src={ex29}></SingleWorkBox>
                                <SingleWorkBox src={ex32}></SingleWorkBox>
                            </SingleWorkColumn>
                            <SingleWorkColumn>
                                <SingleWorkBox src={ex3}></SingleWorkBox>
                                <SingleWorkBox src={ex6}></SingleWorkBox>
                                <SingleWorkBox src={ex9}></SingleWorkBox>
                                <SingleWorkBox src={ex12}></SingleWorkBox>
                                <SingleWorkBox src={ex15}></SingleWorkBox>
                                <SingleWorkBox src={ex18}></SingleWorkBox>
                                <SingleWorkBox src={ex21}></SingleWorkBox>
                                <SingleWorkBox src={ex24}></SingleWorkBox>
                                <SingleWorkBox src={ex27}></SingleWorkBox>
                                <SingleWorkBox src={ex30}></SingleWorkBox>
                                <SingleWorkBox src={ex33}></SingleWorkBox>
                            </SingleWorkColumn>
                        </>
                    }
                    {isSmallScreen &&
                        <SingleWorkColumn>
                            <SingleWorkBox src={ex1}></SingleWorkBox>
                            <SingleWorkBox src={ex4}></SingleWorkBox>
                            <SingleWorkBox src={ex7}></SingleWorkBox>
                            <SingleWorkBox src={ex10}></SingleWorkBox>
                            <SingleWorkBox src={ex13}></SingleWorkBox>
                            <SingleWorkBox src={ex16}></SingleWorkBox>
                            <SingleWorkBox src={ex19}></SingleWorkBox>
                            <SingleWorkBox src={ex22}></SingleWorkBox>
                            <SingleWorkBox src={ex25}></SingleWorkBox>
                            <SingleWorkBox src={ex28}></SingleWorkBox>
                            <SingleWorkBox src={ex31}></SingleWorkBox>
                            <SingleWorkBox src={ex2}></SingleWorkBox>
                            <SingleWorkBox src={ex5}></SingleWorkBox>
                            <SingleWorkBox src={ex8}></SingleWorkBox>
                            <SingleWorkBox src={ex11}></SingleWorkBox>
                            <SingleWorkBox src={ex14}></SingleWorkBox>
                            <SingleWorkBox src={ex17}></SingleWorkBox>
                            <SingleWorkBox src={ex20}></SingleWorkBox>
                            <SingleWorkBox src={ex23}></SingleWorkBox>
                            <SingleWorkBox src={ex26}></SingleWorkBox>
                            <SingleWorkBox src={ex29}></SingleWorkBox>
                            <SingleWorkBox src={ex32}></SingleWorkBox>
                            <SingleWorkBox src={ex3}></SingleWorkBox>
                            <SingleWorkBox src={ex6}></SingleWorkBox>
                            <SingleWorkBox src={ex9}></SingleWorkBox>
                            <SingleWorkBox src={ex12}></SingleWorkBox>
                            <SingleWorkBox src={ex15}></SingleWorkBox>
                            <SingleWorkBox src={ex18}></SingleWorkBox>
                            <SingleWorkBox src={ex21}></SingleWorkBox>
                            <SingleWorkBox src={ex24}></SingleWorkBox>
                            <SingleWorkBox src={ex27}></SingleWorkBox>
                            <SingleWorkBox src={ex30}></SingleWorkBox>
                            <SingleWorkBox src={ex33}></SingleWorkBox>
                        </SingleWorkColumn>
                    }
                </SingleWorkBoxes>}
            {exhibitionView &&
                <ExhibitionView>
                    <ExhibitionCard />
                    <ExhibitionCard />
                    <ExhibitionCard />
                    <ExhibitionCard />
                    <ExhibitionCard />
                    <ExhibitionCard />
                    <ExhibitionCard />
                    <ExhibitionCard />
                    <ExhibitionCard />
                    <ExhibitionCard />
                    <ExhibitionCard />
                    <ExhibitionCard />
                    <ExhibitionCard />
                    <ExhibitionCard />
                    <ExhibitionCard />


                </ExhibitionView>
            }
        </>
    )
}

export default LikeView;