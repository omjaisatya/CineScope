import { Link } from "react-router-dom";
import { getImage } from "../utils/getImage";

const ShowCard = ({ show }) => {
  // const posterUrl = getImage(show.poster_path, "w342");

  const small = getImage(show.poster_path, "w185");
  const medium = getImage(show.poster_path, "w342");

  const year = show.first_air_date
    ? new Date(show.first_air_date).getFullYear()
    : "N/A";
  const rating = show.vote_average?.toFixed(1) ?? "N/A";

  return (
    <Link
      to={`/shows/${show.id}`}
      className="group relative flex flex-col w-full overflow-hidden rounded-xl bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/20"
    >
      <div className="relative aspect-2/3 w-full overflow-hidden">
        <img
          src={medium}
          srcSet={`${small} 185w, ${medium} 342w`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          alt={show.name}
          loading="lazy"
          decoding="async"
          width={342}
          height={513}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* rating ----*/}
        <div className="absolute top-2 right-2 flex items-center gap-0.5 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-bold text-yellow-400 backdrop-blur-sm border border-white/10">
          <span>★</span>
          <span>{rating}</span>
        </div>

        {/* TV badge ---*/}
        <div className="absolute top-2 left-2 rounded-md bg-cyan-600/80 px-1.5 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
          TV
        </div>

        {/* hover overlay — desktop only --- */}
        <div className="absolute inset-0 hidden sm:flex flex-col justify-end bg-linear-to-t from-black via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-3">
          <span className="w-full text-center rounded-lg bg-cyan-600 hover:bg-cyan-500 py-1.5 text-xs font-semibold text-white transition-colors">
            View Details
          </span>
          <div className="mt-1.5 flex items-center justify-between text-xs text-gray-300">
            <span>{year}</span>
            <span className="rounded border border-gray-500 px-1 uppercase">
              {show.original_language}
            </span>
          </div>
        </div>
      </div>

      {/* always-visible info ---- */}
      <div className="p-2.5 flex flex-col gap-0.5">
        <h3 className="truncate text-xs sm:text-sm font-semibold text-white leading-snug">
          {show.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">{year}</p>
          <span className="text-xs rounded border border-gray-600 px-1 uppercase text-gray-400 sm:hidden">
            {show.original_language}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ShowCard;
