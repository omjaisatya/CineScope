import "./App.css";
import Home from "./components/Home";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieCard />} />
      </Routes>
    </>
  );
}

export default App;
