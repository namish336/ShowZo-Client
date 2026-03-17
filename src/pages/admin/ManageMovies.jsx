import React, { useEffect, useState } from 'react';
import Title from '../../components/admin/Title';
import Loading from '../../components/Loading';
import { getMovies, updateMovie } from '../../services/api';
import { getImageUrl } from '../../lib/imageUtils';
import { SearchIcon, EyeIcon, EyeOffIcon, CalendarIcon, StarIcon, HomeIcon, EditIcon, CheckCircle2Icon } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageMovies = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredMovies(movies);
        } else {
            const lowerCaseSearch = searchTerm.toLowerCase();
            const filtered = movies.filter(movie =>
                movie.title.toLowerCase().includes(lowerCaseSearch)
            );
            setFilteredMovies(filtered);
        }
    }, [searchTerm, movies]);

    const fetchMovies = async () => {
        try {
            const data = await getMovies({});
            setMovies(data);
            setFilteredMovies(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
            toast.error("Failed to load movies");
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (id, field, currentValue) => {
        const loadingToast = toast.loading("Updating...");
        try {
            await updateMovie(id, { [field]: !currentValue });

            setMovies(prevMovies => prevMovies.map(movie =>
                movie._id === id ? { ...movie, [field]: !currentValue } : movie
            ));

            toast.dismiss(loadingToast);
            toast.success("Updated successfully");
        } catch (error) {
            console.error("Error updating movie:", error);
            toast.dismiss(loadingToast);
            toast.error("Failed to update movie");
        }
    };

    return !loading ? (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Title text1="Manage" text2="Movies" />
                    <p className="text-gray-400 text-sm mt-1">Total {movies.length} movies in database</p>
                </div>

                {/* Search Bar */}
                <div className="relative group w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search movies by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all"
                    />
                </div>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map((movie) => (
                    <div
                        key={movie._id}
                        className="group relative bg-[#1a1a1a]/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full"
                    >
                        {/* Poster & Overlay Actions */}
                        <div className="relative aspect-[2/3] overflow-hidden">
                            <img
                                src={getImageUrl(movie.poster_path)}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />



                            {/* Badges */}
                            <div className="absolute top-2 left-2 flex gap-1">
                                {movie.isNowShowing && (
                                    <span className="bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Now Showing
                                    </span>
                                )}
                            </div>
                            <div className="absolute top-2 right-2 flex gap-1">
                                <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                                    <StarIcon className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {movie.vote_average.toFixed(1)}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-white truncate mb-1" title={movie.title}>{movie.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                                <CalendarIcon className="w-3 h-3" />
                                {new Date(movie.release_date).toLocaleDateString()}
                            </div>

                            {/* Toggles */}
                            <div className="mt-auto grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => handleToggle(movie._id, 'isNowShowing', movie.isNowShowing)}
                                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${movie.isNowShowing
                                        ? "bg-primary/10 border-primary/30 text-primary"
                                        : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                                        }`}
                                >
                                    {movie.isNowShowing ? <EyeIcon className="w-5 h-5 mb-1" /> : <EyeOffIcon className="w-5 h-5 mb-1" />}
                                    <span className="text-[10px] font-medium">Now Showing</span>
                                </button>

                                <button
                                    onClick={() => handleToggle(movie._id, 'showOnHome', movie.showOnHome)}
                                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${movie.showOnHome
                                        ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                                        : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                                        }`}
                                >
                                    {movie.showOnHome ? <HomeIcon className="w-5 h-5 mb-1" /> : <HomeIcon className="w-5 h-5 mb-1 opacity-50" />}
                                    <span className="text-[10px] font-medium">On Home</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredMovies.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 border border-dashed border-white/10 rounded-2xl bg-white/5">
                    <SearchIcon className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No movies found</p>
                    <p className="text-sm">Try adjusting your search criteria</p>
                </div>
            )}
        </div>
    ) : (
        <Loading />
    );
};

export default ManageMovies;
