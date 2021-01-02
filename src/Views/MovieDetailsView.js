import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, NavLink, useParams, useRouteMatch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import * as api from '../Services/apiServices';
import s from './ViewStyles.module.css';

const Cast = lazy(() =>
  import('../Components/Cast' /* webpackChunkName: "cast-subview" */),
);
const Review = lazy(() =>
  import('../Components/Reviews' /* webpackChunkName: "reviews-subview" */),
);

const Movies = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url, path } = useRouteMatch();

  useEffect(() => {
    api.getMovieDetails(movieId).then(movie => {
      setMovie(movie);
    });
  }, [movieId]);

  return (
    <>
      {movie && (
        <div className={s.container}>
          <h2 className={s.title}>{movie.title || movie.name}</h2>
          <img
            className={s.poster}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/555px-Noimage.svg.png'
            }
            alt={movie.title || movie.name}
          ></img>

          <p className={s.movieItem}>
            Genres:
            <span className={s.descript}>
              {movie.genres.map(genre => genre.name).join(' / ')}
            </span>
          </p>

          <p className={s.movieItem}>
            Release date:
            <span className={s.descript}> {movie.release_date || ''} </span>
          </p>

          <p className={s.movieItem}>
            Vote:<span className={s.vote}> {movie.vote_average} </span>/ Votes:{' '}
            <span className={s.vote}> {movie.vote_count} </span>
          </p>

          <p className={s.movieItem}>
            About:
            <span className={s.descript}>{movie.overview}</span>
          </p>

          <p className={s.movieItem}>
            <NavLink
              to={`${url}/cast`}
              className={s.subLinks}
              activeClassName={s.activeSubLinks}
            >
              Actors
            </NavLink>
            <NavLink
              to={`${url}/reviews`}
              className={s.subLinks}
              activeClassName={s.activeSubLinks}
            >
              Reviews
            </NavLink>
          </p>

          <Suspense
            fallback={
              <Loader type="Circles" color="#00BFFF" height={80} width={80} />
            }
          >
            <Route path={`${path}/cast`}>
              <Cast movieId={movieId} />
            </Route>

            <Route path={`${path}/reviews`}>
              <Review movieId={movieId} />
            </Route>
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Movies;
