import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getMovieVideo,
  getMoviesDetails,
  getMoviesRecommendations,
} from "../api/movieService";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

const VideoCard = ({ video, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left rounded-xl overflow-hidden border transition-all ${
      isActive
        ? "border-cyan-500 bg-slate-800"
        : "border-slate-700 bg-slate-900 hover:border-slate-500"
    }`}
  >
    <div className="relative aspect-video">
      <img
        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
        alt={video.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? "bg-cyan-500" : "bg-white/20 backdrop-blur-sm"}`}
        >
          <span className="text-white text-sm pl-0.5">▶</span>
        </div>
      </div>
      <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
        {video.type}
      </span>
    </div>
    <div className="p-2.5">
      <p className="text-white text-xs font-medium line-clamp-2 leading-snug">
        {video.name}
      </p>
    </div>
  </button>
);

function MovieVideos() {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const [videoData, movieData, recsData] = await Promise.all([
          getMovieVideo(id),
          getMoviesDetails(id),
          getMoviesRecommendations(id),
        ]);

        // youTube only, sorted so trailers come first ----
        const ytVideos = (videoData?.results || [])
          .filter((v) => v.site === "YouTube")
          .sort((a, b) => {
            const order = [
              "Trailer",
              "Teaser",
              "Clip",
              "Featurette",
              "Behind the Scenes",
            ];
            return order.indexOf(a.type) - order.indexOf(b.type);
          });

        setVideos(ytVideos);
        setActiveVideo(ytVideos[0] || null);
        setMovie(movieData);
        setRecommendations(recsData?.slice(0, 12) || []);
      } catch (err) {
        setError("Failed to load videos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <Loading message="Loading videos..." />;
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <p className="text-red-400">{error}</p>
        <Link
          to={`/movie/${id}`}
          className="text-sm text-cyan-400 hover:underline"
        >
          ← Back to movie
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        {/* back link + title ----*/}
        <div className="mb-5">
          <Link
            to={`/movie/${id}`}
            className="text-sm text-cyan-400 hover:underline inline-flex items-center gap-1 mb-3"
          >
            ← Back to {movie?.title || "movie"}
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Videos —{" "}
            <span className="text-slate-400 font-normal">{movie?.title}</span>
          </h1>
        </div>

        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <p className="text-5xl mb-4">🎬</p>
            <p>No videos available for this movie.</p>
            <Link
              to={`/movie/${id}`}
              className="mt-4 text-sm text-cyan-400 hover:underline"
            >
              ← Back to movie details
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* main player ----*/}
            <div className="flex-1 min-w-0">
              {activeVideo && (
                <>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl">
                    <iframe
                      key={activeVideo.key}
                      src={`https://www.youtube.com/embed/${activeVideo.key}?autoplay=1&rel=0`}
                      title={activeVideo.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="mt-3 px-1">
                    <h2 className="text-base sm:text-lg font-semibold text-white">
                      {activeVideo.name}
                    </h2>
                    <p className="text-sm text-slate-400 mt-0.5">
                      {activeVideo.type} • {movie?.title}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* video list sidebar -----*/}
            <div className="lg:w-80 xl:w-96 shrink-0">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                All Videos ({videos.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-1 scrollbar-thin">
                {videos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    isActive={activeVideo?.id === video.id}
                    onClick={() => setActiveVideo(video)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* recommendations -----*/}
        {recommendations.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl sm:text-2xl font-bold border-l-4 border-cyan-500 pl-4 mb-5">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {recommendations.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default MovieVideos;
