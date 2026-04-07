import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';

function Liked() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: localStorage에서 찜 목록 불러와서 setMovies 처리
    const liked = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    setMovies(liked);
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: '24px', padding: '8px 16px', cursor: 'pointer' }}
      >
        ← 뒤로가기
      </button>
      <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>❤️ 찜 목록</h1>
      {movies.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>찜한 영화가 없어요 😢</p>
      ) : (
        <MovieList movies={movies} onMovieClick={(id) => navigate(`/detail/${id}`)} />
      )}
    </div>
  );
}

export default Liked;