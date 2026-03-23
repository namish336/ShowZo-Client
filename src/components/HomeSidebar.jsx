import React, { useState, useEffect } from 'react';
import { Play, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getNews } from '../services/api';

const trailers = [
  {
    id: 1,
    title: "Scream 7 – Official Trailer",
    thumbnail: "https://img.youtube.com/vi/UJrghaPJ0RY/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/UJrghaPJ0RY",
    duration: "2:25",
  },
  {
    id: 2,
    title: "Avengers Endgame – Official Trailer",
    thumbnail: "https://img.youtube.com/vi/TcMBFSGVi1c/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/TcMBFSGVi1c",
    duration: "2:30",
  },
  {
    id: 3,
    title: " Project Hail Mary",
    thumbnail: "https://img.youtube.com/vi/m08TxIsFTRI/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/m08TxIsFTRI",
    duration: "2:59",
  }
];

const HomeSidebar = () => {
  const navigate = useNavigate();
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setNewsList(data.slice(0, 3));
      } catch (error) {
        console.error("HomeSidebar: Error fetching news", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="w-full lg:w-[320px] h-auto lg:h-full flex flex-col gap-6 p-4 md:p-6 overflow-visible lg:overflow-y-auto no-scrollbar border-t lg:border-t-0 lg:border-r border-white/40 bg-white/40 lg:bg-transparent backdrop-blur-md text-gray-900 relative z-10 shadow-xl lg:shadow-none shrink-0 lg:shrink mt-6 lg:mt-0">

      {/* New Trailer Section */}
      <div className="bg-[#C0C9DB]/60 backdrop-blur-md border border-white/50 rounded-3xl p-5 flex flex-col gap-4 shadow-lg shadow-black/5">
        <div className="flex items-center justify-between text-gray-900">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-sm">Trailers</span>
          </div>
          <span className="text-xs text-gray-500 cursor-pointer hover:text-gray-900"></span>
        </div>

        <div className="flex flex-col gap-4">
          {trailers.slice(0, 3).map((item) => (
            <div key={item.id} onClick={() => setActiveTrailer(item)} className="relative group rounded-2xl overflow-hidden cursor-pointer h-[120px] shrink-0 border border-white/50 shadow-sm">
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
                <span className="text-white text-xs font-medium line-clamp-2">{item.title}</span>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm shadow-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-4 h-4 text-gray-900 fill-gray-900 ml-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Section */}
      <div className="bg-[#C0C9DB]/60 backdrop-blur-md border border-white/50 rounded-3xl p-5 flex flex-col gap-4 flex-1 shadow-lg shadow-black/5">
        <span className="font-semibold text-sm text-gray-900">News</span>
        
        <div className="flex flex-col gap-4">
          {newsList.length > 0 ? newsList.map((news) => (
            <div key={news._id} onClick={() => navigate(`/news/${news._id}`)} className="flex items-center gap-3 group cursor-pointer p-2 hover:bg-white/80 hover:shadow-sm rounded-2xl transition border border-transparent hover:border-white/80">
              <img src={news.image} alt={news.title} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/50 shadow-sm" />
              <div className="flex flex-col">
                <span className="text-gray-900 text-xs font-semibold line-clamp-1 group-hover:text-amber-600 transition-colors">{news.title}</span>
                <span className="text-gray-500 text-[10px] mt-1 line-clamp-2">{news.description}</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center shrink-0 ml-auto group-hover:bg-gray-50 group-hover:scale-110 transition-all">
                <Play className="w-3 h-3 text-gray-700 fill-gray-700 ml-0.5" />
              </div>
            </div>
          )) : (
            <p className="text-gray-500 text-xs text-center py-4">No recent news.</p>
          )}
        </div>
      </div>
      {/* Modal Player */}
      {activeTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl mx-4 bg-black rounded-2xl overflow-hidden">
            <button
              className="absolute top-3 right-3 text-white text-xl z-50 bg-black/50 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition"
              onClick={() => setActiveTrailer(null)}
            >
              ✕
            </button>
            <div className="w-full aspect-video relative">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={activeTrailer.videoUrl}
                title={activeTrailer.title}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSidebar;
