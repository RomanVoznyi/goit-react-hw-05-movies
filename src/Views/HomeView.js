import { useState, useEffect } from 'react';
import { Pagination } from '@material-ui/lab';
import MoviesList from '../Components/MoviesList';
import * as api from '../Services/apiServices';
import s from './ViewStyles.module.css';

const HomeView = () => {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    api.getPopular(page).then(data => {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    });
  }, [page]);

  const handleChange = (evt, value) => {
    setPage(value);
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>The most popular movies for today</h2>
      {movies && <MoviesList movies={movies} />}

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          boundaryCount={2}
          color="secondary"
        />
      )}
    </div>
  );
};

export default HomeView;
