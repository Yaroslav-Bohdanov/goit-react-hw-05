import { useEffect, useState } from "react";
import { searchFilmFetcher } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import SearchBar from "../../components/SearchBar/SearchBar";

const MoviesPage = () => {
  const [searchedFilm, setSearchedFilm] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Стан щоб знати, що користувач вже щось шукав

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchFilms = async () => {
      try {
        setLoading(true);
        const results = await searchFilmFetcher(query);
        setSearchedFilm(results.data.results);
      } catch (error) {
        console.log("Search error:", error);
        setSearchedFilm([]); // Порожній список при помилці
      } finally {
        setLoading(false);
        setHasSearched(true); // Ставимо true після першого пошуку
      }
    };

    fetchFilms();
  }, [query]);

  const handleSearchBarSubmit = ({ query }) => {
    if (!query) return;
    setSearchParams({ query });
    setHasSearched(false); // Щоб поки чекаємо новий результат — нічого не показувалось
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchBarSubmit} />
      {loading && <Loader />}

      {/* Покажемо NotFoundPage лише якщо був запит і нічого не знайдено */}
      {!loading && hasSearched && searchedFilm.length === 0 && <NotFoundPage />}

      {/* Якщо є фільми — показуємо список */}
      {!loading && searchedFilm.length > 0 && (
        <MovieList movies={searchedFilm} />
      )}
    </div>
  );
};

export default MoviesPage;
