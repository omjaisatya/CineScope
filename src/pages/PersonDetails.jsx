import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getPersonDetails,
  getPersonCredits,
  getPersonImages,
} from "../api/peopleService";
import MovieCard from "../components/MovieCard";
import ShowCard from "../components/ShowCard";
import Loading from "../components/Loading";
import { getImage } from "../utils/getImage";

// Simple lightbox for photo gallery
const Lightbox = ({ images, startIndex, onClose }) => {
  const [idx, setIdx] = useState(startIndex);

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % images.length),
    [images.length],
  );

  // keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl hover:text-slate-300 leading-none"
      >
        ✕
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-4 text-white text-3xl hover:text-slate-300 p-2"
      >
        ‹
      </button>

      <img
        src={getImage(images[idx].file_path, "w780")}
        alt={`Photo ${idx + 1}`}
        className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-4 text-white text-3xl hover:text-slate-300 p-2"
      >
        ›
      </button>

      <p className="absolute bottom-4 text-slate-400 text-sm">
        {idx + 1} / {images.length}
      </p>
    </div>
  );
};

// Credit card for known for section
const CreditItem = ({ item }) => {
  if (item.media_type === "movie") return <MovieCard movie={item} />;
  if (item.media_type === "tv") return <ShowCard show={item} />;
  return null;
};

function PersonDetails() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullBio, setShowFullBio] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("movies"); // movies | shows

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const [personData, creditsData, imagesData] = await Promise.all([
          getPersonDetails(id),
          getPersonCredits(id),
          getPersonImages(id),
        ]);
        if (!personData) throw new Error("Person not found");
        setPerson(personData);
        setCredits(creditsData);
        setImages(imagesData);
      } catch (err) {
        setError("Failed to load person details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <Loading message="Loading profile..." />;
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <p className="text-red-400">{error}</p>
        <Link to="/people" className="text-sm text-cyan-400 hover:underline">
          ← Back to People
        </Link>
      </div>
    );
  if (!person)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <p className="text-slate-400">Person not found.</p>
        <Link to="/people" className="text-sm text-cyan-400 hover:underline">
          ← Back to People
        </Link>
      </div>
    );

  // deduplicated + sorted credits
  const movieCredits =
    credits?.cast
      ?.filter((c) => c.media_type === "movie" && c.poster_path)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .filter((c, i, arr) => arr.findIndex((x) => x.id === c.id) === i)
      .slice(0, 18) || [];

  const showCredits =
    credits?.cast
      ?.filter((c) => c.media_type === "tv" && c.poster_path)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .filter((c, i, arr) => arr.findIndex((x) => x.id === c.id) === i)
      .slice(0, 18) || [];

  const bioPreview = person.biography?.slice(0, 400);
  const bioIsTruncated = person.biography?.length > 400;

  const age = person.birthday
    ? Math.floor(
        (new Date(person.deathday || Date.now()) - new Date(person.birthday)) /
          (1000 * 60 * 60 * 24 * 365.25),
      )
    : null;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Lightbox */}
      {lightboxIndex !== null && images.length > 0 && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-10">
        {/* Back */}
        <Link
          to="/people"
          className="text-sm text-cyan-400 hover:underline inline-flex items-center gap-1 mb-6"
        >
          ← Back to People
        </Link>

        {/* Profile header -----*/}
        <div className="flex flex-col sm:flex-row gap-7 md:gap-10">
          {/* Photo */}
          <div className="w-40 sm:w-52 md:w-64 shrink-0 mx-auto sm:mx-0">
            <img
              src={getImage(person.profile_path, "w342")}
              alt={person.name}
              fetchPriority="high"
              className="w-full rounded-2xl shadow-2xl shadow-black/50 object-cover object-top"
            />
          </div>

          {/* info ----*/}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {person.name}
            </h1>

            <p className="text-cyan-400 text-sm mt-1 font-medium">
              {person.known_for_department}
            </p>

            {/* personal info grid ---*/}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Birthday", value: person.birthday || "N/A" },
                {
                  label: person.deathday ? "Died" : "Age",
                  value: person.deathday || (age ? `${age} years old` : "N/A"),
                },
                { label: "Birthplace", value: person.place_of_birth || "N/A" },
                { label: "Popularity", value: Math.floor(person.popularity) },
                {
                  label: "Gender",
                  value:
                    person.gender === 1
                      ? "Female"
                      : person.gender === 2
                        ? "Male"
                        : "N/A",
                },
                {
                  label: "Credits",
                  value:
                    (credits?.cast?.length || 0) + (credits?.crew?.length || 0),
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50"
                >
                  <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                  <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* also known as ----*/}
            {person.also_known_as?.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1.5">
                  Also known as
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {person.also_known_as.slice(0, 5).map((name) => (
                    <span
                      key={name}
                      className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* biography ----*/}
        {person.biography && (
          <div className="mt-10">
            <h2 className="text-lg sm:text-xl font-bold border-l-4 border-cyan-500 pl-4 mb-4">
              Biography
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
              {showFullBio ? person.biography : bioPreview}
              {bioIsTruncated && !showFullBio && "..."}
            </p>
            {bioIsTruncated && (
              <button
                onClick={() => setShowFullBio((v) => !v)}
                className="mt-3 text-sm text-cyan-400 hover:underline"
              >
                {showFullBio ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        )}

        {/* known For -----*/}
        {(movieCredits.length > 0 || showCredits.length > 0) && (
          <div className="mt-12">
            <h2 className="text-lg sm:text-xl font-bold border-l-4 border-cyan-500 pl-4 mb-5">
              Known For
            </h2>

            {/* tabs -----*/}
            <div className="flex gap-2 mb-5">
              {movieCredits.length > 0 && (
                <button
                  onClick={() => setActiveTab("movies")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                    activeTab === "movies"
                      ? "bg-cyan-600 border-cyan-600 text-white"
                      : "border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  Movies ({movieCredits.length})
                </button>
              )}
              {showCredits.length > 0 && (
                <button
                  onClick={() => setActiveTab("shows")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                    activeTab === "shows"
                      ? "bg-cyan-600 border-cyan-600 text-white"
                      : "border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  TV Shows ({showCredits.length})
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {(activeTab === "movies" ? movieCredits : showCredits).map(
                (item) => (
                  <CreditItem
                    key={`${item.id}-${item.credit_id}`}
                    item={item}
                  />
                ),
              )}
            </div>
          </div>
        )}

        {/* photo gallery ---- */}
        {images.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg sm:text-xl font-bold border-l-4 border-cyan-500 pl-4 mb-5">
              Photos
              <span className="text-slate-500 font-normal text-sm ml-2">
                ({images.length})
              </span>
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {images.slice(0, 18).map((img, i) => (
                <button
                  key={img.file_path}
                  onClick={() => setLightboxIndex(i)}
                  className="aspect-2/3 overflow-hidden rounded-lg group relative"
                >
                  <img
                    src={getImage(img.file_path, "w185")}
                    alt={`${person.name} photo ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      ⊕
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonDetails;
