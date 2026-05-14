import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#0b0b0b] text-white min-h-screen">
        {/* NAVBAR */}
        <Navbar />

        {/* GLOBAL CONTAINER */}
        <div className="w-full pt-20 px-4 md:px-8 lg:px-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;