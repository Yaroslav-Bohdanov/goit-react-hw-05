import { useEffect, useState } from "react";
import { filmsFetcher } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await filmsFetcher();
        setMovies(response);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setError("Oops! Something went wrong...");
      }
    };

    getMovies();
  }, []);

  return (
    <div className={s.container}>
      <h2 className={s.title}>Today's Popular Movies</h2>
      {error ? (
        <p className={s.error}>{error}</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default HomePage;
