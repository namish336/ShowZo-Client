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
import toast from 'react-hot-toast'

const MovieDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedMovies, setRelatedMovies] = useState([])
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const { isSignedIn } = useAuth();

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
    <div className="bg-[#C0C9DB] text-gray-900 min-h-screen relative px-6 md:px-16 lg:px-40 pt-30 md:pt-50 pb-20">
      {/* Backdrop Image */}
      {show.movie.backdrop_path && (
        <div className="absolute top-0 left-0 w-full h-[500px] z-0 overflow-hidden">
          <img
            src={getImageUrl(show.movie.backdrop_path)}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#C0C9DB]" />
        </div>
      )}
      
      {/* Content Container positioned above backdrop */}
      <div className="relative z-10 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Poster */}
        <div className="shrink-0">
          <img 
            src={getImageUrl(show.movie.poster_path)} 
            alt={show.movie.title} 
            className="max-md:mx-auto rounded-xl h-[420px] max-w-70 w-full object-cover shadow-2xl" 
          />
        </div>
        
        {/* Detail Info */}
        <div className="relative flex flex-col gap-3 pt-4">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary text-xs font-bold tracking-widest uppercase">
            {show.movie.original_language === 'en' ? 'ENGLISH' : show.movie.original_language || 'ENGLISH'}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 max-w-xl text-balance">
            {show.movie.title}
          </h1>
          <div className="flex items-center gap-1.5 text-gray-900 font-medium">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average ? show.movie.vote_average.toFixed(1) : "N/A"} User Rating
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 mt-1 font-medium border-b border-black/10 pb-4">
            {show.movie.rated && <span className="border border-gray-500 bg-white/40 px-2.5 py-1 rounded text-xs">{show.movie.rated}</span>}
            {show.movie.country && <span>{show.movie.country}</span>}
          </div>

          <p className="text-gray-800 font-medium mt-3 text-sm leading-relaxed max-w-2xl">
            {show.movie.overview}
          </p>

          <div className="grid grid-cols-[100px_1fr] gap-x-6 gap-y-3 mt-4 text-sm max-w-2xl font-medium">
            {show.movie.director && show.movie.director !== "N/A" && (
              <>
                <span className="text-gray-600">Director</span>
                <span className="text-gray-900">{show.movie.director}</span>
              </>
            )}
            {show.movie.writer && show.movie.writer !== "N/A" && (
              <>
                <span className="text-gray-600">Writer</span>
                <span className="text-gray-900 truncate">{show.movie.writer}</span>
              </>
            )}
            {show.movie.awards && show.movie.awards !== "N/A" && (
              <>
                <span className="text-gray-600">Awards</span>
                <span className="text-gray-900">{show.movie.awards}</span>
              </>
            )}
            {show.movie.boxOffice && show.movie.boxOffice !== "N/A" && (
              <>
                <span className="text-gray-600">Box Office</span>
                <span className="text-gray-900">{show.movie.boxOffice}</span>
              </>
            )}
          </div>

          <p className="mt-4 text-gray-900 font-bold text-sm">
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")} •{" "}
            {new Date(show.movie.release_date).getFullYear()}
          </p>
          
          <div className="flex items-center flex-wrap gap-4 mt-8">
            <a href="#dateSelect" className="px-12 py-3.5 text-sm bg-primary text-white hover:bg-primary-dull transition rounded-full cursor-pointer active:scale-95 shadow-md font-bold">
              Buy Tickets
            </a>
            <button
              onClick={() => {
                if (!isSignedIn) {
                  toast.error("Please login to continue");
                } else {
                  setIsCollectionModalOpen(true);
                }
              }}
              className="bg-white/60 hover:bg-white/80 border border-white/50 text-gray-900 p-3.5 rounded-full transition cursor-pointer active:scale-95 shadow-sm"
              title="Add to Collection"
            >
              <Heart className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>

      {/* Cast */}
      <div className="relative z-10">
        <p className="text-xl font-bold mt-24 text-gray-900">Your Favorite Cast</p>
        <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
          <div className="flex items-center gap-6 w-max">
            {show.movie.casts.slice(0, 12).map((cast, index) => (
              <div key={index} className="flex flex-col items-center text-center w-24">
                <img src={getImageUrl(cast.profile_path)}
                  alt=""
                  className="rounded-full w-20 h-20 aspect-square object-cover border-2 border-white/50 shadow-sm" />
                <p className="font-bold text-gray-800 text-xs mt-3 leading-tight">{cast.name}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div id="dateSelect" className="mt-12">
          <DateSelect id={id} />
        </div>

        <p className="text-xl font-bold mt-24 mb-8 text-gray-900">You May Also Like</p>
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
            className="px-10 py-3 text-sm bg-primary text-white hover:bg-primary-dull transition rounded-full font-bold cursor-pointer shadow-md">
            Show more
          </button>
        </div>
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