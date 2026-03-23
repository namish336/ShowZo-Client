import React, { useEffect, useState } from 'react'
import { getMovies } from '../services/api'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import Loading from '../components/Loading'

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies({ nowShowing: true });
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <Loading />;

  return movies.length > 0 ? (
    <div className="relative pt-32 pb-40 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[100vh] bg-[#C0C9DB] text-gray-900">
      <BlurCircle top="150px" left="0" />
      <BlurCircle bottom="50px" right="50px" />
      <h1 className="text-lg font-medium my-4">Now Showing</h1>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))
        }
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#C0C9DB] text-gray-900">
      <h1 className="text-3xl font-bold text-center">No movies available</h1>
    </div>
  )
}

export default Movies