import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AddToCollectionModal from "../components/AddToCollectionModal";
import { PlusIcon } from "lucide-react";

const API_KEY = "7bfbdb37"; // replace this

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${"7bfbdb37"}&s=${query}`
          // `https://www.omdbapi.com/?apikey=${"7bfbdb37"}&i=tt0082971`
        );

        if (res.data.Response === "True") {
          setMovies(res.data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.log("Search error:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="min-h-screen pt-28 px-6 md:px-16 lg:px-32 bg-black text-white">

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8">
        Search Results for:
        <span className="text-primary ml-2">{query}</span>
      </h1>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center mt-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* No Results */}
      {!loading && movies.length === 0 && (
        <p className="text-gray-400 text-lg">No movies found.</p>
      )}

      {/* Movies Grid */}
      <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
            className="
              cursor-pointer
              group
              transition-transform duration-300
              hover:scale-105
              relative
            "
          >
            <div className="overflow-hidden rounded-xl shadow-lg relative">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.Title}
                className="w-full h-[320px] object-cover group-hover:opacity-80 transition"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMovieId(movie.imdbID);
                }}
                className="absolute top-2 right-2 bg-black/60 hover:bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition backdrop-blur-md"
                title="Add to Collection"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            <h2 className="mt-3 font-semibold text-sm line-clamp-2">
              {movie.Title}
            </h2>

            <p className="text-gray-400 text-sm">
              {movie.Year}
            </p>
          </div>
        ))}
      </div>

      <AddToCollectionModal
        isOpen={!!selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
        movieId={selectedMovieId}
      />
    </div>
  );
};

export default SearchResults;
