import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import IntroCard from '../components/IntroCard';
import Footer from '../components/Footer';

import cameraIcon from '../assets/camera.png';
import exhibitionIcon from '../assets/exhibition.png';
import personIcon from '../assets/person.png';
import searchIcon from '../assets/search.png';



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

const BodyBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    width: 100%; 
    overflow-y: scroll;
    
    &::-webkit-scrollbar {
        width: 7px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px; 
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

const FirstIntroBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    padding-top: 70px;
    padding-bottom: 70px; 
    flex-shrink: 0;
    
    background-color: black;

    @media (max-width: 768px) {
        padding-top: 50px;
        padding-bottom: 50px; 
    }
`;

const MainText = styled.div`
    margin-left: 50px;
    margin-right: 50px;

    color: white;
    font-size: 30px;
    font-weight: 700;
    line-height: 50px;

    @media (max-width: 768px) {
        font-size: 24px;
        line-height: 30px;
    }
`;

const SubText = styled.div`
    margin-top:10px;
    margin-left: 50px;
    margin-right: 50px;
    
    font-size: 25px;
    line-height: 30px;
    color: white;

    @media (max-width: 768px) {
        font-size: 20px;
        line-height: 24px;
        margin-top: 20px;
    }
`;

const MainShortcutButton = styled.button`
    margin-top:60px;
    width: 300px;
    height: 70px;
    
    font-size: 20px;
    font-weight: 700;
    line-height: 20px;
    
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: #F9FBFF;
    cursor: pointer;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.9);
    }

    @media (max-width: 768px) {
        width: 200px;
        height: 50px;

        font-size: 14px;
        line-height: 14px;
        margin-top: 40px;
    }

    @media (max-width: 432px) {
        width: 80%;
    }
`;

const SecondIntroBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
`;

const SecondIntroBoxMainText = styled.div`
    margin-top: 100px;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    color: black;
    font-size: 30px;
    font-weight: 700;
    line-height: 31px;

    @media (max-width: 768px) {
        margin-top: 80px;
        font-size: 20px;
        line-height: 20px;
    }
`;

const SecondIntroBoxCardBox = styled.div`
    margin-top: 40px;
    width: 1200px;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;

    @media (max-width: 1200px) {
        width: 90%;
    }
`;

const ThirdIntroBox = styled.div`
    margin-top: 100px;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: white;
`;

const ThirdIntroBoxMainText = styled.div`
    margin-top: 100px;

    font-size: 30px;
    font-weight: 700;
    line-height: 31px;

    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    @media (max-width: 768px) {
        margin-top: 80px;
        font-size: 20px;
        line-height: 20px;
    }
`;

const ThirdIntroBoxSubText = styled.div`
    margin-top: 40px;
    margin-bottom: 100px;
    width: 60%;

    font-size: 20px;
    font-weight: 700;
    line-height: 30px;


    color: rgba(0, 0, 0, 0.5);

    @media (max-width: 768px) {
        font-size: 16px;
        line-height: 24px;
    }
`;



const Intro = () => {
    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate('/home');
    };

    return (
        <Container>
            <Header />

            <BodyBox>

                <FirstIntroBox>
                    <MainText>Photique에서 당신의 독창적인 시선을 남겨주세요 !</MainText>
                    <SubText>작품을 꺼내고 전시회를 열어보세요</SubText>
                    <MainShortcutButton onClick={navigateToHomePage}>photique 바로가기</MainShortcutButton>
                </FirstIntroBox>

                <SecondIntroBox>
                    <SecondIntroBoxMainText>서비스</SecondIntroBoxMainText>

                    <SecondIntroBoxCardBox>
                        <IntroCard icon={cameraIcon} mainText="작품 업로드" subText="사진을 쉽게 업로드하고 다른 작가의 사진을 감상할 수 있어요" />
                        <IntroCard icon={exhibitionIcon} mainText="전시회 개최" subText="작품을 모아 하나의 주제로 전시회를 개최할 수 있어요" />
                        <IntroCard icon={personIcon} mainText="작가 팔로우" subText={<>다른 작가의 팔로우를 통해 소식을 받아볼 수 있어요<br />또한 직접 메시지를 주고 받을 수도 있어요</>} />
                        <IntroCard icon={searchIcon} mainText="작품 검색" subText={<>원하는 작품을 빠르고 쉽게 찾아보세요<br />여러 카테고리와 더불어 해시태그를 기반으로 검색할 수 있어요</>} />
                    </SecondIntroBoxCardBox>
                </SecondIntroBox>

                <ThirdIntroBox>
                    <ThirdIntroBoxMainText>Photique 란?</ThirdIntroBoxMainText>

                    <ThirdIntroBoxSubText>Photique는 당신의 시선을 담아내는 공간입니다. 그저 파일 속에만 남아 있는 숨겨진 작품이 아닌, 세상과 소통하는 특별한 사진으로 꺼내 보세요. 단 한 장의 사진으로도 세상에 당신의 시선을 남길 수 있습니다.<br /><br />
                        누구나 특별한 순간을 포착할 수 있는 시대<br />
                        일상 속 숨겨진 예술을 세상과 공유하고, 자신만의 독특한 작품을 전시하는 즐거움을 photique에서 느껴보세요.<br /><br />
                        평범한 순간도 예술이 될 수 있습니다.
                    </ThirdIntroBoxSubText>
                </ThirdIntroBox>

                <Footer />

            </BodyBox>

        </Container >


    )
}

export default Intro;