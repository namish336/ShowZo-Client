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
        <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-screen relative">
            <BlurCircle top="100px" left="100px" />

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">My Collections</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dull transition rounded-lg font-medium text-sm"
                >
                    <PlusIcon className="w-4 h-4" />
                    New Collection
                </button>
            </div>

            {collections.length > 0 ? (
                <div className="space-y-12">
                    {collections.map((collection) => (
                        <div key={collection._id} className="animate-fade-in-up">
                            <div className="flex items-center gap-4 mb-4 border-b border-gray-800 pb-2">
                                <h2 className="text-xl font-semibold text-gray-100">{collection.name}</h2>
                                <span className="text-sm text-gray-500">({collection.movies.length} items)</span>
                                <button
                                    onClick={() => handleDeleteCollection(collection._id)}
                                    className="ml-auto text-gray-500 hover:text-red-500 transition p-2"
                                    title="Delete Collection"
                                >
                                    <Trash2Icon className="w-4 h-4" />
                                </button>
                            </div>

                            {collection.movies.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {collection.movies.map((movie) => (
                                        <div key={movie._id} className="relative group">
                                            <MovieCard movie={movie} showBuyTickets={false} basePath="/movie/" />
                                            {/* Remove Button for hovering */}
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleRemoveMovie(collection._id, movie._id);
                                                }}
                                                className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition backdrop-blur-md"
                                                title="Remove from collection"
                                            >
                                                <Trash2Icon className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-500 text-sm py-4 italic">
                                    No movies in this collection yet.
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-gray-400 text-center mt-20">
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
