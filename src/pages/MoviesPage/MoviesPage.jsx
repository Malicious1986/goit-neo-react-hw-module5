import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { searchMovies } from "@/api";
import MovieList from "@/components/MovieList/MovieList";


export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setIsLoading(true);
      searchMovies(query)
        .then((data) => setMovies(data.results))
        .catch((e) => setError(e.message))
        .finally(() => setIsLoading(false));
    } else {
      setMovies([]);
    }
  }, [searchParams]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value;

    if (!query.length) return;

    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("query", query);
    setSearchParams(updatedParams);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="query">
          <input type="text" name="query" id="query" />
        </label>
        <button type="submit">Search</button>
      </form>
      {isLoading && <div>Loading...</div>}
      {movies.length && !error.length && !isLoading ? (
        <MovieList movies={movies} />
      ) : null}
    </div>
  );
}
