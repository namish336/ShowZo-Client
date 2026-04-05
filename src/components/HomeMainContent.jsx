import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Download, Ticket, Heart, StarIcon, CalendarIcon, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getMovies } from '../services/api';
import { getImageUrl } from '../lib/imageUtils';
import timeFormat from '../lib/timeFormat';
import { dateFormat } from '../lib/dateFormat';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import AddToCollectionModal from "./AddToCollectionModal";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

export const CUSTOM_BACKDROPS = {
  "your name": "https://image.tmdb.org/t/p/original/6vkhRvsRvWpmaRVyCXa24nig7m2.jpg",
};

const promotionalAds = [
  {
    id: 1,
    category: "OTT Promotions",
    title: "Stream Unlimited Movies\non Netflix",
    desc: "Catch the latest blockbusters, exclusive series, and Originals available in 4K HDR.",
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2070&auto=format&fit=crop",
    btnText: "Start Free Trial",
    badgeColor: "text-red-500",
    gradient: "from-red-600/20 via-black/50 to-black/80",
    btnTheme: "from-red-600 to-red-700 shadow-red-500/20",
    url: "https://www.netflix.com/"
  },
  {
    id: 2,
    category: "Food Delivery",
    title: "Craving Snacks?\nOrder via Zomato",
    desc: "Get popcorn, nachos, and cold drinks delivered straight to your home or seat at 50% off.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
    btnText: "Order Now",
    badgeColor: "text-orange-500",
    gradient: "from-orange-500/20 via-black/50 to-black/80",
    btnTheme: "from-orange-500 to-red-500 shadow-orange-500/20",
    url: "https://www.zomato.com/"
  },
  {
    id: 3,
    category: "Live Events",
    title: "Book Live Comedy &\nConcert Tickets",
    desc: "Don't miss the biggest live shows in your city! Exclusive early bird discounts available.",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop",
    btnText: "Book Now",
    badgeColor: "text-purple-500",
    gradient: "from-purple-600/20 via-black/50 to-black/80",
    btnTheme: "from-purple-500 to-indigo-600 shadow-purple-500/20",
    url: "https://www.district.in/events/"
  },
  {
    id: 4,
    category: "Exclusive Premiere",
    title: "Disney+ Hotstar\nVIP Access",
    desc: "Stream Live Sports, Marvel blockbusters, and Star Wars epics in multiple languages.",
    image: "https://images.unsplash.com/photo-1615986201152-7686a4867f30?q=80&w=2025&auto=format&fit=crop",
    btnText: "Upgrade to VIP",
    badgeColor: "text-blue-400",
    gradient: "from-blue-600/20 via-black/50 to-black/80",
    btnTheme: "from-blue-500 to-blue-700 shadow-blue-500/20",
    url: "https://www.hotstar.com/"
  }
];

const HomeMainContent = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const [heroMovies, setHeroMovies] = useState([]);
  const [moviesList, setMoviesList] = useState([]);

  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch movies specifically for the hero banner/carousel
        const heroData = await getMovies({ isHero: true });
        
        // Fetch all movies for fallback or other logic
        const allMovies = await getMovies({});
        
        if (heroData && heroData.length > 0) {
          setHeroMovies(heroData.slice(0, 5));
        } else if (allMovies && allMovies.length > 0) {
          // Fallback to first 5 movies if none are marked as hero
          setHeroMovies(allMovies.slice(0, 5));
        }

        // Fetch "home: true" movies for the Now Showing scroller
        const nowShowing = await getMovies({ home: true });
        if (nowShowing && nowShowing.length > 0) {
          setMoviesList(nowShowing);
        } else {
          setMoviesList(allMovies.slice(5, 15)); // Fallback
        }
      } catch (err) {
        console.error("Failed to fetch movies", err);
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

  return (
    <div className="flex-none lg:flex-1 w-full lg:w-auto h-auto flex flex-col p-4 md:p-6 no-scrollbar max-w-full overflow-x-hidden">

      {/* Hero Section Container */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 shrink-0">

        {/* Hero Banner Carousel */}
        {heroMovies.length > 0 && (
          <div className="relative w-full lg:w-1/2 h-[450px] md:h-[380px] group rounded-3xl overflow-hidden shadow-2xl">
            <Swiper
              spaceBetween={0}
              effect={"fade"}
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={{ nextEl: '.custom-button-next', prevEl: '.custom-button-prev' }}
              modules={[Autoplay, EffectFade, Pagination, Navigation]}
              className="h-full w-full"
            >
              {heroMovies.map((movie) => {
                const customBackdrop = Object.entries(CUSTOM_BACKDROPS).find(([key]) => movie.title.toLowerCase().includes(key.toLowerCase()))?.[1];
                const backdropUrl = customBackdrop || getImageUrl(movie.backdrop_path);

                return (
                  <SwiperSlide key={movie._id} className="bg-black">
                    <div className="relative w-full h-full font-sans">
                      <div
                        className="absolute inset-0 bg-cover bg-[center_top] transition-transform duration-700 blur-[0.5px] opacity-70"
                        style={{ backgroundImage: `url(${backdropUrl})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />
                      </div>

                      <div className="relative z-10 h-full w-full flex flex-col md:flex-row items-center justify-center md:items-center px-4 md:px-8 gap-4 md:gap-6 pt-5 md:pt-0">

                        {/* Left: Poster */}
                        <div className="block w-[100px] md:w-[120px] xl:w-[140px] shrink-0 transform hover:scale-105 transition duration-500 shadow-xl shadow-primary/20 rounded-xl overflow-hidden mt-2 md:mt-4">
                          <img
                            src={getImageUrl(movie.poster_path)}
                            alt={movie.title}
                            className="w-full aspect-[2/3] object-cover"
                          />
                        </div>

                        {/* Right: Details */}
                        <div className="flex-1 space-y-2 md:space-y-3 text-center md:text-left">
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-[8px] md:text-[10px] font-bold tracking-widest uppercase text-gray-300">
                            <span className="bg-white/10 border border-white/20 backdrop-blur-md px-2 py-1 rounded-full text-white">{movie.original_language || 'EN'}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-400" />
                            <span className="bg-white/10 border border-white/20 backdrop-blur-md px-2 py-1 rounded-full text-white">{movie.genres?.slice(0, 2).map(g => g.name).join(", ") || 'Fantasy'}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-400" />
                            <span className="bg-white/10 border border-white/20 backdrop-blur-md px-2 py-1 rounded-full text-white">{timeFormat(movie.runtime) || '2H 10M'}</span>
                          </div>

                          <h1 className="text-xl md:text-3xl font-extrabold text-white leading-tight line-clamp-1 md:line-clamp-2">
                            {movie.title}
                          </h1>

                          <div className="flex items-center justify-center md:justify-start gap-3">
                            <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-lg border border-yellow-500/20">
                              <StarIcon className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                              <span className="font-bold text-[10px] md:text-xs">{movie.vote_average?.toFixed(1) || '8.5'}</span>
                            </div>
                            <div className="text-gray-300 text-[10px] md:text-xs flex items-center gap-1.5 font-medium">
                              <CalendarIcon className="w-3 h-3" />
                              {dateFormat(movie.release_date)}
                            </div>
                          </div>

                          <p className="hidden md:block text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3 font-medium">
                            {movie.overview}
                          </p>

                          <div className="flex items-center justify-center md:justify-start gap-3 pt-1 md:pt-2">
                            <button
                              onClick={() => navigate(`/movies/${movie._id}`)}
                              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#e50914] hover:bg-[#b20710] text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-[0_4px_14px_rgba(229,9,20,0.3)] text-[10px] md:text-xs"
                            >
                              <span className="uppercase tracking-wider">Book</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>

                            <button
                              onClick={() => openCollectionModal(movie._id)}
                              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold transition-all text-[10px] md:text-xs shadow-sm"
                            >
                              <Heart className="w-3 h-3" />
                              <span className="hidden sm:inline">Collection</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <button className="custom-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 hover:border-white/50 transition-all opacity-0 group-hover:opacity-100 cursor-pointer hidden md:flex shadow-md">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="custom-button-next absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 hover:border-white/50 transition-all opacity-0 group-hover:opacity-100 cursor-pointer hidden md:flex shadow-md">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dynamic Promotional Ad Section */}
        <div className="w-full lg:w-1/2 h-[300px] md:h-[380px] rounded-3xl overflow-hidden shadow-2xl bg-[#0f0f0f] border border-white/10 relative group">
          <Swiper
            spaceBetween={0}
            effect={"fade"}
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            modules={[Autoplay, EffectFade]}
            className="h-full w-full"
          >
            {promotionalAds.map((ad) => (
              <SwiperSlide key={ad.id} className="w-full h-full relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${ad.gradient} z-0`}></div>
                <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity z-0 transition-transform duration-[6000ms] scale-100 group-hover:scale-110" style={{ backgroundImage: `url(${ad.image})` }}></div>

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-8">
                  <span className={`px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold tracking-[0.2em] ${ad.badgeColor} uppercase mb-6`}>
                    {ad.category}
                  </span>

                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight whitespace-pre-line">
                    {ad.title}
                  </h3>

                  <p className="text-gray-300 text-sm md:text-base mb-8 max-w-[85%] mx-auto leading-relaxed line-clamp-2 md:line-clamp-3">
                    {ad.desc}
                  </p>

                  <button
                    onClick={() => window.open(ad.url, '_blank')}
                    className={`group/btn relative overflow-hidden flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r ${ad.btnTheme} text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl text-sm cursor-pointer`}
                  >
                    <span className="relative z-10">{ad.btnText}</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      {/* Horizontal Scroller: Now Showing */}
      <div className="flex items-center justify-between mb-4 mt-2">
        <h2 className="text-xl font-bold text-gray-900 tracking-wide">Now Showing</h2>
        <button
          onClick={() => navigate('/movies')}
          className="text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 min-h-0 flex gap-4 md:gap-10 overflow-x-auto no-scrollbar pb-4 -mx-4 md:-mx-6 px-4 md:px-6">
        {moviesList.map(movie => (
          <div
            key={movie._id}
            className="relative w-[160px] md:w-[220px] min-h-[250px] md:min-h-[300px] lg:h-full rounded-2xl overflow-hidden shrink-0 group border border-white/40 hover:border-white/80 shadow-sm hover:shadow-md cursor-pointer transition-all"
            onClick={() => navigate(`/movies/${movie._id}`)}
          >
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end h-full">
              <span className="bg-white/10 backdrop-blur-md text-white border border-white/10 text-[10px] uppercase font-bold px-3 py-1 rounded-full w-max mb-3">
                {movie.genres?.[0]?.name || 'Fantasy'}
              </span>

              <h3 className="text-lg font-bold text-white leading-tight mb-1 line-clamp-1">{movie.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-2 mb-4">{movie.overview}</p>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-gray-300 hover:text-white cursor-pointer transition relative before:absolute before:w-full before:h-px before:bottom-0 before:bg-white/50">
                  See more...
                </span>
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0 cursor-pointer hover:scale-110 transition">
                  <Ticket className="w-4 h-4 text-black" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddToCollectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        movieId={selectedMovieId}
      />

      <style>{`
        .swiper-pagination-bullet {
            background: white;
            opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
            background: #e50914;
            opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default HomeMainContent;
