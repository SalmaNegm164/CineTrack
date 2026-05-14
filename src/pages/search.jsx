import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/tmdb";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        fetchMovies();
      } else {
        setMovies([]);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const data = await searchMovies(query);

      setMovies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 pt-28 pb-10">
      
      {/* Search Input */}
      <div className="max-w-2xl mx-auto relative">
        
        <SearchIcon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={22}
        />

        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full
            bg-zinc-900/80
            border border-zinc-700
            text-white
            rounded-2xl
            py-4
            pl-12
            pr-4
            outline-none
            focus:border-red-600
            transition
          "
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-400 mt-10">
          Loading...
        </p>
      )}

      {/* Empty State */}
      {!loading && query && movies.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No movies found 🎬
        </p>
      )}

      {/* Movies Grid */}
      <div className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        gap-6
        mt-10
      ">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
}