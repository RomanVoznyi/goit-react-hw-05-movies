import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../Services/apiServices';
import s from './ViewStyles.module.css';

const HomeView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.getPopular().then(data => {
      setMovies(data.results);
    });
  }, []);

  return (
    <div className={s.container}>
      <h2 className={s.title}>The most popular movies for today</h2>
      {movies.length > 0 && (
        <ul>
          {movies.map(film => (
            <li className={s.link} key={film.id}>
              <Link to={`/movies/${film.id}`}>{film.title || film.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomeView;
