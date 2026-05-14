// Import carousel styles
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Import Carousel component
import { Carousel } from "react-responsive-carousel";

/**
 * MovieCarousel Component
 * Displays top movies in a fullscreen hero-style carousel
 */
export default function MovieCarousel({ movies = [] }) {
  // If no movies exist, don't render component
  if (!movies.length) return null;

  return (
    // Main wrapper for carousel section
    <div className="mb-14 rounded-none overflow-hidden">

      {/* Carousel settings */}
      <Carousel
        showThumbs={false}     
        showStatus={false}     
        infiniteLoop           
        autoPlay               
        interval={5000}       
        showIndicators         
        showArrows            
        swipeable              
        emulateTouch           
      >

        {/* Render first 5 movies only */}
        {movies.slice(0, 5).map((movie) => (

          // Single slide container
          <div
            key={movie.id}
            className="relative h-[82vh] bg-cover bg-center flex items-end"

            // Dynamic background image from TMDB API
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >

            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

            {/* Content section (text + button) */}
            <div className="relative z-10 p-8 md:p-16 max-w-3xl text-left mb-10">

              {/* Movie title */}
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
                {movie.title}
              </h1>

              {/* Movie description */}
              <p className="text-gray-300 mt-5 text-base md:text-lg leading-relaxed line-clamp-3">
                {movie.overview}
              </p>

              {/* Action button */}
              <button
                className="mt-8 px-8 py-3 bg-red-600 hover:bg-red-700
                rounded-md text-white font-bold flex items-center gap-2
                transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <span className="text-xl">▶</span>
                Watch Trailer
              </button>

            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}