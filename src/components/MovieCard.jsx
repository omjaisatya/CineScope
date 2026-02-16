const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="group relative w-full overflow-hidden rounded-xl bg-slate-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20">
      <div className="aspect-2/3 w-full overflow-hidden">
        <img
          // src={posterUrl}
          src={
            movie.poster_path
              ? posterUrl
              : "https://via.placeholder.com/500x750?text=No+Poster"
          }
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-xs font-bold text-yellow-400 backdrop-blur-md border border-white/10">
        <span className="text-sm">★</span>
        {movie.vote_average.toFixed(1)}
      </div>

      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="p-4">
          <h3 className="text-lg font-bold text-white line-clamp-1">
            {movie.title}
          </h3>
          <div className="mt-1 flex items-center justify-between text-xs text-gray-300">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span className="rounded border border-gray-500 px-1 uppercase">
              {movie.original_language}
            </span>
          </div>
          <button className="mt-3 w-full rounded-lg bg-cyan-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-500">
            View Details
          </button>
        </div>
      </div>

      <div className="p-3 group-hover:hidden">
        <h3 className="truncate text-sm font-semibold text-white">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-400">
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
