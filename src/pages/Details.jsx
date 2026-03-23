import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddToCollectionModal from "../components/AddToCollectionModal";
import { useAuth } from '@clerk/clerk-react';
import toast from "react-hot-toast";

const API_KEY = import.meta.env.VITE_OMDB_KEY;

const Details = () => {
  const { id } = useParams(); // imdbID from URL

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${"7bfbdb37"}&i=${id}&plot=full`
        );

        if (res.data.Response === "True") {
          setMovie(res.data);
        } else {
          setMovie(null);
        }

      } catch (error) {
        console.log("Movie fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#C0C9DB]">
        <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#C0C9DB] text-gray-900 font-bold text-xl">
        Movie not found.
      </div>
    );
  }


  return (
    <div className="bg-[#C0C9DB] text-gray-900 min-h-screen relative px-6 md:px-16 lg:px-40 pt-30 md:pt-50 pb-20">
      
      {/* Backdrop Image (using Poster as fallback) */}
      {movie.Poster && movie.Poster !== "N/A" && (
        <div className="absolute top-0 left-0 w-full h-[500px] z-0 overflow-hidden">
          <img
            src={movie.Poster}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#C0C9DB]" />
        </div>
      )}

      {/* Content Container positioned above backdrop */}
      <div className="relative z-10 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        
        {/* Poster */}
        <div className="shrink-0 group z-10 transition-transform duration-500 hover:scale-[1.02]">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
            alt={movie.Title}
            className="max-md:mx-auto rounded-xl h-[420px] max-w-70 w-full object-cover shadow-2xl"
          />
        </div>

        {/* Info */}
        <div className="relative flex flex-col gap-3 pt-4">
          <p className="text-primary text-xs font-bold tracking-widest uppercase">
            {movie.Language ? movie.Language.split(',')[0] : 'ENGLISH'}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 max-w-xl text-balance">
            {movie.Title}
          </h1>
          <div className="flex items-center gap-1.5 text-gray-900 font-medium">
            <span className="text-primary">⭐</span>
            {movie.imdbRating !== "N/A" ? movie.imdbRating : "N/A"} IMDb Rating
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 mt-1 font-medium border-b border-black/10 pb-4">
            {movie.Rated !== "N/A" && (
              <span className="border border-gray-500 bg-white/40 px-2.5 py-1 rounded text-xs">
                {movie.Rated}
              </span>
            )}
            {movie.Country !== "N/A" && <span>{movie.Country}</span>}
          </div>

          <p className="text-gray-800 font-medium mt-3 text-sm leading-relaxed max-w-2xl">
            {movie.Plot !== "N/A" ? movie.Plot : "No plot available."}
          </p>

          <div className="grid grid-cols-[100px_1fr] gap-x-6 gap-y-3 mt-4 text-sm max-w-2xl font-medium">
            {movie.Director && movie.Director !== "N/A" && (
              <>
                <span className="text-gray-600">Director</span>
                <span className="text-gray-900">{movie.Director}</span>
              </>
            )}
            {movie.Writer && movie.Writer !== "N/A" && (
              <>
                <span className="text-gray-600">Writer</span>
                <span className="text-gray-900 truncate">{movie.Writer}</span>
              </>
            )}
            {movie.Actors && movie.Actors !== "N/A" && (
              <>
                <span className="text-gray-600">Actors</span>
                <span className="text-gray-900">{movie.Actors}</span>
              </>
            )}
            {movie.Genre && movie.Genre !== "N/A" && (
              <>
                <span className="text-gray-600">Genre</span>
                <span className="text-gray-900">{movie.Genre}</span>
              </>
            )}
            {movie.Awards && movie.Awards !== "N/A" && (
              <>
                <span className="text-gray-600">Awards</span>
                <span className="text-gray-900">{movie.Awards}</span>
              </>
            )}
          </div>

          <p className="mt-4 text-gray-900 font-bold text-sm">
            {movie.Year} • {movie.Runtime}
          </p>

          {/* Add to Collection Button */}
          <div className="mt-8">
            <button
              onClick={() => {
                if (!isSignedIn) {
                  toast.error("Please login to continue");
                } else {
                  setIsModalOpen(true);
                }
              }}
              className="px-10 py-3.5 bg-primary text-white rounded-full font-bold hover:bg-primary-dull transition active:scale-95 shadow-md"
            >
              Add to Collection
            </button>
          </div>
        </div>
      </div>

      <AddToCollectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movieId={id}
      />
    </div>
  );
};

export default Details;
