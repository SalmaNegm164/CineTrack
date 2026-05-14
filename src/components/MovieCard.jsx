import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function MovieCard({ movie }) {
  // Watchlist functions from context
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  // Check if current movie exists in watchlist
  const inList = isInWatchlist(movie.id);

  // Handle add/remove from watchlist
  const handleClick = (e) => {
    e.preventDefault();   // prevent navigation to movie page
    e.stopPropagation();  // stop click bubbling to Link

    if (inList) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    // Animated card container (lift on hover)
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="relative group cursor-pointer"
    >
      {/* Link wraps the whole card to navigate to movie details */}
      <Link to={`/movie/${movie.id}`}>

        {/* Main card container */}
        <div className="relative overflow-hidden rounded-xl bg-neutral-900">

          {/* Movie poster image */}
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://placehold.co/300x450"
            }
            alt={movie.title}
            className="w-full h-[280px] md:h-[320px] object-cover rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:brightness-50"
          />

          {/* Dark overlay on hover for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Watchlist button (heart icon) */}
          <button
            onClick={handleClick}
            className="absolute top-3 right-3 bg-black/60 backdrop-blur-md hover:bg-red-600 p-2.5 rounded-full transition-all duration-300 z-10"
          >
            {inList ? (
              <FaHeart className="text-red-500 text-base" />
            ) : (
              <FaRegHeart className="text-white text-base" />
            )}
          </button>

          {/* Hover content (rating + title inside card) */}
          <div className="absolute bottom-0 left-0 w-full p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">

            {/* Movie rating */}
            <p className="text-yellow-400 text-xs font-bold mb-1">
              ⭐ {movie.vote_average?.toFixed(1)}
            </p>

            {/* Movie title (inside hover overlay) */}
            <h3 className="text-white font-bold text-sm truncate">
              {movie.title}
            </h3>
          </div>
        </div>

        {/* Static movie title under the card */}
        <p className="text-xs mt-3 text-gray-400 font-medium truncate group-hover:text-white transition-colors">
          {movie.title}
        </p>

      </Link>
    </motion.div>
  );
}