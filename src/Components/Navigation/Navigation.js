import { NavLink, useHistory } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => {
  let history = useHistory();

  const handleClick = evt => {
    evt.target.name === 'back' ? history.goBack() : history.goForward();
  };

  return (
    <div className={s.container}>
      <nav className={s.navigation}>
        <NavLink to="/" exact className={s.link} activeClassName={s.activeLink}>
          Home
        </NavLink>
        <NavLink to="/movies" className={s.link} activeClassName={s.activeLink}>
          Movies
        </NavLink>
      </nav>

      <button
        type="button"
        className={s.moveButton}
        name="back"
        onClick={handleClick}
      >
        &#129144; Go back
      </button>
      <button
        type="button"
        className={s.moveButton}
        name="forward"
        onClick={handleClick}
      >
        Go forward &#129146;
      </button>
    </div>
  );
};

export default Navigation;
