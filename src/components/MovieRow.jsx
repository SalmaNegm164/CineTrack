import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies = [] }) {
  return (
    <div className="my-10">
      <h2 className="text-2xl text-white font-bold mb-5 tracking-tight">
        {title}
      </h2>

      <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[160px] md:min-w-[200px]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}