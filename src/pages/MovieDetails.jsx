import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos
} from "../services/tmdb";

import TrailerModal from "../components/TrailerModal";

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const details = await getMovieDetails(id);
      const credits = await getMovieCredits(id);
      const videos = await getMovieVideos(id);

      setMovie(details);
      setCast(credits.cast.slice(0, 10));

      const trailer = videos.results.find(
        (v) => v.type === "Trailer"
      );

      setVideo(trailer);
    }

    fetchData();
  }, [id]);

  if (!movie) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="text-white bg-black min-h-screen">

      {/* BACKDROP */}
      <div
        className="h-[70vh] bg-cover bg-center flex items-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="bg-black/60 w-full p-10">

          <h1 className="text-4xl font-bold">
            {movie.title}
          </h1>

          <p className="text-gray-300 mt-3 max-w-2xl">
            {movie.overview}
          </p>

          <div className="mt-4 flex gap-4">
            <span>⭐ {movie.vote_average}</span>
            <span>{movie.runtime} min</span>
            <span>{movie.release_date}</span>
          </div>

          {/* زرار التريلر */}
          <button
            onClick={() => setShowTrailer(true)}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Watch Trailer
          </button>

        </div>
      </div>

      {/* CAST */}
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-6">
          Cast
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {cast.map((actor) => (
            <div key={actor.id} className="text-center">
              <img
                className="rounded-full w-24 h-24 mx-auto object-cover"
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://via.placeholder.com/100"
                }
              />
              <p className="text-sm mt-2">{actor.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showTrailer && video && (
        <TrailerModal
          video={video}
          onClose={() => setShowTrailer(false)}
        />
      )}

    </div>
  );
}