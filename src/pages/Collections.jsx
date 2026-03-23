import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { getCollections, createCollection, deleteCollection, removeMovieFromCollection } from "../services/api";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import { PlusIcon, Trash2Icon } from "lucide-react";
import CreateCollectionModal from "../components/CreateCollectionModal";
import toast from "react-hot-toast";

const Collections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { getToken } = useAuth();

    const fetchCollections = async () => {
        try {
            const token = await getToken();
            if (token) {
                const data = await getCollections(token);
                setCollections(data);
            }
        } catch (error) {
            console.error("Error fetching collections", error);
            toast.error("Failed to load collections");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, []);

    const handleCreateCollection = async (name) => {
        try {
            const token = await getToken();
            const res = await createCollection(name, token);
            if (res.success) {
                toast.success("Collection created!");
                fetchCollections();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Failed to create collection");
        }
    };

    const handleDeleteCollection = async (id) => {
        if (!confirm("Are you sure you want to delete this collection?")) return;
        try {
            const token = await getToken();
            const res = await deleteCollection(id, token);
            if (res.success) {
                toast.success("Collection deleted");
                setCollections(prev => prev.filter(c => c._id !== id));
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Failed to delete collection");
        }
    };

    const handleRemoveMovie = async (collectionId, movieId) => {
        try {
            const token = await getToken();
            const res = await removeMovieFromCollection(collectionId, movieId, token);
            if (res.success) {
                toast.success("Movie removed");
                fetchCollections(); // Refresh to update UI
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Failed to remove movie");
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="px-4 md:px-16 lg:px-40 pt-24 md:pt-40 min-h-screen relative bg-[#C0C9DB] text-gray-900 overflow-x-hidden">
            <BlurCircle top="100px" left="100px" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">My Collections</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#e50914] hover:bg-[#b20710] text-white transition shadow-lg shadow-red-500/20 rounded-2xl font-bold text-sm"
                >
                    <PlusIcon className="w-4 h-4" />
                    New Collection
                </button>
            </div>

            {collections.length > 0 ? (
                <div className="space-y-10 md:space-y-16">
                    {collections.map((collection) => (
                        <div key={collection._id} className="animate-fade-in-up">
                            <div className="flex items-center gap-4 mb-6 border-b border-white/60 pb-3">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 truncate max-w-[60%] md:max-w-none">{collection.name}</h2>
                                <span className="text-xs md:text-sm text-gray-600 font-bold bg-white/40 px-3 py-1 rounded-full uppercase tracking-wider">
                                    {collection.movies.length} {collection.movies.length === 1 ? 'film' : 'films'}
                                </span>
                                <button
                                    onClick={() => handleDeleteCollection(collection._id)}
                                    className="ml-auto text-gray-400 hover:text-red-600 transition p-2 bg-white/20 hover:bg-white/40 rounded-xl"
                                    title="Delete Collection"
                                >
                                    <Trash2Icon className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </div>

                            {collection.movies.length > 0 ? (
                                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
                                    {collection.movies.map((movie) => (
                                        <div key={movie._id} className="relative group">
                                            <MovieCard movie={movie} showBuyTickets={false} basePath="/movie/" />
                                            {/* Remove Button - Visible on hover (desktop) or always visible (touch-ish) */}
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleRemoveMovie(collection._id, movie._id);
                                                }}
                                                className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-xl lg:opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md shadow-xl hover:scale-110 active:scale-95"
                                                title="Remove from collection"
                                            >
                                                <Trash2Icon className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white/30 border border-dashed border-gray-400 rounded-3xl py-10 text-center">
                                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                                        Your list is empty
                                    </p>
                                    <p className="text-gray-400 text-xs mt-1">Add movies to this collection to see them here.</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-gray-600 text-center mt-20 font-medium">
                    <p className="text-xl">No collections found.</p>
                    <p className="text-sm mt-2">Create a new collection to get started!</p>
                </div>
            )}

            <CreateCollectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateCollection}
            />
        </div>
    );
};

export default Collections;
