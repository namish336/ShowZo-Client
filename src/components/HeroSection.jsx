import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { ArrowRight, CalendarIcon, ClockIcon, Heart, StarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

import { getMovies } from "../services/api";
import { getImageUrl } from "../lib/imageUtils";
import { dateFormat } from "../lib/dateFormat";
import timeFormat from "../lib/timeFormat";
import Loading from "./Loading";
import { CUSTOM_BACKDROPS, HERO_MOVIES } from "../constants/heroData";
import AddToCollectionModal from "./AddToCollectionModal";

const HeroSection = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allMovies = await getMovies({});

        // Filter for specific hero movies
        // Note: For production, better to use IDs or a "featured" flag.
        // Doing fuzzy math on title for now.
        const heroMovies = allMovies.filter(m =>
          HERO_MOVIES.some(target => m.title.toLowerCase().includes(target.toLowerCase()))
        );

        // Sort them in the order of HERO_MOVIES list if needed, or just use what we found
        // If we found fewer than 3, fallback to top rated
        if (heroMovies.length < 3) {
          const others = allMovies.filter(m => !heroMovies.includes(m)).slice(0, 5 - heroMovies.length);
          setMovies([...heroMovies, ...others]);
        } else {
          setMovies(heroMovies);
        }
      } catch (error) {
        console.error("Error fetching hero movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const openCollectionModal = (movieId) => {
    if (!isSignedIn) {
      toast.error("Please login to continue");
      return;
    }
    setSelectedMovieId(movieId);
    setIsCollectionModalOpen(true);
  };

  if (loading) return <Loading />;
  if (movies.length === 0) return null;

  return (
    <div className="h-screen w-full relative">
      <Swiper
        spaceBetween={0}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        className="h-full w-full"
      >
        {movies.map((movie) => {
          // Check for custom backdrop
          const customBackdrop = Object.entries(CUSTOM_BACKDROPS).find(([key]) => movie.title.toLowerCase().includes(key.toLowerCase()))?.[1];
          const backdropUrl = customBackdrop || getImageUrl(movie.backdrop_path);

          return (
            <SwiperSlide key={movie._id} className="bg-black">
              <div className="relative w-full h-full font-sans">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 blur-[0.5px] opacity-60"
                  style={{ backgroundImage: `url(${backdropUrl})` }}
                >
                  {/* Dark Overlay for readability */}
                  <div className="absolute inset-0 bg-black/60" />
                </div>

                {/* Modern Split Layout */}
                <div className="relative z-10 h-full w-full flex flex-col md:flex-row items-center justify-center px-6 md:px-16 lg:px-36 gap-8 md:gap-16 pt-20">

                  {/* Left: Poster */}
                  <div className="hidden md:block w-[300px] lg:w-[350px] shrink-0 transform hover:scale-105 transition duration-500 shadow-2xl shadow-primary/20 rounded-2xl overflow-hidden animate-fade-in-up">
                    <img
                      src={getImageUrl(movie.poster_path)}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right: Details */}
                  <div className="flex-1 max-w-2xl space-y-6 text-center md:text-left animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-semibold tracking-wide uppercase text-gray-400">
                      <span>{movie.original_language}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-500" />
                      <span>{movie.genres?.slice(0, 3).map(g => g.name).join(", ")}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-500" />
                      <span>{timeFormat(movie.runtime)}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                      {movie.title}
                    </h1>

                    <div className="flex items-center justify-center md:justify-start gap-4">
                      <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-lg border border-yellow-500/20">
                        <StarIcon className="w-4 h-4 fill-yellow-400" />
                        <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                        <span className="text-xs opacity-75">/ 10</span>
                      </div>
                      <div className="text-gray-400 text-sm flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        {dateFormat(movie.release_date)}
                      </div>
                    </div>

                    <p className="text-gray-300 text-base md:text-lg leading-relaxed line-clamp-3 md:line-clamp-4">
                      {movie.overview}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
                      <button
                        onClick={() => navigate(`/movies/${movie._id}`)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#e50914] hover:bg-[#b20710] text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-red-600/20"
                      >
                        <span className="uppercase tracking-wider">Book Tickets</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => openCollectionModal(movie._id)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-xl font-bold transition-all hover:border-white/30"
                      >
                        <Heart className="w-5 h-5" />
                        <span>Add to Collection</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="custom-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-primary hover:border-primary transition-all duration-300 group cursor-pointer hidden md:flex">
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button className="custom-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-primary hover:border-primary transition-all duration-300 group cursor-pointer hidden md:flex">
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>
      <AddToCollectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        movieId={selectedMovieId}
      />

      {/* Custom Styles */}
      <style jsx>{`
        .swiper-pagination-bullet {
            background: white;
            opacity: 0.2;
            width: 12px;
            height: 12px;
            transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
            background: #e50914;
            opacity: 1;
            transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default HeroSection;