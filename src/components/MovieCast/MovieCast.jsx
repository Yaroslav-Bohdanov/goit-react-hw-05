import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { castFetcher } from "../../api";
import s from "./MovieCast.module.css";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCast = async () => {
      try {
        const actors = await castFetcher(movieId);
        setCast(actors.data.cast);
      } catch (error) {
        console.error("Failed to fetch cast:", error);
      } finally {
        setLoading(false);
      }
    };
    getCast();
  }, [movieId]);
  return (
    <ul className={s.castWrapper}>
      {cast.map((castItem) => {
        return (
          <li key={castItem.id} className={s.castItem}>
            <p>
              <span className={s.nameSpan}>{castItem.name}</span> as{" "}
              {castItem.character}
            </p>
            <img
              className={s.castImage}
              src={`https://image.tmdb.org/t/p/w500/${castItem.profile_path}`}
            />
          </li>
        );
      })}
      {loading && <Loader />}
    </ul>
  );
};

export default MovieCast;
