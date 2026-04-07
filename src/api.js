const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = process.env.REACT_APP_TMDB_TOKEN;

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
};

// 인기 영화 목록
export async function fetchPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular?language=ko-KR`, options);
  const data = await res.json();
  return data.results;
}

// 영화 검색
export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${query}&language=ko-KR`,
    options
  );
  const data = await res.json();
  return data.results;
}

// 영화 상세 정보
export async function fetchMovieDetail(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?language=ko-KR`, options);
  const data = await res.json();
  return data;
}