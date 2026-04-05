import { StarIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import timeFormat from '../lib/timeFormat'
import { getImageUrl } from '../lib/imageUtils'

const MovieCard = ({ movie, showBuyTickets = true, basePath = "/movies/" }) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-between p-3 bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm text-gray-900 rounded-2xl hover:-translate-y-2 hover:shadow-xl hover:border-white/80 transition-all duration-300 w-full max-w-[300px] sm:max-w-none group">
      <img onClick={() => {
        navigate(`${basePath}${movie._id}`);
        scrollTo(0, 0);
      }}
        src={getImageUrl(movie.poster_path)}
        alt=""
        className="rounded-lg aspect-[2/3] w-full object-cover object-center cursor-pointer" />
      <p className="font-semibold mt-2 truncate">{movie.title}</p>
      <p className="text-sm text-gray-600 mt-2 font-medium">
        {new Date(movie.release_date).getFullYear()} • {movie.genres.slice(0, 2).map(genre => genre.name).join(" | ")} • {timeFormat(movie.runtime)}
      </p>
      <div className="flex items-center justify-between mt-4 pb-3">

        {showBuyTickets && (
          <button onClick={() => { navigate(`${basePath}${movie._id}`); scrollTo(0, 0); }}
            className="px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer text-white">Buy Tickets</button>
        )}
        <p className="flex items-center gap-1 text-sm text-gray-600 font-bold mt-1 pr-1">
          <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  )
}

export default MovieCard