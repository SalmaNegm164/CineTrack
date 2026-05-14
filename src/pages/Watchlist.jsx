import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";

export default function Watchlist() {
  const { watchlist } = useWatchlist();

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white pt-4 pb-14">

      <h1 className="text-4xl font-bold mb-10">
        My Watchlist
      </h1>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">

          <h2 className="text-2xl font-semibold text-gray-300">
            Your watchlist is empty
          </h2>

          <p className="text-gray-500 mt-3">
            Save movies to watch them later 🍿
          </p>

        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

    </div>
  );
}