import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import styled from 'styled-components';

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
          <Route path="/" element={<Home />} />

        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
