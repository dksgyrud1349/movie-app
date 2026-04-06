import { useState } from 'react';
import MovieList from './components/MovieList';

function App() {
  const [search, setSearch] = useState('');

  return (
    <div style={{maxWidth: '900px', margin: '0 auto', padding: '32px'}}>
      <h1 style={{textAlign: 'center', marginBottom: '24px'}}>🎬 영화 검색 앱</h1>
      <div style={{textAlign: 'center', marginBottom: '32px'}}>
        <input
          type="text"
          placeholder="영화 제목을 검색하세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '12px 20px',
            fontSize: '16px',
            width: '360px',
            borderRadius: '24px',
            border: '2px solid #e0e0e0',
            outline: 'none',
          }}
        />
      </div>
      <MovieList search={search}/>
    </div>
  );
}

export default App;
