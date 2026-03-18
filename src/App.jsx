// import "./App.css";   no usage in component because tailwind configured in this project. if custom css needed then i add app.css
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const MovieDetails = lazy(() => import("./components/MovieDetails"));
const MovieVideos = lazy(() => import("./pages/MovieVideos"));
const Shows = lazy(() => import("./pages/Shows"));
const ShowDetails = lazy(() => import("./pages/ShowDetails"));
const Trending = lazy(() => import("./pages/Trending"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading message="Loading Page..." />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movie/:id/videos" element={<MovieVideos />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/shows/:id" element={<ShowDetails />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
