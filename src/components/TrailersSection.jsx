import React, { useState } from "react";
import { Play } from "lucide-react";
import BlurCircle from "./BlurCircle";

// Sample trailer data (replace with your API/data)
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
    duration: "2:30", // optional
  },
  {
    id: 3,
    title: " Project Hail Mary",
    thumbnail: "https://img.youtube.com/vi/m08TxIsFTRI/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/m08TxIsFTRI",
    duration: "2:59",
  },
  {
    id: 4,
    title: "Swayambhu",
    thumbnail: "https://img.youtube.com/vi/adercjMU19o/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/adercjMU19o",
    duration: "2:05",
  },
];

const TrailerSection = () => {
  const [activeTrailer, setActiveTrailer] = useState(null);

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-44 py-16 text-white">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Trailers</h2>
        {/*<button className="text-sm text-pink-500 hover:underline">View all</button >*/}

      </div>
      <BlurCircle />
      {/* Trailer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trailers.map((trailer) => (
          <div
            key={trailer.id}
            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg"
            onClick={() => setActiveTrailer(trailer)}
          >
            {/* Thumbnail */}
            <img
              src={trailer.thumbnail}
              alt={trailer.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-pink-600 p-4 rounded-full">
                <Play className="w-6 h-6 text-white" fill="white" />
              </div>
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-sm font-medium truncate">{trailer.title}</p>
              <p className="text-xs text-gray-300">{trailer.duration}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Player */}
      {activeTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl mx-4 bg-black rounded-2xl overflow-hidden">
            <button
              className="absolute top-3 right-3 text-white text-xl"
              onClick={() => setActiveTrailer(null)}
            >
              ✕
            </button>
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full"
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
    </section>
  );
};

export default TrailerSection;
