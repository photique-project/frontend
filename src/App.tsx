import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styled from 'styled-components';
import Intro from './pages/Intro';
import Join from './pages/Join';
import SNSJoin from './pages/SNSJoin';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import NewSingleWork from './pages/NewSingleWork';
import NewExhibition from './pages/NewExhibition';
import Exhibition from './pages/Exhibition';
import SingleWorkUpdate from './pages/SingleWorkUpdate';
import MyPage from './pages/MyPage';
import Notification from './pages/Notification';

import logo from './assets/logo.png';



const AppContainer = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #F9FBFF;
`;

const BlockBox = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 20px;
`

const Logo = styled.img`
    width: 150px;
`

const BlockMessage = styled.div`
    background-color: #F9FBFF;
    font-size: 16px;
    font-weight: 700;
`;

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opener;
    if (/android/i.test(userAgent) || /iPhone|iPod/i.test(userAgent)) {
      setIsMobile(true);
    }
  }, []);

  if (isMobile) {
    return (
      <BlockBox>
        <Logo src={logo} />
        <BlockMessage>
          모바일 환경에서는 접속할 수 없습니다.<br /> PC로 접속해 주세요.
        </BlockMessage>
      </BlockBox>
    );
  }



  return (
    <Router>
      <AppContainer>
        <Routes>

          <Route path="/" element={<Intro />} />
          <Route path="/join" element={<Join />} />
          <Route path="/sns-join" element={<SNSJoin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/new-singlework" element={<NewSingleWork />} />
          <Route path="/new-exhibition" element={<NewExhibition />} />
          <Route path="/singleworks/:singleWorkId/update" element={<SingleWorkUpdate />} />
          <Route path="/exhibitions/:exhibitionId" element={<Exhibition />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/notification" element={<Notification />} />

        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
