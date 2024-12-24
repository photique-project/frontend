import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Intro from './pages/Intro';
import Join from './pages/Join';
import SNSJoin from './pages/SNSJoin';
import ResetPassword from './pages/ResetPassword';

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

        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
