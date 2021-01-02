import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './MoviesList.module.css';

const MoviesList = ({ movies }) => {
  return (
    <ul className={s.moviesList}>
      {movies.map(movie => (
        <li className={s.movieItem} key={movie.id}>
          <img
            className={s.poster}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/555px-Noimage.svg.png'
            }
            alt={movie.title || movie.name}
          ></img>
          <Link to={`/movies/${movie.id}`} className={s.link}>
            {movie.title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesList;
