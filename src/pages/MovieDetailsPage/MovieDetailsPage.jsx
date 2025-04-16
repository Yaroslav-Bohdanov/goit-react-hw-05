import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { oneFilmFetcher } from "../../api";
import Loader from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [film, setFilm] = useState(null);
  const goBackLink = useRef(useLocation().state?.from || "/movies");

  useEffect(() => {
    oneFilmFetcher(movieId)
      .then(({ data }) => setFilm(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [movieId]);

  if (!film) return <Loader />;

  const {
    title,
    overview,
    vote_average,
    release_date,
    poster_path,
    genres = [],
  } = film;
  const poster = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <>
      <Link to={goBackLink.current} className={s.linkBack}>
        Go back
      </Link>
      <div className={s.containerDetails}>
        <img src={poster} alt={title} className={s.poster} />
        <div className={s.description}>
          <h1 className={s.header}>
            {title} ({new Date(release_date).getFullYear()})
          </h1>
          <p className={s.descriptiontext}>
            Rating: {Math.ceil(vote_average)} / 10
          </p>
          <p className={s.descriptiontext}>
            <strong>Overview:</strong> {overview}
          </p>
          {genres.length > 0 && (
            <p className={s.descriptiontext}>
              <strong>Genres:</strong> {genres.map((g) => g.name).join(", ")}
            </p>
          )}
        </div>
      </div>
      <nav className={s.navigation}>
        {["cast", "reviews"].map((tab) => (
          <NavLink
            key={tab}
            to={tab}
            className={({ isActive }) => (isActive ? s.active : s.link)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
