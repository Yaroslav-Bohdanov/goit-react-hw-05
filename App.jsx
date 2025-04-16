import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Container from "./src/components/Container/Container";
import Navigation from "./src/components/Navigation/Navigation";
import Loader from "./src/components/Loader/Loader";

const HomePage = lazy(() => import("./src/pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./src/pages/MoviesPage/MoviesPage"));
const MovieCast = lazy(() => import("./src/components/MovieCast/MovieCast"));
const MovieDetailsPage = lazy(() =>
  import("./src/pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieReviews = lazy(() =>
  import("./src/components/MovieReviews/MovieReviews")
);
const NotFoundPage = lazy(() =>
  import("./src/pages/NotFoundPage/NotFoundPage")
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Container>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </Suspense>
  );
}

export default App;
