import {
  Home,
  Heart,
  Clapperboard,
  Search,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { searchMovies } from "../services/tmdb";
import { useDebounce } from "../hooks/useDebounce";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 400);
  const boxRef = useRef();

  const links = [
    { to: "/", label: "Home", icon: <Home size={18} /> },
    { to: "/watchlist", label: "Watchlist", icon: <Heart size={18} /> },
  ];

  // SEARCH
  useEffect(() => {
    const fetchData = async () => {
      if (debouncedQuery.trim()) {
        const data = await searchMovies(debouncedQuery);
        setResults(data.slice(0, 7));
        setOpen(true);
      } else {
        setResults([]);
        setOpen(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handler = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav
      className="
      fixed top-0 left-0 w-full z-50
      bg-black/50 backdrop-blur-xl
      border-b border-white/10 
    "
    >
      <div
        className="
        max-w-[1500px] mx-auto
        grid grid-cols-3 items-center
        px-4 md:px-8 lg:px-12
        py-4
      "
      >
        {/* LEFT - LOGO */}
        <Link
          to="/"
          className="
          flex items-center gap-3
          text-red-600 text-3xl font-extrabold
          tracking-wide
        "
        >
          <Clapperboard size={30} />
          CineTrack
        </Link>

        {/* CENTER - SEARCH */}
        <div
          ref={boxRef}
          className="relative flex justify-center"
        >
          <div
            className="
            flex items-center gap-3
            px-4 py-2.5
            w-[360px]
            bg-white/5
            border border-white/10
            rounded-full
            focus-within:border-red-500
            focus-within:bg-white/10
            transition-all duration-300
          "
          >
            <Search size={18} className="text-gray-400" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setOpen(true)}
              placeholder="Search movies..."
              className="
              bg-transparent outline-none
              text-white w-full text-sm
              placeholder:text-gray-500
            "
            />
          </div>

          {/* SEARCH DROPDOWN */}
          {open && results.length > 0 && (
            <div
              className="
              absolute top-14
              w-[360px]
              bg-[#111]/95
              backdrop-blur-xl
              border border-white/10
              rounded-2xl
              overflow-hidden
              shadow-2xl
              max-h-[320px]
              overflow-y-auto
            "
            >
              {results.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => {
                    navigate(`/movie/${movie.id}`);
                    setQuery("");
                    setResults([]);
                    setOpen(false);
                  }}
                  className="
                  px-4 py-3
                  text-sm text-gray-300
                  hover:bg-red-600/20
                  hover:text-white
                  cursor-pointer
                  transition-all duration-200
                "
                >
                  {movie.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - LINKS */}
        <div className="flex items-center justify-end gap-8">
          {links.map((link) => {
            const active = location.pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  flex items-center gap-2
                  text-sm font-medium
                  transition-all duration-300
                  px-4 py-2 rounded-full
                  ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}