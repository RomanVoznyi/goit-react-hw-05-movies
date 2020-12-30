import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as api from '../../Services/apiServices';
import s from './Reviews.module.css';

const Reviews = ({ movieId }) => {
  const [reviewsList, setReviewsList] = useState(null);

  useEffect(() => {
    api.getReviews(movieId).then(data => {
      if (data.results.length === 0) {
        toast.error('No reviews for this movie');
        return;
      }
      setReviewsList(data.results);
    });
  }, [movieId]);

  const getAvatar = path => {
    if (path === '') {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/555px-Noimage.svg.png';
    }
    if (path.includes('http')) {
      return path.slice(path.indexOf('h'));
    }
    return `https://image.tmdb.org/t/p/w500/${path}`;
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      {reviewsList && (
        <ul className={s.reviewList}>
          {reviewsList.map(review => (
            <li key={review.id} className={s.reviewItem}>
              <div className={s.imageBox}>
                <img
                  className={s.avatar}
                  src={getAvatar(review.author_details.avatar_path)}
                  alt={review.author}
                ></img>
              </div>
              <div className={s.reviewsBox}>
                <h2 className={s.name}>{review.author}</h2>
                <p className={s.movieItem}>
                  {review.updated_at.slice(0, review.updated_at.indexOf('T'))}
                </p>
                <p className={s.content}>{review.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Reviews;
