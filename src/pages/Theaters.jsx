import React, { useEffect, useState } from 'react';
import { getTheaters } from '../services/api';
import { Link } from 'react-router-dom';
import BlurCircle from '../components/BlurCircle';
import Loading from '../components/Loading';
import { MapPin } from 'lucide-react';

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
        <div className="min-h-screen bg-black text-white px-6 md:px-16 lg:px-40 pt-32 pb-20 relative overflow-hidden">
            <BlurCircle top="10%" left="-10%" />
            <BlurCircle bottom="10%" right="-10%" />

            <h1 className="text-3xl md:text-4xl font-bold mb-4">Theaters</h1>
            <p className="text-gray-400 mb-12 max-w-2xl">
                Explore our partner theaters and find the best cinema near you. Experience movies in top-notch quality at these premium locations.
            </p>

            {theaters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {theaters.map((theater) => (
                        <Link
                            to={`/theaters/${theater._id}/shows`}
                            key={theater._id}
                            className="bg-[#18181B] border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition duration-300 group cursor-pointer block"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <MapPin className="w-6 h-6" />
                                </div>
                            </div>

                            <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition">{theater.name}</h2>
                            <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                                {theater.location || "Location details not available."}
                            </p>

                            <div className="flex items-center text-sm text-gray-500">
                                <span>Premium Experience</span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-xl">No theaters found at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default Theaters;
