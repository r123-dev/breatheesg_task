import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logged from './pages/Logged';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import DataManager from './components/DataManager';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/dm" element={<Logged children={<DataManager />}/>} />
          <Route path="/user/*" element={<Logged children={<NotFoundPage />}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
