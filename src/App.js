import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navigation from './Components/Navigation';
import Loader from 'react-loader-spinner';
import s from './App.module.css';

const HomeView = lazy(() =>
  import('./Views/HomeView' /* webpackChunkName: "home-view" */),
);
const MoviesView = lazy(() =>
  import('./Views/MoviesView' /* webpackChunkName: "movies-view" */),
);
const MovieDetailsView = lazy(() =>
  import(
    './Views/MovieDetailsView' /* webpackChunkName: "movie-details-view" */
  ),
);

const App = () => {
  return (
    <div className={s.App}>
      <ToastContainer autoClose={2000} />
      <Navigation />

      <Suspense
        fallback={
          <Loader type="Circles" color="#00BFFF" height={80} width={80} />
        }
      >
        <Switch>
          <Route path="/movies" exact>
            <MoviesView />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>

          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
