import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllShowtimes } from '../services/api'; // Using existing API but will filter by theater ID
import Loading from '../components/Loading';
import BlurCircle from '../components/BlurCircle';
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const TheaterShows = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();
    const [showtimes, setShowtimes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                // Fetch showtimes filtering by theater ID
                const data = await getAllShowtimes({ theater: id });
                setShowtimes(data);
            } catch (error) {
                console.error("Failed to fetch showtimes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchShows();
    }, [id]);

    if (loading) return <Loading />;

    // Group showtimes by movie
    const showsByMovie = showtimes.reduce((acc, show) => {
        const movieId = show.movie._id;
        if (!acc[movieId]) {
            acc[movieId] = {
                movie: show.movie,
                shows: []
            };
        }
        acc[movieId].shows.push(show);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-[#C0C9DB] text-gray-900 px-6 md:px-16 lg:px-40 pt-32 pb-20 relative overflow-hidden">
            <BlurCircle top="10%" left="-10%" />
            <BlurCircle bottom="10%" right="-10%" />

            <div className="mb-8">
                <button onClick={() => navigate(-1)} className="text-gray-700 hover:text-gray-900 font-medium mb-4 transition">
                    &larr; Back to Theaters
                </button>
                <h1 className="text-3xl md:text-4xl font-bold">
                    {showtimes.length > 0 ? showtimes[0].theater.name : 'Theater Shows'}
                </h1>
                <p className="text-gray-700 font-medium">
                    {showtimes.length > 0 ? showtimes[0].theater.location : ''}
                </p>
            </div>

            {Object.keys(showsByMovie).length > 0 ? (
                <div className="space-y-12">
                    {Object.values(showsByMovie).map(({ movie, shows }) => (
                        <div key={movie._id} className="bg-white/50 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm">
                            <div className="flex flex-col md:flex-row gap-6">
                                <img
                                    src={movie.poster_path}
                                    alt={movie.title}
                                    className="w-full md:w-32 h-48 object-cover rounded-lg shadow-lg"
                                />
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {shows.map((show) => (
                                            <button
                                                key={show._id}
                                                onClick={() => {
                                                    if (!isSignedIn) {
                                                        toast.error("Please login to continue");
                                                    } else {
                                                        navigate(`/movies/${movie._id}/${new Date(show.showTime).toISOString().split('T')[0]}?theaterId=${id}&showId=${show._id}`);
                                                    }
                                                }}
                                                className="px-4 py-2 bg-white/80 hover:bg-white text-primary rounded-lg border border-primary/30 transition duration-300 shadow-sm font-bold"
                                            >
                                                {new Date(show.showTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-600">
                    <p className="text-xl font-medium">No shows available at this theater currently.</p>
                </div>
            )}
        </div>
    );
};

export default TheaterShows;
