import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #F9FBFF;
`;

function App() {


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
