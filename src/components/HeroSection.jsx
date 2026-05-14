import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function HeroSection({ movies = [] }) {
  if (!movies.length) return null;

  return (
    // Main wrapper for hero section
    <div className="w-full mb-10 overflow-hidden rounded-none shadow-2xl">

      {/* Movie slider */}
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={6000}
        showIndicators={true}
        showArrows={true}
      >

        {/* Loop through first 5 movies only */}
        {movies.slice(0, 5).map((movie) => (
          
          // Single slide
          <div
            key={movie.id}
            className="relative h-[60vh] md:h-[80vh] bg-cover bg-center flex items-end"
            style={{
              // Dynamic background image from TMDB
              backgroundImage: movie.backdrop_path
                ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                : "none",
            }}
          >

            {/* Gradient overlays for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0b] via-transparent to-transparent" />

            {/* Content section (text + button) */}
            <div className="relative z-10 p-6 md:p-16 max-w-4xl text-left">

              {/* Movie title */}
              <h1 className="text-4xl md:text-7xl font-black text-white leading-tight drop-shadow-lg">
                {movie.title}
              </h1>

              {/* Movie description */}
              <p className="text-gray-200 mt-4 text-sm md:text-lg line-clamp-3 max-w-2xl font-medium drop-shadow-md">
                {movie.overview}
              </p>

              {/* Action buttons */}
              <div className="flex gap-4 mt-8">

                {/* Watch trailer button */}
                <button className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-md text-white font-bold flex items-center gap-3 transition-all active:scale-95 shadow-lg">
                  <span className="text-xl">▶</span>
                  Watch Trailer
                </button>

              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}