import React, { useState, useEffect } from 'react';
import { XIcon, PlusIcon, CheckIcon } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { getCollections, createCollection, addMovieToCollection } from '../services/api';
import toast from 'react-hot-toast';

const AddToCollectionModal = ({ isOpen, onClose, movieId }) => {
    const { getToken } = useAuth();
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');

    const fetchCollections = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            const data = await getCollections(token);
            setCollections(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load collections");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchCollections();
            setIsCreating(false);
            setNewCollectionName('');
        }
    }, [isOpen]);

    const handleCreateAndAdd = async () => {
        if (!newCollectionName.trim()) return;
        try {
            const token = await getToken();
            const res = await createCollection(newCollectionName, token);
            if (res.success) {
                // created, now add movie
                await handleAddToCollection(res.collection._id);
                fetchCollections(); // refresh list
                setIsCreating(false);
                setNewCollectionName('');
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Failed to create collection");
        }
    };

    const handleAddToCollection = async (collectionId) => {
        try {
            const token = await getToken();
            const res = await addMovieToCollection(collectionId, movieId, token);
            if (res.success) {
                toast.success("Added to collection!");
                onClose();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Failed to add to collection");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-[#18181B] border border-white/10 p-6 rounded-2xl w-full max-w-sm relative animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                >
                    <XIcon className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold mb-4">Add to Collection</h2>

                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {collections.map((col) => {
                            const isAlreadyIn = col.movies.some(m => m === movieId || m._id === movieId);
                            return (
                                <button
                                    key={col._id}
                                    disabled={isAlreadyIn}
                                    onClick={() => handleAddToCollection(col._id)}
                                    className="w-full text-left px-4 py-3 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] transition flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="font-medium text-sm">{col.name}</span>
                                    {isAlreadyIn && <CheckIcon className="w-4 h-4 text-green-500" />}
                                </button>
                            );
                        })}
                        {collections.length === 0 && !isCreating && (
                            <p className="text-gray-500 text-sm text-center py-4">No collections found.</p>
                        )}
                    </div>
                )}

                {/* Create New Section */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                    {isCreating ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                className="flex-1 bg-[#09090B] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-primary outline-none transition"
                                placeholder="Collection Name"
                                value={newCollectionName}
                                onChange={(e) => setNewCollectionName(e.target.value)}
                                autoFocus
                            />
                            <button
                                onClick={handleCreateAndAdd}
                                disabled={!newCollectionName.trim()}
                                className="p-2 bg-primary rounded-lg hover:bg-primary-dull transition disabled:opacity-50"
                            >
                                <PlusIcon className="w-4 h-4 text-white" />
                            </button>
                            <button
                                onClick={() => setIsCreating(false)}
                                className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                            >
                                <XIcon className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsCreating(true)}
                            className="w-full py-2.5 flex items-center justify-center gap-2 rounded-lg border border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 hover:bg-white/5 transition text-sm"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Create New Collection
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddToCollectionModal;
