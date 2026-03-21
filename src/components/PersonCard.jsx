import { Link } from "react-router-dom";
import { getImage } from "../utils/getImage";

const PersonCard = ({ person }) => {
  // const photoUrl = getImage(person.profile_path, "w342");

  const small = getImage(person.profile_path, "w185");
  const medium = getImage(person.profile_path, "w342");

  const knownFor = person.known_for_department || "Acting";
  const topCredit =
    person.known_for?.[0]?.title || person.known_for?.[0]?.name || null;

  return (
    <Link
      to={`/people/${person.id}`}
      className="group flex flex-col items-center text-center w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 p-3"
    >
      {/* Photo */}
      <div className="relative w-full aspect-square overflow-hidden rounded-lg mb-2.5">
        <img
          src={medium}
          srcSet={`${small} 185w, ${medium} 342w`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          alt={person.name}
          loading="lazy"
          decoding="async"
          width={342}
          height={513}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <h3 className="text-xs sm:text-sm font-semibold text-white truncate w-full leading-snug">
        {person.name}
      </h3>
      <p className="text-xs text-cyan-400 mt-0.5">{knownFor}</p>
      {topCredit && (
        <p className="text-xs text-slate-500 mt-0.5 truncate w-full">
          {topCredit}
        </p>
      )}
    </Link>
  );
};

export default PersonCard;
