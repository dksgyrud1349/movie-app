import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { fetchPopularMovies, searchMovies } from '../api';

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: 인기 영화 목록 API 연결
    const loadMovies = async() => {
        const data = await fetchPopularMovies();
        setMovies(data);
        setLoading(false);
    };
    loadMovies();
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    // TODO : 검색어가 비어있으면 인기 영화, 아니면 searchMovies() 호출
    if(value.trim() === '') {
      //  검색어가 비어있으면
      const data = await fetchPopularMovies();
      setMovies(data);
    } else {
      // 검색어가 비어있지 않으면
      const data = await searchMovies(value);
      setMovies(data);
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px' }}>
      <button
        onClick={() => navigate('/liked')}
        style={{ marginBottom: '24px', padding: '8px 16px', cursor: 'pointer', float: 'right' }}
      >
        ❤️ 찜 목록
      </button>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>🎬 영화 검색 앱</h1>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <input
          type="text"
          placeholder="영화 제목을 검색하세요"
          value={search}
          onChange={handleSearch}
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
      {loading ? (
        <p style={{ textAlign: 'center' }}>로딩 중...</p>
      ) : (
        <MovieList movies={movies} onMovieClick={handleMovieClick} />
      )}
    </div>
  );
}

export default Home;