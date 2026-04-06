import MovieCard from "./MovieCard";

const dummyMovies = [
    {id: 1, title: '인터스텔라', year: 2014, rating: 8.7},
    {id: 2, title: '기생충', year: 2019, rating: 8.5},
    {id: 3, title: '어벤져스', year: 2012, rating: 8.0},
    {id: 4, title: '올드보이', year: 2003, rating: 8.4},
    {id: 5, title: '매트릭스', year: 1999, rating: 8.7},
    {id: 6, title: '타이타닉', year: 1997, rating: 7.9},
];

function MovieList({search}) {
    const filtered = dummyMovies.filter((movie) =>
        movie.title.includes(search)
    );
    return (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 160px)', gap: '24px', justifyContent: 'center'}}>
            {filtered.length > 0 ? (
                filtered.map((movie) => (
                    <MovieCard
                    key={movie.id}
                    title={movie.title}
                    year={movie.year}
                    rating={movie.rating}/>
                ))
            ) : (<p>검색 결과가 없어요 😢</p>)}
        </div>
    );
}

export default MovieList;