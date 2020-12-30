import { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import SearchBar from '../Components/SearchBar';
import * as api from '../Services/apiServices';
import s from './ViewStyles.module.css';

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const { url } = useRouteMatch();

  const onClick = request => {
    api.searchMovies(request).then(data => {
      if (!data.results.length) {
        toast.error('Nothing was found. Try again.');
        return;
      }
      setMovies(data.results);
    });
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <SearchBar onClick={onClick} />
      {movies && (
        <ul className={s.container}>
          {movies.map(film => (
            <li className={s.link} key={film.id}>
              <Link to={`${url}/${film.id}`}>{film.title || film.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Movies;
