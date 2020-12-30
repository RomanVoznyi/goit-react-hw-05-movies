import { useState, useEffect } from 'react';
import * as api from '../../Services/apiServices';
import s from './Cast.module.css';

const Cast = ({ movieId }) => {
  const [castList, setCastList] = useState(null);

  useEffect(() => {
    api.getCastList(movieId).then(data => {
      setCastList(data.cast.filter((el, index) => index < 10));
    });
  }, [movieId]);

  return (
    <>
      {castList && (
        <ul className={s.castList}>
          {castList.map(actor => (
            <li key={actor.id} className={s.castItem}>
              <img
                className={s.photo}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/555px-Noimage.svg.png'
                }
                alt={actor.name}
              ></img>
              <h2 className={s.name}>{actor.name}</h2>
              <p className={s.movieItem}>
                Character:
                <span className={s.descript}> {actor.character}</span>
              </p>
            </li>
          ))}
          {castList.length === 10 && <li className={s.lastItem}>...</li>}
        </ul>
      )}
    </>
  );
};

export default Cast;
