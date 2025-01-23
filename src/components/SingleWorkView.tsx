import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SingleWorkBox from '../components/SingleWorkBox';
import heartIcon from '../assets/heart.png';
import viewIcon from '../assets/view.png';
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


const BestSingleWorkBox = styled.div`
    margin-top: 40px;
    width: 1200px;

    display: flex;
    flex-direction: column;
    
    border-radius: 15px;

    position: relative;

    cursor: pointer;

    &:hover > div { 
        opacity: 1; 
    }

    @media (max-width: 1400px) {
        width: calc((6 / 7) * 100% - 90px);
    }

    @media (max-width: 480px) {
        width: calc((6 / 7) * 100%);
    }
`

const BestSingleWork = styled.img`
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;

    border-radius: 15px;
`

const BestSingleWorkInfo = styled.div`
    width: 100%;
    height: 80px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    

    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    background: linear-gradient(to bottom, #000000 0%, rgba(51, 51, 51, 0.5) 75%, rgba(102, 102 , 102, 0) 100%);

    position: absolute;

    opacity: 0; 
    transition: opacity 0.3s ease; 
`

const BestSingleWorkWriterBox = styled.div`
    margin-left: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const BestSingleWorkUserImage = styled.img`
    width: 40px;
    height: 40px;

    border-radius: 10px;
`

const BestSingleWorkUserNickname = styled.div`
    font-size: 20px;
    
    color: white;
`

const BestSingleWorkHitBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const BestSingleWorkLikeBox = styled.div`
    margin-right: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;
`

const BestSingleWorkLikeIcon = styled.img`
    width: 32px;
    height: 32px;
`

const BestSingleWorkLike = styled.div`
    font-size: 20px;
    
    color: white;
`

const BestSingleWorkViewBox = styled.div`
    margin-right: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;
`

const BestSingleWorkViewIcon = styled.img`
    width: 32px;
    height: 32px;
`

const BestSingleWorkView = styled.div`
    font-size: 20px;
    color: white;
`

const Line = styled.div`
    flex-shrink: 0;
    margin-top: 20px;
    width: 1200px;
    height: 2px;

    background-color: rgba(0, 0, 0, 0.2);

    @media (max-width: 1400px) {
        width: calc((6 / 7) * 100%  - 90px);
    }

    @media (max-width: 480px) {
        width: calc((6 / 7) * 100%);
    }
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

interface SingleWorkViewProps {
    handleOpenSingleWorkDetail: (singleWorkId?: string) => void;
}

const SingleWorkView: React.FC<SingleWorkViewProps> = (props) => {
    const { handleOpenSingleWorkDetail } = props;
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

    return (
        <>
            <BestSingleWorkBox>

                <BestSingleWorkInfo>

                    <BestSingleWorkWriterBox>
                        <BestSingleWorkUserImage src={ex1} alt='Best Single Work'></BestSingleWorkUserImage>
                        <BestSingleWorkUserNickname>닉네임</BestSingleWorkUserNickname>
                    </BestSingleWorkWriterBox>

                    <BestSingleWorkHitBox>
                        <BestSingleWorkLikeBox>
                            <BestSingleWorkLikeIcon src={heartIcon} alt='like'></BestSingleWorkLikeIcon>
                            <BestSingleWorkLike>831</BestSingleWorkLike>
                        </BestSingleWorkLikeBox>

                        <BestSingleWorkViewBox>
                            <BestSingleWorkViewIcon src={viewIcon} alt='view'></BestSingleWorkViewIcon>
                            <BestSingleWorkView>1.3k</BestSingleWorkView>
                        </BestSingleWorkViewBox>

                    </BestSingleWorkHitBox>

                </BestSingleWorkInfo>

                <BestSingleWork src={ex33}></BestSingleWork>
            </BestSingleWorkBox>

            <Line />

            <SingleWorkBoxes>
                {!isSmallScreen &&
                    <>
                        <SingleWorkColumn>
                            <SingleWorkBox src={ex1} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex4} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex7} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex10} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex13} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex16} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex19} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex22} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex25} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex28} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex31} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        </SingleWorkColumn>
                        <SingleWorkColumn>
                            <SingleWorkBox src={ex2} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex5} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex8} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex11} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex14} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex17} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex20} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex23} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex26} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex29} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex32} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        </SingleWorkColumn>
                        <SingleWorkColumn>
                            <SingleWorkBox src={ex3} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex6} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex9} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex12} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex15} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex18} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex21} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex24} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex27} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex30} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                            <SingleWorkBox src={ex33} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        </SingleWorkColumn>
                    </>
                }
                {isSmallScreen &&
                    <SingleWorkColumn>
                        <SingleWorkBox src={ex1} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex4} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex7} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex10} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex13} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex16} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex19} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex22} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex25} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex28} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex31} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex1} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex4} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex7} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex10} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex13} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex16} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex19} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex22} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex25} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex28} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex31} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex1} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex4} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex7} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex10} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex13} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex16} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex19} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex22} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex25} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex28} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                        <SingleWorkBox src={ex31} handleOpenSingleWorkDetail={handleOpenSingleWorkDetail}></SingleWorkBox>
                    </SingleWorkColumn>
                }
            </SingleWorkBoxes>
        </>
    )
}

export default SingleWorkView;