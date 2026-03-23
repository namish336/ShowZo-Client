import React, { useEffect, useState } from 'react';
import { getTheaters } from '../services/api';
import { Link } from 'react-router-dom';
import BlurCircle from '../components/BlurCircle';
import Loading from '../components/Loading';
import { MapPin } from 'lucide-react';

const THEATER_IMAGES = [
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop"
];

const Theaters = () => {
    const [theaters, setTheaters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTheaters = async () => {
            try {
                const data = await getTheaters();
                setTheaters(data);
            } catch (error) {
                console.error("Failed to fetch theaters:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTheaters();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen text-gray-900 bg-[#C0C9DB] px-6 md:px-16 lg:px-40 pt-32 pb-20 relative overflow-hidden">
            <BlurCircle top="10%" left="-10%" />
            <BlurCircle bottom="10%" right="-10%" />

            <h1 className="text-3xl md:text-4xl font-bold mb-4">Theaters</h1>
            <p className="text-gray-700 mb-12 max-w-2xl font-medium">
                Explore our partner theaters and find the best cinema near you. Experience movies in top-notch quality at these premium locations.
            </p>

            {theaters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {theaters.map((theater, index) => (
                        <Link
                            to={`/theaters/${theater._id}/shows`}
                            key={theater._id}
                            className="bg-white/50 backdrop-blur-md border border-white/40 shadow-sm rounded-2xl overflow-hidden hover:border-white/80 hover:shadow-xl transition-all duration-300 group cursor-pointer block transform hover:-translate-y-1"
                        >
                            {/* Image Header */}
                            <div className="h-48 w-full relative overflow-hidden">
                                <img 
                                    src={THEATER_IMAGES[index % THEATER_IMAGES.length]} 
                                    alt={theater.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                
                                {/* Badge */}
                                {theater.isActive !== false && (
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/50 flex items-center gap-2 shadow-lg">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        <span className="text-[10px] font-bold tracking-wider text-gray-900 uppercase">Active</span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 relative">
                                <div className="absolute -top-8 left-6 p-3 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-xl text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <MapPin className="w-6 h-6" />
                                </div>

                                <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors mt-4">{theater.name}</h2>
                                <p className="text-gray-600 font-medium text-sm mb-4 leading-relaxed line-clamp-2">
                                    {theater.location || "Location details not available."}
                                </p>

                                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/40">
                                    <span className="text-xs bg-white/60 border border-white/40 px-2.5 py-1 rounded-md text-gray-800 shadow-sm font-bold">Premium Experience</span>
                                    <span className="text-xs bg-white/60 border border-white/40 px-2.5 py-1 rounded-md text-gray-800 shadow-sm font-bold">4K / Dolby</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-600">
                    <p className="text-xl font-medium">No theaters found at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default Theaters;
