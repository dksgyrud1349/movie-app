import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetail } from '../api';

function Detail() {
  const { id } = useParams();  // URL에서 id를 꺼냄
  const navigate = useNavigate();  // 페이지 이동 함수. 괄호 안에 -1을 넣으면 이전 페이지, '/'이면 홈으로 이동
  const [movie, setMovie] = useState(null);  // movie : 영화 상세 정보를 담는 것. setMovie는 정보를 담는 함수
  const [loading, setLoading] = useState(true);  // loading : true이면 로딩중, false : 로딩중 아님
  const [isLiked, setIsLiked] = useState(false);  // isLiked : 찜 여부를 나타냄. true : 찜, false : 찜 아님. 

  useEffect(() => {
    // TODO: id로 영화 상세 정보 API 연결
    // fetchMovieDetail(id) 호출 후 setMovie, setLoading 처리
    const loadMovie = async() => {
        const data = await fetchMovieDetail(id);
        setMovie(data);
        setLoading(false);

        // TODO: localStorage에서 찜 목록 불러와서 현재 영화가 있으면 setIsLiked(true)
        const liked = JSON.parse(localStorage.getItem('likedMovies') || '[]');
        const likeMovie = liked.filter((m) => m.id === data.id);
        if(likeMovie.length > 0) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    };
    loadMovie();
  }, [id]);

  const handleLike = () => {
    // TODO: localStorage에서 찜 목록 불러오기
    const liked = JSON.parse(localStorage.getItem('likedMovies') || '[]');

    if (isLiked) {
      // TODO: 이미 찜한 경우 → 찜 목록에서 제거 후 localStorage 저장
      // 찜 목록에서 제거
      const newLiked = liked.filter((m) => m.id !== movie.id);
      localStorage.setItem('likedMovies', JSON.stringify(newLiked));
    } else {
      // TODO: 찜 안 한 경우 → 찜 목록에 추가 후 localStorage 저장
      // 찜 목록에 추가
      const newLiked = [...liked, movie];
      localStorage.setItem('likedMovies', JSON.stringify(newLiked));
    }
    setIsLiked(!isLiked);
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '100px' }}>로딩 중...</p>;
  if(!movie) return null;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: '24px', padding: '8px 16px', cursor: 'pointer' }}
      >
        ← 뒤로가기
      </button>
      <div style={{ display: 'flex', gap: '32px' }}>
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : ''}
          alt={movie.title}
          style={{ width: '250px', borderRadius: '12px' }}
        />
        <div>
          <h1>{movie.title}</h1>
          <p style={{ color: '#888' }}>📅 {movie.release_date}</p>
          <p style={{ color: '#f5a623' }}>⭐ {movie.vote_average?.toFixed(1)}</p>
          <button
            onClick={handleLike}
            style={{
              marginTop: '16px',
              padding: '10px 24px',
              fontSize: '16px',
              borderRadius: '24px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: isLiked ? '#ff4757' : '#e0e0e0',
              color: isLiked ? 'white' : 'black',
            }}
          >
            {isLiked ? '❤️ 찜 취소' : '🤍 찜하기'}
          </button>
          <p style={{ marginTop: '16px', lineHeight: '1.6' }}>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;