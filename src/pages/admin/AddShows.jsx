import React, { useEffect, useState } from 'react'
import { getMovies, addShow, getTheaters } from '../../services/api';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { getImageUrl } from '../../lib/imageUtils';
import { CheckIcon, CalendarIcon, ClockIcon, DollarSignIcon, PlusCircleIcon, StarIcon, LayoutGridIcon, MapPinIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const AddShows = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPrice, setShowPrice] = useState("");
  const [showDate, setShowDate] = useState("");
  const [showTime, setShowTime] = useState("");
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const movies = await getMovies({ nowShowing: true });
      const theatersData = await getTheaters();
      setNowPlayingMovies(movies);
      setTheaters(theatersData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  const handleAddShow = async () => {
    if (!selectedMovie || !showPrice || !showDate || !showTime) {
      toast.error("Please fill all fields");
      return;
    }

    if (isNaN(showPrice) || Number(showPrice) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    const loadToast = toast.loading("Adding show...");
    const combinedDate = new Date(`${showDate}T${showTime}`);

    const showData = {
      movie: selectedMovie,
      price: Number(showPrice),
      showTime: combinedDate.toISOString(),
      theater: selectedTheater || null
    };

    try {
      const result = await addShow(showData);
      if (result.success) {
        toast.dismiss(loadToast);
        if (selectedTheater) {
          const theaterName = theaters.find(t => t._id === selectedTheater)?.name || "specific theater";
          toast.success(`Show added to ${theaterName}!`);
        } else {
          toast.success("Show added to all theaters!");
        }
        // Reset only mutable fields
        setShowPrice("");
        setShowTime("");
      } else {
        toast.dismiss(loadToast);
        toast.error(result.message || "Failed to add show");
      }
    } catch (error) {
      toast.dismiss(loadToast);
      toast.error("Error adding show");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return !loading ? (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <Title text1="Add" text2="Shows" />
          <p className="text-gray-400 mt-2 text-sm">Select a movie and set details to create shows across all theaters.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Movie Selection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <LayoutGridIcon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Select Movie</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {nowPlayingMovies.map((movie) => (
              <div
                key={movie._id}
                className={`group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 ${selectedMovie === movie._id
                  ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-xl shadow-primary/10'
                  : 'border-white/5 opacity-70 hover:opacity-100 hover:border-white/20'
                  }`}
                onClick={() => setSelectedMovie(movie._id)}
              >
                <div className="relative aspect-[2/3]">
                  <img
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  {selectedMovie === movie._id && (
                    <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                        <CheckIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                    <p className="text-white text-xs font-medium truncate">{movie.title}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <StarIcon className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-[10px] text-gray-300">{movie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Details Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-[#1a1a1a]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <PlusCircleIcon className="w-5 h-5 text-primary" />
              Show Details
            </h3>

            <div className="space-y-5">
              {/* Theater Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-primary" /> Theater
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary transition-all [color-scheme:dark]"
                  value={selectedTheater}
                  onChange={(e) => setSelectedTheater(e.target.value)}
                >
                  <option value="" className="bg-[#1a1a1a] text-gray-400">All Theaters</option>
                  {theaters.map((theater) => (
                    <option key={theater._id} value={theater._id} className="bg-[#1a1a1a]">
                      {theater.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 px-1">
                  {selectedTheater ? "Show will be added to selected theater only" : "Show will be added to ALL theaters"}
                </p>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-primary" /> Date
                </label>
                <input
                  type="date"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary transition-all [color-scheme:dark]"
                  value={showDate}
                  onChange={(e) => setShowDate(e.target.value)}
                />
              </div>

              {/* Time Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-primary" /> Time
                </label>
                <input
                  type="time"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary transition-all [color-scheme:dark]"
                  value={showTime}
                  onChange={(e) => setShowTime(e.target.value)}
                />
              </div>

              {/* Price Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <DollarSignIcon className="w-4 h-4 text-primary" /> Price ($)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0.00"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                  value={showPrice}
                  onChange={(e) => setShowPrice(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleAddShow}
                  disabled={!selectedMovie}
                  className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${selectedMovie
                    ? 'bg-primary hover:bg-primary-dull text-white shadow-lg shadow-primary/20 active:scale-[0.98]'
                    : 'bg-white/5 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  <PlusCircleIcon className="w-5 h-5" />
                  Add Show
                </button>
                {!selectedMovie && (
                  <p className="text-xs text-center text-gray-500 mt-3">Select a movie first to proceed</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default AddShows