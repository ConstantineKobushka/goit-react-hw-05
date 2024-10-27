import { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import clsx from 'clsx';

import { getMoviesById } from '../../api/moviesApi';

import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const [movieDetail, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });

  const { movieId } = useParams();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await getMoviesById(movieId);
        setMovieDetails(data);
      } catch (error) {
        setError((prevState) => {
          return {
            ...prevState,
            errorMessage: error.message,
            isError: true,
          };
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingMovies();
  }, [movieId]);

  const navLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <section className={css.section}>
      <div className={css.container}>
        <button className={css.btn}>👈 Go back</button>
        <div className={css.wrapper}>
          <img
            className={css.img}
            src={`https://image.tmdb.org/t/p/w400/${movieDetail.poster_path}`}
            alt={movieDetail.title}
            loading='lezy'
          />
          <div className={css.descr}>
            <h2 className={css.title}>{movieDetail.title}</h2>
            <div className={css.inner}>
              <h3 className={css.subTitle}>Overview</h3>
              <p className={css.text}>{movieDetail.overview}</p>
            </div>
            <div className={css.inner}>
              <h3 className={css.subTitle}>Genres</h3>
              <p className={css.text}>
                {movieDetail.genres?.map((genre) => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
              </p>
            </div>

            <p className={css.text}>Release date: {movieDetail.release_date}</p>
            <p className={css.text}>User Score: {Math.floor(movieDetail.popularity)}%</p>
          </div>
        </div>

        <div className={css.info}>
          <p className={css.text}>Additional information</p>
          <ul className={css.list}>
            <li className={css.item}>
              <NavLink className={navLinkClass} to='cast'>
                Cast
              </NavLink>
            </li>
            <li className={css.item}>
              <NavLink className={navLinkClass} to='reviews'>
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </section>
  );
};

export default MovieDetailsPage;
