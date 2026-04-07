import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/MovieDetail';
import Liked from './pages/Liked';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/liked" element={<Liked />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;