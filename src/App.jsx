import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Movies from "./pages/Movies";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/movies" element={<MovieCard />} /> */}
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </>
  );
}

export default App;
