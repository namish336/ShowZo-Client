import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieById, getMovies } from '../services/api'
import BlurCircle from '../components/BlurCircle'
import { Heart, PlayCircleIcon, StarIcon, MapPin } from 'lucide-react'
import timeFormat from '../lib/timeFormat'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import { getImageUrl } from '../lib/imageUtils'
import AddToCollectionModal from '../components/AddToCollectionModal'
import { useAuth } from '@clerk/clerk-react'

const MovieDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedMovies, setRelatedMovies] = useState([])
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieById(id);
        const allMovies = await getMovies({ nowShowing: true });

        if (movieData) {
          setShow({
            movie: movieData,
            showTimes: movieData.showTimes || []
          });
          setRelatedMovies(allMovies.filter(m => m._id !== id));
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);


  if (loading) return <Loading />;

  return show ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      {/* Backdrop Image */}
      {show.movie.backdrop_path && (
        <div className="absolute top-0 left-0 w-full h-[500px] -z-10 overflow-hidden">
          <img
            src={getImageUrl(show.movie.backdrop_path)}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#09090B]" />
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img src={getImageUrl(show.movie.poster_path)} alt="" className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover" />
        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary">ENGLISH</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {show.movie.title}
          </h1>
          <div>
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average ? show.movie.vote_average.toFixed(1) : "N/A"} User Rating
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-gray-400 mt-2">
            {show.movie.rated && <span className="border border-gray-600 px-2 py-0.5 rounded">{show.movie.rated}</span>}
            {show.movie.country && <span>{show.movie.country}</span>}
          </div>

          <p className="text-gray-400 mt-4 text-sm leading-relaxed max-w-xl">
            {show.movie.overview}
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 text-sm max-w-xl">
            {show.movie.director && show.movie.director !== "N/A" && (
              <>
                <span className="text-gray-500">Director</span>
                <span className="text-gray-300">{show.movie.director}</span>
              </>
            )}
            {show.movie.writer && show.movie.writer !== "N/A" && (
              <>
                <span className="text-gray-500">Writer</span>
                <span className="text-gray-300 truncate">{show.movie.writer}</span>
              </>
            )}
            {show.movie.awards && show.movie.awards !== "N/A" && (
              <>
                <span className="text-gray-500">Awards</span>
                <span className="text-gray-300">{show.movie.awards}</span>
              </>
            )}
            {show.movie.boxOffice && show.movie.boxOffice !== "N/A" && (
              <>
                <span className="text-gray-500">Box Office</span>
                <span className="text-gray-300">{show.movie.boxOffice}</span>
              </>
            )}
          </div>

          <p className="mt-4">
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")} •{" "}
            {new Date(show.movie.release_date).getFullYear()}
          </p>
          <div className="flex items-center flex-wrap gap-4 mt-6">
            <a href="#dateSelect" className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95">
              Buy Tickets
            </a>
            <button
              onClick={() => setIsCollectionModalOpen(true)}
              className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95 hover:bg-gray-600"
              title="Add to Collection"
            >
              <Heart className='w-5 h-5' />
            </button>

          </div>
        </div>
      </div>
      <p className="text-lg fontmedium mt-20">Your Favorite Cast</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img src={getImageUrl(cast.profile_path)}
                alt=""
                className="rounded-full h-20 md:h-20 aspect-square object-cover" />
              <p className="font-medium text-xs mt-3">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>
      <DateSelect id={id} />


      <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>

      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {relatedMovies.slice(0, 5).map((movie, index) => (
          <MovieCard key={index} movie={movie} />

        ))}
      </div>
      <div className="flex justify-center mt-20">
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer">
          Show more
        </button>
      </div>

      <AddToCollectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        movieId={show.movie._id}
      />
    </div>
  ) : <Loading />
}

export default MovieDetails