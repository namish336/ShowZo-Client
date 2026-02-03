import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddToCollectionModal from "../components/AddToCollectionModal";

const API_KEY = import.meta.env.VITE_OMDB_KEY;

const Details = () => {
  const { id } = useParams(); // imdbID from URL

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="min-h-screen flex justify-center items-center bg-black">
        <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        Movie not found.
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 lg:px-32 pt-32">

      <div className="grid md:grid-cols-2 gap-10">

        {/* Poster */}
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
          alt={movie.Title}
          className="rounded-xl shadow-2xl w-full max-w-md"
        />

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">
            {movie.Title}
          </h1>

          <p className="text-gray-400 mb-2">
            {movie.Year} • {movie.Runtime} • {movie.Genre}
          </p>

          <p className="mb-6 text-lg text-gray-300">
            {movie.Plot}
          </p>

          <div className="space-y-2 text-gray-300">
            <p><span className="font-semibold text-white">Director:</span> {movie.Director}</p>
            <p><span className="font-semibold text-white">Actors:</span> {movie.Actors}</p>
            <p><span className="font-semibold text-white">IMDb Rating:</span> ⭐ {movie.imdbRating}</p>
          </div>

          {/* Add to Collection Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-8 px-8 py-3 bg-primary rounded-full font-semibold hover:scale-105 transition"
          >
            Add to Collection
          </button>
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
