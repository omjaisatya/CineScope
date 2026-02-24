// import "./App.css";   no usage in component because tailwind configured in this project. if custom css needed then i add app.css
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const MovieDetails = lazy(() => import("./components/MovieDetails"));
const Loading = lazy(() => import("./components/Loading"));

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading message="Loading Page..." />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
