import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/tmdb";
import MovieCarousel from "../components/MovieCarousel";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getTrendingMovies();
      setMovies(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-[#0b0b0b] text-white flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white px-4 md:px-10 lg:px-16">
      
      {/* HERO */}
      <div className="pt-6">
        <MovieCarousel movies={movies} />
      </div>

      {/* TRENDING */}
      <section className="pb-14 mt-10">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Trending Movies
          </h2>

          <span className="text-gray-400 text-sm">
            Updated Daily
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

      </section>
    </div>
  );
}